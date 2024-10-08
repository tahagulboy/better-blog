import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = "mongodb+srv://tgulboy52:NsmtGX6Je7tQDstn@cluster0.qucfh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function deletePost(id: string) {
  try {
    await client.connect();
    const db = client.db('better-blog');
    const result = await db.collection('posts').deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0; // Return true if a document was deleted
  } finally {
    await client.close();
  }
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  try {
    const isDeleted = await deletePost(id);
    if (isDeleted) {
      return NextResponse.json({ message: 'Post deleted' });
    } else {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.error();
  }
}