import { Link } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="shadow bg-white">
      <div className="max-w-6xl flex justify-between items-center mx-auto py-3 px-4">
        {/* Logo */}
        <div>
          <h1 className="text-blue-400 text-3xl font-bold font-serif">
            <Link to={"/"}>
              Book
              <p className="ml-10 text-sm -mt-2">Store</p>
            </Link>
          </h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-x-4">
          <Link className="px-3 py-2 hover:text-blue-400" to={"/"}>
            Home
          </Link>
          <Link className="px-3 py-2 hover:text-blue-400" to={"/wishlist"}>
            Wishlist
          </Link>
          <Link className="px-3 py-2 hover:text-blue-400" to={"/login"}>
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-blue-400 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Links */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <Link
            className="block px-4 py-2 border-b hover:bg-gray-100"
            to={"/"}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            className="block px-4 py-2 border-b hover:bg-gray-100"
            to={"/wishlist"}
            onClick={() => setMenuOpen(false)}
          >
            Wishlist
          </Link>
          <Link
            className="block px-4 py-2 hover:bg-gray-100"
            to={"/login"}
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
