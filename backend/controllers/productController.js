import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    const { name, price, category, colors, popular, description } = req.body;
    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];
    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );
    //Upload Images to Cloudinary
    let imagesUrl;
    if (images.length > 0) {
      imagesUrl = await Promise.all(
        images.map(async (item) => {
          const result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          });
          return result.secure_url;
        })
      );
    } else {
      // Default images url if no images provided
      imagesUrl = ["https://via.placeholder.com/150"];
    }

    // Create Product Data
    const productData = {
      name,
      description,
      price,
      category,
      popular: popular == "true" ? true : false,
      colors: colors ? JSON.parse(colors) : [],
      image: imagesUrl,
      date: Date.now(),
    };
    console.log(productData);

    const product = new productModel(productData);
    await product.save();
    res.json({ success: true, message: "Added Product" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted Product" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({})
    res.json({success: true, products})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const singleProduct = async (req, res) => {
  try {
    const {id} = req.body
    const product = await productModel.findById(id)
    res.json({success: true, product})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



const updateProduct = async (req, res) => {
  try {
    const { id, name, price, category, colors, popular, description } = req.body;
    const images = [req.files?.image1?.[0], req.files?.image2?.[0], req.files?.image3?.[0], req.files?.image4?.[0]].filter(Boolean);

    const imagesUrl = images.length > 0 ? await uploadImagesToCloudinary(images) : null;

    const updateData = {
      name,
      price,
      category,
      popular: popular === "true",
      colors: colors ? JSON.parse(colors) : [],
      description,
    };

    if (imagesUrl) updateData.image = imagesUrl;

    const updatedProduct = await productModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error updating product" });
  }
};


export { addProduct, removeProduct, listProducts, singleProduct, updateProduct };
