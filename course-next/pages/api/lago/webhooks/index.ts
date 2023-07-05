import axios from "axios";
import { Client, getLagoError } from "lago-javascript-client";
import { NextApiRequest, NextApiResponse } from "next";

const Cors = require("cors");

function initMiddleware(middleware: any) {
  return (req: any, res: any) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

const cors = initMiddleware(
  Cors({
    methods: ["POST", "GET"],
  })
);

const lagoClient = Client(process.env.NEXT_PUBLIC_LAGO_KEY_API || "", {
  baseUrl: "https://api-lago.dreeam.io/api/v1",
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);

  if (req.method == "POST") {
    //
    try {
      const webhook = req.body;

      console.log("weeb hook called");

      console.log(webhook);

      return res.status(200).json("received");
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Something went wrong !!" });
    }
  }

  //
  if (req.method == "GET") {
    //
    try {
      console.log("weeb hook called");
      console.log("time:" + new Date());

      return res.status(200).json("received");
    } catch (err) {
      console.log("ERROR :" + err);
      return res.status(500).json({ error: "Something went wrong !!" });
    }
  }
}

export default handler;
