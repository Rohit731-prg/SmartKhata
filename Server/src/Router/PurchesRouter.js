import express from "express";
import { createPurchers } from "../Controller/PurchersController";

const router = express.Router();

router.post("/add_purches", createPurchers);
router.get("/get_all_purches", createPurchers);

export default router;