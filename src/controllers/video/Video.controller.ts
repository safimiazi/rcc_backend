import { db } from "@/database";

export const VideoController = {
  async CreateVideo(req, res, next) {
    try {
      const NewVideo = await db.Video.create(req.body);
      res.send(NewVideo);
    } catch (error) {
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
        data: deleteVideo
      });
    } catch (error) {
      next(error);
    }
  }
};
