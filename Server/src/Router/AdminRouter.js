import express from "express";
import { verifyJwt } from "../Middleware/JWT.js";
import { createAdmin } from "../Controller/AdminController.js";
import { upload, uploadImage } from "../Middleware/multer.js";

const router = express.Router();

router.post("/createAdmin", upload.single('image'), uploadImage, createAdmin);

export default router;