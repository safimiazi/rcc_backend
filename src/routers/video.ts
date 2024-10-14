import { VideoController } from "@/controllers/video/Video.controller";
import IsAdmin from "@/middleware/auth/isAdmin";
import CreateRouter from "@/utility/CreateRouter";

// create registration route
const MakeRouter = new CreateRouter("/ui/video");
const app = MakeRouter.getApp();

app.post("/create", IsAdmin, VideoController.CreateVideo);
app.get("/getDataAdmin", IsAdmin, VideoController.GetVideoDataAdmin);

app.get("/getData", VideoController.GetVideoData);

app.post("/update", IsAdmin, VideoController.UpdateVideoData);
app.post("/delete", IsAdmin, VideoController.DeleteVideoData);

export default MakeRouter;
