import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

const Orders = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load orders for the authenticated user
  const loadOrderData = async () => {
    setLoading(true);
    setError("");

    try {
      if (!isAuthenticated || !user) return;

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/order/userOrders/${user._id}`
      );
      if (response?.data?.success) {
        const allOrders = response?.data?.orders.flatMap((order) =>
          order?.items.map((item) => ({
            ...item,
            status: order.status,
            payment: order.payment,
            paymentMethod: order.paymentMethod,
            date: order.date,
            orderId: order._id,
          }))
        );
        setOrderData(allOrders.reverse());
      } else {
        setError("Failed to fetch orders.");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("An error occurred while fetching orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [user]);

  // Cancel an order
  const cancelOrder = async (orderId) => {
    try {
      if (!orderId) {
        console.error("Order ID is missing!");
        return;
      }

      console.log("Canceling order with ID:", orderId);
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/order/cancelOrder/${orderId}`,
        { userId: user?._id }
      );

      console.log("Cancel Response:", response?.data);
      if (response?.data?.success) {
        toast.success("Order canceled successfully!");
        loadOrderData();
      } else {
        toast.error("Failed to cancel the order. Please try again.");
      }
    } catch (err) {
      console.error("Error canceling order:", err);
      toast("An error occurred while canceling the order.");
    }
  };

  // Get status CSS classes
  const getStatusClass = (status) => {
    switch (status) {
      case "Order Placed":
        return "bg-yellow-500 text-white";
      case "Packing":
        return "bg-blue-500 text-white";
      case "Shipped":
        return "bg-green-500 text-white";
      case "Out For Delivery":
        return "bg-orange-500 text-white";
      case "Delivered":
        return "bg-teal-500 text-white";
      case "Canceled":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-6 lg:px-12 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        <span className="font-bold">Your</span>
        <span className="underline ml-2">Orders</span>
      </h2>

      {loading ? (
        <div className="text-center py-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-500 text-sm">Loading orders...</p>
        </div>
      ) : error ? (
        <p className="text-center text-red-500 text-sm">{error}</p>
      ) : orderData.length === 0 ? (
        <p className="text-center text-gray-500 text-sm">
          You have no orders yet.
        </p>
      ) : (
        <div className="space-y-6">
          {orderData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center justify-between bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Left Side: Image and Product Info */}
              <div className="flex items-center space-x-4 w-full sm:w-3/4">
                <img
                  src={item?.image}
                  alt={item?.name}
                  className="w-20 h-20 object-cover rounded-md border"
                />
                <div className="text-sm">
                  <h3 className="font-semibold text-gray-800">{item?.name}</h3>
                  <div className="flex flex-col gap-2 mt-2">
                    <p className="text-gray-600">
                      Price:{" "}
                      <span className="font-medium">
                        {currency} {item?.price}
                      </span>
                    </p>
                    <p className="text-gray-600">
                      Quantity:{" "}
                      <span className="font-medium">{item?.quantity}</span>
                    </p>
                    <p className="text-gray-600">
                      Color: <span className="font-medium">{item?.color}</span>
                    </p>
                    <p className="text-gray-600 mt-1">
                      Date:{" "}
                      <span className="font-medium">
                        {new Date(item?.date).toDateString()}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side: Status and Cancel Button */}
              <div className=" w-full sm:w-1/4 text-center sm:text-right flex flex-row items-center gap-4">
                <span
                  className={`inline-block px-4 py-2 rounded-lg font-semibold ${getStatusClass(
                    item?.status
                  )}`}
                >
                  {item?.status}
                </span>
                {item?.status === "Order Placed" && (
                  <button
                    onClick={() => cancelOrder(item?.orderId)}
                    className="inline-block px-4 py-2 text-sm font-semibold text-red-600 bg-red-100 rounded-lg hover:bg-red-200"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
