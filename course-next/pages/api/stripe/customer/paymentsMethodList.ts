// create a pod method to create a customer in stripe
import { NextApiRequest, NextApiResponse } from "next";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_PRIVATE_KEY);

async function handler(req: NextApiRequest, res: NextApiResponse) {}

export default handler;
