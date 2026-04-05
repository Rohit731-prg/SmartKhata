import { Route, Routes, BrowserRouter as Router } from "react-router-dom"

import AddCustomer from "./Components/Admin/AddCustomer"
import Customers from "./Components/Admin/Customers"
import Login from "./Components/Login"
import Products from "./Components/Admin/Products"
import AddProduct from "./Components/Admin/AddProduct"
import Home from "./Components/Admin/Home"
import AddPurches from "./Components/Admin/AddPurches"
import Layout from "./Components/Layout"
import Error from "./Components/Error"
import AllPurches from "./Components/Admin/AllPurches"
import AllTransaction from "./Components/Admin/AllTransaction"
import PurchesDetails from "./Components/Admin/PurchesDetails"
import LowProductStock from "./Components/Admin/LowProductStock"

function App() {
  return (
    <Router>
      <Routes>

        {/* Login without navbar */}
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Login />} />

        {/* All protected/admin pages with navbar */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/add_customer" element={<AddCustomer />} />
          <Route path="/all-customer" element={<Customers />} />
          <Route path="/all-products" element={<Products />} />
          <Route path="/add-products" element={<AddProduct />} />
          <Route path="/all-purches" element={<AllPurches />} />
          <Route path="/add-purches" element={<AddPurches />} />
          <Route path="/purches-details" element={<PurchesDetails />} />
          <Route path="/all-transaction" element={<AllTransaction />} />
          <Route path="/low-stock-product" element={<LowProductStock />} />
        </Route>

      </Routes>
    </Router>
  )
}

export default App