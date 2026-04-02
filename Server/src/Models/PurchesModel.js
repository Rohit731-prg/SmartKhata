import mongoose, { Schema } from "mongoose";

const PurchesSchema = new Schema({
    product: { type: [{product: mongoose.Schema.Types.ObjectId, quantity: Number}], ref: "Product", required: true },
    Admin: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
    Customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    total_amount: { type: Number, required: true },
}, {
    timestamps: true
});

const Purches = mongoose.model("Purches", PurchesSchema);
export default Purches;