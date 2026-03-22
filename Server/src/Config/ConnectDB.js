import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log("Database Connected to: ", conn.connection.host);
    } catch (error) {
        console.error("Error from connect database: ", error.mongoose);
    }
}