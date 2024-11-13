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
        const data = await db.AboutSeniorPastors.findAll();
        return res.send(data);
      }
    } catch (error) {
      next(error);
    }
  },
};
