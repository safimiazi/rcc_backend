import { db } from "@/database";
import { EventUserI } from "@/database/model/EventUser";
import { errorCreate } from "@/middleware/errorHandler";

const EventRegistrationService = {
  createEventUser: async (data: EventUserI) => {
    const Event = await db.Event.findByPk(data.event_id);

    if (!Event) {
      throw errorCreate(404, "Event not found");
    }

    const eventUser = await db.EventUser.create(data);
    return eventUser;
  },
};
