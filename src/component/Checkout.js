import "./Checkout.css";
import React, { useContext } from "react";
import ShoppingContext from "../Context/shopping/shoppingContext";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";

const Checkout = () => {
  const shoppingContext = useContext(ShoppingContext);
  const { basket, user } = shoppingContext;

  return (
    <div className="checkout">
      <div className="checkout_content">
        <h3>Hello, {user?.email}</h3>
        <h2 className="checkout_title"> Your Shopping Basket</h2>

        {basket.map((item) => (
          <CheckoutProduct
            key={item.item.id}
            id={item.item.id}
            title={item.item.title}
            image={item.item.image}
            price={item.item.price}
            rating={item.item.rating}
          />
        ))}
      </div>

      <div className="checkout_right">
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;
