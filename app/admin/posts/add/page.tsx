"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Define Category interface
interface Category {
  CategoryID: number;
  CategoryName: string;
}

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState(''); // Date is handled as a string for now
  const [content, setContent] = useState('');
  const [categoryID, setCategoryID] = useState<number | ''>(''); // CategoryID is an integer
  const [categories, setCategories] = useState<Category[]>([]); // Categories fetched from the server
  const router = useRouter();

  // Fetch categories on component mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories'); // Assuming this endpoint returns all categories
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchCategories();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/posts/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Title: title,
          Desc: desc,
          Author: author,
          Date: date, // Send date as a string
          Content: content,
          CategoryID: categoryID, // CategoryID is an integer
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
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Author</label>
          <input
            type="text"
            className="form-control"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-control"
            value={categoryID}
            onChange={(e) => setCategoryID(parseInt(e.target.value) || '')}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.CategoryID} value={category.CategoryID}>
                {category.CategoryName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Add Post</button>
      </form>
    </div>
  );
};

export default AddPost;