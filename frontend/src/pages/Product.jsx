import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { useContext, useEffect, useState } from "react";
import {
  FaCheck,
  FaHeart,
  FaStar,
  FaStarHalfStroke,
  FaTruckFast,
} from "react-icons/fa6";
import { TbShoppingBagPlus } from "react-icons/tb";
import RelatedProducts from "../components/RelatedProducts";
import Footer from "../components/Footer";

const Product = () => {
  const { id } = useParams();
  const { products, currency, deliveryCharge, addToCart } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState("");
  const [color, setColor] = useState("");

  const fetchProductData = async () => {
    const selectedProduct = products.find((item) => item._id === id);
    if (selectedProduct) {
      setProduct(selectedProduct);
      setImage(selectedProduct.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [products, id]);

  if (!product) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-8">
        {/* Thumbnails and Main Image */}
        <div className="flex flex-col lg:flex-row lg:gap-8 items-center justify-center">
          {/* Thumbnails */}
          <div className="flex flex-wrap gap-3 justify-center lg:flex-col lg:justify-start">
            {product.image.map((item, index) => (
              <img
                key={index}
                src={item}
                alt="Thumbnail"
                className={`h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 rounded-lg cursor-pointer object-contain border ${
                  image === item ? "ring-2 ring-gray-700" : ""
                }`}
                onClick={() => setImage(item)}
              />
            ))}
          </div>

          {/* Main Product Image */}
          <div className="flex-1 mt-4 lg:mt-0">
            <img
              src={image}
              alt="Selected Product"
              className="rounded-lg object-contain w-full max-h-[500px] shadow-lg"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-start">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{product.name}</h1>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex text-yellow-500 text-lg">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalfStroke />
            </div>
            <span className="text-gray-600">(123 reviews)</span>
          </div>

          <h2 className="text-2xl font-semibold mb-6 text-gray-900">
            {currency} {product.price}.00
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

          <div className="flex items-center gap-3 mb-8">
            {product.colors.map((item, index) => (
              <button
                key={index}
                onClick={() => setColor(item)}
                className={`h-10 w-10 rounded-full border transition-transform hover:scale-105 flex items-center justify-center ${
                  color === item ? "ring-2 ring-gray-700" : ""
                }`}
                style={{ backgroundColor: item }}
              >
                {color === item && (
                  <FaCheck className={`${item === "White" ? "text-black" : "text-white"}`} />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6 mb-8">
            <button
              onClick={() => addToCart(product._id, color)}
              className="flex items-center gap-3 px-8 py-3 bg-gray-800 text-white rounded-lg shadow-lg hover:bg-gray-900 hover:shadow-xl transition"
            >
              Add to Cart <TbShoppingBagPlus className="text-xl" />
            </button>
            <button className="flex items-center justify-center p-3 border rounded-lg shadow-md hover:bg-gray-100 hover:shadow-lg transition">
              <FaHeart className="text-xl text-gray-800" />
            </button>
          </div>

          <div className="flex items-center gap-3 text-gray-700 mb-6">
            <FaTruckFast className="text-xl" />
            <span>
              Free Delivery on orders over {currency}{deliveryCharge}
            </span>
          </div>

          <div className="space-y-2 text-gray-600 text-sm">
            <p>✔ Authenticity You Can Trust</p>
            <p>✔ Enjoy Cash on Delivery for Your Convenience</p>
            <p>✔ Easy Returns and Exchanges Within 7 Days</p>
          </div>
        </div>
      </div>

      <RelatedProducts category={product.category} />
      <Footer />
    </div>
  );
};

export default Product;
