import { create } from 'zustand'
import { api } from '../Utils/axios';
import toast from 'react-hot-toast';

interface Transaction {
    _id: string;
    customer: {
        name: string;
        phone: string;
    };
    amount: number;
    createdAt: string;
}

type Store = {
    transaction: null | Transaction[];
    addTransaction: (amount: number, id: string) => Promise<void>;
    getAllTransactons: () => Promise<void>;
}

const useTransactionStore = create<Store>()((set) => ({
    transaction: null,
    addTransaction: async (amount: number, id: string) => {
        try {
            const response = api.post("/transactions/add_transaction", {
                amount,
                id
            });

            toast.promise(response, {
                loading: "Adding transaction...",
                success: (res) => res.data.message || "Transaction added successfully",
                error: (err) => err.response?.data?.message || err.message || "Failed to add transaction"
            });
            await response;

        } catch (error) {
            console.error("Failed to add transaction:", error);
        }
    },
    getAllTransactons: async () => {
        try {
            const response = await api.get("/transactions/get_all_transactions");
            set({ transaction: response.data.transactions });
        } catch (error) {
            console.error("Failed to fetch transactions:", error);
        }
    }
}));

export default useTransactionStore;