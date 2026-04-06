import { create } from 'zustand';
import toast from 'react-hot-toast';
import { api } from '../Utils/axios';

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
    setCustomer: (customer: customer) => void,
    debtors: () => Promise<void>
}

const customerStore = create<Store>()((set) => ({
    customer: null,
    customers: null,
    total_customer: 0,

    addCustomer: async (data) => {
        try {
            console.log(data);
            console.log("function called");

            const promise = api.post("http://localhost:4000/api/customer/createCustomer", {
                name: data.name,
                phone: data.phone,
                address: data.address,
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
            const response = await api.get("http://localhost:4000/api/customer/getAllCustomers");
            console.log(response);
            set({ customers: response?.data?.customers });

        } catch (error) {
            console.error(error)
        }
    },
    setCustomer: (customer: customer) => set({ customer }),

    debtors: async () => {
        try {
            const response = await api.get("http://localhost:4000/api/customer/getDebitors");
            console.log(response);
            set({ customers: response?.data?.debitors });
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error.message || "Internal Server error");
            console.error(error)
        }
    }

}));

export default customerStore;