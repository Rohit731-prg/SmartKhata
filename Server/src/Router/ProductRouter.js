import express from "express";
import { addNewProduct, getAllProducts } from "../Controller/ProductController.js";
import { verifyJwt } from "../Middleware/JWT.js";

const router = express.Router();

router.post("/add-product", addNewProduct);
router.get("/get-all-product", getAllProducts);

export default router;