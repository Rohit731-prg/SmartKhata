import express from "express";
import { verifyJwt } from "../Middleware/JWT.js";
import { createCustomer } from "../Controller/CustomerController.js";

const router = express.Router();

router.post("/createCustomer", verifyJwt, createCustomer);

export default router;