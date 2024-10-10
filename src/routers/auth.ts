import { AdminController } from "@/controllers/admin/AdminController";
import IsAdmin from "@/middleware/auth/isAdmin";

import CreateRouter from "@CreateRoute";

// create registration route
const MakeRouter = new CreateRouter("/ui/auth");
const app = MakeRouter.getApp();

// mobile app api
app.post("/login", AdminController.Login);
app.get("/is-admin-login", IsAdmin, (req, res) => {
  // @ts-ignore
  res.send(req.Admin);
});
app.post("/change-admin-password", IsAdmin, AdminController.ChangePassword);
app.post("/logout-admin", AdminController.Logout);
export default MakeRouter;
