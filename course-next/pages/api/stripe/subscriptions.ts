// create subscription
import { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_PRIVATE_KEY);

const priceId = process.env.NEXT_PUBLIC_PRICE_ID;

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { customerId } = req.body;

    //create a customer in stripe
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
    });

    console.log("subscription", subscription);

    //return the customer id
    return res.status(200).json({ id: subscription.id });
  }
}

export default handler;
