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
  } else if (req.method == "PUT") {
    try {
      const { paymentMethodId, customerId } = req.body;

      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customerId,
      });
      const result = await stripe.customers.update(customerId, {
        invoice_settings: { default_payment_method: paymentMethodId },
      });
      //console.log(result);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  }
}

export default handler;
