import { db } from "@/database";
import { existsSync, unlinkSync } from "fs";
import path from "path";
const destination = path.join(__dirname, "..", "..", "public/media/cover");

export const AboutPageController = {
  async ChangeAboutPage(req, res, next) {
    try {
      const { body, file } = req;
      const opt = file?.opt || null;
      const current = await db.AboutPage.findOne();
      if (!current) {
        const newData = await db.AboutPage.create({
          our_mission: body.our_mission,
          our_roots: body.our_roots,
          our_value: body.our_value,
          cover: opt,
        });
        return res.send(newData);
      }
      // check if the old photo is exist or not
      const FileName = current.toJSON().cover;
      if (FileName && opt) {
        const FilePath = path.join(destination, FileName);
        if (existsSync(FilePath)) {
          try {
            await unlinkSync(FilePath);
          } catch (err) {
            console.error("Error deleting the file:", err);
          }
        }
      }
      if (opt) {
        await current.update({
          our_mission: body.our_mission,
          our_roots: body.our_roots,
          cover: opt,
        });
      } else {
        await current.update({
          our_mission: body.our_mission,
          our_roots: body.our_roots,
        });
      }
      res.send(current);
    } catch (error) {
      // if any error occurs then delete uploaded file
      const { file } = req;
      const opt = file?.path || null;
      if (opt) {
        try {
          await unlinkSync(opt + ".webp");
        } catch (unlinkError) {
          console.error("Error deleting file:", unlinkError);
        }
      }
      next(error);
    }
  },
  async ChangeAboutMissionCover(req, res, next) {
    try {
      const { body, file } = req;
      const opt = file?.opt || null;
      const current = await db.AboutPage.findOne();
      if (!current) {
        const newData = await db.AboutPage.create({
          our_mission_pic: opt,
          our_mission: body.our_mission,
        });
        return res.send(newData);
      }
      // check if the old photo is exist or not
      const FileName = current.toJSON().cover;
      if (FileName && opt) {
        const FilePath = path.join(destination, FileName);
        if (existsSync(FilePath)) {
          try {
            await unlinkSync(FilePath);
          } catch (err) {
            console.error("Error deleting the file:", err);
          }
        }
      }
      if (opt) {
        await current.update({
          our_mission_pic: opt,
          our_mission: body.our_mission,
        });
      } else {
        await current.update({
          our_mission: body.our_mission,
        });
      }
      res.send(current);
    } catch (error) {
      // if any error occurs then delete uploaded file
      const { file } = req;
      const opt = file?.path || null;
      if (opt) {
        try {
          await unlinkSync(opt + ".webp");
        } catch (unlinkError) {
          console.error("Error deleting file:", unlinkError);
        }
      }
      next(error);
    }
  },
  async ChangeAboutRootCover(req, res, next) {
    try {
      const { body, file } = req;
      const opt = file?.opt || null;
      const current = await db.AboutPage.findOne();
      if (!current) {
        const newData = await db.AboutPage.create({
          our_roots_pic: opt,
          our_roots: body.our_roots,
        });
        return res.send(newData);
      }
      // check if the old photo is exist or not
      const FileName = current.toJSON().cover;
      if (FileName && opt) {
        const FilePath = path.join(destination, FileName);
        if (existsSync(FilePath)) {
          try {
            await unlinkSync(FilePath);
          } catch (err) {
            console.error("Error deleting the file:", err);
          }
        }
      }
      if (opt) {
        await current.update({
          our_roots_pic: opt,
          our_roots: body.our_roots,
        });
      } else {
        await current.update({
          our_roots: body.our_roots,
        });
      }
      res.send(current);
    } catch (error) {
      // if any error occurs then delete uploaded file
      const { file } = req;
      const opt = file?.path || null;
      if (opt) {
        try {
          await unlinkSync(opt + ".webp");
        } catch (unlinkError) {
          console.error("Error deleting file:", unlinkError);
        }
      }
      next(error);
    }
  },
};
