import express from "express";
import {
  allOrders,
  placeOrder,
  placeOrderStripe,
  updateStatus,
  userOrders,
} from "../controllers/orderController.js";

const orderRoute = express.Router();

// For Admin
orderRoute.post("/allOrders", allOrders);
orderRoute.post("/status", updateStatus);

// For Payment
orderRoute.post("/placeOrder", placeOrder);
orderRoute.post("/placeOrderStripe", placeOrderStripe);

// For User
orderRoute.post("/userOrders/:userId", userOrders); 


export default orderRoute;
