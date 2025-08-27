import React, { useContext } from "react";
import "./Subtotal.css";
import ShoppingContext from "../Context/shopping/shoppingContext";
import { useNavigate } from "react-router-dom";

const Subtotal = () => {
  const shoppingContext = useContext(ShoppingContext);
  const { basket, getBasketTotal } = shoppingContext;

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/payment');
  };

  return (
    <div className="subtotal">
      <p>
        Total ({basket.length} items:{" "}
        <strong>${getBasketTotal(basket)}</strong>)
      </p>
      
      <small className="subtotal_gift">
        <input type="checkbox" />
        This order contains a gift
      </small>
      
      <button onClick={handleCheckout}>Proceed to checkout</button>
    </div>
  );
};

export default Subtotal;
