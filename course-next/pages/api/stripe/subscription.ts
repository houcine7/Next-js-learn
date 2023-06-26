// create subscription
import { NextApiRequest, NextApiResponse } from "next";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, paymentMethodId, priceId, customerId } = req.body;

    //create a customer in stripe
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      default_payment_method: paymentMethodId,
    });
    //return the customer id
    return res.status(200).json({ id: subscription.id });
  }
}
