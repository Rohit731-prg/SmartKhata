import toast from 'react-hot-toast'
import { create } from 'zustand'
import { api } from '../Utils/axios'

interface Journal {
    _id: string
    products: any[]
    total_amout: number
    createdAt: string
}

type Store = {
    jurnal: null | string
    journals: null | Journal[]
    setJournal: (id: string) => void
    getAllJournals: () => Promise<void>
    createNewJournal: (data: any) => Promise<void>
}

const useJournalStore = create<Store>()((set) => ({
    jurnal: null,
    journals: null,
    setJournal: (id: string) => {
        set({ jurnal: id });
    },
    getAllJournals: async () => {
        try {
            const response = await api.get("/journal/getAllJournal");
            console.log(response);
            set({ journals: response.data.journals });
        } catch (error: any) {
            toast.error(error.response.data.message || error.message)
            console.log(error);
        }
    },
    createNewJournal: async (data: any) => {
        try {
            const response = api.post("/journal/create_journal", {
                products: data
            })
            toast.promise(response, {
                loading: "loading ...",
                success: (res) => res.data.message || "journal added successfully..",
                error: (err) =>  err?.response?.data?.message || err.message || "Failed to update product."
            })
            await response
        } catch (error) {
            console.log(error);
        }
    }
}));

export default useJournalStore;