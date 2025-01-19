import { useState, useCallback } from "react";
import { FaCloudUploadAlt, FaCheck, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

const AddItem = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Headphones",
    popular: false,
    colors: [],
    images: { image1: null, image2: null, image3: null, image4: null },
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleColorToggle = (color) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }));
  };

  const handleImageUpload = (e, key) => {
    setFormData((prev) => ({
      ...prev,
      images: { ...prev.images, [key]: e.target.files[0] },
    }));
  };

  const onSubmitHandle = useCallback(
    async (e) => {
      e.preventDefault();
      if (formData.colors.length === 0) {
        toast.error("Please select at least one color");
        return;
      }

      setLoading(true);
      try {
        const productData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (key === "images") {
            Object.entries(value).forEach(
              ([imgKey, file]) => file && productData.append(imgKey, file)
            );
          } else if (Array.isArray(value)) {
            productData.append(key, JSON.stringify(value));
          } else {
            productData.append(key, value);
          }
        });

        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/product/add`,
          productData
        );

        if (response.data.success) {
          toast.success(response.data.message);
          setFormData({
            name: "",
            description: "",
            price: "",
            category: "Headphones",
            popular: false,
            colors: [],
            images: { image1: null, image2: null, image3: null, image4: null },
          });
        } else {
          toast.error(response.data.message || "Something went wrong");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error occurred");
      } finally {
        setLoading(false);
      }
    },
    [formData]
  );

  return (
    <div className="min-h-screen py-10 px-4 md:px-10">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">
        Add New Product
      </h1>
      <form
        onSubmit={onSubmitHandle}
        className="space-y-6 max-w-4xl mx-auto p-8"
      >
        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Product Name"
              className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Price"
              className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Product Description"
            rows={4}
            className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Headphones">Headphones</option>
            <option value="Cameras">Cameras</option>
            <option value="Mobiles">Mobiles</option>
            <option value="Speakers">Speakers</option>
            <option value="Mouse">Mouse</option>
            <option value="Watches">Watches</option>
          </select>
        </div>

        {/* Colors */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Colors</label>
          <div className="flex space-x-4 mt-2">
            {["Black", "Red", "White", "Blue"].map((color) => (
              <div
                key={color}
                className={`h-10 w-10 rounded-full cursor-pointer border flex justify-center items-center ${
                  formData.colors.includes(color) ? "ring-2 ring-blue-500" : ""
                }`}
                style={{ backgroundColor: color.toLowerCase() }}
                onClick={() => handleColorToggle(color)}
              >
                {formData.colors.includes(color) && (
                  <FaCheck className={`${color === "White" ? "text-black" : "text-white"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Upload Images
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            {["image1", "image2", "image3", "image4"].map((key) => (
              <label
                key={key}
                className="h-24 w-24 border-2 border-dashed flex justify-center items-center rounded-lg cursor-pointer"
              >
                <FaCloudUploadAlt className="text-gray-400" />
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, key)}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Popular */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="popular"
            checked={formData.popular}
            onChange={handleInputChange}
            className="mr-2"
          />
          <label className="text-sm text-gray-600">Mark as Popular</label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md flex justify-center items-center"
        >
          {loading ? <FaSpinner className="animate-spin" /> : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddItem;
