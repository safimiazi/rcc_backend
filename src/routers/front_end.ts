import path from "path";
import { HomePageController } from "@/controllers/front-end/Home_page";
import IsAdmin from "@/middleware/auth/isAdmin";
import getMulter from "@/middleware/multer/multer";
import photoComposure from "@/middleware/multer/photoComposure";
import CreateRouter from "@CreateRoute";
import { GetPageDataController } from "@/controllers/front-end/GetPage";
import { AboutPageController } from "@/controllers/front-end/About_page";
const des = path.join(__dirname, "..", "public/media/cover");

// create registration route
const MakeRouter = new CreateRouter("/ui/front-end");
const app = MakeRouter.getApp();

// mobile app api //
app.post(
  "/update-home",
  IsAdmin,
  getMulter({
    destination: des,
  }).single("cover"),
  photoComposure(des).single,
  HomePageController.ChangeHomePage
);
//- hello //-
app.post(
  "/update-about",
  IsAdmin,
  getMulter({
    destination: des,
  }).single("cover"),
  AboutPageController.ChangeAboutPage
);

// get app //
app.get("/get/:page", GetPageDataController.getPageData);

export default MakeRouter;
