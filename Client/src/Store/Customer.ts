import { create } from 'zustand';
import axios from "../Utils/axios";
import toast from 'react-hot-toast';

type customer = {
    name: String,
    phone: String,
    address: String,
}

type Store = {
    customers: customer | null,
    total_customer: number,
    addCustomer: (data: any) => void
}

const customerStore = create<Store>()((set) => ({
  customers: null,
  total_customer: 0,

  addCustomer: async (data) => {
    try {
        const response = axios.post("/api/customer/createCustomer", {
            data
        });
        await toast.promise(response, {
            loading: "Loading...!",
            success: (res) => res.data.message || "Successfully added new customer.",
            error: (err) => err?.response?.data?.message || "Something went wrong..!"
        });
        console.log(response);
        set({ customers: null });
    } catch (error) {
        console.error(error);
    }
  }

}));

export default customerStore;