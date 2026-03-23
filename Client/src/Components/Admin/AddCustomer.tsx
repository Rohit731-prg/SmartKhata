import { FaLongArrowAltLeft } from "react-icons/fa";
import customerStore from "../../Store/Customer";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

function AddCustomer() {
    const { addCustomer } = customerStore();

    const [data, setData] = useState({
        name: "",
        phone: "",
        address: ""
    });
    const handelSubmit = async (e: any) => {
        e.preventDefault();
        addCustomer(data);
    };
  return (
    <div className="p-10">
      <button className="">
            <FaLongArrowAltLeft className="text-xl" />
      </button>

      <main className="mt-5">
        <p className="text-lg font-semibold">Fill the details to add new new customer</p>

        <form onSubmit={handelSubmit} 
        className="border-2 border-black p-5 rounded-lg my-5 flex flex-col">
            <p className="mb-5 text-xl font-semibold">Form</p>

            <label htmlFor="" className="text-md font-semibold">Full Name</label>
            <input 
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="p-2 bg-slate-300 rounded-md shadow-xl mb-4 mt-1"
            type="text" placeholder="Enter Customer full name" />

            <label htmlFor="" className="text-md font-semibold">Phone Number</label>
            <input 
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
            className="p-2 bg-slate-300 rounded-md shadow-xl mb-4 mt-1"
            type="tel" placeholder="Enter Customer Phone number" />

            <label htmlFor="" className="text-md font-semibold">Full Address</label>
            <input 
            value={data.address}
            onChange={(e) => setData({ ...data, address: e.target.value })}
            className="p-2 bg-slate-300 rounded-md shadow-xl mb-4 mt-1"
            type="text" placeholder="Enter Customer full address" />

            <button type="submit" className="my-5 w-full bg-blue-600 text-white py-2 rounded-full">
                SUBMIT
            </button>
        </form>
      </main>
      <Toaster />
    </div>
  );
}

export default AddCustomer;
