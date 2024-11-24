import path from "path";
import { HomePageController } from "@/controllers/front-end/Home_page";
import IsAdmin from "@/middleware/auth/isAdmin";
import getMulter from "@/middleware/multer/multer";
import photoComposure from "@/middleware/multer/photoComposure";
import CreateRouter from "@CreateRoute";
import { GetPageDataController } from "@/controllers/front-end/GetPage";
import { AboutPageController } from "@/controllers/front-end/About_page";
import { MinistryController } from "@/controllers/front-end/Ministry.controller";
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
  "/change-about-cover",
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
  AboutPageController.DeleteAboutSeniorPastors
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
  AboutPageController.DeleteAboutMinisterial
);
// Update about cover photo

interface AboutPageBody {
  name: "ministerial_team" | "contact_us" | "our_senior_pastors" | "our_values";
}

// update cover photo use filed "name" = "ministerial_team" | "contact_us" | "our_senior_pastors" | "our_values"
// and set photo cover
app.post(
  "/update-about-cover-photo",
  IsAdmin,
  getMulter({
    destination: des,
  }).single("cover"),
  photoComposure(des).single,
  AboutPageController.UpdateCoverPhoto
);

// Ministry
app.post(
  "/update-ministry-children-cover",
  IsAdmin,
  getMulter({
    destination: des,
  }).single("cover"),
  photoComposure(des).single,
  MinistryController.children.UpdateCover
);

app.post(
  "/update-ministry-children-junior",
  IsAdmin,
  getMulter({
    destination: des,
  }).single("cover"),
  photoComposure(des).single,
  MinistryController.children.UpdateJunior
);

app.post(
  "/update-ministry-children-kids",
  IsAdmin,
  getMulter({
    destination: des,
  }).single("cover"),
  photoComposure(des).single,
  MinistryController.children.UpdateKids
);

app.post(
  "/update-ministry-children-teenagers",
  IsAdmin,
  getMulter({
    destination: des,
  }).single("cover"),
  photoComposure(des).single,
  MinistryController.children.UpdateTeenagers
);

app.post(
  "/update-ministry-children-teens",
  IsAdmin,
  getMulter({
    destination: des,
  }).single("cover"),
  photoComposure(des).single,
  MinistryController.children.UpdateTeens
);
app.post(
  "/update-ministry-children-tots_for_christ",
  IsAdmin,
  getMulter({
    destination: des,
  }).single("cover"),
  photoComposure(des).single,
  MinistryController.children.UpdateTots_for_christ
);

app.post(
  "/update-ministry-children-children_ministry",
  IsAdmin,
  MinistryController.children.UpdateChildren_ministry
);

app.post(
  "/update-ministry-children-goals",
  IsAdmin,
  MinistryController.children.UpdateGoals
);

// ministry builder page data
app.post(
  "/update-ministry-builder-cover",
  IsAdmin,
  getMulter({
    destination: des,
  }).single("cover"),
  photoComposure(des).single,
  MinistryController.builder.UpdateBuilderPageCover
);
app.post(
  "/update-ministry-builder-data",
  IsAdmin,
  getMulter({
    destination: des,
  }).single("cover"),
  photoComposure(des).single,
  MinistryController.builder.UpdateBuilderPAgeData
);
// valour page (men , women)
app.post(
  "/update-ministry-valour-cover-men",
  IsAdmin,
  getMulter({
    destination: des,
  }).single("cover"),
  photoComposure(des).single,
  MinistryController.valour.UpdateMenCover
);
app.post(
  "/update-ministry-valour-cover-women",
  IsAdmin,
  getMulter({
    destination: des,
  }).single("cover"),
  photoComposure(des).single,
  MinistryController.valour.UpdateWomenCover
);

app.post(
  "/add-ministry-valour-card",
  IsAdmin,
  getMulter({
    destination: des,
  }).single("cover"),
  photoComposure(des).single,
  MinistryController.valour.AddCard
);

app.post(
  "/delete-ministry-valour-card",
  IsAdmin,
  MinistryController.valour.DeleteCard
);

// send type: 'men | 'women : for update specific page
app.post(
  "/update-ministry-valour-men-women-description",
  IsAdmin,
  MinistryController.valour.UpdateTitelDescription
);

// get app //
app.get("/get/:page", GetPageDataController.getPageData);

export default MakeRouter;
