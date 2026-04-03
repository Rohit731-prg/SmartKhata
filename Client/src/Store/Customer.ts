import { create } from 'zustand';
// import api from '../Utils/axios';
import axios from 'axios';
import toast from 'react-hot-toast';

type customer = {
    _id: string,
    name: string,
    phone: string,
    address: string,
    debit: number,
    credit: number,
    createdAt: Date
}

type Store = {
    customer: customer | null,
    customers: customer[] | null,
    total_customer: number,
    addCustomer: (data: any) => void,
    getAllCustomers: () => void,
    setCustomer: (customer: customer) => void
}

const customerStore = create<Store>()((set) => ({
    customer: null,
    customers: null,
    total_customer: 0,

    addCustomer: async (data) => {
        try {
            console.log(data);
            console.log("function called");

            const promise = axios.post("http://localhost:4000/api/customer/createCustomer", {
                name: data.name,
                phone: data.phone,
                address: data.address,
                shop: "bh"
            });
            console.log(promise)
            toast.promise(promise, {
                loading: "Loading...!",
                success: (res) => res?.data?.message || "Successfully added new customer.",
                error: (err) =>
                    err?.response?.data?.message || err.message || "Internal Server error"
            });
            await promise;
            set({ customers: null });

        } catch (error) {
            console.error(error);
        }
    },

    getAllCustomers: async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/customer/getAllCustomers");
            console.log(response);
            set({ customers: response?.data?.customers });

        } catch (error) {
            console.error(error)
        }
    },
    setCustomer: (customer: customer) => set({ customer }),

}));

export default customerStore;