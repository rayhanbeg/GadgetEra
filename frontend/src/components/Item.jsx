import { useState } from "react";
import { Link } from "react-router-dom";

const Item = ({ product }) => {
    const [hovered, setHovered] = useState(false)
  return (
    <div className="overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Image */}
      <Link
        to={`/product/${product._id}`}
        onMouseEnter={() =>setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex items-center justify-center overflow-hidden relative"
      >
        <img
          src={product?.image?.length > 1 && hovered[0] ? product?.image[1] : product?.image[0]}
          alt={product.name}
          className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Info */}
      <div className="p-3">
        <h4 className="font-semibold text-lg line-clamp-1">{product.name}</h4>
        <div className="flex justify-between items-center my-2 text-gray-600">
          <p className="text-sm">{product.category}</p>
          <h5 className="font-bold text-gray-800">${product.price}</h5>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
      </div>
    </div>
  );
};

export default Item;
