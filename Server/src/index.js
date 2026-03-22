import express from "express";
import "dotenv/config";
import { connectDB } from "./Config/ConnectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
const port = process.env.PORT || 4200

app.use(cors({
    origin: "*",
    credentials: true
}))
app.use(express.json({
    limit: "1mb"
}));
app.use(cookieParser());

await connectDB();
app.listen(port, () => {
    console.log("Port no : ", port);
})