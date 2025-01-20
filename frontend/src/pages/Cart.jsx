import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { FaRegWindowClose } from "react-icons/fa";
import CartTotal from "../components/CartTotal";
import Footer from "../components/Footer";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    getCartCount,
    updateQuantity,
    navigate,
  } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [quantities, setQuantities] = useState([]);

  useEffect(() => {
    if (products?.length > 0) {
      const tempData = [];
      const initialQuantities = {};
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              color: item,
              quantity: cartItems[items][item],
            });
            initialQuantities[`${items}-${item}`] = cartItems[items][item];
          }
        }
      }
      setCartData(tempData);
      setQuantities(initialQuantities);
    }
  }, [cartItems, products]);

  const increment = (id, color) => {
    const key = `${id}-${color}`;
    const newValue = quantities[key] + 1;
    setQuantities((prev) => ({ ...prev, [key]: newValue }));
    updateQuantity(id, color, newValue);
  };

  const decrement = (id, color) => {
    const key = `${id}-${color}`;
    if (quantities[key] > 1) {
      const newValue = quantities[key] - 1;
      setQuantities((prev) => ({ ...prev, [key]: newValue }));
      updateQuantity(id, color, newValue);
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Title */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-800">
            Cart <span className="underline text-blue-500">List</span>
          </h2>
          <p className="text-gray-600 mt-2">({getCartCount()} items)</p>
        </div>

        {/* Cart Items */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
          <div>
            {cartData.length > 0 ? (
              cartData.map((item, index) => {
                const productData = products.find(
                  (product) => product._id === item._id
                );
                const key = `${item._id}-${item.color}`;
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm mb-4"
                  >
                    {/* Product Image */}
                    <div className="flex items-center gap-4">
                      <img
                        src={productData?.image[0]}
                        alt="product"
                        className="w-20 h-20 rounded-md object-cover"
                      />
                      <div>
                        <h5 className="text-lg font-semibold text-gray-800">
                          {productData?.name}
                        </h5>
                        <p className="text-gray-600 text-sm">
                          Color: {item.color}
                        </p>
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.color, 0)
                          }
                          className="text-red-500 text-sm flex items-center mt-1"
                        >
                          <FaRegWindowClose className="mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Quantity and Price */}
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 border rounded-md px-3 py-1">
                        <button
                          onClick={() => decrement(item._id, item.color)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <FaMinus />
                        </button>
                        <p className="font-medium">{quantities[key]}</p>
                        <button
                          onClick={() => increment(item._id, item.color)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <FaPlus />
                        </button>
                      </div>
                      <h4 className="font-semibold text-gray-800">
                        {currency} {productData?.price}
                      </h4>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-600">
                Your cart is empty. Start shopping!
              </p>
            )}
          </div>

          {/* Checkout Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <CartTotal />
            <button
              disabled={cartData.length === 0}
              onClick={() => cartData.length > 0 && navigate("/place-order")}
              className="w-full mt-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
            >
              {cartData.length === 0
                ? "Please add items to proceed."
                : "Proceed to Checkout"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Cart;
