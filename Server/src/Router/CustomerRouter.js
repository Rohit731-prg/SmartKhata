import express from "express";
import { verifyJwt } from "../Middleware/JWT.js";
import { createCustomer, getAllCustomers, getDebitors } from "../Controller/CustomerController.js";

const router = express.Router();

router.post("/createCustomer", verifyJwt, createCustomer);
router.get("/getAllCustomers", verifyJwt, getAllCustomers);
router.get("/getDebitors", verifyJwt, getDebitors);

export default router;