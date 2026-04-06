import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import useProductStore, { type Product } from "../../Store/Product";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

import Modal from "react-modal";
import toast, { Toaster } from "react-hot-toast";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function Products() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { products, getAllProducts, deleteProduct, updateProduct } = useProductStore();
  const filterProfucts = products?.filter((product) =>
    product.product_name.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    getAllProducts();
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  const onModelOpen = (product: Product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const handelUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProduct) {
      await updateProduct(selectedProduct);
      closeModal();
    } else {
      toast.error("Failed to update product. Please try again.");
    }
  }
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
                <div className="flex flex-row justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">
                    {product.product_name}
                  </h2>
                  <div className="flex flex-row gap-3 text-xl ">
                    <button onClick={() => deleteProduct(product._id || "")} className="text-red-500">
                      <MdDelete />
                    </button>
                    <button 
                    onClick={() => onModelOpen(product)}
                    className="text-blue-500">
                      <MdModeEdit />
                    </button>
                  </div>
                </div>

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
      <Toaster />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="bg-white rounded-2xl shadow-xl p-5 flex flex-col gap-4">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Update Product
            </h2>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-600 text-sm"
            >
              ✕
            </button>
          </div>

          {/* Divider */}
          <div className="border-t"></div>

          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={handelUpdate}>
            {/* Quantity */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Quantity
              </label>
              <input
                value={selectedProduct?.quantity_available || 0}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    quantity_available: Number(e.target.value),
                  } as Product)
                }
                type="number"
                id="quantity"
                placeholder="Enter quantity"
                className="w-full mt-1 px-3 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Price */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Price (₹)
              </label>
              <input
                type="number"
                value={selectedProduct?.price || 0}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    price: Number(e.target.value),
                  } as Product)
                }
                id="price"
                placeholder="Enter price"
                className="w-full mt-1 px-3 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 py-2 rounded-xl border text-sm text-gray-600"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-1 py-2 rounded-xl bg-black text-white text-sm font-medium active:scale-[0.97] transition"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </aside>
  );
}

export default Products;
