import express from "express";
import { UploaderController } from "./uploader.controller";
import { upload } from "./uploader.utils";

const router = express.Router();

router.post("/upload", upload.array("files", 5), UploaderController.uploadFiles);

export const UploaderRoutes = router;
