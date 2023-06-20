import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDb } from "../addMeetup";

const mongodbConnectionString: string =
  "mongodb://127.0.0.1:27017/next-tutorail";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await connectToDb();
  if (req?.method == "GET") {
    try {
      const usersCollection = db.collection("users");

      console.log("Collection: " + usersCollection);

      const result = await usersCollection.find({}).toArray();

      console.log("users List: " + JSON.stringify(result));

      return res.status(200).json({ users: result });
    } catch (error) {
      console.log("error: " + error);
    }
  }
};

export default handler;
