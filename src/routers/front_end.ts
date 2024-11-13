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

// Home //
app.post(
  "/update-home",
  IsAdmin,
  getMulter({
    destination: des,
  }).single("cover"),
  photoComposure(des).single,
  HomePageController.ChangeHomePage
);
//- About JHS//-
app.post(
  "/update-about",
  IsAdmin,
  getMulter({
    destination: des,
  }).single("cover"),
  photoComposure(des).single,
  AboutPageController.ChangeAboutPage
);
app.post(
  "/update-about-mission-pic",
  IsAdmin,
  getMulter({
    destination: des,
  }).single("mission"),
  photoComposure(des).single,
  AboutPageController.ChangeAboutMissionCover
);
app.post(
  "/update-about-roots-pic",
  IsAdmin,
  getMulter({
    destination: des,
  }).single("roots"),
  photoComposure(des).single,
  AboutPageController.ChangeAboutRootCover
);

// about senior pastors
app.post(
  "/create-senior-pastors",
  IsAdmin,
  getMulter({
    destination: des,
  }).single("photo"),
  photoComposure(des).single,
  AboutPageController.CreateAboutSeniorPastors
);
app.post(
  "/update-senior-pastors",
  IsAdmin,
  getMulter({
    destination: des,
  }).single("photo"),
  photoComposure(des).single,
  AboutPageController.UpdateAboutSeniorPastors
);
app.post(
  "/delete-senior-pastors",
  IsAdmin,
  AboutPageController.UpdateAboutSeniorPastors
);

// About Ministerial
app.post(
  "/create-ministerial",
  IsAdmin,
  getMulter({
    destination: des,
  }).single("photo"),
  photoComposure(des).single,
  AboutPageController.CreateAboutMinisterial
);
app.post(
  "/update-ministerial",
  IsAdmin,
  getMulter({
    destination: des,
  }).single("photo"),
  photoComposure(des).single,
  AboutPageController.UpdateAboutMinisterial
);
app.post(
  "/delete-ministerial",
  IsAdmin,
  AboutPageController.UpdateAboutMinisterial
);

// get app //
app.get("/get/:page", GetPageDataController.getPageData);

export default MakeRouter;
