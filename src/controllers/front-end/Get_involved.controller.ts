import { db } from "@/database";
import { errorCreate } from "@/middleware/errorHandler";
import { existsSync, unlinkSync } from "fs";
import path from "path";
const destination = path.join(__dirname, "..", "..", "public/media/cover");

export const Get_involvedController = {
  become_a_new_believers: {
    async UpdateCover(req, res, next) {
      try {
        const { file } = req;
        const opt = file?.opt || null;
        const IsExist = await db.become_a_new_believers.findOne();
        if (!IsExist) {
          const NewData = await db.become_a_new_believers.create({
            cover: opt,
          });
          return res.send(NewData);
        }
        // if data is already exists then update it
        const FileName = IsExist.toJSON().cover;
        if (FileName && opt) {
          const FilePath = path.join(destination, FileName);
          if (existsSync(FilePath)) {
            try {
              await unlinkSync(FilePath);
            } catch (err) {
              console.error("Error deleting the file:", err);
            }
          }
          const Update = await IsExist.update({
            cover: opt,
          });
          return res.send(IsExist);
        }
        if (opt) {
          const Update = await IsExist.update({
            cover: opt,
          });

          return res.send(IsExist);
        }
        throw errorCreate(406, "file Not Uploaded");
      } catch (error) {
        const { file } = req;
        const opt = file?.path || null;
        if (opt) {
          try {
            await unlinkSync(opt + ".webp");
          } catch (unlinkError) {
            console.error("Error deleting file:", unlinkError);
          }
        }
        console.log("🚀 ~ UpdateCover ~ error:", error);
        next(error);
      }
    },
    async UpdateDescription(req, res, next) {
      try {
        const { body } = req;
      } catch (error) {
        next(error);
      }
    },
  },
};
