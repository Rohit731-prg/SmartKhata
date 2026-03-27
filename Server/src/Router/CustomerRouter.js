import express from "express";
import { verifyJwt } from "../Middleware/JWT.js";
import { createCustomer, getAllCustomers } from "../Controller/CustomerController.js";

const router = express.Router();

router.post("/createCustomer", createCustomer);
router.get("/getAllCustomers", getAllCustomers);

export default router;