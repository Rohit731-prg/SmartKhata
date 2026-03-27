import Customer from "../Models/CustomerModel.js";

export const createCustomer = async (req, res) => {
    const { name, phone, address, shop } = req.body;
    if (!name ||!phone || !address || !shop) return res.status(400).json({ message: "All details are require" });
    try {
        const is_exist = await Customer.findOne({ phone, shop });
        if (is_exist) return res.status(400).json({ message: "Customer already exist" });

        const newCustomer = new Customer({
            name: name,
            phone: phone,
            address: address,
            shop: req.admin
        });
        newCustomer.save();
        return res.status(201).json({ message: "New customer added successfully..!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllCustomers = async (req, res) => {
    const adminID = req.adminID;
    try {
        const customers = await Customer.find({ shop: adminID });
        if (!customers) return res.status(400).json({ message: "No Customer found" });

        return res.status(200).json({ customers });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};