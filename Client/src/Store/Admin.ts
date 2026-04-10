import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import toast from 'react-hot-toast'
import { api } from '../Utils/axios'

interface Login {
    phone: string,
    password: string,
}

interface AdminResponse {
    name: string,
    phone: string,
    image?: string
}

interface signUp extends Login {
    name: string,
    image: File | null
}

interface basicDetails {
    totalUsers: number,
    totalProducts: number,
    totalSalesThisMonth: number,
    totalSales: number,

    newUser: [{
        name: string,
        phone: string,
        createdAt: string
    }],
    newProduct: [{
        product_name: string,
        price: number,
        createdAt: string
    }],
}

type Store = {
    admin: AdminResponse | null,
    basicDeials: basicDetails | null,
    setAdmin: (admin: Login) => Promise<boolean>
    getBasicDetails: () => Promise<void>
    logout: () => void
    craeteAdmin: (admin: signUp) => Promise<void>
}

const useAdminStore = create<Store>()(
    persist(
        (set, get) => ({
            admin: null,
            basicDeials: null,

            setAdmin: async (admin: Login) => {
                try {
                    const promise = api.post(
                        '/admin/login',
                        admin
                    );

                    const res = await toast.promise(promise, {
                        loading: "Logging in...",
                        success: (res) => res.data.message || "Login successful",
                        error: (err) => err.response?.data?.message || "Login failed"
                    });

                    set({
                        admin: {
                            name: res.data.is_exist.name,
                            phone: res.data.is_exist.phone,
                            image: res.data.is_exist.image
                        }
                    });
                    console.log("Admin logged in:", res.data);
                    console.log("Admin logged in zustand:", get().admin);
                    return true;

                } catch (error) {
                    console.error("Login error:", error);
                    return false;
                }
            },
            getBasicDetails: async () => {
                try {
                    const response = await api.get("http://localhost:4000/api/admin/basicDetails");
                    const data = response.data;
                    console.log("Basic details fetched:", data);
                    set({
                        basicDeials: {
                            totalUsers: data.customers_count,
                            totalProducts: data.products_count,
                            totalSalesThisMonth: data.total_sale_month,
                            totalSales: data.total_amount,

                            newUser: data.customers,
                            newProduct: data.products,
                        }
                    })
                } catch (error: any) {
                    toast.error(error?.response?.data?.message || error.message || "Failed to fetch basic details");
                    console.error("Error fetching basic details:", error);
                }
            },
            logout: () => set({ admin: null }),

            craeteAdmin: async (admin: signUp) => {
                try {
                    const formData = new FormData();
                    formData.append("name", admin.name);
                    formData.append("phone", admin.phone);
                    formData.append("password", admin.password);
                    if (admin.image) {
                        formData.append("image", admin.image);
                    }

                    const promise = api.post("/admin/createAdmin", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });
                    await toast.promise(promise, {
                        loading: "Creating admin...",
                        success: (res) => res.data.message || "Admin created successfully",
                        error: (err) => err.response?.data?.message || "Failed to create admin"
                    });
                } catch (error: any) {
                    toast.error(error?.response?.data?.message || error.message || "Failed to create admin");
                    console.error("Error creating admin:", error);
                }
            }
        }),
        {
            name: "admin-storage",
        }
    )
);

export default useAdminStore;