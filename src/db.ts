import { MongoClient } from "mongodb";

const MONGO_URI = "mongodb://127.0.0.1:27017"; // Change this if using a cloud DB
const DB_NAME = "node_assignment";

export let db: any;

export const connectDB = async () => {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  db = client.db(DB_NAME);
  console.log("✅ Connected to MongoDB");
};
