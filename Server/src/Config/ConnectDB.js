import mongoose from "mongoose";

export const connectDB = async () => {
    console.log("🔵 Starting MongoDB connection...");
    console.log("🔵 DB_URL exists:", !!process.env.DB_URL);

    try {
        const connection = await mongoose.connect(process.env.DB_URL);

        console.log("🟢 MongoDB Connected!");
        console.log("🟢 Host:", connection.connection.host);
    } catch (error) {
        console.log("🔴 MongoDB connection FAILED");
        console.log(error);
    }
};