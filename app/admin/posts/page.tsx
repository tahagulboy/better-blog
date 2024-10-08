"use client"; // Add this directive to mark this component as a client component

import { useRouter } from 'next/navigation'; // Use 'next/navigation' for client-side routing
import { useEffect, useState } from 'react';

// Define types for post and category data
interface Post {
  PostID: number; // Updated to integer
  Title: string;
  Desc: string;
  Author: string;
  Date: string; // Keep as string, but this will represent a date type
  Content: string;
  CategoryID: number; // Updated to integer
}

interface Category {
  CategoryID: number; // Updated to integer
  CategoryName: string;
}

const ManagePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data: Post[] = await response.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPosts();
    fetchCategories();
  }, []);

  const handleDelete = async (postId: number) => { // PostID is now a number
    try {
      const response = await fetch(`/api/posts/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: postId }),
      });
  
      if (response.ok) {
        // Post successfully deleted
        alert('Post deleted successfully');
        // Optionally navigate back to another page (e.g., admin dashboard)
        router.push('/admin/posts');
      } else {
        // Handle error case
        const errorData = await response.json();
        alert(`Failed to delete post: ${errorData.message}`);
      }
    } catch (error) {
      console.error('An error occurred while deleting the post:', error);
      alert('An error occurred while deleting the post');
    }
  };

  // Map category IDs to names
  const categoryMap = categories.reduce((map: Record<number, string>, category: Category) => {
    map[category.CategoryID] = category.CategoryName;
    return map;
  }, {});

  // Helper function to format dates
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container">
      <h1>Manage Posts</h1>
      <button 
        className="btn btn-primary mb-3" 
        onClick={() => router.push('/admin/posts/add')}
      >
        Add New Post
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Author</th>
            <th>Date</th>
            <th>Content</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.PostID}>
              <td>{post.Title}</td>
              <td>{post.Desc}</td>
              <td>{post.Author}</td>
              <td>{formatDate(post.Date)}</td> {/* Format the date */}
              <td>{post.Content}</td>
              <td>{categoryMap[post.CategoryID] || 'Unknown'}</td>
              <td>
                <button 
                  className="btn btn-warning btn-sm" 
                  onClick={() => router.push(`/admin/posts/edit/${post.PostID}`)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-danger btn-sm" 
                  onClick={() => handleDelete(post.PostID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePosts;