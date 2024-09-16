"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddPost = () => {
  const [postID, setPostID] = useState(''); // Changed from _id to postID
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [categoryID, setCategoryID] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/posts/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          PostID: postID, // Changed from _id to PostID
          Title: title,
          Desc: desc,
          Author: author,
          Date: date,
          Content: content,
          CategoryID: categoryID,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create post');
      }
      router.push('/admin/posts'); // Redirect to the post list page after successful creation
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Add New Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Post ID</label>
          <input type="text" className="form-control" value={postID} onChange={(e) => setPostID(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" value={desc} onChange={(e) => setDesc(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Author</label>
          <input type="text" className="form-control" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input type="text" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea className="form-control" value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Category ID</label>
          <input type="text" className="form-control" value={categoryID} onChange={(e) => setCategoryID(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Add Post</button>
      </form>
    </div>
  );
};

export default AddPost;