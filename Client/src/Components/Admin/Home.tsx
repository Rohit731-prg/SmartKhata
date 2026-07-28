import { useEffect, useState } from "react";
import useAdminStore from "../../Store/Admin";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Modal from 'react-modal';
import useJournalStore from "../../Store/Journal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "1000px",
    maxHeight: "90vh",
    overflow: "auto",
  },
};

function Home() {
  const navigate = useNavigate();
  const { getBasicDetails, basicDeials, admin } = useAdminStore();
  const { get_ai_response } = useJournalStore();

  const [ai_response, setAi_response] = useState<any>(null);
  const [ai_response_html, setAI_response_response] = useState<any>(null);

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

  const get_ai_response_function = async () => {
    const response = await get_ai_response();
    let trim_response = response?.data.response.trim();
    trim_response = trim_response.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "");
    
    try {
      const new_parsed_deta = JSON.parse(trim_response)
      const trim_html_data = new_parsed_deta.html_report.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "");
      console.log(trim_html_data)
      console.log(new_parsed_deta)
      setAi_response(new_parsed_deta)
      setAI_response_response(trim_html_data) 
    } catch (error) {
      setAi_response(null)
    } finally {
      setIsOpen(true);
    }
  }

  useEffect(() => {
    getBasicDetails();
  }, []);

  const [modalIsOpen, setIsOpen] = useState(false);

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

        <div className="my-3">
          <button
            onClick={() => get_ai_response_function()}
            className="bg-blue-500 border font-semibold border-blue-800 px-4 py-3 rounded-xl text-sm  text-white flex items-center justify-between group">
            View Next Month Prediction
          </button>
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
      <Toaster />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
      >
        {ai_response ? (
          <div className="max-h-[85vh] overflow-y-auto p-4">
            {/* Header */}
            <h3 className="text-lg font-bold mb-2">Forecast Summary</h3>
            <p className="text-sm text-gray-600 mb-1">
              Products analyzed: {ai_response.forecast_summary.total_products_analyzed}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Top category: {ai_response.forecast_summary.top_performing_category}
            </p>
            <p className="text-sm text-red-600 mb-4">
              {ai_response.forecast_summary.overall_stock_risk}
            </p>

            {/* Option A: render the ready-made HTML report from the backend */}
            <div
              dangerouslySetInnerHTML={{ __html: ai_response.html_report }}
            />

            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Close
            </button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
    </aside>
  );
}

export default Home;
