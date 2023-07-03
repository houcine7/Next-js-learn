// create a pod method to create a customer in stripe
import { NextApiRequest, NextApiResponse } from "next";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_PRIVATE_KEY);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //
  if (req.method == "PUT") {
    try {
      const { paymentMethodId, customerId } = req.body;
      const response = await stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId, // replace with the ID of the payment method
        },
      });
      //console.log(response);

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Unexpected error" });
    }
  }
}

export default handler;
