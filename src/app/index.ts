import { ENV } from "@config/env";
import Express from "express";
import morgan from "morgan";
import cors from "cors";
import hpp from "hpp";
import helmet from "helmet";
import path from "path";
import compression from "compression";
import cookieParser from "cookie-parser";
import fs from "fs";
import createError from "http-errors";

import { logger, stream } from "@utility/logger";
import { db } from "@/database";
import { errorHandler } from "@error";

import httpProxy from "http-proxy";

const app = Express();

// Init service
app.use(
  morgan(ENV.LOG_FORMAT, {
    stream,
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);

// Set security headers
app.use(helmet.referrerPolicy({ policy: "strict-origin-when-cross-origin" }));

// Enable CORS for specific origin
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://rccgjhs.com",
      "https://www.rccgjhs.com",
    ], // Ensure this matches your frontend URL
    credentials: true, // If you are sending cookies or authorization headers
  })
);

// Protect against HTTP parameter pollution attacks
app.use(hpp());

app.use(compression());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(Express.static(path.join(__dirname, "../public")));

// Handle preflight requests for CORS (if necessary)
app.options("*", cors()); // Enable for all routes

// Sync database
db.sequelize.sync({
  alter: false, 
  force: false,
});

const InitRouters = async () => {
  let functionsFolderPath = path.join(__dirname, "../", "routers");
  try {
    // Read all files in the folder
    const files = await fs.readdirSync(functionsFolderPath);
    for (const file of files) {
      const filePath = path.join(functionsFolderPath, file);
      if (
        path.extname(filePath) === ".js" ||
        path.extname(filePath) === ".ts"
      ) {
        // Dynamically import and create Router
        const Module = await import(filePath);
        app.use(Module.default.router);
      }
    }

    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../public", "index.html"));
    });
    app.use(errorHandler);
  } catch (error) {
    console.log("🚀 ~ InitRouters ~ error:", error);
  }
};
InitRouters();

// Error handling
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({ error: err.message });
  }
});

export default app;
