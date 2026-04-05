import mongoose, { Schema } from "mongoose";

const TransactionSchema = new Schema({
    customer: { type: mongoose.Types.ObjectId, ref: "Customer", required: true },
    admin: { type: mongoose.Types.ObjectId, ref: "Admin", required: true },
    amount: { type: Number, required: true },
}, {
    timestamps: true
});

const TransactionModel = mongoose.model("Transaction", TransactionSchema);
export default TransactionModel;