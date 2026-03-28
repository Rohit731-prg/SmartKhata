import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
    product_name: { type: String, require: true },
    price: { type: Number, require: true },
    quantity_available: { type: Number, require: true },
    type: { type: String, require: true },
    shop: { type: String, require: true }
}, {
    timestamps: true
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;