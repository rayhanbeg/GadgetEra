import { useContext, useState } from "react";
import CartTotal from "../components/CartTotal";
import Footer from "../components/Footer";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { useSelector } from "react-redux";
import { replace } from "react-router-dom";

const PlaceOrder = () => {
  const {user} = useSelector((state) => state.auth)
  const [method, setMethod] = useState("cod");
  const {
    products,
    currency,
    deliveryCharge,
    addToCart,
    setCartItems,
    cartItems,
    getTotalAmount,
    navigate,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!user || !user._id) {
        console.error("User not found or userId is missing");
        return;
      }
  
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.color = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
  
      // Prepare order data
      const orderData = {
        userId: user._id, // Ensure userId is included
        address: formData,
        items: orderItems,
        amount: getTotalAmount() + deliveryCharge,
      };
  
      switch (method) {
        case "cod": {
          const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/order/placeOrder`,
            orderData
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            console.error("Order placement failed:", response.data.message);
          }
          break;
        }
        case "stripe": {
          const responseStripe = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/order/placeOrderStripe`,
            orderData
          );
          if (responseStripe.data.success) {
            const { url } = responseStripe.data; // Updated to correctly extract session URL
            window.location.replace(url); // Redirect to Stripe session
          } else {
            console.error("Stripe session creation failed:", responseStripe.data.message);
          }
          break;
        }
        default:
          console.warn("Unsupported payment method selected.");
          break;
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };
  

  return (
    <section className="bg-gray-100 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Place Your <span className="text-blue-500">Order</span>
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Provide your delivery information and payment details below.
          </p>
        </div>

        <form
          onSubmit={onSubmitHandler}
          className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6"
        >
          {/* Delivery Information */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Delivery <span className="text-blue-500">Information</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <input
                required
                onChange={onChangeHandler}
                value={formData.firstName}
                type="text"
                name="firstName"
                placeholder="First Name"
                className="ring-1 ring-gray-300 p-2 rounded-md w-full text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                required
                onChange={onChangeHandler}
                value={formData.lastName}
                name="lastName"
                type="text"
                placeholder="Last Name"
                className="ring-1 ring-gray-300 p-2 rounded-md w-full text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <input
              required
              onChange={onChangeHandler}
              value={formData.email}
              name="email"
              type="email"
              placeholder="Email Address"
              className="ring-1 ring-gray-300 p-2 rounded-md w-full mb-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              required
              onChange={onChangeHandler}
              value={formData.phone}
              name="phone"
              type="number"
              placeholder="Phone Number"
              className="ring-1 ring-gray-300 p-2 rounded-md w-full mb-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              required
              onChange={onChangeHandler}
              value={formData.street}
              name="street"
              type="text"
              placeholder="Street Address"
              className="ring-1 ring-gray-300 p-2 rounded-md w-full mb-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <input
                required
                onChange={onChangeHandler}
                value={formData.city}
                name="city"
                type="text"
                placeholder="City"
                className="ring-1 ring-gray-300 p-2 rounded-md w-full text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                required
                onChange={onChangeHandler}
                value={formData.state}
                name="state"
                type="text"
                placeholder="State"
                className="ring-1 ring-gray-300 p-2 rounded-md w-full text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                required
                onChange={onChangeHandler}
                value={formData.zip}
                name="zip"
                type="text"
                placeholder="Zip Code"
                className="ring-1 ring-gray-300 p-2 rounded-md w-full text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                required
                onChange={onChangeHandler}
                value={formData.country}
                name="country"
                type="text"
                placeholder="Country"
                className="ring-1 ring-gray-300 p-2 rounded-md w-full text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Order Summary and Payment */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <CartTotal />
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Payment <span className="text-blue-500">Method</span>
              </h3>
              <div className="flex gap-2">
                <div
                  onClick={() => setMethod("stripe")}
                  className={`p-2 rounded-md cursor-pointer border-2 ${
                    method === "stripe"
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                >
                  Stripe
                </div>
                <div
                  onClick={() => setMethod("cod")}
                  className={`p-2 rounded-md cursor-pointer border-2 ${
                    method === "cod" ? "border-blue-500" : "border-transparent"
                  }`}
                >
                  Cash on Delivery
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </section>
  );
};

export default PlaceOrder;
