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
      console.log("called");
      const response = await axios.get(
        "https://api-lago.dreeam.io/api/v1/billable_metrics",
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_LAGO_KEY_API}`,
          },
        }
      );
      //console.log(response);

      return res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Something went wrong !!" });
    }
  } else if (req.method == "POST") {
    //
    try {
      const { billableMetrics } = req.body;
      console.log(billableMetrics);

      const { data } = await lagoClient.billableMetrics.createBillableMetric(
        billableMetrics
      );
      return res.status(200).json(data);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Something went wrong !!" });
    }
  }
}

export default handler;
