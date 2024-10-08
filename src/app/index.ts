import { ENV } from "@config/env";
import Express from "express";
import morgan from "morgan";
import cors from "cors";
import hpp from "hpp";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import fs from "fs";
import path from "path";
import createError from "http-errors";

import { logger, stream } from "@utility/logger";
import { db } from "@/database";
import { errorHandler } from "@error";

import httpProxy from "http-proxy";

const app = Express();

// init the service
app.use(
  morgan(ENV.LOG_FORMAT, {
    stream,
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);
app.use(cors({ origin: ENV.ORIGIN, credentials: ENV.CREDENTIALS }));
app.use(hpp());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      defaultSrc: [
        "'self'",
        "https://images.unsplash.com",
        "http://192.168.5.76:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5173",
        "http://account.privilegedworld.com",
      ],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        "https://example.com",
        "https://images.unsplash.com",
        "http://192.168.5.76:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5173",

        "http://account.privilegedworld.com",
      ],
      // Add 'blob:' to allow the blob scheme
      objectSrc: [
        "'none'",
        "http://192.168.5.76:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5173",
        "http://account.privilegedworld.com",
      ],
      imgSrc: [
        "'self'",
        "data:",
        "blob:",
        "https://images.unsplash.com",
        "http://192.168.5.76:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5173",
        "http://account.privilegedworld.com",
      ], // Allow blob: for images
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  })
);
app.use(compression());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(Express.static(path.join(__dirname, "../public")));

//Sync database
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

export default app;
