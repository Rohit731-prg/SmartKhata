import e from "express";
import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
    product_name: { type: String, require: true },
    price: { type: Number, require: true },
    quantity_available: { type: Number, require: true },
    type: { type: String, enum: ["KG", "piece"], require: true },
    shop: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "Shop", required: true },
}, {
    timestamps: true
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;