import { db } from "@/database";
import { EventService } from "@/service/Event/Event.service";
import { unlinkSync } from "fs";

export const EventController = {
  async CreateEvent(req, res, next) {
    try {
      //upload the photo use multer
      const { file } = req;
      const opt = file ? file.opt : null;
      
      const Payload = {
        ...JSON.parse(req.body.data),
        event_image: opt ? opt : "no",
        event_img: opt ? opt : "no",
      };

      console.log("🚀 ~ CreateEvent ~ Payload:", Payload)
      
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

  async update_archive_image(req, res, next) {
    try {
      const { files, body } = req;
      const Event = await db.Event.findOne({
        where: {
          id: body.id,
        },
      });

      const Update = await Event.update({
        archive_images: files,
      });

      res.send(Event);
    } catch (error) {
      next(error);
    }
  },
  // get all event active
  async GetAllActiveEvents(req, res, next) {
    try {
      const events = await EventService.GetAllActivePublic();
      res.send(events);
    } catch (error) {
      next(error);
    }
  },
  // get all events
  async getAllEvents(req, res, next) {
    try {
      const events = await EventService.GetAllEventAdmin();
      res.send(events);
    } catch (error) {
      next(error);
    }
  },

  // get event by id
  async getEventById(req, res, next) {
    try {
      const Event = await EventService.GetEventByEventId(req.query.id);
      res.send(Event);
    } catch (error) {
      next(error);
    }
  },
};
