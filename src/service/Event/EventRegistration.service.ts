import { db } from "@/database";
import { EventUserI } from "@/database/model/EventUser";
import { errorCreate } from "@/middleware/errorHandler";
import { createPayPalPayment } from "@/paypal";

const EventRegistrationService = {
  createEventUser: async (data: EventUserI) => {
    const Event = await db.Event.findByPk(data.event_id);
    if (!Event) {
      throw errorCreate(404, "Event not found");
    }
    if (Event.toJSON().entrance === "free") {
      const eventUser = await db.EventUser.create({
        ...data,
        payment_status: "paid",
      });
      return eventUser;
    }
    if (Event.toJSON().entrance === "paid") {
      const payment = await createPayPalPayment({
        itemName: "Event Registration fee",
        sku: "001",
        price: Number(Event.toJSON().fee),
        currency: Event.toJSON().currency,
        quantity: 1,
        description: "Event Registration fee : " + Event.toJSON().event_name,
      });
      const eventUser = await db.EventUser.create({
        ...data,
        payment_status: "pending",
        payment_id: payment.paymentId,
      });
      return {
        url: payment.url,
        eventUser: eventUser,
      };
    }
  },
};

export default EventRegistrationService;
