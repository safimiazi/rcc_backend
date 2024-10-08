import { EventService } from "@/service/Event/Event.service";
import { unlinkSync } from "fs";

export const EventController = {
  async CreateEvent(req, res, next) {
    try {
      //upload the photo use multer
      const { file, user } = req;
      const opt = file ? file.opt : null;
      const Payload = {
        ...req.body,
        event_image: opt ? opt : "no",
      };
      const NewEvent = await EventService.CreateEvent(Payload);
      res.send(NewEvent);
    } catch (error) {
      // if any error occurs then delete uploaded file
      const { file } = req;
      const opt = file ? file.path : null;
      if (opt) {
        await unlinkSync(opt + ".webp");
      }
      next(error);
    }
  },
};
