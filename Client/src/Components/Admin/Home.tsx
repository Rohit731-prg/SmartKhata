import { useState } from "react";

function Home() {
  const [basicDetails, setBasicDetails] = useState([
    { name: "Total Users", value: 0 },
    { name: "Total Users", value: 0 },
    { name: "Total Users", value: 0 },
    { name: "Total Users", value: 0 },
  ]);
  const [details, setDetails] = useState([
    { name: "See Your Debtors", navigate: "/" },
    { name: "See low stock products", navigate: "/" },
  ]);
  return (
    <aside className="w-full bg-white min-h-screen p-6 rounded-2xl shadow-sm border border-gray-200">
        <p>Welcome Back Admin</p>
        <p>{}</p>
      {/* 🔝 Basic Details (Stats Cards) */}
      <header className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-10">
        {basicDetails.map((details, index) => (
          <div
            key={index}
            className="bg-linear-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200 hover:shadow-md transition"
          >
            <h3 className="text-xs text-gray-400 uppercase tracking-wide">
              {details.name}
            </h3>
            <p className="text-xl font-bold text-gray-800 mt-1">
              {details.value}
            </p>
          </div>
        ))}
      </header>

      {/* 🧭 Quick Actions / Navigation */}
      <section className="mt-6">
        <h2 className="text-sm font-semibold text-gray-500 mb-3">
          Quick Actions
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {details.map((detail, index) => (
            <button
              key={index}
              className="bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition flex items-center justify-between group"
            >
              <span>{detail.name}</span>

              <span className="opacity-0 group-hover:opacity-100 transition text-blue-500">
                →
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 👇 Space reserved for tags / extra content */}
      <div className="mt-6">{/* You will add tags here */}</div>
    </aside>
  );
}

export default Home;
