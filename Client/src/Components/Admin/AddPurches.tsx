import { useEffect, useState } from "react";
import customerStore from "../../Store/Customer";
import useProductStore, { type Product } from "../../Store/Product";
import usePurchesStore from "../../Store/Purches";
import { Toaster } from "react-hot-toast";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AddPurches() {
  const navigate = useNavigate();
  const { addPurches } = usePurchesStore();
  const { customer } = customerStore();
  const [total_amnout , setTotalAmount] = useState(0);
  const { getAllProducts, products } = useProductStore();
  useEffect(() => {
    getAllProducts();
  }, []);

  const [purchesProducts, setPurchesProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [paid, setPaid] = useState<number>(0);
  const setSelectedProductFun = (productId: string) => {
    const product = products.find((p) => p._id === productId);
    setSelectedProduct(product || null);
  };

  const addProductToPurches = () => {
    if (selectedProduct && quantity > 0) {
      setPurchesProducts([...purchesProducts, { product: selectedProduct, quantity }]);
      setQuantity(1);
      setTotalAmount((prev) => prev + (selectedProduct.price * quantity));
    }
  };

  const handelSubmit = async () => {
    if(purchesProducts.length === 0) return;
    await addPurches({
      products: purchesProducts,
      customer: customer?._id || "",
      paid: paid,
      type: total_amnout === paid ? "paid" : paid === 0 ? "due" : "partially_paid"
    })
  }
  return (
    <div className="p-4 max-w-md mx-auto">
      {/* Header */}
      <button onClick={() => navigate("/all-purches")}>
        <FaLongArrowAltLeft />
      </button>
      <header className="bg-white shadow rounded-xl p-4 mb-4">
        <h1 className="text-lg font-semibold text-gray-800">
          {customer?.name}
        </h1>
        <p className="text-sm text-gray-500">{customer?.phone}</p>
      </header>

      {/* Main */}
      <main className="space-y-4">
        <h2 className="text-base font-semibold text-gray-700">Products</h2>

        {/* Add Product Section */}
        <div className="bg-white p-3 rounded-xl shadow space-y-2">
          <select
            onChange={(e) => setSelectedProductFun(e.target.value)}
            className="w-full border rounded-lg p-2 text-sm"
          >
            <option>Select Product</option>
            {products.map((pro) => (
              <option key={pro._id} value={pro._id}>
                {pro.product_name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="w-full border rounded-lg p-2 text-sm"
          />

          <button
            onClick={addProductToPurches}
            className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm active:scale-95"
          >
            Add Product
          </button>
        </div>

            <div>
              <p>Selected Product Details: </p>
              {selectedProduct && (
                <div>
                  <p>{selectedProduct.product_name}</p>
                  <p>Price: ₹{selectedProduct.price}</p>
                  <p>Quantity Available: {selectedProduct.quantity_available}</p>
                </div>
              )}
            </div>

        {/* Product List */}
        <div className="space-y-2">
          {purchesProducts.map((pro, index) => (
            <div
              key={index}
              className="bg-white p-3 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {pro.product.product_name} <span className="text-sm text-gray-500 mx-2">₹{pro.price}</span>
                </p>
                <p className="text-xs text-gray-500">
                  Qty: {pro.product.quantity_available}
                </p>
              </div>

              <p className="text-sm font-semibold text-green-600">
                ₹{pro.product.price * pro.quantity}
              </p>
            </div>
          ))}
        </div>

        {/* Total + Payment */}
        <div className="bg-white p-4 rounded-xl shadow space-y-3">
          <p className="text-sm font-semibold text-gray-700">
            Total Amount: ₹{total_amnout}
          </p>

          <div>
            <label className="text-xs text-gray-500">Paid Amount</label>
            <input
              type="number"
              placeholder="Enter paid amount"
              value={paid}
              onChange={(e) => setPaid(parseInt(e.target.value) || 0)}
              className="w-full border rounded-lg p-2 text-sm mt-1"
            />
          </div>

          <button 
            onClick={handelSubmit}
            className="w-full bg-green-500 text-white py-2 rounded-lg text-sm active:scale-95">
            Make Purchase
          </button>
        </div>
      </main>
      <Toaster />
    </div>
  );
}

export default AddPurches;
