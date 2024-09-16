"use client"; // Add this directive to mark this component as a client component

import { useRouter } from 'next/navigation'; // Use 'next/navigation' for client-side routing
import { useEffect, useState } from 'react';

// Define types for post and category data
interface Post {
  PostID: string;
  Title: string;
  Desc: string;
  Author: string;
  Date: string;
  Content: string;
  CategoryID: string;
}

interface Category {
  CategoryID: string;
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

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }
      // Refresh the post list after deletion
      setPosts(posts.filter(post => post.PostID !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // Map category IDs to names
  const categoryMap = categories.reduce((map: Record<string, string>, category: Category) => {
    map[category.CategoryID] = category.CategoryName;
    return map;
  }, {});

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
              <td>{post.Date}</td>
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