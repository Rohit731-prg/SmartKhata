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
    <aside className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white px-5 py-4 flex items-center justify-between shadow-sm">
        <button onClick={() => navigate("/all-customer")}>
          <FaLongArrowAltLeft className="text-xl text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Add Product</h1>
        <div></div>
      </div>

      <main className="p-4 flex-1">
        <p className="text-sm text-gray-500 mb-4">
          Add customer details quickly
        </p>

        <form
          onSubmit={handelSubmit}
          className="bg-white p-5 rounded-2xl shadow-sm border flex flex-col gap-4"
        >
          {/* Name */}
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
              className="w-full mt-1 px-3 py-2 rounded-lg border focus:ring-2 focus:ring-black outline-none"
              type="text"
              placeholder="Enter Product Name"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">
              Product Price
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
              className="w-full mt-1 px-3 py-2 rounded-lg border focus:ring-2 focus:ring-black outline-none"
              type="number"
              placeholder="Enter Product Price"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">
              Product quantity
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
              className="w-full mt-1 px-3 py-2 rounded-lg border focus:ring-2 focus:ring-black outline-none"
              type="number"
              placeholder="Enter Product Quantity"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">
              Product Type
            </label>
            <select
              value={productDetails.type}
              onChange={(e) =>
                setProductDetails({ ...productDetails, type: e.target.value })
              }
              className="w-full mt-1 px-3 py-2 rounded-lg border focus:ring-2 focus:ring-black outline-none"
            >
              <option value="">Select Product Type</option>
              <option value="KG">KG</option>
              <option value="pice">Pice</option>
            </select>
          </div>

          <button type="submit" className="mt-3 w-full bg-black text-white py-2.5 rounded-full font-medium active:scale-[0.97] transition">
            Save Product
          </button>
        </form>
      </main>
      <Toaster />
    </aside>
  );
}

export default AddProduct;
