import path from "path";
import { HomePageController } from "@/controllers/front-end/Home_page";
import IsAdmin from "@/middleware/auth/isAdmin";
import getMulter from "@/middleware/multer/multer";
import photoComposure from "@/middleware/multer/photoComposure";
import CreateRouter from "@CreateRoute";
import { GetPageDataController } from "@/controllers/front-end/GetPage";
const des = path.join(__dirname, "..", "public/media/cover");

// create registration route
const MakeRouter = new CreateRouter("/ui/front-end");
const app = MakeRouter.getApp();

// mobile app api
app.post(
  "/update-home",
  IsAdmin,
  getMulter({
    destination: des,
  }).single("cover"),
  photoComposure(des).single,
  HomePageController.ChangeHomePage
);
app.get("/get/:page", GetPageDataController.getPageData);

export default MakeRouter;
