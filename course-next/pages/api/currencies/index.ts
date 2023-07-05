import { NextApiRequest, NextApiResponse } from "next";
const fs = require("fs");

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // create billable metric in lago for a post request

  if (req.method == "GET") {
    try {
      // read file currencies.json from /data/currencies.json and retrieve data as json object
      const data = fs.readFileSync("data/currencies.json", "utf8");
      const currencies = JSON.parse(data);
      return res.status(200).json(currencies);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Something went wrong !!" });
    }
  }
}

export default handler;
