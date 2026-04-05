import { useEffect, useState } from "react";
import customerStore from "../../Store/Customer";
import { useNavigate } from "react-router-dom";
import usePurchesStore, { type Purches } from "../../Store/Purches";
import useTransactionStore from "../../Store/Transaction";
import toast, { Toaster } from "react-hot-toast";

function AllPurches() {
  const navigate = useNavigate();
  const { customer } = customerStore();
  const { getAllPurcheses, purcheses, setPurches } = usePurchesStore();
  const { addTransaction } = useTransactionStore();
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (customer) {
      getAllPurcheses(customer._id);
    }
  }, [customer]);

  const handelSubmit = () => {
    if (!customer) {
      toast.error("Customer ID is missing");
      return;
    }
    addTransaction(amount, customer?._id);
  };

  const handelNavigate = (purches: Purches) => {
    setPurches(purches);
    navigate("/purches-details");
  }
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <header className="bg-white rounded-2xl shadow-sm p-4 flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold text-gray-800">
            {customer?.name}
          </p>
          <p className="text-sm text-gray-500">{customer?.phone}</p>
        </div>

        <button
          onClick={() => navigate("/add-purches")}
          className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium active:scale-95 transition"
        >
          + New
        </button>
      </header>

      {/* Payment Section */}
      <section className="mt-4 bg-white rounded-2xl shadow-sm p-4">
        <p className="text-sm text-gray-500">
          {customer?.name?.split(" ")[0]}'s Total Due
        </p>

        <h2 className="text-2xl font-bold text-red-500 mt-1">
          ₹{customer?.debit || 0}
        </h2>

        <p className="text-xs text-gray-500 mt-2">
          Enter amount received or advance payment
        </p>

        <div className="mt-3 flex gap-2">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter amount"
            className="flex-1 px-3 py-2 border rounded-xl outline-none text-sm"
          />
          <button 
            onClick={handelSubmit}
            className="bg-green-600 text-white px-4 rounded-xl text-sm">
            Save
          </button>
        </div>
      </section>

      {/* Purchases List */}
      <main className="mt-4 flex flex-col gap-3">
        {purcheses && purcheses.length > 0 ? (
          purcheses.map((purches) => {
            const isDue = purches.due > 0;

            return (
              <div
                onClick={() => handelNavigate(purches)}
                key={purches._id}
                className="bg-white p-4 rounded-2xl shadow-sm border"
              >
                {/* Top */}
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-gray-800">
                    ₹{purches.total_amount || 0}
                  </p>

                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      isDue
                        ? "bg-red-100 text-red-500"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {isDue ? "Due" : "Paid"}
                  </span>
                </div>

                {/* Middle */}
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <p>Paid: ₹{purches.paid || 0}</p>
                  <p>Due: ₹{purches.due || 0}</p>
                </div>

                {/* Date */}
                <p className="text-[11px] text-gray-400 mt-2">
                  {new Date(purches.createdAt).toLocaleString()}
                </p>

                {/* Button */}
                <button className="mt-3 text-sm text-blue-600 font-medium">
                  See Details →
                </button>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500 mt-10">
            No purchases found
          </div>
        )}
      </main>
      <Toaster />
    </div>
  );
}

export default AllPurches;
