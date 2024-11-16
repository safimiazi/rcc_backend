import { db } from "@/database";
import { errorCreate } from "@/middleware/errorHandler";
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
      const data = JSON.parse(body?.data);
      const current = await db.AboutPage.findOne();
      if (!current) {
        const newData = await db.AboutPage.create({
          our_mission_pic: opt,
          our_mission: data.our_mission,
          our_value: data?.our_value,
        });
        return res.send(newData);
      }
      // check if the old photo is exist or not
      const FileName = current.toJSON().our_mission_pic;
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
          our_mission: data.our_mission,
          our_value: data?.our_value,
        });
      } else {
        await current.update({
          our_mission: data.our_mission,
          our_value: data?.our_value,
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
      const data = JSON.parse(body?.data);
      const current = await db.AboutPage.findOne();
      if (!current) {
        const newData = await db.AboutPage.create({
          our_roots_pic: opt,
          our_roots: data.our_roots,
        });
        return res.send(newData);
      }
      // check if the old photo is exist or not
      const FileName = current.toJSON().our_roots_pic;
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
          our_roots: data.our_roots,
        });
      } else {
        await current.update({
          our_roots: data.our_roots,
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
  async CreateAboutSeniorPastors(req, res, next) {
    try {
      const { body, file } = req;
      const opt = file?.opt || null;
      const NewPastors = await db.AboutSeniorPastors.create({
        des: body.des,
        facebook: body.facebook,
        instagram: body.instagram,
        name: body.name,
        photo: opt,
        x: body.x,
        youtube: body.youtube,
      });
      res.send(NewPastors);
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
  async UpdateAboutSeniorPastors(req, res, next) {
    try {
      const { body, file } = req;
      const opt = file?.opt || null;
      const current = await db.AboutSeniorPastors.findOne({
        where: {
          id: req.body.id,
        },
      });

      if (!current) {
        throw errorCreate(404, "Data not found");
      }

      const FileName = current.toJSON().photo;

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

      const NewPastors = await current.update({
        des: body.des,
        facebook: body.facebook,
        instagram: body.instagram,
        name: body.name,
        photo: opt,
        x: body.x,
        youtube: body.youtube,
      });
      res.send(NewPastors);
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
  async DeleteAboutSeniorPastors(req, res, next) {
    try {
      const { body, file } = req;
      const opt = file?.opt || null;
      const current = await db.AboutSeniorPastors.findOne({
        where: {
          id: req.body.id,
        },
      });

      if (!current) {
        throw errorCreate(404, "Data not found");
      }

      const FileName = current.toJSON().photo;

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

      const NewPastors = await current.destroy();
      res.send({ NewPastors });
    } catch (error) {
      next(error);
    }
  },
  async CreateAboutMinisterial(req, res, next) {
    try {
      const { body, file } = req;
      const opt = file?.opt || null;
      const NewPastors = await db.AboutMinisterial.create({
        designation: body.designation,
        facebook: body.facebook,
        instagram: body.instagram,
        name: body.name,
        photo: opt,
        x: body.x,
        youtube: body.youtube,
      });
      res.send(NewPastors);
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
  async UpdateAboutMinisterial(req, res, next) {
    try {
      const { body, file } = req;
      const opt = file?.opt || null;
      const current = await db.AboutMinisterial.findOne({
        where: {
          id: req.body.id,
        },
      });

      if (!current) {
        throw errorCreate(404, "Data not found");
      }

      const FileName = current.toJSON().photo;

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

      const NewPastors = await current.update({
        designation: body.designation,
        facebook: body.facebook,
        instagram: body.instagram,
        name: body.name,
        photo: opt,
        x: body.x,
        youtube: body.youtube,
      });
      res.send(NewPastors);
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
  async DeleteAboutMinisterial(req, res, next) {
    try {
      const { body, file } = req;
      const opt = file?.opt || null;
      const current = await db.AboutMinisterial.findOne({
        where: {
          id: req.body.id,
        },
      });

      if (!current) {
        throw errorCreate(404, "Data not found");
      }

      const FileName = current.toJSON().photo;

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

      const NewPastors = await current.destroy();
      res.send({ NewPastors });
    } catch (error) {
      next(error);
    }
  },
  async UpdateCoverPhoto(req, res, next) {
    try {
      const { body, file } = req;
      const opt = file?.opt || null;
      let CoverData = await db.AboutCover.findOne();

      if (!CoverData) {
        CoverData = await db.AboutCover.create({
          ministerial_team: null,
          contact_us: null,
          our_senior_pastors: null,
          our_values: null,
        });
      }

      if (body.name === "ministerial_team") {
        if (CoverData.toJSON().ministerial_team) {
          const FileName = CoverData.toJSON().ministerial_team;
          await DeleteFile(FileName, opt);
        }
        await CoverData.update({
          ministerial_team: opt,
        });
        return res.send(CoverData);
      }

      if (body.name === "contact_us") {
        if (CoverData.toJSON().contact_us) {
          const FileName = CoverData.toJSON().contact_us;
          await DeleteFile(FileName, opt);
        }
        await CoverData.update({
          contact_us: opt,
        });
        return res.send(CoverData);
      }

      if (body.name === "our_senior_pastors") {
        if (CoverData.toJSON().our_senior_pastors) {
          const FileName = CoverData.toJSON().our_senior_pastors;
          await DeleteFile(FileName, opt);
        }
        await CoverData.update({
          our_senior_pastors: opt,
        });
        return res.send(CoverData);
      }

      if (body.name === "our_values") {
        if (CoverData.toJSON().our_values) {
          const FileName = CoverData.toJSON().our_values;
          await DeleteFile(FileName, opt);
        }
        await CoverData.update({
          our_values: opt,
        });
        return res.send(CoverData);
      }
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

const DeleteFile = async (FileName, opt) => {
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
};
