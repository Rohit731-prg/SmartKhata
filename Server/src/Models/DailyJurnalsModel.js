import mongoose, { Schema } from "mongoose"

const DailyJurnalSchema = new Schema({
    admin: { type: Schema.Types.ObjectId, require: true },
    products: { type: [{product: mongoose.Schema.Types.ObjectId, quantity: Number}], ref: "Product", required: true },
    total_amout: { type: Number, requre: true }
}, {
    timestamps: true
});

const DailyJournal = mongoose.model("DailyJournals", DailyJurnalSchema);
export default DailyJournal