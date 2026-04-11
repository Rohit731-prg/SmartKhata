import toast from 'react-hot-toast'
import { create } from 'zustand'
import { api } from '../Utils/axios'

interface Journal {
    products: any[]
    total_amount: number
    createdAt: string
}

type Store = {
    journal: null | Journal[]
    getAllJournals: () => Promise<void>
    createNewJournal: (data: any) => Promise<void>
}

const useStore = create<Store>()((set) => ({
    journal: null,
    getAllJournals: async () => {
        try {
            const response = await api.get("/journal/getAllJournal");
            console.log(response);
            set({ journal: response.data.journals });
        } catch (error: any) {
            toast.error(error.message)
            console.log(error);
        }
    },
    createNewJournal: async (data: any) => {
        try {
            const response = api.post("/journal/create_journal", data)
            toast.promise(response, {
                loading: "loading ...",
                success: (res) => res.data.message || "journal added successfully..",
                error: (err) =>  err?.response?.data?.message || err.message || "Failed to update product."
            })
            await response
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
}))