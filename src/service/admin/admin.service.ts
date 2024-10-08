import { db } from "@/database";
import { Op } from "sequelize";

export const adminService = {
  async GetAllAdmin() {
    try {
      const AllAdmin = await db.Admin.findAll({});

      return AllAdmin;
    } catch (error) {
      throw error;
    }
  },
  async CreateAdmin(data) {
    try {
      const admin = await db.Admin.create({
        email: data.email,
        name: data.name,
        phone: data.phone,
        password: data.password,
        photo: "no photo.jpg",
        role: data.role || [],
        status: "active",
        session: "",
        type: "user",
      });
      return admin;
    } catch (error) {
      throw error;
    }
  },
  async GetByEmail(email) {
    return await db.Admin.unscoped().findOne({
      where: {
        email: email,
      },
    });
  },
  async GetByID(id, session) {
    return await db.Admin.findOne({
      where: {
        [Op.and]: {
          id: id,
          session: session,
        },
      },
    });
  },
};
