import { MetaDataController } from "@/controllers/metaData/metaData";
import CreateRouter from "@CreateRoute";

// create registration route
const MakeRouter = new CreateRouter("/ui/meta_data");
const app = MakeRouter.getApp();

// mobile app api

app.get("/", MetaDataController.getPageCount);

export default MakeRouter;
