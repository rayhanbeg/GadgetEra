import { NavLink, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { FaBars, FaBarsStaggered } from "react-icons/fa6";
import { RiUserLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [menuOpened, setMenuOpened] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { getCartCount, navigate } = useContext(ShopContext);

  const navLinks = [
    { path: "/", title: "Home" },
    { path: "/collection", title: "Collection" },
    { path: "/blog", title: "Blog" },
    { path: "/contact", title: "Contact" },
  ];

  const toggleMenu = () => {
    setMenuOpened((prev) => !prev);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="w-full bg-white mb-2">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          GadgetEra
        </Link>

        {/* Navbar for desktop and mobile */}
        <nav
          className={`${
            menuOpened
              ? "fixed top-16 right-6 flex flex-col gap-y-4 bg-white p-5 rounded-xl shadow-md w-52 ring-1 ring-slate-900/5 z-50"
              : "hidden lg:flex gap-x-6"
          } lg:flex`}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.title}
              to={link.path}
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium ${
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`
              }
              onClick={() => setMenuOpened(false)}
            >
              {link.title}
            </NavLink>
          ))}
        </nav>

        {/* Right-side buttons for mobile and desktop */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <Link to="/cart" className="relative">
            <div className="ring-1 ring-slate-900 rounded-full px-4 py-1 font-medium text-gray-700 hover:bg-gray-100">
              Cart
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-semibold flex items-center justify-center w-5 h-5 rounded-full">
                {getCartCount()}
              </span>
            </div>
          </Link>

          {/* User Actions */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-full shadow hover:bg-gray-700"
                onClick={toggleDropdown}
              >
                <RiUserLine className="text-lg" />
                {user?.name || "User"}
              </button>
              {dropdownOpen && (
                <div className="absolute z-50 right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 ring-1 ring-gray-200">
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Orders
                  </Link>
                  {user?.isAdmin && (
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink
              to="/login"
              className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-full shadow hover:bg-gray-700"
            >
              Login
              <RiUserLine className="text-lg" />
            </NavLink>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-gray-700 hover:text-gray-900 text-xl"
            onClick={toggleMenu}
          >
            {menuOpened ? <FaBarsStaggered /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
