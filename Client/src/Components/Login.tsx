import { useState } from "react";
import useAdminStore from "../Store/Admin";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface SignupDetails {
  name: string;
  phone: string;
  password: string;
  image: File | null;
}

function Login() {
  const navigate = useNavigate();
  const { setAdmin, craeteAdmin } = useAdminStore();
  const [is_admin, setIs_admin] = useState(true);
  const [userDetais, setUserSetails] = useState({
    phone: "",
    password: "",
  });

  const handelAdminSubmit = async (e: any) => {
    e.preventDefault();
    const is_logged_in = await setAdmin(userDetais);
    if (is_logged_in) navigate("/home");
  };

  const [signupDetails, setSignupDetails] = useState<SignupDetails>({
    name: "",
    phone: "",
    password: "",
    image: null,
  });

  const handelSignup = async (e: any) => {
    e.preventDefault();
    await craeteAdmin(signupDetails);
    setSignupDetails({
      name: "",
      phone: "",
      password: "",
      image: null,
    });
    setIs_admin(true);
  }

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
            Login
          </button>
          <button
            onClick={() => setIs_admin(false)}
            className={`w-1/2 py-2 rounded-xl text-sm font-medium transition ${
              !is_admin ? "bg-white shadow text-blue-600" : "text-gray-500"
            }`}
          >
            Sign Up
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
                onChange={(e) =>
                  setUserSetails({ ...userDetais, phone: e.target.value })
                }
                placeholder="Enter phone number"
                className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                value={userDetais.password}
                onChange={(e) =>
                  setUserSetails({ ...userDetais, password: e.target.value })
                }
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
          <div className="">
            <form className="space-y-4" onSubmit={handelSignup}>
              <div>
                <label className="text-sm text-gray-600">Name</label>
                <input
                  type="text"
                  value={signupDetails.name}
                  onChange={(e) =>
                    setSignupDetails({ ...signupDetails, name: e.target.value })
                  }
                  placeholder="Enter your name"
                  className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Phone</label>
                <input
                  type="tel"
                  value={signupDetails.phone}
                  onChange={(e) =>
                    setSignupDetails({
                      ...signupDetails,
                      phone: e.target.value,
                    })
                  }
                  placeholder="Enter your phone number"
                  className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Password</label>
                <input
                  type="password"
                  value={signupDetails.password}
                  onChange={(e) =>
                    setSignupDetails({
                      ...signupDetails,
                      password: e.target.value,
                    })
                  }
                  placeholder="Enter your password"
                  className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Profile Image</label>
                {signupDetails.image ? (
                  <img
                    className="w-full h-40"
                    src={URL.createObjectURL(signupDetails.image)}
                    alt="Profile"
                  />
                ) : (
                  <div className="w-full h-40 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl cursor-pointer">
                    <input
                      className="hidden"
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setSignupDetails({ ...signupDetails, image: file });
                        }
                      }}
                    />
                    <label htmlFor="image" className="block text-sm text-gray-600 cursor-pointer">
                      Upload Image
                    </label>
                  </div>
                )}
              </div>

              <button 
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-xl font-medium hover:bg-green-600 transition">
                  Sign Up
              </button>
            </form>
          </div>
        )}
      </aside>
      <Toaster />
    </div>
  );
}

export default Login;
