import { useEffect, useState } from "react";
import customerStore from "../../Store/Customer";
import useProductStore, { type Product } from "../../Store/Product";

function AddPurches() {
  const { customer } = customerStore();
  const { getAllProducts, products } = useProductStore();
  useEffect(() => {
    getAllProducts();
  }, []);

  const [purchesProducts, setPurchesProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const setSelectedProductFun = (productId: string) => {
    const product = products.find((p) => p._id === productId);
    setSelectedProduct(product || null);
  };

  const addProductToPurches = () => {
    if (selectedProduct) {
      setPurchesProducts([...purchesProducts, selectedProduct]);
    }
  };
  return (
    <div className="p-4 max-w-md mx-auto">
      {/* Header */}
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
            className="w-full border rounded-lg p-2 text-sm"
          />

          <button
            onClick={addProductToPurches}
            className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm active:scale-95"
          >
            Add Product
          </button>
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
                  {pro.product_name}
                </p>
                <p className="text-xs text-gray-500">
                  Qty: {pro.quantity_available}
                </p>
              </div>

              <p className="text-sm font-semibold text-green-600">
                ₹{pro.price}
              </p>
            </div>
          ))}
        </div>

        {/* Total + Payment */}
        <div className="bg-white p-4 rounded-xl shadow space-y-3">
          <p className="text-sm font-semibold text-gray-700">
            Total Amount: ₹{/* your total here */}
          </p>

          <div>
            <label className="text-xs text-gray-500">Paid Amount</label>
            <input
              type="number"
              className="w-full border rounded-lg p-2 text-sm mt-1"
            />
          </div>

          <button className="w-full bg-green-500 text-white py-2 rounded-lg text-sm active:scale-95">
            Make Purchase
          </button>
        </div>
      </main>
    </div>
  );
}

export default AddPurches;
