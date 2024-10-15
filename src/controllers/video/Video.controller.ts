import { db } from "@/database";
import { unlinkSync } from "fs";

export const VideoController = {
  async CreateVideo(req, res, next) {
    try {
      const { file } = req;
      console.log("🚀 ~ CreateVideo ~ file:", file)
      const opt = file ? file.opt : null;
      const NewVideo = await db.Video.create({
        ...JSON.parse(req.body.data),
        thumbnail: opt || null,
      });

      res.send(NewVideo);
    } catch (error) {
      // if any error occurs then delete uploaded file
      const { file } = req;
      const path = file ? file.path : null;
      if (path) {
        await unlinkSync(path + ".webp");
      }
      next(error);
    }
  },
  async GetVideoDataAdmin(req, res, next) {
    try {
      const Videos = await db.Video.findAll({
        order: [["createdAt", "DESC"]],
      });
      res.send(Videos);
    } catch (error) {
      next(error);
    }
  },
  async GetVideoData(req, res, next) {
    try {
      const Videos = await db.Video.findAll({
        order: [["createdAt", "DESC"]],
        where: {
          status: "active",
        },
      });
      res.send(Videos);
    } catch (error) {
      next(error);
    }
  },
  async UpdateVideoData(req, res, next) {
    try {
      const update = await db.Video.update(
        {
          ...req.body.data,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      );

      res.send(update);
    } catch (error) {
      next(error);
    }
  },
  async DeleteVideoData(req, res, next) {
    try {
      const deleteVideo = await db.Video.destroy({
        where: {
          id: req.body.id,
        },
      });

      res.send({
        success: true,
        data: deleteVideo,
      });
    } catch (error) {
      next(error);
    }
  },
};
