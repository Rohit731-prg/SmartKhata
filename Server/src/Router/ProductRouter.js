import express from "express";
import { 
    addNewProduct, deleteProduct, getAllProducts, getLowQuantityProducts, updateProduct
} from "../Controller/ProductController.js";
import { verifyJwt } from "../Middleware/JWT.js";

const router = express.Router();

router.post("/add-product", verifyJwt, addNewProduct);
router.get("/get-all-product", verifyJwt, getAllProducts);
router.get("/get-low-stock-product", verifyJwt, getLowQuantityProducts);

router.put("/update-product", verifyJwt, updateProduct);
router.delete("/delete-product/:id", verifyJwt, deleteProduct);

export default router;