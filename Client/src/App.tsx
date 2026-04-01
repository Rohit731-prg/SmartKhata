import { Route, Routes, BrowserRouter as Router } from "react-router-dom"
import AddCustomer from "./Components/Admin/AddCustomer"
import Customers from "./Components/Admin/Customers"
import Login from "./Components/Login"
import Products from "./Components/Admin/Products"
import AddProduct from "./Components/Admin/AddProduct"
import Home from "./Components/Admin/Home"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add_customer" element={<AddCustomer />} />
        <Route path="/all-customer" element={<Customers />} />
        <Route path="/all-products" element={<Products />} />
        <Route path="/add-products" element={<AddProduct />} />
      </Routes>
    </Router>
  )
}

export default App