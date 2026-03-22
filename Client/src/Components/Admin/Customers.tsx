import { useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import Lottie from "lottie-react";
import loading from "../../assets/loading.json";

function Customers() {
    const [customers, setCustomers] = useState(null);
  return (
    <aside className="p-10 min-h-screen">
        <div className="flex items-center justify-between">
            <button className="">
                <FaLongArrowAltLeft className="text-xl"/>
            </button>
            <button className="px-5 py-2 bg-amber-500 rounded-md font-bold">
                Add
            </button>
        </div>

        <main className="mt-5">
            <div className="w-full mb-1 flex flex-row items-center gap-2 bg-amber-300 p-2 rounded-md">
                <IoSearchOutline />
                <input type="text" 
                placeholder="Search Customer..."
                className="w-full outline-none border-none" />
            </div>
            <hr/>

            <div>
                {customers ? (
                    <div>

                    </div>
                ) : (
                    <div className="h-150 flex items-center justify-center">
                        {/* <Lottie animationData={loading} loop={true} /> */}
                        <p>Loading...</p>
                    </div>
                )}
            </div>
        </main>
    </aside>
  )
}

export default Customers