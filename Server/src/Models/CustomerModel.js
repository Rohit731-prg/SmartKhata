import mongoose, { Schema } from "mongoose";

const CustomerSchema = new Schema({
    name: { type: String, require: true },
    phone: { type: String, require: true },
    address: { type: String, require: true },
    debit: { type: Number, default: 0 },
    credit: { type: Number, default: 0 },
    // shop: { type: Schema.Types.ObjectId, require: true}
    shop: { type: String }
}, {
    timestamps: true
});

const Customer = mongoose.model("Customer", CustomerSchema);
export default Customer;