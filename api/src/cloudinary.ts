import { v2 as cloudinary } from "cloudinary";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { env } from "./config.js";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export const cdn = {
  uploadMiddleware(req: Request, res: Response) {
    const fileStream = cloudinary.uploader.upload_stream({}, (err, image) => {
      if (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(JSON.stringify(err));
        return;
      }
      if (!image) return;
      res.send(image.secure_url);
    });
    req.pipe(fileStream);
  },
  async deleteByUrl(url: string) {
    return cloudinary.uploader.destroy(url.split("/").at(-1)!.split(".")[0]!, {
      invalidate: true,
    });
  },
} as const;
