import { Outlet } from "react-router-dom";
import NavBar from "../components/common/NavBar";

const Layout = () => {
  return (
    <div className="bg-gray-50">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Layout;
