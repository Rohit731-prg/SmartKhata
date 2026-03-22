import { create } from 'zustand'

type customer = {
    name: String,
    phone: String,
    address: String,
}

type Store = {
    customers: customer | null,
    total_customer: number,
    addCustomer: () => void
}

const customerStore = create<Store>()((set) => ({
  customers: null,
  total_customer: 0,

  addCustomer: () => {
    
  }

}));

export default customerStore;