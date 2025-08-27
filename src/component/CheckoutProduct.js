import React, { useContext } from "react";
import ShoppingContext from "../Context/shopping/shoppingContext";
import "./CheckoutProduct.css";

const CheckoutProduct = ({ id, image, title, rating, price, hideButton }) => {
  const shoppingContext = useContext(ShoppingContext);
  const { removeFromBasket } = shoppingContext;

  const removeFromBasketHandler = () => {
    removeFromBasket({ id });
  };

  return (
    <div className="checkout_product">
      <img className="checkout_product_image" src={image} alt={title} />

      <div className="checkout_product_info">
        <p className="checkout_product_title">{title}</p>

        <div className="checkout_product_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>★</p>
            ))}
        </div>

        <p className="checkout_product_price">{price}</p>

        <div className="remove_product_button">
          {!hideButton && (
            <button onClick={removeFromBasketHandler}>
              Remove From Basket
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutProduct;
