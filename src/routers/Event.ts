import path from "path";
import { AdminController } from "@/controllers/admin/AdminController";
import { EventController } from "@/controllers/Event/Event.controller";
import IsAdmin from "@/middleware/auth/isAdmin";
import getMulter from "@/middleware/multer/multer";
import photoComposure from "@/middleware/multer/photoComposure";
const des = path.join(__dirname, "..", "public/media/event");
import CreateRouter from "@CreateRoute";
import { EventRegistration } from "@/controllers/Event/EventRegistration.controller";

// create registration route
const MakeRouter = new CreateRouter("/ui/event");
const app = MakeRouter.getApp();

// mobile app api
app.post(
  "/create",
  IsAdmin,
  getMulter({
    destination: des,
  }).single("event_img"),
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
  EventController.update_archive_image
);

app.get("/get_all_event_public", EventController.GetAllActiveEvents);
app.get(
  "/get_all_event_public_with_date",
  EventController.get_all_event_public_with_date
);

app.get("/get_all_event_admin", IsAdmin, EventController.getAllEvents);

app.get("/get_event_by_id/:id", EventController.getEventById);
app.post("/event-delete", IsAdmin, EventController.EventDelete);

app.post("/event-registration", EventRegistration.EventRegistration);
app.post("/event-update", IsAdmin, EventController.UpdateEventById);

app.post(
  "/update_thumbnail_img",
  IsAdmin,
  getMulter({
    destination: des,
  }).single("event_img"),
  photoComposure(des).single,
  EventController.ChangeCoverPhoto
);

app.post("/delete-archive-image", IsAdmin, EventController.DeleteArchiveImage);
app.post(
  "/add_archive_img",
  IsAdmin,
  getMulter({
    destination: des,
  }).array("img"),
  photoComposure(des).double,
  EventController.add_archive_image
);
export default MakeRouter;
