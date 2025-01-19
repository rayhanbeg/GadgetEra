import { createContext, useEffect, useState } from "react";
export const ShopContext = createContext();
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

const ShopContextProvider = (props) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const currency = "$";
  const deliveryCharge = 5;

  // Adding to cart
  const addToCart = async (itemId, color) => {
    if (!color) {
      return toast.error("Please select a color");
    }

    let cartData = structuredClone(cartItems);
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
    setCartItems(cartData);

    if (isAuthenticated) {
      try {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/cart/add`, {
          itemId, color, userId:user._id
        })
        toast.success("Added to cart");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    }
  };

  // Getting Card Count
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalCount;
  };


//   Updating the quantity of the Cart items
const updateQuantity = async (itemId, color, quantity) => {
  // Ensure item and color exist in the cart
  if (!cartItems[itemId] || !cartItems[itemId][color]) {
    return toast.error("Item or color not found in the cart");
  }

  // Validate quantity
  // if (quantity < 1) {
  //   return toast.error("Quantity must be at least 1");
  // }

  // Clone and update cart data
  let cartData = structuredClone(cartItems);
  cartData[itemId][color] = quantity;
  setCartItems(cartData); // Update local state

  // Sync with backend if authenticated
  if (isAuthenticated) {
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/cart/update`, {
        itemId,
        color,
        quantity,
        userId: user._id,
      });
    } catch (error) {
      console.error("Error updating cart:", error);
      
    }
  }
};


// Getting total cart amount
const getTotalAmount = () => {
  let totalAmount = 0;
  for (const items in cartItems) {
    let itemInfo = products.find((product) => product._id === items);
    if (itemInfo) { // Check if itemInfo is defined
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          console.error("Error calculating total amount:", error);
        }
      }
    } else {
      console.warn(`Product with ID ${items} not found in products.`);
    }
  }
  return totalAmount;
};



  // Get Product List
  const getProductData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/product/list`);
       setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  }


  // Get UserCart
  const getUserCart = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/cart/getUserCart/${user._id}`);
      setCartItems(response.data.cartData);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }


  useEffect(() => {
    getProductData();
    if (isAuthenticated) {
        getUserCart(); // Ensure the function is called
    }
}, [isAuthenticated]); // Add isAuthenticated as a dependency


  const value = {
    products,
    search,
    setSearch,
    currency,
    deliveryCharge,
    addToCart,
    setCartItems,
    getCartCount,
    cartItems,
    updateQuantity,
    getTotalAmount,
    navigate,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
