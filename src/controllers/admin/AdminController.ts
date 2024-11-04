import { ENV } from "@/config/env";
import { errorCreate } from "@/middleware/errorHandler";
import { adminService } from "@/service/admin/admin.service";
import { compare } from "@/utility/encryption";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { create } from "domain";
import { existsSync, unlinkSync } from "fs";
import { db } from "@/database";
import { Request, Response, NextFunction } from "express";

export const AdminController = {
  async Login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw errorCreate(406, "Please enter a The Credentials !");
      }
      // get the current admin
      const AdminInDatabase = await adminService.GetByEmail(email);
      if (!AdminInDatabase) {
        throw errorCreate(404, "Please enter a The Correct Credentials !");
      }

      if (AdminInDatabase.toJSON().status === "deactivate") {
        throw errorCreate(406, "user blocked");
      }
      if (AdminInDatabase.toJSON().status === "non_verify") {
        throw errorCreate(406, "user not Verify");
      }
      // validate the password
      const passwordHash = AdminInDatabase.toJSON().password;
      const Matcher = await compare(password, passwordHash);

      if (Matcher) {
        const session = await uuidv4();
        const token = await jwt.sign(
          {
            id: AdminInDatabase.toJSON().id,
            name: AdminInDatabase.toJSON().name,
          },
          ENV.SECRET_KEY,
          {
            expiresIn: "5d",
          }
        );
        res.setHeader("Set-Cookie", [
          cookie.serialize("ads", token, {
            maxAge: 2 * 24 * 60 * 60,
            sameSite: "strict",
            path: "/",
            httpOnly: true,
          }),
          cookie.serialize("log", session, {
            maxAge: 2 * 24 * 60 * 60,
            sameSite: "strict",
            path: "/",
            httpOnly: true,
          }),
        ]);
        await AdminInDatabase.update({
          session: session,
        });
        return res.send({
          login: "successful",
        });
      }
      throw errorCreate(406, "Wrong username or password");
    } catch (error) {
      console.log("🚀 ~ Login ~ error:", error);
      next(error);
    }
  },
  async LoginValidate(token, session) {
    try {
      let userDecode: {
        id: string;
        name: string;
      } | null;
      // validate the jwt
      try {
        userDecode = jwt.verify(token, ENV.SECRET_KEY) as unknown as {
          id: string;
          name: string;
        };
      } catch (error) {
        throw errorCreate(401, "Invalid User please login");
      }
      // get the user
      const Admin = await adminService.GetByID(userDecode.id, session);

      if (!Admin) {
        throw errorCreate(401, "Invalid User");
      }

      if (Admin.toJSON().status === "deactivate") {
        throw errorCreate(401, "user blocked");
      }
      if (Admin.toJSON().status === "non_verify") {
        throw errorCreate(401, "user not Verify");
      }

      return Admin;
    } catch (error) {
      throw error;
    }
  },
  async ChangePassword(req, res, next) {
    try {
      const Admin = req.Admin;
      const body = req.body;
      // validate the user enter email
      const ExistsEmail = await adminService.GetByEmail(Admin.email);
      if (!ExistsEmail) {
        throw errorCreate(401, "Please enter a valid email address !");
      }
      // is valid email the check the current password
      const PasswordMarcher = await compare(
        body.password,
        ExistsEmail.password
      );
      // check password
      if (!PasswordMarcher) {
        throw errorCreate(401, "Invalid password");
      }
      if (body.newPassword === body.password) {
        throw errorCreate(401, "Please enter a new password");
      }
      if (body.newPassword !== body.cPassword) {
        throw errorCreate(401, "Confirm password must be same as new password");
      }

      await ExistsEmail.update({
        password: body.newPassword,
      });

      res.setHeader("Set-Cookie", [
        cookie.serialize("ads", "", {
          maxAge: 10,
          sameSite: "strict",
          path: "/",
          httpOnly: true,
        }),
        cookie.serialize("log", "", {
          maxAge: 10,
          sameSite: "strict",
          path: "/",
          httpOnly: true,
        }),
      ]);

      res.send({
        status: "password updated",
      });
    } catch (error) {
      next(error);
    }
  },
  async Logout(req, res, next) {
    res.setHeader("Set-Cookie", [
      cookie.serialize("ads", "", {
        maxAge: 10,
        sameSite: "strict",
        path: "/",
        httpOnly: true,
      }),
      cookie.serialize("log", "", {
        maxAge: 10,
        sameSite: "strict",
        path: "/",
        httpOnly: true,
      }),
    ]);

    res.send({
      status: "Logout",
    });
  },
  //update photo ->>>>
  async UpdatePhoto(req, res, next) {
    try {
      //upload the photo use multer
      const { file, Admin } = req;
      const opt = file ? file.opt : null;

      //delete exiting photo from server
      if (Admin) {
        const Photo = Admin.photo;
        if (Photo !== "no.jpg") {
          const check = await existsSync(file.destination + "/" + Photo);
          if (check) {
            await unlinkSync(file.destination + "/" + Photo);
          }
        }
      }

      // update the database
      const admin = await adminService.GetByEmail(Admin.email);
      await admin.update({
        photo: opt,
      });
      res.send(admin);
    } catch (error) {
      console.log("🚀 ~ UpdatePhoto ~ error:", error);
      // if any error occurs then delete uploaded file
      const { file } = req;
      const opt = file ? file.path : null;
      if (opt) {
        await unlinkSync(opt + ".webp");
      }
      next(error);
    }
  },
  async CreateAdmin(req, res, next) {
    try {
      const { body } = req;
      const newAdmin = await adminService.CreateAdmin({
        email: body.email,
        name: body.name,
        phone: body.phone,
        password: body.password,
        role: [],
      });
      res.send(newAdmin);
    } catch (error) {
      next(error);
    }
  },
  async GetAllAdmin(req, res, next) {
    try {
      const AllAdmin = await adminService.GetAllAdmin();
      res.send(AllAdmin);
    } catch (error) {
      next(error);
    }
  },
  async GetAdminById(req, res, next) {
    try {
      const Admin = await db.Admin.findOne({
        where: {
          id: req.body.id,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  async UpdateAdminUser(req, res, next) {
    try {
      const { id, data } = req.body;
      const Update = await db.Admin.update(
        {
          ...data,
        },
        {
          where: {
            id,
          },
        }
      );

      // Check if the update was successful
      if (Update[0] === 0) {
        throw errorCreate(404, "Admin not found or no changes made");
      }

      res.send({
        status: "Admin updated successfully",
      });
    } catch (error) {
      next(error);
    }
  },
  async DeleteAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    // Implementation for deleting an admin by ID
    const adminId = req.body.id; // Assuming the ID is sent in the request body
    // Logic to delete the admin from the database
    // ...
    try {
    } catch (error) {
      next(error);
    }
  },
};
