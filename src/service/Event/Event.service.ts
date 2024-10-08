import { db } from "@/database";

export const EventService = {
  async CreateEvent(data) {
    return await db.Event.create(data);
  },
};
