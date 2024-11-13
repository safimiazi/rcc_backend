import { db } from "@/database";
import { existsSync, unlinkSync } from "fs";
import path from "path";
const destination = path.join(__dirname, "..", "..", "public/media/cover");

export const HomePageController = {
  async ChangeHomePage(req, res, next) {
    try {
      const { body, file } = req;
      const opt = file?.opt || null;

      const data = JSON.parse(body?.data);

      const current = await db.HomePage.findOne();
      if (!current) {
        const newData = await db.HomePage.create({
          des: data?.des,
          i_new: data?.i_new,
          involved: data?.involved,
          tag: data?.tag,
          titel: data?.titel,
          value: data?.value,
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
          des: body.des,
          i_new: body.i_new,
          involved: body.involved,
          tag: body.tag,
          titel: body.titel,
          value: body.value,
          cover: opt,
        });
      } else {
        await current.update({
          des: body.des,
          i_new: body.i_new,
          involved: body.involved,
          tag: body.tag,
          titel: body.titel,
          value: body.value,
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
  async GetHomePage(req, res, next) {
    try {
      const Data = await db.HomePage.findOne();
      res.send(Data);
    } catch (error) {
      next(error);
    }
  },
};
