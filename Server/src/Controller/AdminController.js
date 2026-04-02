import Admin from "../Models/AdminModel.js";
import Customer from "../Models/CustomerModel.js";
import Product from "../Models/ProductModel.js";
import { getPasswordCheck, setPassword } from "../Utils/password.js";
import { createToken } from "../Utils/token.js";

export const createAdmin = async (req, res) => {
    const { name, phone, password } = req.body;
    if (!name || !phone || !password) return res.status(400).json({ message: "All data is requesrd" });
    try {
        const is_exist = await Admin.findOne({phone});
        if (is_exist) return res.status(400).json({ message: `${phone} this number is already exist in database` });
        // const isValidPhone = /^[6-9]\d{9}$/.test(phone);
        // if (!isValidPhone) return res.status(400).json({ message: `${phone} this number is not a valid mobile number` });

        const hashPassword = await setPassword(password);
        const newAdmin = new Admin({
            name,
            phone,
            password: hashPassword,
            image: req.image_url,
            image_id: req.image_id
        });
        await newAdmin.save();
        return res.status(201).json({ message: "Shop owner ID is created successfully..!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginController = async (req, res) => {
    const {phone, password} = req.body;
    if (!phone || !password) return  res.status(400).json({ message: "All data is requesrd" });

    try {
        const is_exist = await Admin.findOne({phone});
        if (!is_exist) return res.status(400).json({ message: "Phone number does not found" });

        const is_password_match = await getPasswordCheck(password, is_exist.password);
        if (!is_password_match) return res.status(400).json({ message: "Password does not match" });

        const tokan = createToken({ id: is_exist._id, phone: is_exist.phone });
        res.cookie("token", tokan, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        });
        return res.status(200).json({ is_exist });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getAllBasicDetails = async (req, res) => {
    try {
        const products = await Product.find().select("product_name price createdAt").sort({ createAt: -1 }).limit(5);
        const customers = await Customer.find().select("name phone createdAt").sort({ createAt: -1 }).limit(5);

        const products_count = await Product.countDocuments();
        const customers_count = await Customer.countDocuments();

        let total_amount = 0;
        for (const product of products) {
            total_amount += product.price;
        };

        const total_sale_month = 0;
        for (const product of products) {
            if (new Date(product.createAt).getMonth() === new Date().getMonth()) {
                total_sale_month += product.price;
            };
        };

        return res.status(200).json({ total_amount, total_sale_month, products, customers, products_count, customers_count });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}