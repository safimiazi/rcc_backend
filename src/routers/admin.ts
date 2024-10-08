import { AdminController } from "@/controllers/admin/AdminController";
import IsAdmin from "@/middleware/auth/isAdmin";
import getMulter from "@/middleware/multer/multer";
import photoComposure from "@/middleware/multer/photoComposure";

import CreateRouter from "@CreateRoute";
import path, { isAbsolute } from "path";
const des = path.join(__dirname, "..", "public/media/admin_avatar");
// create registration route
const MakeRouter = new CreateRouter("/ui/admin");
const app = MakeRouter.getApp();

app.post(
  "/update-photo",
  IsAdmin,
  getMulter({
    destination: des,
  }).single("photo"),
  photoComposure(des).single,
  AdminController.UpdatePhoto
);
app.post("/create-admin", IsAdmin, AdminController.CreateAdmin);
app.get("/get-all-admin", IsAdmin, AdminController.GetAllAdmin);
export default MakeRouter;
