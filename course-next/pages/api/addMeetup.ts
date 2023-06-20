import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const mongodbConnectionString: string =
  "mongodb://127.0.0.1:27017/next-tutorail";

export const connectToDb = async () => {
  const client = await MongoClient.connect(mongodbConnectionString);
  const db = client.db();
  return db;
};

//
async function handler(req: NextApiRequest, res: NextApiResponse) {
  //

  //console.log("heeere");

  const db = await connectToDb();

  if (req?.method === "POST") {
    //get object with object destructing
    const { title, description, image, address } = req?.body;

    const nextTutoCollection = db.collection("next-tutorail");

    const result = await nextTutoCollection.insertOne(req.body);

    return res.status(201).json({ msg: "new document added successfully" });
  }
}

export default handler;
