import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

interface PostData {
  Title: string;
  Desc: string;
  Author: string;
  Date: string;
  Content: string;
  CategoryID: string;
  // Add other fields as needed
}

async function createPost(data: PostData) {
  try {
    await client.connect();
    const db = client.db('better-blog');
    await db.collection('Posts').insertOne(data);
  } finally {
    await client.close();
  }
}

export async function POST(request: Request) {
  const data: PostData = await request.json();
  try {
    await createPost(data);
    return NextResponse.json({ message: 'Post created' });
  } catch (error) {
    return NextResponse.error();
  }
}