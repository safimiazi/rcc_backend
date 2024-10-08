import { AdminController } from "@/controllers/admin/AdminController";
import { errorCreate } from "../errorHandler";

const IsAdmin = async (req, res, next) => {
  try {
    const { ads, log } = req.cookies;
    if (!ads && !log) {
      throw errorCreate(401, "Please Login");
    }
    const User = await AdminController.LoginValidate(ads, log);
    const UserJson = User.toJSON();
    req.Admin = UserJson;
    next();
  } catch (error) {
    res.status(401).send(error);
  }
};

export default IsAdmin;
