import { db } from "@/database";
import { errorCreate } from "@/middleware/errorHandler";
import { existsSync, unlinkSync } from "fs";
import path from "path";

export const VideoController = {
  async CreateVideo(req, res, next) {
    try {
      const { file } = req;
      console.log("🚀 ~ CreateVideo ~ file:", file);
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
      const { file } = req;
      const opt = file ? file.opt : null;

      const videoData = await db.Video.findOne({
        where: {
          id: req.body.id,
        },
      });

      if (!videoData) {
        const path_file = file ? file.path : null;
        if (path_file) {
          await unlinkSync(path_file + ".webp");
        }
        throw errorCreate(404, "Video not found !");
      }

      const update = await videoData.update({
        ...JSON.parse(req.body.data),
        thumbnail: opt,
      });

      const destination = file ? file.destination : null;
      const thumbnailPath = destination
        ? path.join(destination, videoData.toJSON().thumbnail)
        : null;

      if (thumbnailPath && existsSync(thumbnailPath)) {
        try {
          await unlinkSync(thumbnailPath);
        } catch (err) {
          console.error("Error deleting the file:", err);
        }
      }

      res.send({
        update: update,
      });
    } catch (error) {
      // if any error occurs then delete uploaded file
      const { file } = req;
      const path_file = file ? file.path : null;
      if (path_file) {
        await unlinkSync(path_file + ".webp");
      }
      next(error);
    }
  },
  async DeleteVideoData(req, res, next) {
    try {
      const VideoData = await db.Video.findOne({
        where: {
          id: req.body.id,
        },
      });

      if (!VideoData) {
        throw errorCreate(404, "Video not found");
      }

      const destination = path.join(
        __dirname,
        "..",
        "..",
        "public/media/thumbnail"
      );

      const thumbnailPath = destination
        ? path.join(destination, VideoData.toJSON().thumbnail)
        : null;

      if (thumbnailPath && existsSync(thumbnailPath)) {
        try {
          await unlinkSync(thumbnailPath);
        } catch (err) {
          console.error("Error deleting the file:", err);
        }
      }

      const deleteVideo = await VideoData.destroy();

      res.send({
        success: true,
        data: deleteVideo,
      });
    } catch (error) {
      next(error);
    }
  },
};
