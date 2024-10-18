import { db } from "@/database";

export const EventService = {
  async CreateEvent(data) {
    return await db.Event.create(data);
  },
  async GetAllActivePublic() {
    try {
      return await db.Event.findAll({
        where: {
          status: "active",
        },
      });
    } catch (error) {
      throw error;
    }
  },
  async GetAllEventAdmin() {
    try {
      return await db.Event.findAll({
        include: [
          {
            model: db.EventUser,
            as: "event_users",
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  },
  async GetEventByEventId(eventId) {
    try {
      const Event = await db.Event.findOne({
        where: {
          id: eventId,
        },
        include: [
          {
            model: db.EventUser,
            as: "event_users",
          },
        ],
      });
      return Event;
    } catch (error) {
      throw error;
    }
  },
};
