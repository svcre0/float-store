import React, { useEffect, useState, useContext } from 'react';
import { db } from "../firebase";
import ShoppingContext from "../Context/shopping/shoppingContext";
import './Orders.css'; 

const Orders = () => {
  const { user } = useContext(ShoppingContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user?.uid) {
        try {
          const ordersRef = db.collection("user").doc(user.uid).collection("orders");
          const snapshot = await ordersRef.get();
          const fetchedOrders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setOrders(fetchedOrders);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    };
    fetchOrders();
  }, [user]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__list">
        {orders.map(order => (
          <div key={order.id} className="orders__order">
            <h2>Order ID: {order.id}</h2>
            <p>Amount: ${order.amount / 100}</p>
            <p>Created: {new Date(order.created * 1000).toLocaleString()}</p>

            <div className="orders__items">
              {order.basket.map((itemWrapper, index) => {
                const item = itemWrapper.item; // Access the item details
                return (
                  <div key={index} className="orders__item">
                    <img src={item.image} alt={item.title} className="orders__itemImage" />
                    <div className="orders__itemDetails">
                      <h3>{item.title}</h3>
                      <p>Price: {item.price}</p>
                      <p>Rating: {item.rating}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
