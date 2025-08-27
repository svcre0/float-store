const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
    "sk_test_51Q0F5l03osImxnaMpgQ5DiusGhSpfRPa1TXsEh6F1E2is" + 
    "YgvSo5pBphevBTVkxSC57chpVbo9GGiYuGMSJjuqE0900OEAdxUtg");

  
const app = express();

app.use(cors({origin: true}));
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).send("Backend Running");
});

// Payment Creation Route
app.post("/payments/create", async (req, res) => {
  const total = req.query.total;

  console.log("Payment Request Received for this amount >>> ", total);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    // Respond with the client secret
    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).send({
      error: error.message,
    });
  }
});

// Export the API
exports.api = functions.https.onRequest(app);
