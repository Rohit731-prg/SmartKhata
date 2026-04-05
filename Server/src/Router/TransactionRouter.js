import express from "express";
import { getAllTransactions, updateDebitCustomer } from "../Controller/TransactionController.js";
import { verifyJwt } from "../Middleware/JWT.js";

const router = express.Router();

router.post("/add_transaction", verifyJwt, updateDebitCustomer);
router.get("/get_all_transactions", verifyJwt, getAllTransactions);

export default router;