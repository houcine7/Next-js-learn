import axios from "axios";
import { Client, getLagoError } from "lago-javascript-client";
import { NextApiRequest, NextApiResponse } from "next";

const lagoClient = Client(process.env.NEXT_PUBLIC_LAGO_KEY_API || "", {
  baseUrl: "https://api-lago.dreeam.io/api/v1",
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "GET") {
    //
    try {
      const respone = await lagoClient.events.createEvent({
        event: {
          transaction_id: "tras_123456abc-edit",
          external_customer_id: "cus_13NkmmmmM44",
          external_subscription_id: "subscription_Lmfkjnfdjffeiu",
          code: "test_caller_test_ft",
          timestamp: Math.floor(Date.now() / 1000),
          properties: {
            storage_used_test: 2,
          },
        },
      });
      console.log("event created");

      return res.status(200).json(respone);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Something went wrong !!" });
    }
  }
}

export default handler;
