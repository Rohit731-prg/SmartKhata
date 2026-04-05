import { useEffect, useState } from "react";
import customerStore from "../../Store/Customer";
import usePurchesStore from "../../Store/Purches";
import { api } from "../../Utils/axios";

function PurchesDetails() {
  const { purches } = usePurchesStore();
  const { customer } = customerStore();

  const [priductsDetails, setProductsDetails] = useState<any[]>([]);

  const fetchDetails = async () => {
    try {
      const response = await api.get(
        `/purches/getPurchesDetails/${purches?._id}`,
      );
      console.log("Product details response: ", response);
      setProductsDetails(response.data.productDetails);
    } catch (error) {
      console.error("Failed to fetch product details: ", error);
    }
  };

  useEffect(() => {
    if (purches) {
      fetchDetails();
    }
  }, [purches]);
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {purches ? (
        <div className="max-w-xl mx-auto flex flex-col gap-4">
          {/* Header Card */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border">
            <h1 className="text-lg font-semibold text-gray-800">
              Purchase Details
            </h1>

            <div className="mt-3 text-sm text-gray-600 space-y-1">
              <p>
                <span className="font-medium text-gray-800">Customer:</span>{" "}
                {customer?.name}
              </p>
              <p>
                <span className="font-medium text-gray-800">Phone:</span>{" "}
                {customer?.phone}
              </p>
            </div>
          </div>

          {/* Summary Card */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">
              Summary
            </h2>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-50 p-3 rounded-xl">
                <p className="text-gray-500 text-xs">Total</p>
                <p className="font-bold text-gray-800">
                  ₹{purches.total_amount || 0}
                </p>
              </div>

              <div className="bg-green-50 p-3 rounded-xl">
                <p className="text-green-600 text-xs">Paid</p>
                <p className="font-bold text-green-700">₹{purches.paid || 0}</p>
              </div>

              <div className="bg-red-50 p-3 rounded-xl">
                <p className="text-red-500 text-xs">Due</p>
                <p className="font-bold text-red-600">₹{purches.due || 0}</p>
              </div>

              <div className="bg-blue-50 p-3 rounded-xl">
                <p className="text-blue-500 text-xs">Type</p>
                <p className="font-medium text-blue-700 capitalize">
                  {purches.type}
                </p>
              </div>
            </div>
          </div>

          {/* Products List */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">
              Products
            </h2>

            {priductsDetails && priductsDetails.length > 0 ? (
              <div className="flex flex-col gap-3">
                {priductsDetails.map((product: any, index) => (
                  <div
                    key={product._id || index}
                    className="flex justify-between items-center border-b pb-2 last:border-none"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        {product.product?.product_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        ₹{product.product?.price} × {product.quantity}
                      </p>
                    </div>

                    <p className="font-semibold text-gray-800">
                      ₹{(product.product?.price || 0) * (product.quantity || 0)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No products found</p>
            )}
          </div>
        </div>
      ) : (
        <div className="h-[60vh] flex items-center justify-center text-gray-500">
          Loading...
        </div>
      )}
    </div>
  );
}

export default PurchesDetails;
