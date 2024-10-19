import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="shadow bg-white">
      <div className="max-w-7xl flex justify-between mx-auto py-3">
        <div>
          <h1 className="text-blue-400 text-3xl font-bold font-serif">
            <Link to={"/"}> BookStore</Link>
          </h1>
        </div>
        <div className="flex gap-x-4 *:px-3 *:py-2 *:inline-block">
          <Link to={"/"}>Home</Link>
          <Link to={"/wishlist"}>Wishlist</Link>
          <Link to={"/"}>Login</Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
