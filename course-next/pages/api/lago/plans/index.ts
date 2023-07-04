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
      const response = await axios.get(
        "https://api-lago.dreeam.io/api/v1/plans",
        {
          headers: {
            Authorization: "Bearer f26062e7-9a0a-4a7b-901f-73f53bc28d64",
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
      const plan = req.body;

      console.log(plan.plan);

      const { data } = await lagoClient.plans.createPlan({
        plan: {
          ...plan.plan,
        },
      });
      return res.status(200).json(data);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Something went wrong !!" });
    }
  }
}

export default handler;
