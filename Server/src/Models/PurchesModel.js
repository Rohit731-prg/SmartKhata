import mongoose, { Schema } from "mongoose";

const PurchesSchema = new Schema({
    product: String,
    Admin: String,
    Customer: String,
    
}, {
    timestamps: true
});

const Purches = mongoose.model("Purches", PurchesSchema);
export default Purches;