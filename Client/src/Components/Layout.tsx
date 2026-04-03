import { Outlet } from "react-router-dom";
import Navber from "./Navber";


function Layout() {
  return (
    <main className="min-h-screen pb-16">
        <Outlet />
        <Navber />
    </main>
  )
}

export default Layout