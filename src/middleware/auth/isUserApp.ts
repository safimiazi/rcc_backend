import { user } from "@/interfaces/User";
import AuthService from "@/service/auth/auth.service";

const IsUserApp = async (req, res, next) => {
  try {
    const { headers } = req;
    const User = await AuthService.jwtValidator(headers.authorization);
    const UserJson = User.toJSON();
    req.user = UserJson;
    next();
  } catch (error) {
    res.status(401).send(error);
  }
};

export default IsUserApp;
