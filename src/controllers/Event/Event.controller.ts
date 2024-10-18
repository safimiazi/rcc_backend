import { db } from "@/database";
import { errorCreate } from "@/middleware/errorHandler";
import { EventService } from "@/service/Event/Event.service";
import { existsSync, unlinkSync } from "fs";
import path from "path";

export const EventController = {
  async CreateEvent(req, res, next) {
    try {
      const { file } = req;
      const opt = file?.opt || null;

      let parsedData;
      let parsedFaqs;

      try {
        parsedData = JSON.parse(req.body.data);
        parsedFaqs = req.body.faqs ? JSON.parse(req.body.faqs) : [];
      } catch (parseError) {
        return next(errorCreate(400, "Invalid JSON in request body"));
      }

      const Payload = {
        ...parsedData,
        event_image: opt || "no",
        event_img: opt || "no",
        faqs: parsedFaqs,
      };

      const NewEvent = await EventService.CreateEvent(Payload);
      res.send(NewEvent);
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
      console.log("🚀 ~ CreateEvent ~ error:", error);
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
      const DAta = files.length ? files.map((file) => file.opt) : [];

      const Update = await Event.update({
        archive_images: DAta,
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
      const Event = await EventService.GetEventByEventId(req.params.id);
      res.send(Event);
    } catch (error) {
      next(error);
    }
  },

  async EventDelete(req, res, next) {
    try {
      const { id } = req.body;

      const EventData = await db.Event.findOne({
        where: { id: id },
      });

      if (!EventData) {
        throw errorCreate(404, "Event not found !");
      }

      const destination = path.join(
        __dirname,
        "..",
        "..",
        "public/media/event"
      );

      if (EventData.toJSON().event_image) {
        const event_imagePath = destination
          ? path.join(destination, EventData.toJSON().event_image)
          : null;

        if (event_imagePath && existsSync(event_imagePath)) {
          try {
            await unlinkSync(event_imagePath);
          } catch (err) {
            console.error("Error deleting the file:", err);
          }
        }
      }
      // @ts-expect-error skip
      if (EventData.toJSON().archive_images?.length) {
        // @ts-expect-error skip
        EventData.toJSON().archive_images?.forEach(async (img) => {
          const event_imageAcPath = destination
            ? path.join(destination, img)
            : null;
          if (event_imageAcPath && existsSync(event_imageAcPath)) {
            try {
              await unlinkSync(event_imageAcPath);
            } catch (err) {
              console.error("Error deleting the file:", err);
            }
          }
        });
      }

      const DeleteData = await EventData.destroy();

      res.send({
        status_operations: "deleted",
        response: DeleteData,
      });
    } catch (error) {
      console.log("🚀 ~ EventDelete ~ error:", error);
      next(error);
    }
  },
};
