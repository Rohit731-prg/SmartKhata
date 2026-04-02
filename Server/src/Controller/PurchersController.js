import Customer from "../Models/CustomerModel.js";
import Product from "../Models/ProductModel.js";
import Purches from "../Models/PurchesModel.js";

export const createPurchers = async (req, res) => {
    const { products, customer, total_amount } = req.body;
    if (!products || !customer || total_amount === undefined) return res.status(400).json({ message: "All fields are required" });
    if (products.length === 0) return res.status(400).json({ message: "Products are required" });
    
    try {
        const custoer_exist = await Customer.findById(customer);
        if (!custoer_exist) return res.status(404).json({ message: "Customer not found" });

        let total_amout_calculated = 0;
        for (const product of products) {
            let product_details = await Product.findById(product.product);
            if (!product_details) return res.status(404).json({ message: `Product with id ${product.product} not found` });
            if (product_details.quantity < product.quantity) return res.status(400).json({ message: `Not enough quantity for product with id ${product.product.name}` });
            await Product.findByIdAndUpdate(product.product, { $inc: { quantity: -product.quantity } });
            total_amout_calculated += product_details.price * product.quantity;
        }

        const newPurches = new Purches({
            product: products,
            Admin: req.admin,
            Customer: customer,
            total_amount: total_amout_calculated
        });
        await newPurches.save();

        res.status(201).json({ message: "Purches created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllPurches = async (req, res) => {
    try {
        const purches = await Purches.find().populate("product", "name price");
        if (purches.length === 0) return res.status(404).json({ message: "No purches found" });
        res.status(200).json({ purches });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};