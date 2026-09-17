import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        console.log("DB_URL exists:", !!process.env.DB_URL);
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log("Database Connected to: ", conn.connection.host);
    } catch (error) {
        console.log("MongoDB connection failed:");
        console.log(error);
    }
}