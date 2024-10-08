import { AdminController } from "@/controllers/admin/AdminController";
import { EventController } from "@/controllers/Event/Event.controller";
import IsAdmin from "@/middleware/auth/isAdmin";
import getMulter from "@/middleware/multer/multer";
import photoComposure from "@/middleware/multer/photoComposure";
const des = path.join(__dirname, "..", "public/media/event");

import CreateRouter from "@CreateRoute";
import path from "path";

// create registration route
const MakeRouter = new CreateRouter("/ui/event");
const app = MakeRouter.getApp();

// mobile app api
app.post(
  "/create",
  IsAdmin,
  getMulter({
    destination: des,
  }).single("photo"),
  photoComposure(des).single,
  EventController.CreateEvent
);

app.post(
  "/update_archive_img",
  IsAdmin,
  getMulter({
    destination: des,
  }).array("archive_img"),
  photoComposure(des).double,
  EventController.CreateEvent
);

export default MakeRouter;
