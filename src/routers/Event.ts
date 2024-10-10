import path from "path";

import { EventController } from "@/controllers/Event/Event.controller";
import IsAdmin from "@/middleware/auth/isAdmin";
import getMulter from "@/middleware/multer/multer";
import photoComposure from "@/middleware/multer/photoComposure";

const des = path.join(__dirname, "..", "public/media/event");
import CreateRouter from "@CreateRoute";

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

  EventController.CreateEvent
);

app.post(
  "/update_archive_img",
  IsAdmin,
  getMulter({
    destination: des,
  }).array("archive_img"),

  EventController.CreateEvent
);

app.get("/get_all_event_public", EventController.GetAllActiveEvents);

app.get("/get_all_event_admin", EventController.getAllEvents);

app.get("/get_event_by_id", EventController.getEventById);

export default MakeRouter;
