import { useReducer } from "react";
import ShoppingContext from "./shoppingContext";
import { shoppingReducer } from "../shopping/ShoppingReducer";


export const ShoppingState = (props) => {
  const initialState = {
    basket: JSON.parse(localStorage.getItem('basket')) || [],
    user: null,
  };

  const [state, dispatch] = useReducer(shoppingReducer, initialState);

  // Calculate the total price of items in the basket
  const getBasketTotal = (basket) => {
    return basket?.reduce((amount, item) => {
      // Ensure the price is a valid number
      const price = parseFloat(item.item.price.replace('$', ''));
      return amount + (isNaN(price) ? 0 : price);
    }, 0);
  };

  // Add an item to the basket
  const addToBasket = async (item) => {
    dispatch({
      type: "ADD_TO_BASKET",
      payload: item,
    });
  };

  // Set the user in the state
  const setUser = (user) => {
    dispatch({
      type: "SET_USER",
      payload: user,
    });
  };

  // Remove an item from the basket
  const removeFromBasket = (item) => {
    dispatch({ type: "REMOVE_FROM_BASKET", payload: item });
  };

  return (
    <ShoppingContext.Provider
      value={{
        basket: state.basket,
        user: state.user,
        getBasketTotal,
        addToBasket,
        setUser,
        removeFromBasket,
      }}
    >
      {props.children}
    </ShoppingContext.Provider>
  );
};
