import { FaLongArrowAltLeft } from "react-icons/fa";
import customerStore from "../../Store/Customer";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AddCustomer() {
  const navigate = useNavigate();
  const { addCustomer } = customerStore();

  const [data, setData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const handelSubmit = async (e: any) => {
    e.preventDefault();
    addCustomer(data);
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-5 py-4 flex items-center justify-between shadow-sm">
        <button onClick={() => navigate("/all-customer")}>
          <FaLongArrowAltLeft className="text-xl text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Add Customer</h1>
        <div></div>
      </div>

      <main className="p-4 flex-1">
        <p className="text-sm text-gray-500 mb-4">
          Add customer details quickly
        </p>

        <form
          onSubmit={handelSubmit}
          className="bg-white p-5 rounded-2xl shadow-sm border flex flex-col gap-4"
        >
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              required
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg border focus:ring-2 focus:ring-black outline-none"
              type="text"
              placeholder="e.g. Rahul Sharma"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Phone Number
            </label>
            <input
              required
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg border focus:ring-2 focus:ring-black outline-none"
              type="tel"
              placeholder="e.g. 9876543210"
            />
          </div>

          {/* Address */}
          <div>
            <label className="text-sm font-medium text-gray-600">Address</label>
            <input
              required
              value={data.address}
              onChange={(e) => setData({ ...data, address: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg border focus:ring-2 focus:ring-black outline-none"
              type="text"
              placeholder="Optional"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-3 w-full bg-black text-white py-2.5 rounded-full font-medium active:scale-[0.97] transition"
          >
            Save Customer
          </button>
        </form>
      </main>

      <Toaster />
    </div>
  );
}

export default AddCustomer;
