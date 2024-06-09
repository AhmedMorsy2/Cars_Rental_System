import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

client
  .connect()
  .then(() => {
    console.log("DataBase Connected Successfully ");
  })
  .catch(() => {
    console.log("Error While Connecting");
  });

export const db = client.db("Assignment7");
