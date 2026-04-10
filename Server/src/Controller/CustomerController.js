import Customer from "../Models/CustomerModel.js";

export const createCustomer = async (req, res) => {
    const { name, phone, address } = req.body;
    if (!name ||!phone || !address) return res.status(400).json({ message: "All details are require" });
    try {
        const is_exist = await Customer.findOne({ phone, shop: req.admin });
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
    const adminID = req.admin;
    try {
        const customers = await Customer.find({ shop: adminID }).sort({ createdAt: -1 });
        if (!customers) return res.status(400).json({ message: "No Customer found" });

        return res.status(200).json({ customers });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getDebitors = async (req, res) => {
    try {
        const debitors = await Customer.find({ shop: req.admin, debit: { $gt: 0 } }).sort({ debit: -1 });
        if (debitors.length === 0) return res.status(400).json({ message: "No debitors found" });
        return res.status(200).json({ debitors });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}