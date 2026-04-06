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



function LowProductStock() {
  const { getLowProducts, products, deleteProduct, updateProduct } = useProductStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getLowProducts();
  }, []);

  function closeModal() {
    setIsOpen(false);
  };

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
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Low Stock Products</h1>
      {products.length === 0 ? (
        <p className="text-gray-500">No products with low stock.</p>
      ) : (
        <ul className="space-y-2">
          {products.map((product) => (
            <li
              key={product._id}
              className="p-4 bg-white rounded-lg shadow-sm border"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold">
                    {product.product_name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Price: ${product.price}
                  </p>
                  <p className="text-sm text-red-500">
                    Quantity Available: {product.quantity_available}
                  </p>
                </div>

                <div className="flex flex-col gap-2 text-xl ">
                  <button onClick={() => deleteProduct(product._id || "")} className="text-red-500">
                    <MdDelete />
                  </button>
                  <button onClick={() => onModelOpen(product)} className="text-blue-500">
                    <MdModeEdit />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

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
                onChange={(e) => setSelectedProduct({ ...selectedProduct, quantity_available: Number(e.target.value) } as Product)}
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
                onChange={(e) => setSelectedProduct({ ...selectedProduct, price: Number(e.target.value) } as Product)}
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
      <Toaster />
    </div>
  );
}

export default LowProductStock;
