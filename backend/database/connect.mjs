import { MongoClient } from "mongodb";
import dotenv from 'dotenv'
dotenv.config();

const uri = process.env.MONGODB_CONNECTION_URI;
const databaseName = process.env.DATABASE_NAME;

let client;
let cachedClient = null;

async function connectToDatabase() {

  if (cachedClient) {
    console.log(" \n CachedClient");
    let db = cachedClient.db(databaseName);
    return db;
  }

  try {
    client = new MongoClient(uri);
    // connect the client 
    await client.connect();
    console.log("\n Successfully Connected \n");

    cachedClient = client;
    let db = client.db(databaseName);
    return db;
  }
  catch (error) {
    console.log("\nError connecting to the database");
    console.log(error);
  }
}


export default connectToDatabase;