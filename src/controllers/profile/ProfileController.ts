import { db } from "@/database";
import { AdminModel } from "@/database/model/Admin";
import { compare } from "@/utility/encryption";

export const ProfileController = {
  async ChangePassword(req, res, next) {
    try {
      const { oldPassword, confirmPassword } = req.body;
      const user = req.Admin;

      // Fetch the admin record
      const admin = await db.Admin.unscoped().findOne({ where: { id: user.id } });
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      // Validate the old password
      const isMatch = await compare(oldPassword, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Old password is incorrect" });
      }


      // Update the password in the database
      admin.password = confirmPassword;
      await admin.save();

      return res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      console.error("Error changing password:", error);
      next(error); // Pass the error to the global error handler
    }
  },
};
