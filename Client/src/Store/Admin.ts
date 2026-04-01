import { create } from 'zustand'
import axios from 'axios'
import toast from 'react-hot-toast'

interface Login {
    phone: string,
    password: string,
}

interface Admin {
    name: string,
    phone: string,
    image?: File
}

type Store = {
    admin: null | Admin
    createAdmin: (admin: Admin) => void,
    setAdmin: (admin: Login) => Promise<boolean>
    basicDetails: () => void
}

const useAdminStore = create<Store>()((set) => ({
    admin: null,
    createAdmin: async (admin: Admin) => {
        try {
            // const response = axios.post('http://localhost:4000/api/admin/createAdmin', {
            //     name: admin.name,
            //     phone: admin.phone,
            // });

            // toast.promise(response, {
            //     loading: "loading...",
            //     success: (res) => res.data.message || "Login successfully..",
            //     error: (err) => err.response.data.message || "Something went wrong"
            // });
            // await response;

            // console.log(response);
        } catch (error) {
            console.error("Error setting admin:", error);
        }
    },

    setAdmin: async (admin: Login) => {
        try {
            const response = axios.post('http://localhost:4000/api/admin/login', {
                phone: admin.phone,
                password: admin.password
            });
            toast.promise(response, {
                loading: "loading...",
                success: (res) => res.data.message || "Login successfully..",
                error: (err) => err.response.data.message || "Something went wrong"
            });
            await response;
            console.log(response);
            return true;
        } catch (error) {
            console.error("Error setting admin:", error);
            return false;
        }
    },

    basicDetails: () => {
        try {
            
        } catch (error) {
            console.error("Error fetching basic details:", error);
        }
    }
}));

export default useAdminStore;