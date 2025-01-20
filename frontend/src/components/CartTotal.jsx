import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const CartTotal = () => {
  const { currency, getTotalAmount, deliveryCharge } = useContext(ShopContext);

  return (
    <section className="w-full">
      <h2 className="text-3xl">
        <span className="font-bold">Cart</span>
        <span className="underline ml-2">Total</span>
      </h2>
      <div>
        <h5>SubTotal: {currency}{getTotalAmount()}.00</h5>
        <p>Shipping Fee: {getTotalAmount() === 0 ? '0.00' : `${currency}${deliveryCharge}`}</p>
        <p>Total: {getTotalAmount() === 0 ? '0.00' :  getTotalAmount() + deliveryCharge}</p>
      </div>
    </section>
  );
};

export default CartTotal;
