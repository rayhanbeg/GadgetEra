import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Search, Edit, Trash2 } from "react-feather";
import { ShopContext } from "../../context/ShopContext";

const ListPage = () => {
  const { currency } = useContext(ShopContext);
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const categories = ["Headphones", "Mobile", "Watches", "Cameras", "Speakers", "Mouse"];

  const fetchList = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/product/list`
      );
      if (response.data.success) {
        setList(response.data.products);
        setFilteredList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch product list");
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = list.filter(
      (item) =>
        item.name.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term)
    );
    setFilteredList(filtered);
  };

  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setEditModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    formData.append("id", currentProduct._id);
  
    // Convert popular to a boolean value properly
    const popular = formData.get("popular") === "on"; // This will correctly check if the checkbox is checked
  
    // Append the updated popular value to formData
    formData.set("popular", popular);
  
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/product/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
  
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
        setEditModalOpen(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product");
    }
  };

  const handleRemove = async (productId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/product/remove/${productId}`
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <motion.div className="p-6 border border-gray-300 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Product List</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((item) => (
              <tr key={item._id}>
                <td>
                  <img
                    src={item.image[0]}
                    alt="Product"
                    className="h-16 w-16 object-cover rounded-md"
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>
                  {currency}
                  {item.price.toFixed(2)}
                </td>
                <td>
                  <button
                    className="text-indigo-500 hover:text-indigo-400 mr-2"
                    onClick={() => handleEditClick(item)}
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-400"
                    onClick={() => handleRemove(item._id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editModalOpen && (
        <Modal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          center
        >
          <h2 className="text-xl mb-4">Edit Product</h2>
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="block text-sm">Name</label>
              <input
                type="text"
                name="name"
                defaultValue={currentProduct.name}
                className="border border-gray-300 rounded-lg w-full px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm">Price</label>
              <input
                type="number"
                name="price"
                defaultValue={currentProduct.price}
                className="border border-gray-300 rounded-lg w-full px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm">Category</label>
              <select
                name="category"
                defaultValue={currentProduct.category}
                className="border border-gray-300 rounded-lg w-full px-3 py-2"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm">Description</label>
              <textarea
                name="description"
                defaultValue={currentProduct.description}
                className="border border-gray-300 rounded-lg w-full px-3 py-2"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm">Colors</label>
              <input
                type="text"
                name="colors"
                defaultValue={JSON.stringify(currentProduct.colors)}
                className="border border-gray-300 rounded-lg w-full px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm">Popular</label>
              <input
                type="checkbox"
                name="popular"
                defaultChecked={currentProduct.popular}
                className="border border-gray-300 rounded-lg w-full px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm">Images</label>
              <input
                type="file"
                name="image1"
                className="border border-gray-300 rounded-lg w-full px-3 py-2"
              />
              <input
                type="file"
                name="image2"
                className="border border-gray-300 rounded-lg w-full px-3 py-2"
              />
              <input
                type="file"
                name="image3"
                className="border border-gray-300 rounded-lg w-full px-3 py-2"
              />
              <input
                type="file"
                name="image4"
                className="border border-gray-300 rounded-lg w-full px-3 py-2"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-lg px-4 py-2"
            >
              Update Product
            </button>
          </form>
        </Modal>
      )}
    </motion.div>
  );
};

export default ListPage;
