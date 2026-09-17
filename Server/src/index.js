import express from "express";
import "dotenv/config";
import { connectDB } from "./Config/ConnectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import CustomerRouter from "./Router/CustomerRouter.js";
import AdminRouter from "./Router/AdminRouter.js";
import ProductRouter from "./Router/ProductRouter.js";
import PurchesRouter from "./Router/PurchesRouter.js";
import TransactionRouter from "./Router/TransactionRouter.js";
import JournalRouter from "./Router/JounalRouter.js";

const app = express();
const port = process.env.PORT || 4000

app.use(cors({
    origin: [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    credentials: true,
}));

app.use((req, res, next) => {
    console.log("Request origin:", req.headers.origin);
    next();
});

app.use(express.json({
    limit: "1mb"
}));
app.use(cookieParser());

app.use("/api/customer", CustomerRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/product", ProductRouter);
app.use("/api/purches", PurchesRouter);
app.use("/api/transactions", TransactionRouter);
app.use("/api/journal", JournalRouter);

await connectDB();
app.listen(port, "0.0.0.0", () => {
    console.log("Port no : ", port);
});