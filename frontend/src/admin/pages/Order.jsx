import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { TfiPackage } from "react-icons/tfi";
import { ShopContext } from "../../context/ShopContext";

const Order = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { currency } = useContext(ShopContext);
  const [orders, setOrders] = useState();

  const fetchAllOrders = async () => {
    if (!isAuthenticated || !user) {
      return null;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/order/allOrders/`
      );
      if (response?.data?.success) {
        setOrders(response?.data?.orders);
        console.log(response?.data?.orders);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/order/status`,
        { orderId, status: e.target.value }
      );
      if (response?.data?.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Display title only if there are orders */}
      {orders && orders.length > 0 && (
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
      )}

      <div className="space-y-4">
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr] gap-4 items-start p-3 text-gray-700 bg-white rounded-lg shadow-md"
            >
              {/* Icon */}
              <div className="flex justify-center items-center">
                <TfiPackage />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <div>Items:</div>
                  <div>
                    {order.items.map((item, i) => (
                      <p key={i}>
                        {item.name} x {item.quantity}
                        <span>"{item.color}"</span>
                      </p>
                    ))}
                  </div>
                </div>
                <p>
                  <span>Name:</span>{" "}
                  <span>
                    {order.address.firstName + " " + order.address.lastName}
                  </span>
                </p>
                <p>
                  <span>Address:</span> <span>{order.address.street + " "}</span>
                  <span>
                    {order.address.city +
                      " " +
                      order.address.state +
                      " " +
                      order.address.country +
                      " " +
                      order.address.zip}
                  </span>
                </p>
                <p>
                  <span>Phone:</span> <span>{order.address.phone}</span>
                </p>
              </div>
              <div>
                <p>Total: {order.items.length}</p>
                <p>Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment ? "Done" : "Pending"}</p>
                <p>Date: {new Date(order.date).toDateString()}</p>
              </div>
              <p>
                {currency}
                {order.amount}
              </p>
              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
                className="text-sm font-semibold p-1 ring-1 ring-slate-900/5 rounded max-w-36 bg-primary"
              >
                <option value="Order placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            <p className="text-lg font-semibold">
              No orders available at the moment. Admin, please check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
