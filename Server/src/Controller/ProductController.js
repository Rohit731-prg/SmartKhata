import Product from "../Models/ProductModel.js";

export const addNewProduct = async (req, res) => {
    const { product_name, price, quantity_available, type } = req.body;
    if (!product_name || !price || !quantity_available || !type) return res.status(400).json({ message: "All details are require" });
    if (!["KG", "pice"].includes(type)) return res.status(400).json({ message: "product type must be in KG or Pice" });
    if (price <= 0) return res.status(400).json({ message: "Price should be in possitive number" });
    try {
        const is_exist = await Product.findOne({ product_name, shop });
        if (is_exist) return res.status(400).json({ message: "Product is already exist" });

        const newProduct = new Product({
            product_name, price, quantity_available, type, shop: req.admin
        });
        newProduct.save();

        return res.status(201).json({ message: "New Product added successfully "});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// export const addQuantity = async (req, res) => {
//     const { }
// }