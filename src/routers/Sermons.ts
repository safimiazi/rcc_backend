import { SermonsController } from "@/controllers/sermons/Sermons.controller";
import IsAdmin from "@/middleware/auth/isAdmin";
import CreateRouter from "@/utility/CreateRouter";

// create registration route
const MakeRouter = new CreateRouter("/ui/sermons");
const app = MakeRouter.getApp();

app.post("/create", IsAdmin, SermonsController.CreateSermons);
app.get("/getDataAdmin", IsAdmin, SermonsController.GetSermonsDataAdmin);

app.get("/getData", SermonsController.GetSermonsData);

app.post("/update", IsAdmin, SermonsController.UpdateSermonsData);
app.post("/delete", IsAdmin, SermonsController.DeleteSermonsData);

export default MakeRouter;
