import express from "express";
import "dotenv/config";
import { connectDB } from "./Config/ConnectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import CustomerRouter from "./Router/CustomerRouter.js";
import AdminRouter from "./Router/AdminRouter.js";
import ProductRouter from "./Router/ProductRouter.js";
import PurchesRouter from "./Router/PurchesRouter.js";

const app = express();
const port = process.env.PORT || 4000

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json({
    limit: "1mb"
}));
app.use(cookieParser());

app.use("/api/customer", CustomerRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/product", ProductRouter);
app.use("/api/purches", PurchesRouter);

await connectDB();
app.listen(port, () => {
    console.log("Port no : ", port);
});