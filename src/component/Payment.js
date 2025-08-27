import React, { useContext, useEffect, useState } from "react"; 
import ShoppingContext from "../Context/shopping/shoppingContext";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { Link, useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from './axios';
import CurrencyFormat from "react-currency-format"; 
import { db } from '../firebase';

const Payment = () => {
  const shoppingContext = useContext(ShoppingContext);
  const { basket, user, emptyBasket, getBasketTotal } = shoppingContext;

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false); // Set to false by default
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const response = await axios({
          method: 'POST',
          url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
        // Provide user-friendly error message
        setError("There was an issue processing your payment. Please try again.");
      }
    };

    if (basket.length > 0) {
      getClientSecret();
    }
  }, [basket, getBasketTotal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true); // Start processing

    if (!clientSecret) {
      setError("Client secret is invalid. Please refresh and try again.");
      setProcessing(false);
      return;
    }

    try {
      const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (stripeError) {
        // Log specific error details for debugging
        console.error("Stripe error:", stripeError);
        setError("Payment failed. Please check your payment details and try again.");
        setProcessing(false);
        return;
      }

      // Store order in Firestore after successful payment
      await db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      // Success: update UI
      setSucceeded(true);
      setError(null);
      setProcessing(false);
      emptyBasket();
      navigate("/orders"); // Corrected typo
    } catch (error) {
      // Log unexpected errors for debugging
      console.error("Unexpected error:", error);
      setError("An unexpected error occurred. Please try again.");
      setProcessing(false);
    }
  };

  const handleOnChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout <Link to="/checkout">{basket?.length} items</Link>
        </h1>

        {/* Delivery Address Section */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{user?.email}</p>
            <p>123 Ruler Road</p>
            <p>Ashley Gardens</p>
            <p>Pretoria</p>
          </div>
        </div>

        {/* Review Items and Delivery Section */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment_item">
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
        </div>

        {/* Payment Method Section */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleOnChange} />
              <div className="payment_priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && (
                <div className="error" style={{ color: "red", marginTop: "10px" }}>
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
