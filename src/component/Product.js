import './Product.css';
import ShoppingContext from '../Context/shopping/shoppingContext';
import React, { useContext } from 'react';

const ProductDetails = ({ id, image, title, rating, price, discount }) => {
  const shoppingContext = useContext(ShoppingContext);
  const { addToBasket } = shoppingContext;

  const addToBasketHandler = () => {
    addToBasket({ item: { id, image, title, rating, price, discount } });
  };

  const numericPrice = parseFloat(price.toString().replace('$', ''));
  const hasDiscount = discount && discount > 0;
  const discountAmount = hasDiscount
    ? (numericPrice * (discount / 100)).toFixed(2)
    : null;
  const discountedPrice = hasDiscount
    ? (numericPrice - discountAmount).toFixed(2)
    : numericPrice.toFixed(2);

  return (
    <div className="product" key={id}>
      <img src={image} alt={title} />
      <div className="product-info">
        <div className="product-rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i} color="black" size={8}>⭐</p>
            ))}
        </div>

        <div className="product-price">
          {hasDiscount ? (
            <>
              <span className="original-price">${numericPrice.toFixed(2)}</span>
              <span className="discounted-price">${discountedPrice}</span>
              <span className="discount-tag">-{discount}%</span>
            </>
          ) : (
            <span className="discounted-price">${discountedPrice}</span>
          )}
        </div>

        {hasDiscount && (
          <div className="you-save">
            You save: ${discountAmount}
          </div>
        )}

        <p className="product-title">{title}</p>

        <button className="product-button" onClick={addToBasketHandler}>
          Add to basket
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
