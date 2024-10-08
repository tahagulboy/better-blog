import { GetServerSideProps } from 'next';
import { MongoClient, ObjectId } from 'mongodb';

// Define the props interface
interface PostProps {
  post: {
    Title: string;
    Desc: string;
    Author: string;
    Date: string;
    Content: string;
    CategoryID: string;
  };
}

// Fetch post data from MongoDB based on the post ID
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const client = new MongoClient(process.env.MONGODB_URI!);

  try {
    await client.connect();
    const db = client.db('better-blog');
    const post = await db.collection('posts').findOne({ _id: new ObjectId(id as string) });

    // Check if post exists
    if (!post) {
      return {
        notFound: true, // Return a 404 page if post not found
      };
    }

    return {
      props: {
        post: JSON.parse(JSON.stringify(post)), // Convert BSON to JSON
      },
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return {
      notFound: true, // Return a 404 page on error
    };
  } finally {
    await client.close();
  }
};

// Post page component
export default function PostPage({ post }: PostProps) {
  return (
    <div className="container">
      <article>
        <h1>{post.Title}</h1>
        <p>{post.Desc}</p>
        <div className="post-meta">
          <span>By {post.Author}</span>
          <span>{post.Date}</span>
        </div>
        <div className="post-content">
          <p>{post.Content}</p>
        </div>
      </article>
    </div>
  );
}