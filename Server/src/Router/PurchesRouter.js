import express from "express";
import { createPurchers, getAllPurches, getPurchesDetails } from "../Controller/PurchersController.js";
import { verifyJwt } from "../Middleware/JWT.js";

const router = express.Router();

router.post("/add_purches", verifyJwt, createPurchers);
router.get("/get_all_purches/:id", verifyJwt, getAllPurches);
router.get("/getPurchesDetails/:id", verifyJwt, getPurchesDetails);

export default router;