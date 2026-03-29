import express from "express";
import "dotenv/config";
import { connectDB } from "./Config/ConnectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import CustomerRouter from "./Router/CustomerRouter.js";
import AdminRouter from "./Router/AdminRouter.js";

const app = express();
const port = process.env.PORT || 4000

app.use(cors());
app.use(express.json({
    limit: "1mb"
}));
app.use(cookieParser());

app.use("/api/customer", CustomerRouter);
app.use("/api/admin", AdminRouter);

await connectDB();
app.listen(port, () => {
    console.log("Port no : ", port);
});