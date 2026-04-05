import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import useProductStore from "../../Store/Product";

function Products() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const { products, getAllProducts } = useProductStore();
  const filterProfucts = products?.filter((product) =>
    product.product_name.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <aside className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white px-5 py-4 flex items-center justify-between shadow-sm">
        <button>
          <FaLongArrowAltLeft className="text-xl text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Products</h1>
        <button
          onClick={() => navigate("/add-products")}
          className="px-4 py-1.5 bg-black text-white rounded-full text-sm font-medium"
        >
          + Add
        </button>
      </div>

      <main className="p-6 flex-1 bg-gray-50 min-h-screen">
        {/* 🔍 Search Bar */}
        <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl shadow-sm border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 transition">
          <IoSearchOutline className="text-gray-400 text-lg" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full outline-none text-sm bg-transparent placeholder-gray-400"
          />
        </div>

        {/* 📦 Product List */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filterProfucts && filterProfucts.length > 0 ? (
            filterProfucts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-md hover:-translate-y-1 transition duration-300"
              >
                {/* Product Name */}
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  {product.product_name}
                </h2>

                {/* Company */}
                <p className="text-xs text-gray-400 mb-3">Company: N/A</p>

                {/* Price */}
                <p className="text-xl font-bold text-blue-600 mb-3">
                  ₹{product.price}
                </p>

                {/* Details */}
                <div className="flex justify-between text-sm text-gray-600">
                  <span>
                    Qty:{" "}
                    <span className="font-medium text-gray-800">
                      {product.quantity_available}
                    </span>
                  </span>
                  <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">
                    {product.type}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center mt-10 text-gray-400">
              <p className="text-lg">😕 No products found</p>
              <p className="text-sm">Try adjusting your search</p>
            </div>
          )}
        </div>
      </main>
    </aside>
  );
}

export default Products;
