import { db } from "@/database";
import { errorCreate } from "@/middleware/errorHandler";
import { EventService } from "@/service/Event/Event.service";
import { existsSync, unlinkSync } from "fs";
import path from "path";
const destination = path.join(__dirname, "..", "..", "public/media/event");

export const EventController = {
  async CreateEvent(req, res, next) {
    try {
      const { file } = req;
      const opt = file?.opt || null;

      let parsedData;
      let parsedFaqs;

      try {
        parsedData = JSON.parse(req.body.data);
        parsedFaqs = parsedData.faqs ? JSON.parse(parsedData.faqs) : [];
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

      next(error);
    }
  },

  async ChangeCoverPhoto(req, res, next) {
    try {
      const { file } = req;
      const opt = file?.opt || null;

      const GetTheExistingCoverPhoto = await db.Event.findOne({
        where: {
          id: req.body.id,
        },
      });

      if (!GetTheExistingCoverPhoto) {
        throw errorCreate(404, "Event not found in database");
      }

      const FileName = GetTheExistingCoverPhoto.toJSON().event_image;

      if (FileName) {
        const FilePath = path.join(destination, FileName);
        if (existsSync(FilePath)) {
          try {
            await unlinkSync(FilePath);
          } catch (err) {
            console.error("Error deleting the file:", err);
          }
        }
      }

      // update the database

      const updateRes = await GetTheExistingCoverPhoto.update({
        event_image: opt,
      });

      res.send(updateRes);
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
  async add_archive_image(req, res, next) {
    try {
      const { files, body } = req;
      const EventData = await db.Event.findOne({
        where: {
          id: body.id,
        },
      });

      if (!EventData) {
        errorCreate(404, "Event not found");
      }
      const oldData = EventData.toJSON().archive_images as unknown as string[];
      const NewFile = files.length ? files.map((file) => file.opt) : [];
      const UpdatedFile = [...oldData, ...NewFile];
      const Update = await EventData.update({
        archive_images: UpdatedFile,
      });

      res.send({
        Update,
        UpdatedFile,
      });
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
  // get all event active
  async get_all_event_public_with_date(req, res, next) {
    try {
      const events = await EventService.GetAllActivePublicWithDate();
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

      // const destination = path.join(
      //   __dirname,
      //   "..",
      //   "..",
      //   "public/media/event"
      // );

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

  async UpdateEventById(req, res, next) {
    try {
      const body = req.body;
      const UpdateEvent = await db.Event.update(body, {
        where: {
          id: body.id,
        },
      });
      res.send(UpdateEvent);
    } catch (error) {
      next(error);
    }
  },

  async DeleteArchiveImage(req, res, next) {
    try {
      const { id, fileName } = req.body;
      const EventInDb = await db.Event.findOne({
        where: {
          id: req.body.id,
        },
      });

      if (!EventInDb) {
        throw errorCreate(404, "Event not found in database");
      }

      //delete images from file

      if (fileName) {
        const FilePath = path.join(destination, fileName);
        if (existsSync(FilePath)) {
          try {
            await unlinkSync(FilePath);
          } catch (err) {
            console.error("Error deleting the file:", err);
          }
        }
      }

      // update the database
      const OldArray: string[] = EventInDb.toJSON()
        .archive_images as unknown as string[];
      const NewArray = OldArray.filter((e) => e !== fileName);

      await EventInDb.update({
        archive_images: NewArray,
      });

      res.send({
        update: true,
        new_archive: NewArray,
      });
    } catch (error) {
      next(error);
    }
  },
};
