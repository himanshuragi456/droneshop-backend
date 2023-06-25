const { Router } = require('express');
const stripe = require("stripe")('sk_test_51NMpM9SHofiqml0oLlwVOd76idnccvQhVb6bO2YBAed3zhICYBtkex9RHpwrEiendpGV9pWXzcEjw5HMBa2cUws900jRCz7BIg')

const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
  };

const router = Router();

router.post('/intent', async (req, res) => {
    const { items } = req.body;
  
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });

module.exports = router;
