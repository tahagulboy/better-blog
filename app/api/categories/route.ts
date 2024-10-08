import { MongoClient } from 'mongodb';

// MongoDB connection details
// Make sure to set the following environment variables in Vercel:
// DB_USER, DB_PASS

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qucfh.mongodb.net/better-blog?retryWrites=true&w=majority&appName=Cluster0&tls=true`;
const client = new MongoClient(uri);

async function getCategories() {
  try {
    await client.connect();
    const db = client.db('better-blog'); // Replace with your database name
    const categories = await db.collection('categories').find().toArray();
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