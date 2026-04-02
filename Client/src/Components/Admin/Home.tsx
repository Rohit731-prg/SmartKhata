import { useEffect, useState } from "react";
import useAdminStore from "../../Store/Admin";

function Home() {
  const { getBasicDetails, basicDeials, admin } = useAdminStore();
  const [basicDetails, setBasicDetails] = useState([
    { name: "Total Users", value: basicDeials?.totalUsers || 0 },
    { name: "Total Products", value: basicDeials?.totalProducts || 0 },
    { name: "Total Sales on this month", value: basicDeials?.totalSalesThisMonth || 0 },
    { name: "Total Sales", value: basicDeials?.totalSales || 0 },
  ]);
  const [details, setDetails] = useState([
    { name: "See Your Debtors", navigate: "/" },
    { name: "See low stock products", navigate: "/" },
  ]);

  useEffect(() => {
    getBasicDetails();
  }, []);
  return (
    <aside className="w-full bg-white min-h-screen p-6 rounded-2xl shadow-sm border border-gray-200">
        <p>Welcome Back Admin</p>
        <p>{admin?.name}</p>
        <img src={admin?.image} alt="" />
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
              className="bg-blue-500 border font-semibold border-blue-800 px-4 py-3 rounded-xl text-sm  text-white flex items-center justify-between group"
            >
              <span>{detail.name}</span>

              <span className="text-white">
                →
              </span>
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
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {basicDeials.newUser.map((user, index) => (
                    <tr key={index}>
                      <td>{user.name}</td>
                      <td>{user.phone}</td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-500">
                No new users this month. Encourage more sign-ups!
              </p>
            </div>
          )}
        </section>
        <section>
          <p className="text-lg font-semibold text-gray-700 mb-2">
            New Products This Month
          </p>
          {basicDeials?.newProduct ? (
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {basicDeials.newProduct.map((product, index) => (
                    <tr key={index}>
                      <td>{product.product_name}</td>
                      <td>{product.price}</td>
                      <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-500">
                No new products this month. Encourage more listings!
              </p>
            </div>
          )}
        </section>
      </div>
    </aside>
  );
}

export default Home;
