import { SermonsController } from "@/controllers/sermons/Sermons.controller";
import IsAdmin from "@/middleware/auth/isAdmin";
import getMulter from "@/middleware/multer/multer";
import photoComposure from "@/middleware/multer/photoComposure";
import CreateRouter from "@/utility/CreateRouter";
import path from "path";

// create registration route
const MakeRouter = new CreateRouter("/ui/sermons");
const app = MakeRouter.getApp();

const des = path.join(__dirname, "..", "public/media/thumbnail");

app.post(
  "/create",
  IsAdmin,
  getMulter({
    destination: des,
  }).single("thumbnail"),
  photoComposure(des).single,
  SermonsController.CreateSermons
);
app.get("/getDataAdmin", IsAdmin, SermonsController.GetSermonsDataAdmin);

app.get("/getData", SermonsController.GetSermonsData);

app.post("/update", IsAdmin, SermonsController.UpdateSermonsData);
app.post("/delete", IsAdmin, SermonsController.DeleteSermonsData);

export default MakeRouter;
