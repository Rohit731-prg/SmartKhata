import axios from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand'

interface Product {
    _id?: string;
    product_name: string;
    price: number;
    quantity_available: number;
    type: string;
};

interface productRequest {
    product_name: string;
    price: number;
    quantity_available: number;
    type: string;
}

type Store = {
    products: Product[];
    getAllProducts: () => void;
    addProduct: (product: Product) => void;
}

const useProductStore = create<Store>()((set) => ({
    products: [],
    getAllProducts: async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/product/get-all-product");
            console.log(response);
            set({ products: response?.data?.products || [] });
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    },
    addProduct: async (product: productRequest) => {
        try {
            const response = axios.post("http://localhost:4000/api/product/add-product", product);
            toast.promise(response, {
                loading: "Adding product...",
                success: (res) => res?.data?.message || "Product added successfully.",
                error: (err) =>
                    err?.response?.data?.message || err.message || "Failed to add product."
            });
            await response;
            console.log(response);
        } catch (error) {
            console.error("Error adding product:", error);
        }
    },
}));

export default useProductStore;
