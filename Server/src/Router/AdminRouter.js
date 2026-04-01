import express from "express";
import { createAdmin, loginController } from "../Controller/AdminController.js";
import { upload, uploadImage } from "../Middleware/multer.js";

const router = express.Router();

router.post("/createAdmin", upload.single('image'), uploadImage, createAdmin);
router.post("/login", loginController);

export default router;