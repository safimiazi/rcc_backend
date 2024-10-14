import { db } from "@/database";

export const SermonsController = {
  async CreateSermons(req, res, next) {
    try {
      const NewSermons = await db.Sermons.create(req.body);
      res.send(NewSermons);
    } catch (error) {
      next(error);
    }
  },
  async GetSermonsDataAdmin(req, res, next) {
    try {
      const Sermons = await db.Sermons.findAll({
        order: [["createdAt", "DESC"]],
      });
      res.send(Sermons);
    } catch (error) {
      next(error);
    }
  },
  async GetSermonsData(req, res, next) {
    try {
      const Sermons = await db.Sermons.findAll({
        order: [["createdAt", "DESC"]],
        where: {
          status: "active",
        },
      });
      res.send(Sermons);
    } catch (error) {
      next(error);
    }
  },
  async UpdateSermonsData(req, res, next) {
    try {
      const update = await db.Sermons.update(
        {
          ...req.body.data,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      );

      res.send(update);
    } catch (error) {
      next(error);
    }
  },
  async DeleteSermonsData(req, res, next) {
    try {
      const deleteSermons = await db.Sermons.destroy({
        where: {
          id: req.body.id,
        },
      });

      res.send({
        success: true,
        data: deleteSermons,
      });
    } catch (error) {
      next(error);
    }
  },
};
