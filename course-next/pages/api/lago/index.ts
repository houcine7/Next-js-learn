import axios from "axios";
import { Client, getLagoError } from "lago-javascript-client";
import { NextApiRequest, NextApiResponse } from "next";

const lagoClient = Client("f26062e7-9a0a-4a7b-901f-73f53bc28d64", {
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
            Authorization: "Bearer f26062e7-9a0a-4a7b-901f-73f53bc28d64",
          },
        }
      );
      //console.log(response);

      return res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
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
      res.status(500).json(err);
    }
  }
}

export default handler;
