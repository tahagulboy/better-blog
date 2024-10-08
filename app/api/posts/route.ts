import { MongoClient } from 'mongodb';

// MongoDB connection details
const uri = "mongodb+srv://tgulboy52:NsmtGX6Je7tQDstn@cluster0.qucfh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&tls=true";
const client = new MongoClient(uri);

async function getCategories() {
  try {
    await client.connect();
    const db = client.db('better-blog'); // Replace with your database name
    const categories = await db.collection('posts').find().toArray();
    return categories;
  } finally {
    await client.close();
  }
}

export async function GET() {
  const categories = await getCategories();
  return new Response(JSON.stringify(categories), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}