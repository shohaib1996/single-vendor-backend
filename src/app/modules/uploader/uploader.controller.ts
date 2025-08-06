import { Request, Response, Express } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendImageToCloudinary } from "./uploader.utils";

const uploadFiles = catchAsync(async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  const imageUrls: string[] = [];

  if (!files || files.length === 0) {
    return res.status(400).json({
      success: false,
      message: "No files were uploaded.",
    });
  }

  for (const file of files) {
    try {
      const result = await sendImageToCloudinary(file.filename, file.path);
      imageUrls.push(result.secure_url as string);
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to upload image to Cloudinary",
      });
    }
  }

  res.status(200).json({
    success: true,
    message: "Files uploaded successfully",
    data: imageUrls,
  });
});

export const UploaderController = {
  uploadFiles,
};
