import { useEffect } from "react";
import customerStore from "../../Store/Customer";
import { Toaster } from "react-hot-toast";

function Debitors() {
  const { customers, debtors } = customerStore();
  useEffect(() => {
    debtors();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-gray-800">Debitors</h1>
        <p className="text-sm text-gray-500">Customers with pending dues</p>
      </div>

      {/* List */}
      <div className="flex flex-col gap-3">
        {customers && customers.length > 0 ? (
          customers.map((customer) => (
            <div
              key={customer._id}
              className="bg-white p-4 rounded-2xl shadow-sm border flex justify-between items-center"
            >
              {/* Left Info */}
              <div>
                <p className="font-semibold text-gray-800">{customer.name}</p>
                <p className="text-xs text-gray-500">{customer.phone}</p>
                <p className="text-xs text-gray-400">
                  {customer.address || "No address"}
                </p>
              </div>

              {/* Debit Amount */}
              <div className="text-right">
                <p className="text-xs text-gray-500">Due</p>
                <p className="text-lg font-bold text-red-500">
                  ₹{customer.debit || 0}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="h-[60vh] flex items-center justify-center text-gray-500">
            No debitors found
          </div>
        )}
      </div>

      <Toaster />
    </div>
  );
}

export default Debitors;
