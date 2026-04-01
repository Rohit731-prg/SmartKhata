import { useState } from "react";
import useAdminStore from "../Store/Admin";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { setAdmin } = useAdminStore();
  const [is_admin, setIs_admin] = useState(true);
  const [userDetais, setUserSetails] = useState({
    phone: "",
    password: "",
  });

  const handelAdminSubmit = async (e: any) => {
    e.preventDefault();
    const is_logged_in = await setAdmin(userDetais);
    // if (is_logged_in) navigate("/add_customer");
    navigate("/add_customer");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <aside className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">

        {/* Toggle Buttons */}
        <div className="flex bg-gray-200 rounded-xl p-1 mb-6">
          <button
            onClick={() => setIs_admin(true)}
            className={`w-1/2 py-2 rounded-xl text-sm font-medium transition ${
              is_admin ? "bg-white shadow text-blue-600" : "text-gray-500"
            }`}
          >
            Admin
          </button>
          <button
            onClick={() => setIs_admin(false)}
            className={`w-1/2 py-2 rounded-xl text-sm font-medium transition ${
              !is_admin ? "bg-white shadow text-blue-600" : "text-gray-500"
            }`}
          >
            Customer
          </button>
        </div>

        {/* Admin Login */}
        {is_admin ? (
          <form onSubmit={handelAdminSubmit} className="space-y-4">

            <div>
              <label className="text-sm text-gray-600">Phone</label>
              <input
                type="tel"
                value={userDetais.phone}
                onChange={(e) => setUserSetails({ ...userDetais, phone: e.target.value })}
                placeholder="Enter phone number"
                className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                value={userDetais.password}
                onChange={(e) => setUserSetails({ ...userDetais, password: e.target.value })}
                type="password"
                placeholder="Enter password"
                className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-xl font-medium hover:bg-blue-600 transition"
            >
              Login as Admin
            </button>
          </form>
        ) : (
          <div className="text-center text-gray-500 text-sm">
            Customer login coming soon...
          </div>
        )}
      </aside>
      <Toaster />
    </div>
  );
}

export default Login;