import toast from 'react-hot-toast';
import { create } from 'zustand'
import { api } from '../Utils/axios';

interface RequestPurches {
    products: any[],
    customer: string,
    paid: number,
    type: string,
}

export interface Purches extends RequestPurches {
    _id: string;
    total_amount: number;
    due: number;
    createdAt: string
}

interface purchesResponse {
    product: String;
    quantity: number;
}

type Store = {
    purches: Purches | null;
    setPurches: (purches: Purches) => void;
    purcheses: Purches[] | null;
    addPurches: (data: RequestPurches) => Promise<void>;
    getAllPurcheses: (id: string) => Promise<void>;
}

const usePurchesStore = create<Store>()((set) => ({
    purches: null,

    setPurches: (purches: Purches) => set({ purches }),

    purcheses: null,
    addPurches: async (data: RequestPurches) => {
        console.log("Adding purches with data: ", data);
        let productList: purchesResponse[] = [];
        for (const product of data.products) {
            console.log("Processing product: ", product.product._id);
            productList.push({
                product: product.product._id,
                quantity: product.quantity
            });
        }
        console.log("productList: ", productList);
        try {
            const response = api.post("/purches/add_purches", {
                products: productList,
                customer: data.customer,
                paid: data.paid,
                type: data.type
            });
            toast.promise(response, {
                loading: "Adding purches...",
                success: (res) => res?.data?.message || "Purches added successfully",
                error: (err) => err?.response?.data?.message || "Failed to add purches"
            });
            await response;
            console.log(response);
        } catch (error: any) {
            console.error("Failed to add purches:", error);
        }
    },
    getAllPurcheses: async (id: string) => {
        try {
            const response = await api.get(`/purches/get_all_purches/${id}`);
            console.log(response);
            set({ purcheses: response.data.purches });
        } catch (error: any) {
            console.error("Failed to fetch purcheses:", error);
        }
    }       
}));

export default usePurchesStore;