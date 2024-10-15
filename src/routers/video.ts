import { VideoController } from "@/controllers/video/Video.controller";
import IsAdmin from "@/middleware/auth/isAdmin";
import getMulter from "@/middleware/multer/multer";
import photoComposure from "@/middleware/multer/photoComposure";
import CreateRouter from "@/utility/CreateRouter";
import path from "path";
const des = path.join(__dirname, "..", "public/media/thumbnail");
// create registration route
const MakeRouter = new CreateRouter("/ui/video");
const app = MakeRouter.getApp();

app.post(
  "/create",
  IsAdmin,
  getMulter({
    destination: des,
  }).single("thumbnail"),
  photoComposure(des).single,
  VideoController.CreateVideo
);

app.get("/getDataAdmin", IsAdmin, VideoController.GetVideoDataAdmin);

app.get("/getData", VideoController.GetVideoData);

app.post(
  "/update",
  IsAdmin,
  getMulter({
    destination: des,
  }).single("thumbnail"),
  photoComposure(des).single,
  VideoController.UpdateVideoData
);
app.post("/delete", IsAdmin, VideoController.DeleteVideoData);

export default MakeRouter;
