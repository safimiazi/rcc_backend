import { VideoController } from "@/controllers/video/Video.controller";
import IsAdmin from "@/middleware/auth/isAdmin";
import getMulter from "@/middleware/multer/multer";
import photoComposure from "@/middleware/multer/photoComposure";
import { createPayPalPayment } from "@/paypal";
import CreateRouter from "@/utility/CreateRouter";
import path from "path";
const des = path.join(__dirname, "..", "public/media/thumbnail");
// create registration route
const MakeRouter = new CreateRouter("/api/paypal");
const app = MakeRouter.getApp();

app.get("/pay", async (req, res) => {
  const Payment = await createPayPalPayment({
    itemName: "test",
    sku: "001",
    price: 100,
    currency: "USD",
    quantity: 1,
    description: "test",
  });

  res.send(Payment);
});

app.get("/success", (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  console.log(req.query);
  res.send("Success");
});
// get order responses
// localhost:3000/complete-order?token=4M961104L00542817&PayerID=9BNQKGCYPVG6J

export default MakeRouter;
