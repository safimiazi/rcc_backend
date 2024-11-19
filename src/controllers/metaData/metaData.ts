import { db } from "@/database";

export const MetaDataController = {
  async getPageCount(req, res, next) {
    try {
      console.log("hi");

      const c_event = await db.Event.count();
      const c_sermons = await db.Sermons.count();
      const c_video = await db.Video.count();
      const c_user = await db.Admin.count();

      res.status(200).json({
        eventCount: c_event,
        sermonsCount: c_sermons,
        videoCount: c_video,
        userCount: c_user,
      });
    } catch (error) {
      next(error);
    }
  },
};
