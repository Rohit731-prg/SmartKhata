import React, { useEffect, useState } from "react";
import useJournalStore from "../../Store/Journal";
import { api } from "../../Utils/axios";
import toast, { Toaster } from "react-hot-toast";

function JournalDetails() {
  const { jurnal } = useJournalStore();
  const [priductsDetails, setProductsDetails] = useState<any[]>([]);

  const fetchDetails = async () => {
    try {
      const response = await api.get(`journal/journalDetails/${jurnal}`);
      console.log("Product details response: ", response);
      setProductsDetails(response.data.response);
    } catch (error: any) {
        toast.error(error.response.data.message || error.message)
      console.error("Failed to fetch product details: ", error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-xl mx-auto flex flex-col gap-4">
        {/* Header Card */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <h1 className="text-lg font-semibold text-gray-800">
            Purchase Details
          </h1>
        </div>

        {/* Products List */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Products</h2>

          {priductsDetails && priductsDetails.length > 0 ? (
            <div className="flex flex-col gap-3">
              {priductsDetails.map((product: any, index) => (
                <div
                  key={product._id || index}
                  className="flex justify-between items-center border-b pb-2 last:border-none"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {product.product_details?.product_name}
                    </p>
                    <p className="text-xs text-gray-500">
                      ₹{product.product_details?.price} × {product.quantity}
                    </p>
                  </div>

                  <p className="font-semibold text-gray-800">
                    ₹{(product.product_details?.price || 0) * (product.quantity || 0)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No products found</p>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default JournalDetails;
