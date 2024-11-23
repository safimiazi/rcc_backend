import { db } from "@/database";
import { errorCreate } from "@/middleware/errorHandler";
import { existsSync, unlinkSync } from "fs";
import path from "path";
const destination = path.join(__dirname, "..", "..", "public/media/cover");

export const MinistryController = {
  children: {
    async UpdateCover(req, res, next) {
      try {
        const { file } = req;
        const opt = file?.opt || null;
        const IsExist = await db.ChildrenMinistry.findOne();
        if (!IsExist) {
          const NewData = await db.ChildrenMinistry.create({
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
    async UpdateChildren_ministry(req, res, next) {
      try {
        const { body } = req;
        const IsExist = await db.ChildrenMinistry.findOne();
        if (!IsExist) {
          const NewData = await db.ChildrenMinistry.create({
            children_ministry: body.children_ministry,
          });
          return res.send(NewData);
        }

        await IsExist.update({
          children_ministry: body.children_ministry,
        });

        res.send(IsExist);
      } catch (error) {
        console.log("🚀 ~ UpdateCover ~ error:", error);
        next(error);
      }
    },
    async UpdateTots_for_christ(req, res, next) {
      try {
        const { file, body } = req;
        const opt = file?.opt || null;
        const IsExist = await db.ChildrenMinistry.findOne();

        if (!IsExist) {
          const NewData = await db.ChildrenMinistry.create({
            tots_for_christ: body.tots_for_christ,
            tots_for_christ_cover: opt,
          });
          return res.send(NewData);
        }
        // if data is already exists then update it
        const FileName = IsExist.toJSON().tots_for_christ_cover;

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
            tots_for_christ: body.tots_for_christ,
            tots_for_christ_cover: opt,
          });
          return res.send(IsExist);
        }
        const Update = await IsExist.update({
          tots_for_christ: body.tots_for_christ,
        });

        return res.send(IsExist);
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
    async UpdateJunior(req, res, next) {
      try {
        const { file, body } = req;
        const opt = file?.opt || null;
        const IsExist = await db.ChildrenMinistry.findOne();

        if (!IsExist) {
          const NewData = await db.ChildrenMinistry.create({
            junior: body.junior,
            junior_cover: opt,
          });
          return res.send(NewData);
        }
        // if data is already exists then update it
        const FileName = IsExist.toJSON().junior_cover;

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
            junior: body.junior,
            junior_cover: opt,
          });
          return res.send(IsExist);
        }
        const Update = await IsExist.update({
          junior: body.junior,
        });

        return res.send(IsExist);
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
    async UpdateKids(req, res, next) {
      try {
        const { file, body } = req;
        const opt = file?.opt || null;
        const IsExist = await db.ChildrenMinistry.findOne();

        if (!IsExist) {
          const NewData = await db.ChildrenMinistry.create({
            kids: body.kids,
            kids_cover: opt,
          });
          return res.send(NewData);
        }
        // if data is already exists then update it
        const FileName = IsExist.toJSON().junior_cover;

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
            kids: body.kids,
            kids_cover: opt,
          });
          return res.send(IsExist);
        }
        const Update = await IsExist.update({
          kids: body.kids,
        });

        return res.send(IsExist);
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
    async UpdateTeens(req, res, next) {
      try {
        const { file, body } = req;
        const opt = file?.opt || null;
        const IsExist = await db.ChildrenMinistry.findOne();

        if (!IsExist) {
          const NewData = await db.ChildrenMinistry.create({
            teens: body.teens,
            teens_cover: opt,
          });
          return res.send(NewData);
        }
        // if data is already exists then update it
        const FileName = IsExist.toJSON().junior_cover;

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
            teens: body.teens,
            teens_cover: opt,
          });
          return res.send(IsExist);
        }
        const Update = await IsExist.update({
          teens: body.teens,
        });

        return res.send(IsExist);
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
    async UpdateTeenagers(req, res, next) {
      try {
        const { file, body } = req;
        const opt = file?.opt || null;
        const IsExist = await db.ChildrenMinistry.findOne();

        if (!IsExist) {
          const NewData = await db.ChildrenMinistry.create({
            teenagers: body.teenagers,
            teenagers_cover: opt,
          });
          return res.send(NewData);
        }
        // if data is already exists then update it
        const FileName = IsExist.toJSON().junior_cover;

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
            teenagers: body.teenagers,
            teenagers_cover: opt,
          });
          return res.send(IsExist);
        }
        const Update = await IsExist.update({
          teenagers: body.teenagers,
        });

        return res.send(IsExist);
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
    async UpdateGoals(req, res, next) {
      try {
        const { body } = req;
        const IsExist = await db.ChildrenMinistry.findOne();
        if (!IsExist) {
          const NewData = await db.ChildrenMinistry.create({
            goals: body.goals,
          });
          res.send(NewData);
        }
        await IsExist.update(body.goals);
        res.send(IsExist);
      } catch (error) {
        console.log("🚀 ~ UpdateGoals ~ error:", error);
        next(error);
      }
    },
  },
  // Builder page
  builder: {
    async UpdateBuilderPageCover(req, res, next) {
      try {
        const { file } = req;
        const opt = file?.opt || null;
        const IsExist = await db.BuilderMinistry.findOne();
        if (!IsExist) {
          const NewData = await db.BuilderMinistry.create({
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
    async UpdateBuilderPAgeData(req, res, next) {
      try {
        const { file, body } = req;
        const opt = file?.opt || null;
        const IsExist = await db.BuilderMinistry.findOne();

        if (!IsExist) {
          const NewData = await db.BuilderMinistry.create({
            photo: opt,
            description: body.description,
          });
          return res.send(NewData);
        }

        // if data is already exists then update it
        const FileName = IsExist.toJSON().photo;
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

        const Update = await IsExist.update({
          photo: opt,
          description: body.description,
        });
        return res.send(IsExist);
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
  },
  valour: {
    async UpdateMenCover(req, res, next) {
      try {
        const { file } = req;
        const opt = file?.opt || null;
        const IsExist = await db.ValourMinistry.findOne({
          where: {
            type: "men",
          },
        });

        if (!IsExist) {
          const NewData = await db.ValourMinistry.create({
            cover: opt,
            type: "men",
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
    async UpdateWomenCover(req, res, next) {
      try {
        const { file } = req;
        const opt = file?.opt || null;
        const IsExist = await db.ValourMinistry.findOne({
          where: {
            type: "women",
          },
        });

        if (!IsExist) {
          const NewData = await db.ValourMinistry.create({
            cover: opt,
            type: "women",
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

    async UpdateTitelDescription(req, res, next) {
      try {
        const { body } = req;
        const IsExist = await db.ValourMinistry.findOne({
          where: {
            type: body.type,
          },
        });

        if (!IsExist) {
          const NewData = await db.ValourMinistry.create({
            description: body.description,
            title: body.title,
            type: body.type,
          });
          return res.send(NewData);
        }

        const UpdateData = await IsExist.update({
          title: body.title,
          description: body.description,
        });

        res.send(IsExist);
      } catch (error) {
        next(error);
      }
    },
  },
};
