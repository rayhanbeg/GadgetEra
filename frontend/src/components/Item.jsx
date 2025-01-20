import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Item = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const { currency } = useContext(ShopContext);

  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <Link
        to={`/product/${product._id}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="block relative overflow-hidden"
      >
        <img
          src={
            product?.image?.length > 1 && hovered
              ? product?.image[1]
              : product?.image[0]
          }
          alt={product.name}
          className="w-full h-60 object-cover group-hover:scale-105 transition-all duration-300"
        />
        {/* Hover Effect */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
      </Link>

      {/* Product Info */}
      <div className="p-4 bg-white">
        <h4 className="font-semibold text-lg text-gray-900 truncate">{product.name}</h4>
        <div className="flex justify-between items-center my-2 text-gray-700">
          <p className="text-sm">{product.category}</p>
          <h5 className="font-bold text-gray-800">{currency}{product.price}</h5>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
      </div>
    </div>
  );
};

export default Item;
