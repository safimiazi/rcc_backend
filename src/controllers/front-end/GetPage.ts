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
      }
    } catch (error) {
      next(error);
    }
  },
};
