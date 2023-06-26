// create a pod method to create a customer in stripe
import { NextApiRequest, NextApiResponse } from "next";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_PRIVATE_KEY);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email } = req.body;
    //create a customer in stripe
    const customer = await stripe.customers.create({
      email: email,
    });
    //return the customer id
    return res.status(200).json({ id: customer.id });
  }
}

export default handler;
