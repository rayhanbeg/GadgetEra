import userModel from "../models/userModel.js";

const addCart = async (req, res) => {
  try {
    const { userId, itemId, color } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData;
    if (cartData[itemId]) {
      if (cartData[itemId][color]) {
        cartData[itemId][color] += 1;
      } else {
        cartData[itemId][color] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][color] = 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, color, quantity } = req.body;

    // Validate the inputs
    if (!userId || !itemId || !color || quantity < 1) {
      return res.status(400).json({ success: false, message: "Invalid inputs" });
    }

    // Fetch user data
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Initialize or update cartData
    let cartData = userData.cartData || {};

    // Ensure item and color exist in cartData
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }
    cartData[itemId][color] = quantity;

    // Save updated cartData
    await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

    res.json({ success: true, message: "Updated cart", cartData });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const getUserCart = async (req, res) => {
  try {
      const { userId } = req.params; // Extract userId from params
      const userData = await userModel.findById(userId);
      if (!userData) {
          return res.status(404).json({ success: false, message: "User not found" });
      }
      res.json({ success: true, cartData: userData.cartData || {} });
  } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
  }
};


export { addCart, updateCart, getUserCart };
