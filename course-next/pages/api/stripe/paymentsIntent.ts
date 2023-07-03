import { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_PRIVATE_KEY);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { customerId, subscriptionId } = req.body;

      const customer = await stripe.customers.retrieve(customerId);

      // Retrieve the subscription to ensure it exists
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);

      // Create a payment intent for the subscription
      const paymentIntent = await stripe.paymentIntents.create({
        amount: subscription.items.data[0].price.unit_amount,
        currency: subscription.items.data[0].price.currency,
        // add payment method with card to this intent
        payment_method_types: ["card"],
        //add subsctiption id to this intent
        setup_future_usage: "off_session",
        customer: customerId,
      });

      // Return the client secret to the client
      return res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.log(error);
      return res.json({ error: "unexpected error" });
    }
  }
}

export default handler;
