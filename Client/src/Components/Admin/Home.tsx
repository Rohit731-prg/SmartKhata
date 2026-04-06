import { useEffect } from "react";
import useAdminStore from "../../Store/Admin";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function Home() {
  const navigate = useNavigate();
  const { getBasicDetails, basicDeials, admin } = useAdminStore();
  const basicDetails = [
    { name: "Total Users", value: basicDeials?.totalUsers || 0 },
    { name: "Total Products", value: basicDeials?.totalProducts || 0 },
    {
      name: "Total Sales on this month",
      value: basicDeials?.totalSalesThisMonth || 0,
    },
    { name: "Total Sales", value: basicDeials?.totalSales || 0 },
  ];
  const details = [
    { name: "See Your Debtors", navigate: "/debitors" },
    { name: "See low stock products", navigate: "/low-stock-product" },
  ];

  useEffect(() => {
    getBasicDetails();
  }, []);
  return (
    <aside className="w-full bg-white min-h-screen p-8 rounded-2xl shadow-sm border border-gray-200">
      <div className="flex flex-row justify-between">
        <div>
          <p className="text-gray-500 text-xl">Welcome Back Admin, </p>
          <p className="text-lg font-semibold">{admin?.name}</p>
        </div>
        <img src={admin?.image} alt="" className="w-16 h-16 object-cover" />
      </div>
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
              onClick={() => navigate(detail.navigate)}
              key={index}
              className="bg-blue-500 border font-semibold border-blue-800 px-4 py-3 rounded-xl text-sm  text-white flex items-center justify-between group"
            >
              <span>{detail.name}</span>

              <span className="text-white">→</span>
            </button>
          ))}
        </div>
      </section>

      {/* 👇 Space reserved for tags / extra content */}
      <div className="mt-6">
        <section>
          {basicDeials?.newUser ? (
            <div>
              <p className="text-lg font-semibold text-gray-700 mb-2">
                New Users This Month
              </p>

              <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Phone</th>
                    <th className="p-2 text-left">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {basicDeials.newUser?.map((user, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-2">{user.name}</td>
                      <td className="p-2">{user.phone}</td>
                      <td className="p-2">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              No new users this month. Encourage more sign-ups!
            </p>
          )}
        </section>

        <section className="mt-6">
          <p className="text-lg font-semibold text-gray-700 mb-2">
            New Products This Month
          </p>

          {basicDeials?.newProduct ? (
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Price</th>
                  <th className="p-2 text-left">Date</th>
                </tr>
              </thead>

              <tbody>
                {basicDeials.newProduct.map((product, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2">{product.product_name}</td>
                    <td className="p-2">₹{product.price}</td>
                    <td className="p-2">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-sm text-gray-500">
              No new products this month. Encourage more listings!
            </p>
          )}
        </section>
      </div>
      <Toaster/>
    </aside>
  );
}

export default Home;
