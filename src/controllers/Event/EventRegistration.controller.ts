import EventRegistrationService from "@/service/Event/EventRegistration.service";

export const EventRegistration = {
  async EventRegistration(req, res, next) {
    try {
      const { body } = req;
      const newEvent = await EventRegistrationService.createEventUser(body);
      res.send(newEvent);
    } catch (error) {
      next(error);
    }
  },
};
