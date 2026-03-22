import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
    
}, {
    timestamps: true
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;