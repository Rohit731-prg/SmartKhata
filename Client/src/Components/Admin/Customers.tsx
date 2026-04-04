import { useEffect, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
// import Lottie from "lottie-react";
// import loading from "../../assets/loading.json";
import customerStore from "../../Store/Customer";
import { useNavigate } from "react-router-dom";

function Customers() {
  const navigate = useNavigate();
  const { getAllCustomers, customers, setCustomer } = customerStore();

  useEffect(() => {
    getAllCustomers();
  }, []);

  const [search, setSearch] = useState('');
  const filterCustomer = (customers || []).filter((cus) => {
    return cus.name.toLowerCase().includes(search.toLowerCase());
  });

  const handelSumbit = (customer: any) => {
    setCustomer(customer);
    navigate("/all-purches");
  }
  return (
    <aside className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white px-5 py-4 flex items-center justify-between shadow-sm">
        <button>
          <FaLongArrowAltLeft className="text-xl text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Customers</h1>
        <button 
        onClick={() => navigate('/add_customer')}
        className="px-4 py-1.5 bg-black text-white rounded-full text-sm font-medium">
          + Add
        </button>
      </div>

      <main className="p-4 flex-1">
        {/* Search */}
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl shadow-sm border">
          <IoSearchOutline className="text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customer..."
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>

        {/* Customer List */}
        <div className="mt-4 flex flex-col gap-3">
          {customers ? (
            filterCustomer.map((cus) => {
              const balance = cus.credit - cus.debit;
              const isPositive = balance >= 0;

              return (
                <div
                  key={cus._id}
                  onClick={() => handelSumbit(cus)}
                  className="bg-white p-4 rounded-2xl shadow-sm border active:scale-[0.98] transition"
                >
                  {/* Top Row */}
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800">{cus.name}</p>
                      <p className="text-xs text-gray-500">{cus.phone}</p>
                    </div>

                    {/* Balance */}
                    <div
                      className={`text-sm font-bold ${
                        isPositive ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      ₹{Math.abs(balance)}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="my-2 border-t"></div>

                  {/* Bottom Row */}
                  <div className="flex justify-between text-xs">
                    <p className="text-red-500">Debit: ₹{cus.debit}</p>
                    <p className="text-green-600">Credit: ₹{cus.credit}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="h-[60vh] flex items-center justify-center text-gray-500">
              <p>Loading...</p>
            </div>
          )}
        </div>
      </main>
    </aside>
  );
}

export default Customers;
