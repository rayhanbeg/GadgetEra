import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSelector } from "react-redux";
import axios from "axios";

const Orders = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!isAuthenticated || !user) return null;

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/order/userOrders/${user?._id}`
      );
      if (response?.data?.success) {
        let allOrdersItem = [];
        response?.data?.orders?.map((order) => {
          order?.items?.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Your Orders
      </h1>
      {orderData.length === 0 ? (
        <p className="text-center text-gray-500 text-sm">
          You have no orders yet.
        </p>
      ) : (
        <div className="space-y-6">
          {orderData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg transition-shadow"
            >
              {/* Left Side: Image and Product Info */}
              <div className="flex items-center space-x-4 w-full sm:w-3/4">
                <img
                  src={item?.image}
                  alt={item?.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="text-sm">
                  <h3 className="font-semibold text-gray-800">{item?.name}</h3>
              <div className="flex gap-2">
              <p className="text-gray-600 mt-1">
                    Price: <span className="font-medium">{currency} {item?.price}</span>
                  </p>
                  <p className="text-gray-600 mt-1">
                    Quantity: <span className="font-medium">{item?.quantity}</span>
                  </p>
                  <p className="text-gray-600 mt-1">
                    Color: <span className="font-medium">{item?.color}</span>
                  </p>
              </div>
                  <p className="text-gray-600 mt-1">
                    Date:{" "}
                    <span className="font-medium">
                      {new Date(item?.date).toDateString()}
                    </span>
                  </p>
                  <p className="text-gray-600 mt-1">
                    Payment:{" "}
                    <span className="font-medium">{item?.paymentMethod}</span>
                  </p>
                </div>
              </div>

              {/* Right Side: Status */}
              <div className="mt-4 sm:mt-0 w-full sm:w-1/4 text-right">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    item?.status === "Shipped"
                      ? "bg-green-500 text-white"
                      : item?.status === "Pending"
                      ? "bg-yellow-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {item?.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
