import axios from "axios";
import { Client, getLagoError } from "lago-javascript-client";
import { NextApiRequest, NextApiResponse } from "next";

const lagoClient = Client(process.env.NEXT_PUBLIC_LAGO_KEY_API || "", {
  baseUrl: "https://api-lago.dreeam.io/api/v1",
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // create billable metric in lago for a post request

  if (req.method == "GET") {
    try {
      const response = await axios.get(
        "https://api-lago.dreeam.io/api/v1/customers",
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_LAGO_KEY_API}`,
          },
        }
      );
      return res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Something went wrong !!" });
    }
  } else if (req.method == "POST") {
    //
    try {
      const { customerObject } = req.body;
      console.log(customerObject);

      const { data } = await lagoClient.customers.createCustomer({
        customer: customerObject,
      });
      const customer = data.customer;
      return res.status(201).json({
        external_id: customer.external_id,
        provider_customer_id:
          customer.billing_configuration?.provider_customer_id,
        payment_provider: customer.billing_configuration?.payment_provider,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Something went wrong !!" });
    }
  }
}

export default handler;
