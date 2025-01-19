import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRoute from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cookieParser from "cookie-parser";
import cartRouter from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";

// Config env
dotenv.config();

// Database and Cloudinary Config
connectDB();
connectCloudinary();

// Create the Express app
const app = express();

// Middlewares
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/user', userRoute);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRoute);

// Endpoints
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Export app to be handled by Vercel
export default app;
