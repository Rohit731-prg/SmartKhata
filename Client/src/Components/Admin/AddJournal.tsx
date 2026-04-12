import { Toaster } from 'react-hot-toast'
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'
import useProductStore, { type Product } from '../../Store/Product';
import { useEffect, useState } from 'react';
import useJournalStore from '../../Store/Journal';

function AddJournal() {
    const navigate = useNavigate();
    const {createNewJournal } = useJournalStore();
    const { products, getAllProducts } = useProductStore();
    const [quantity, setQuantity] = useState(0);
    const [total_amnout , setTotalAmount] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [purchesProducts, setPurchesProducts] = useState<any[]>([]);
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

    const handelSubmit = () => {
        console.log(purchesProducts)
        createNewJournal(purchesProducts)
    };

    useEffect(() => {
        getAllProducts();
    }, []);
  return (
    <div className="p-4 max-w-md mx-auto">
      {/* Header */}
      <button onClick={() => navigate("/jounals")}>
        <FaLongArrowAltLeft />
      </button>

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

          <button 
            onClick={handelSubmit}
            className="w-full bg-green-500 text-white py-2 rounded-lg text-sm active:scale-95">
            Make Purchase
          </button>
        </div>
      </main>
      <Toaster />
    </div>
  )
}

export default AddJournal