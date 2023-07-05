// create a pod method to create a customer in stripe

import { NextApiRequest, NextApiResponse } from "next";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_PRIVATE_KEY);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //
  if (req.method == "GET") {
    try {
      const { customerId } = req.query;

      // create a payment method for a customer
      if (customerId) {
        const paymentMethods = await stripe.paymentMethods.list({
          customer: customerId as string,
          type: "card",
        });
        return res.status(200).json(paymentMethods.data[0].id);
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Unexpected error" });
    }
  }

  if (req.method == "POST") {
    try {
      const { customerId, paymentMethodId } = req.body;

      const response = await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customerId,
      });

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Unexpected error" });
    }
  }
}

export default handler;
