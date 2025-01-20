import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaPlus, FaShoppingCart, FaList, FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { ShopContext } from "../context/ShopContext";
import { logout } from "../redux/authSlice";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { navigate } = useContext(ShopContext);
  
  // Toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Close the sidebar when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Logout functionality (you should implement the actual logout logic here)
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="lg:h-screen max-h-screen flex flex-col">
      {/* Hamburger Menu for Small Screens */}
      <div className="bg-gray-100 text-gray-800 flex justify-between items-center md:hidden w-full p-4">
        <div className="font-bold">
        <Link to="/" className="text-2xl font-bold text-gray-800">
            Gadget<span className="text-blue-600">Era</span>
          </Link>
        </div>
        <button
          className="text-3xl focus:outline-none"
          onClick={toggleSidebar}
        >
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 bg-gray-100 w-64 h-full px-4 py-6 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static flex flex-col justify-between`}
      >
        {/* Close Button for Small Screens */}
        <button
          className="text-xl md:hidden absolute top-4 right-4"
          onClick={toggleSidebar}
        >
          ✕
        </button>

        {/* Logo */}
        <div className="hidden md:flex justify-center items-center mb-6">
        <Link to="/" className="text-2xl font-bold text-gray-800">
            Gadget<span className="text-blue-600">Era</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-4">
          <NavLink
            to="/dashboard/add-item"
            className={({ isActive }) =>
              `text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-lg transition ${
                isActive ? "bg-blue-500 text-white" : ""
              }`
            }
            onClick={handleLinkClick}
          >
            <FaPlus className="inline mr-2" />
            Add Item
          </NavLink>
          <NavLink
            to="/dashboard/order"
            className={({ isActive }) =>
              `text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-lg transition ${
                isActive ? "bg-blue-500 text-white" : ""
              }`
            }
            onClick={handleLinkClick}
          >
            <FaShoppingCart className="inline mr-2" />
            Order
          </NavLink>
          <NavLink
            to="/dashboard/list"
            className={({ isActive }) =>
              `text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-lg transition ${
                isActive ? "bg-blue-500 text-white" : ""
              }`
            }
            onClick={handleLinkClick}
          >
            <FaList className="inline mr-2" />
            List
          </NavLink>
        </nav>

        {/* Logout Button at the Bottom */}
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-lg flex items-center space-x-2 transition"
          >
            <FaSignOutAlt className="inline mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
