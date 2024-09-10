// app/admin/posts/page.tsx

"use client"; // Add this line at the top

import { useState } from 'react';

const ManagePosts = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: 'Sample Post', category: 'Technology', date: 'Sep 10' },
  ]);

  const handleDelete = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <div className="container">
      <h1>Manage Posts</h1>
      <button className="btn btn-primary mb-3">Add New Post</button>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.category}</td>
              <td>{post.date}</td>
              <td>
                <button className="btn btn-warning btn-sm">Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(post.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePosts;