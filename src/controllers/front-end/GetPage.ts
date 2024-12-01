import { db } from "@/database";

export const GetPageDataController = {
  async getPageData(req, res, next) {
    try {
      const page = req.params.page;

      if (page === "home") {
        const data = await db.HomePage.findOne();
        return res.send(data);
      } else if (page === "about_JHS") {
        // ... handle the condition
        const data = await db.AboutPage.findOne();
        return res.send(data);
      } else if (page === "our_senior_pastor") {
        // ... handle the condition
        const data = await db.AboutSeniorPastors.findAll({
          order: [["createdAt", "ASC"]], // Change 'ASC' to 'DESC' for descending order
        });
        return res.send(data);
      } else if (page === "ministerial_team") {
        // ... handle the condition
        const data = await db.AboutMinisterial.findAll({
          order: [["createdAt", "ASC"]], // Change 'ASC' to 'DESC' for descending order
        });
        return res.send(data);
        // about cover page route
      } else if (page === "about_cover") {
        const data = await db.AboutCover.findOne();
        return res.send(data);
      } else if (page === "children_ministry") {
        const data = await db.ChildrenMinistry.findOne();
        return res.send(data);
      } else if (page === "builder_ministry") {
        const data = await db.BuilderMinistry.findOne();
        return res.send(data);
      } else if (page === "men") {
        const data = await db.ValourMinistry.findOne({
          where: {
            type: "men",
          },
          include: [
            {
              model: db.ValourC_Ministry,
            },
          ],
        });
        console.log(data);
        return res.send(data);
      } else if (page === "women") {
        const data = await db.ValourMinistry.findOne({
          where: {
            type: "women",
          },
          include: [
            {
              model: db.ValourC_Ministry,
            },
          ],
        });
        return res.send(data);
      }
    } catch (error) {
      next(error);
    }
  },
};
