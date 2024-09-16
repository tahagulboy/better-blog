import { MongoClient } from 'mongodb';

// MongoDB connection details
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function getCategories() {
  try {
    await client.connect();
    const db = client.db('better-blog'); // Replace with your database name
    const categories = await db.collection('Posts').find().toArray();
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