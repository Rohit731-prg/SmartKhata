import { FaLongArrowAltLeft } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import useTransactionStore from "../../Store/Transaction";
import { useEffect, useState } from "react";

function AllTransaction() {
  const { transaction, getAllTransactons } = useTransactionStore();
  const [search, setSearch] = useState("");

  const filterSearh = (transaction || []).filter((tran) => {
    return (
      tran.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      tran.customer.phone.includes(search)
    );
  });

  useEffect(() => {
    getAllTransactons();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white px-5 py-4 flex items-center justify-between shadow-sm">
        <button>
          <FaLongArrowAltLeft className="text-xl text-gray-700" />
        </button>

        <h1 className="text-lg font-semibold text-gray-800">Transactions</h1>

        <div></div>
      </header>

      {/* Content */}
      <main className="p-4 flex-1">
        {/* Search */}
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl shadow-sm border">
          <IoSearch className="text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or phone..."
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>

        {/* Transaction List */}
        <div className="mt-4 flex flex-col gap-3">
          {transaction && transaction.length > 0 ? (
            filterSearh.map((tran) => {
              const isCredit = tran.amount >= 0;

              return (
                <div
                  key={tran._id}
                  className="bg-white p-4 rounded-2xl shadow-sm border active:scale-[0.98] transition"
                >
                  {/* Top Row */}
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {tran.customer?.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {tran.customer?.phone}
                      </p>
                    </div>

                    {/* Amount */}
                    <div
                      className={`text-sm font-bold ${
                        isCredit ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {isCredit
                        ? `+₹${tran.amount}`
                        : `-₹${Math.abs(tran.amount)}`}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="my-2 border-t"></div>

                  {/* Bottom Row */}
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <p>
                      {new Date(tran.createdAt).toLocaleDateString()} •{" "}
                      {new Date(tran.createdAt).toLocaleTimeString()}
                    </p>

                    <span
                      className={`px-2 py-1 rounded-full text-[10px] font-medium ${
                        isCredit
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {isCredit ? "Received" : "Paid"}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="h-[60vh] flex items-center justify-center text-gray-500">
              <p>No transactions found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AllTransaction;
