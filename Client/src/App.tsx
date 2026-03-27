import { Route, Routes, BrowserRouter as Router } from "react-router-dom"
import AddCustomer from "./Components/Admin/AddCustomer"
import Customers from "./Components/Admin/Customers"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddCustomer />} />
        <Route path="/all-customer" element={<Customers />} />
      </Routes>
    </Router>
  )
}

export default App