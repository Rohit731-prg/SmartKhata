import Product from "../Models/ProductModel.js";

export const addNewProduct = async (req, res) => {
    const { product_name, price, quantity_available, type } = req.body;
    console.log(req.body);
    if (!product_name || !price || !quantity_available || !type) return res.status(400).json({ message: "All details are require" });
    if (!["KG", "pice"].includes(type)) return res.status(400).json({ message: "product type must be in KG or Pice" });
    if (price <= 0) return res.status(400).json({ message: "Price should be in possitive number" });
    try {
        const is_exist = await Product.findOne({ product_name, shop: "69c8c68f1600b0b6193c9a5c" });
        if (is_exist) return res.status(400).json({ message: "Product is already exist" });

        const newProduct = new Product({
            product_name, price, quantity_available, type, shop: "69c8c68f1600b0b6193c9a5c"
        });
        newProduct.save();

        return res.status(201).json({ message: "New Product added successfully "});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const addPrice = async (req, res) => {
    const { id, newPrice} = req.body;
    if (!id || !newPrice) return res.status(400).json({ message: "id and price is require" });
    if (newPrice <= 0) return res.status(400).json({ message: "price should be a possitive number" });

    try {
        const product = await Product.findById(id);
        if (!product) return res.status(400).json({ message: "product does not found" });

        await Product.updateOne({ _id: id}, {$set: { price: newPrice }});
        return res.status(200).json({ message: "product price updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({ shop: "69c8c68f1600b0b6193c9a5c" });
        if (!products) return res.status(400).json({ message: "No products found on this request" });

        return res.status(200).json({ products });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}