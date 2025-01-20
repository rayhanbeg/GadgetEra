import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import dotenv from 'dotenv';
dotenv.config();

// Global Variables For Payment
const currency = "pkr";
const deliveryCharges = 5;

// Getway Initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, {
      cartData: {},
    });
    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    // Create order data
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,  // Initially set to false, will update after payment is confirmed
      date: Date.now(),
    };

    // Save the new order to the database
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Prepare line items for Stripe
    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 277, // Converting to PKR (ensure the multiplier is correct)
      },
      quantity: item.quantity,
    }));

    // Add delivery charges as a separate item
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharges * 100 * 277, // Converting to PKR
      },
      quantity: 1,
    });

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    // Respond with the session URL
    res.json({ success: true, url: session.url });
  } catch (error) {
    console.error("Error placing order with Stripe:", error);
    res.json({ success: false, message: error.message });
  }
};



const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const userOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await orderModel.find({ userId: { $in: [userId] } }); // Use $in operator for array matching

    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// In your order controller
// In your order controller
const cancelOrder = async (req, res) => {
  const {  userId } = req.body; // Extracting from the request body
  const { orderId } = req.params;

  try {
    // Validate inputs
    if (!orderId || !userId) {
      return res.status(400).json({ success: false, message: "Missing orderId or userId" });
    }

    // Find the order by its ID and user ID
    const order = await orderModel.findOne({ _id: orderId, userId });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Cancel the order
    order.status = "Canceled";
    await order.save();

    res.status(200).json({ success: true, message: "Order canceled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};





export { placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus, cancelOrder };
