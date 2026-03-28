import Admin from "../Models/AdminModel.js";
import { getPasswordCheck, setPassword } from "../Utils/password.js";

export const createAdmin = async (req, res) => {
    const { name, phone, password } = req.body;
    if (!name || !phone || !password) return res.status(400).json({ message: "All data is requesrd" });
    try {
        const is_exist = await Admin.findOne(phone);
        if (is_exist) return res.status(400).json({ message: `${phone} this number is already exist in database` });
        const isValidPhone = /^[6-9]\d{9}$/.test(phone);
        if (!isValidPhone) return res.status(400).json({ message: `${phone} this number is a valid mobile number` });

        const hashPassword = setPassword(password);
        const newAdmin = new Admin({
            name,
            phone,
            password: hashPassword,
            image: req.image_url,
            image_id: req.image_id
        });
        newAdmin.save();
        return res.status(201).json({ message: "Shop owner ID is created successfully..!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const loginController = async (req, res) => {
    const {phone, password} = req.body;
    if (!phone || !password) return  res.status(400).json({ message: "All data is requesrd" });

    try {
        const is_exist = await Admin.findOne(phone);
        if (!is_exist) return res.status(400).json({ message: "Phone number does not found" });

        const is_password_match = getPasswordCheck(password, is_exist.password);
        if (!is_password_match) res.status(400).json({ message: "Password does not match" });

        return res.status(200).json({ is_exist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}