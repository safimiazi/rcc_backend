import { AdminController } from "@/controllers/admin/AdminController";
import { ProfileController } from "@/controllers/profile/ProfileController";
import IsAdmin from "@/middleware/auth/isAdmin";
import getMulter from "@/middleware/multer/multer";
import photoComposure from "@/middleware/multer/photoComposure";

import CreateRouter from "@CreateRoute";
import path from "path";
const des = path.join(__dirname, "..", "public/media/admin_avatar");
// create registration route
const MakeRouter = new CreateRouter("/ui/profile");
const app = MakeRouter.getApp();

app.post(
  "/update-admin-photo",
  getMulter({
    destination: des,
  }).single("photo"),
  photoComposure(des).single,
  AdminController.UpdatePhoto
);
app.put("/change_password",  IsAdmin,  ProfileController.ChangePassword);

export default MakeRouter;
