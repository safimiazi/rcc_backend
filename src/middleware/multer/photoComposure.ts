import sharp from "sharp";
import fs from "fs";
import { Blob } from "buffer";

const photoComposure = (
  path: string
): {
  single: any;
  double: any;
} => {
  const single = async (req, res, next) => {
    try {
      const { file } = req;
      
      if (!file) {
        return next();
      }

      const { filename, path } = file;

      const readFile = fs.readFileSync(path);
      await sharp(readFile)
        .webp({ quality: 100 })
        .toFile(path + ".webp");
      req.file.opt = filename + ".webp";
      await fs.unlinkSync(path);
      next();
    } catch (error) {
      console.log("🚀 ~ photoComposure ~ error:", error);
      next();
    }
  };
  const double = async (req, res, next) => {
    const { files } = req;
    try {
      // console.log("🚀 ~ double ~ fileList:", files);
      if (!files || files.length === 0) {
        return next();
      }

      const data = files.map(async (file) => {
        const { filename, path } = file;
        const temp = file;
        const readFile = fs.readFileSync(path);

        await sharp(readFile)
          .webp({ quality: 100 })
          .toFile(path + ".webp");

        temp.opt = filename + ".webp";
        await fs.unlinkSync(path);
        return temp;
      });

      const fileData = await Promise.all(data);
      req.files = fileData;

      next();
    } catch (error) {
      const data = files.map(async (file) => {
        const { path } = file;
        await fs.unlinkSync(path);
      });
      req.files = [];
      next();
    }
  };
  return {
    single: single,
    double: double,
  };
};

export default photoComposure;
