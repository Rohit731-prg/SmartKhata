import axios from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand'
import { api } from '../Utils/axios';

interface basicProduct {
    product_name: string;
    price: number;
    quantity_available: number;
}

export interface Product extends basicProduct {
    _id?: string;
    type: string;
};

interface productRequest extends basicProduct {
    type: string;
}

type Store = {
    products: Product[];
    basicProducts: basicProduct[] | null;
    getAllProducts: () => void;
    addProduct: (product: Product) => void;
    getProductsDetails: (id: string) => Promise<void>;
}

const useProductStore = create<Store>()((set) => ({
    products: [],
    basicProducts: null,
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

    getProductsDetails: async (id: string) => {
        try {
            const response = await api.get(`/product/getPurchesDetails/${id}`);
            console.log(response);
            set({ basicProducts: response.data.productDetails });
        } catch (error) {
            console.log("Error from productDetails: ", error);
        }
    }
}));

export default useProductStore;
