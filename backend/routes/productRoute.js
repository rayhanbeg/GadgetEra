import express from "express";
import { addProduct, listProducts, listProductss, removeProduct, singleProduct, updateProduct } from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import { authenticateUser, authorizeAdmin } from "../middleware/authMiddleware.js";

const productRouter = express.Router();

// Add a new product with images
productRouter.post(
    "/add", 
    upload.fields([
        { name: "image1", maxCount: 1 },
        { name: "image2", maxCount: 1 },
        { name: "image3", maxCount: 1 },
        { name: "image4", maxCount: 1 },
    ]),
    addProduct
);
productRouter.delete('/remove/:id', removeProduct)
productRouter.get('/list', listProducts)
productRouter.get('/listProducts', listProductss)
productRouter.put(
    "/update",
    upload.fields([
      { name: "image1", maxCount: 1 },
      { name: "image2", maxCount: 1 },
      { name: "image3", maxCount: 1 },
      { name: "image4", maxCount: 1 },
    ]),
    updateProduct
  );
  
productRouter.get('/single', singleProduct)


export default productRouter