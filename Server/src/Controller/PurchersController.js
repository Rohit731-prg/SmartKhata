import Customer from "../Models/CustomerModel.js";
import Product from "../Models/ProductModel.js";
import Purches from "../Models/PurchesModel.js";

export const createPurchers = async (req, res) => {
    const { products, customer, paid, type } = req.body;
    if (!products || !customer || paid === undefined || !type) return res.status(400).json({ message: "All fields are required" });
    if (products.length === 0) return res.status(400).json({ message: "Products are required" });
    if (!["paid", "due", "partially_paid"].includes(type)) return res.status(400).json({ message: "Type must be either paid or due" });
    
    try {
        const custoer_exist = await Customer.findById(customer);
        if (!custoer_exist) return res.status(404).json({ message: "Customer not found" });

        let total_amout_calculated = 0;
        for (const product of products) {
            let product_details = await Product.findById(product.product);
            if (!product_details) return res.status(404).json({ message: `Product with id ${product.product} not found` });
            if (product_details.quantity < product.quantity) return res.status(400).json({ message: `Not enough quantity for product with id ${product.product.name}` });
            await Product.findByIdAndUpdate(product.product, { $inc: { quantity_available: -product.quantity } });
            total_amout_calculated += product_details.price * product.quantity;
        }

        const due = total_amout_calculated - paid;
        if (due < 0) return res.status(400).json({ message: "Paid amount cannot be greater than total amount" });

        const newPurches = new Purches({
            product: products,
            Admin: req.admin,
            Customer: customer,
            total_amount: total_amout_calculated,
            paid,
            due,
            type
        });
        await newPurches.save();
        if (due > 0) {
            await Customer.findByIdAndUpdate(customer, { $inc: { debit: due } });
        }
        res.status(201).json({ message: "Purches created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const getAllPurches = async (req, res) => {
    const { id } = req.params;
    try {
        const purches = await Purches.find({ Admin: req.admin, Customer: id }).sort({ createdAt: -1 });
        if (purches.length === 0) return res.status(404).json({ message: "No purches found" });
        res.status(200).json({ purches });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPurchesDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const purches = await Purches.findById(id);
        if (!purches) return res.status(400).json({ message: "No purches details found" });

        let productDetails = [];
        for (const product of purches.product) {
            console.log(product);
            let details = {}
            const product_details = await Product.findById(product.product).select("product_name price type");
            details["product"] = product_details;
            details["quantity"] = product.quantity;

            productDetails.push(details);
        };

        res.status(200).json({ productDetails });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};