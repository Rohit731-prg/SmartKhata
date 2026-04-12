import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useJournalStore from "../../Store/Journal";
import { Toaster } from "react-hot-toast";
import { IoSearchOutline } from "react-icons/io5";

function Journals() {
  const { journals, getAllJournals, setJournal } = useJournalStore();
  const navigate = useNavigate();

  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    getAllJournals();
  }, []);

  // ✅ FIXED FILTER LOGIC
  const filteredJournals = (journals || []).filter((journal) => {
    if (!searchDate) return true;

    const journalDate = new Date(journal.createdAt)
      .toISOString()
      .split("T")[0];

    return journalDate === searchDate;
  });

  const handelNavigate = (id: string) => {
    setJournal(id);
    navigate("/journal-details")
  }
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      
      {/* Header */}
      <header className="bg-white rounded-2xl shadow-sm p-4 flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold text-gray-800">All Journals</p>
          <p className="text-sm text-gray-500">
            Track your daily financial records
          </p>
        </div>

        <button
          onClick={() => navigate("/add-journal")}
          className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium active:scale-95 transition"
        >
          + New
        </button>
      </header>

      {/* 🔍 Search */}
      <div className="mt-4 bg-white p-3 rounded-xl shadow-sm flex items-center gap-3">
        <IoSearchOutline className="text-gray-500 text-xl" />

        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="w-full outline-none text-sm"
        />
      </div>

      {/* 📋 Journal List */}
      <main className="mt-4 flex flex-col gap-3">
        {filteredJournals.length > 0 ? (
          filteredJournals.map((journal) => (
            <div
              onClick={() => handelNavigate(journal._id)}
              key={journal._id}
              className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  ₹{journal.total_amout}
                </p>

                <p className="text-sm text-gray-500">
                  {new Date(journal.createdAt).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => navigate(`/journal/${journal._id}`)}
                className="text-blue-500 text-sm font-medium"
              >
                View →
              </button>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 mt-10">
            No journals found 🥲
          </div>
        )}
      </main>

      <Toaster />
    </div>
  );
}

export default Journals;