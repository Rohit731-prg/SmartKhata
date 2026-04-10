import express from "express";
import { createAdmin, getAllBasicDetails, loginController } from "../Controller/AdminController.js";
import { upload, uploadImage } from "../Middleware/multer.js";
import { verifyJwt } from "../Middleware/JWT.js";

const router = express.Router();

router.post("/createAdmin", upload.single('image'), uploadImage, createAdmin);
router.post("/login", loginController);
router.get("/basicDetails", verifyJwt, getAllBasicDetails);

export default router;