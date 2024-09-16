import { MongoClient } from 'mongodb';

// Replace the URI string with your MongoDB connection string
const uri = 'mongodb://localhost:27017'; // For local MongoDB
// or for MongoDB Atlas use: const uri = 'mongodb+srv://username:password@cluster.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db('better-blog'); // Replace with your database name
    return db;
  } catch (error) {
    console.error(error);
  }
}