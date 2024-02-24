import { v2 } from "cloudinary";
import { env } from "./config.js";
import { Request, Response } from "express";

export const cloudinary = v2;

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export function deleteByUrl() {}

export const cdn = {
  uploadMiddleware(req: Request, res: Response) {
    const fileStream = cloudinary.uploader.upload_stream(
      {},
      function (err, image) {
        if (err) {
          res.status(500).send(JSON.stringify(err));
          return;
        }
        if (!image) return;
        res.send(image.secure_url);
      }
    );
    req.pipe(fileStream);
  },
  deleteByUrl(url: string) {
    return cloudinary.uploader
      .destroy(url.split("/").at(-1)!.split(".")[0]!, { invalidate: true })
      .then(console.log);
  },
} as const;
