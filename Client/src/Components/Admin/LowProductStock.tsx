import { useEffect, useState } from "react";
import useProductStore from "../../Store/Product";

import Modal from "react-modal";
import { Toaster } from "react-hot-toast";

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
  const { getLowProducts, products } = useProductStore();

  useEffect(() => {
    getLowProducts();
  }, []);

  const [modalIsOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
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
        <form>
            <p>Update {}</p>
            
            <label htmlFor="quantity">Quantity:</label>
            <input type="number" id="quantity" />

            <label htmlFor="price">Price: </label>
            <input type="number" id="price" />
        </form>
      </Modal>
      <Toaster />
    </div>
  );
}

export default LowProductStock;
