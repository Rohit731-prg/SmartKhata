import { useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useProductStore from "../../Store/Product";
import { Toaster } from "react-hot-toast";

function AddProduct() {
  const navigate = useNavigate();
  const { addProduct } = useProductStore();
  const [productDetails, setProductDetails] = useState({
    product_name: "",
    price: 0,
    quantity_available: 0,
    type: "",
  });

  const handelSubmit = async (e: any) => {
    e.preventDefault();
    addProduct(productDetails);
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white px-5 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate("/all-customer")}>
          <FaLongArrowAltLeft className="text-xl text-gray-700" />
        </button>

        <h1 className="text-lg font-semibold text-gray-800">Add Product</h1>

        <div></div>
      </header>

      {/* Content */}
      <main className="p-4 flex-1">
        {/* Info */}
        <p className="text-sm text-gray-500 mb-4">
          Add a new product to your inventory
        </p>

        {/* Form Card */}
        <form
          onSubmit={handelSubmit}
          className="bg-white p-5 rounded-2xl shadow-sm border flex flex-col gap-4"
        >
          {/* Product Name */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Product Name
            </label>
            <input
              required
              value={productDetails.product_name}
              onChange={(e) =>
                setProductDetails({
                  ...productDetails,
                  product_name: e.target.value,
                })
              }
              className="w-full mt-1 px-3 py-2 rounded-xl border text-sm focus:ring-2 focus:ring-black outline-none transition"
              type="text"
              placeholder="e.g. Rice, Milk, Oil"
            />
          </div>

          {/* Price & Quantity Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Price (₹)
              </label>
              <input
                required
                value={productDetails.price}
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
                    price: Number(e.target.value),
                  })
                }
                className="w-full mt-1 px-3 py-2 rounded-xl border text-sm focus:ring-2 focus:ring-black outline-none transition"
                type="number"
                placeholder="0"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Quantity
              </label>
              <input
                required
                value={productDetails.quantity_available}
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
                    quantity_available: Number(e.target.value),
                  })
                }
                className="w-full mt-1 px-3 py-2 rounded-xl border text-sm focus:ring-2 focus:ring-black outline-none transition"
                type="number"
                placeholder="0"
              />
            </div>
          </div>

          {/* Type */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Product Type
            </label>
            <select
              value={productDetails.type}
              onChange={(e) =>
                setProductDetails({
                  ...productDetails,
                  type: e.target.value,
                })
              }
              className="w-full mt-1 px-3 py-2 rounded-xl border text-sm focus:ring-2 focus:ring-black outline-none transition"
            >
              <option value="">Select Type</option>
              <option value="KG">KG (Weight)</option>
              <option value="piece">Piece</option>
            </select>
          </div>

          {/* Divider */}
          <div className="border-t my-2"></div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl font-medium text-sm active:scale-[0.97] transition shadow-sm"
          >
            Save Product
          </button>
        </form>
      </main>

      <Toaster />
    </div>
  );
}

export default AddProduct;
