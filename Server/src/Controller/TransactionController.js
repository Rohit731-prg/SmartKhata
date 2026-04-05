import Customer from "../Models/CustomerModel.js";
import TransactionModel from "../Models/TransactionModel.js";

export const updateDebitCustomer = async (req, res) => {
    const { amount, id } = req.body;
    if (!amount || !id) return res.status(400).json({ message: "All fields are required" });
    if (amount <= 0) return res.status(400).json({ message: "Amount must be greater than 0" });
    try {
        const customer = await Customer.findById(id);
        if (!customer) return res.status(404).json({ message: "Customer not found" });

        if (customer.debit < amount) return res.status(400).json({ message: "Amount cannot be greater than debit" });
        const newTransaction = new TransactionModel({
            customer: id,
            admin: req.admin,
            amount
        });
        await newTransaction.save();
        await Customer.findByIdAndUpdate(id, { $inc: { debit: -amount } });
        res.status(200).json({ message: "Customer debit updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllTransactions = async (req, res) => {
    try {
        const transactions = await TransactionModel.find({ admin: req.admin }).populate("customer", "name phone address").sort({ createdAt: -1 });
        if (!transactions) return res.status(404).json({ message: "No transactions found" });
        res.status(200).json({ transactions });
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ message: error.message });
    }
}