import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://tgulboy52:NsmtGX6Je7tQDstn@cluster0.qucfh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&tls=true";
const client = new MongoClient(uri);

interface PostData {
  PostID: number; // Include PostID in the interface
  Title: string;
  Desc: string;
  Author: string;
  Date: string;
  Content: string;
  CategoryID: number; // Use `number` instead of `Number`
}

async function createPost(data: PostData) {
  try {
    await client.connect();
    const db = client.db('better-blog');

    // Fetch the highest PostID
    const lastPost = await db.collection('posts').find().sort({ PostID: -1 }).limit(1).toArray();
    const newPostID = lastPost.length > 0 ? lastPost[0].PostID + 1 : 1; // Increment the last PostID or start from 1

    // Assign the new PostID to the data
    data.PostID = newPostID;

    // Insert the new post
    await db.collection('posts').insertOne(data);
  } finally {
    await client.close();
  }
}

export async function POST(request: Request) {
  const data: Omit<PostData, 'PostID'> = await request.json(); // Exclude PostID from incoming data

  // Create the post without PostID initially
  const postData: PostData = {
    PostID: 0, // Placeholder, will be updated in createPost
    ...data
  };

  try {
    await createPost(postData);
    return NextResponse.json({ message: 'Post created' });
  } catch (error) {
    return NextResponse.error();
  }
}
