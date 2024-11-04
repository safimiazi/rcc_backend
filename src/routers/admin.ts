import { AdminController } from "@/controllers/admin/AdminController";
import IsAdmin from "@/middleware/auth/isAdmin";
import getMulter from "@/middleware/multer/multer";
import photoComposure from "@/middleware/multer/photoComposure";

import CreateRouter from "@CreateRoute";
import path from "path";
const des = path.join(__dirname, "..", "public/media/admin_avatar");
// create registration route
const MakeRouter = new CreateRouter("/ui/admin");
const app = MakeRouter.getApp();

app.post(
  "/update-admin-photo",
  IsAdmin,
  getMulter({
    destination: des,
  }).single("photo"),
  photoComposure(des).single,
  AdminController.UpdatePhoto
);
app.post("/create-admin", IsAdmin, AdminController.CreateAdmin);
app.get("/get-all-admin", IsAdmin, AdminController.GetAllAdmin);
app.get("/get-admin-by-id", IsAdmin, AdminController.GetAdminById);
app.post("/update-admin-by-id", IsAdmin, AdminController.UpdateAdminUser);
export default MakeRouter;
