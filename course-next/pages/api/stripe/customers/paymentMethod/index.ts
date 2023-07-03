// create a pod method to create a customer in stripe
import { NextApiRequest, NextApiResponse } from "next";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_PRIVATE_KEY);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //
  if (req.method == "GET") {
    try {
      const { customerId } = req.query;
      const paymentMethods = await stripe.paymentMethods.list({
        customer: customerId,
        type: "card",
      });
      return res.status(200).json(paymentMethods.data[0].id);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Unexpected error" });
    }
  }
}

export default handler;
