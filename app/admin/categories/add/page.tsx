"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/categories/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          CategoryName: categoryName, // Send the category name to the API
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create category');
      }

      // After the category is successfully created, redirect back or display a success message
      router.push('/admin/categories'); // Replace with your redirect page or message
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  return (
    <div className="container">
      <h1>Add New Category</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Category Name</label>
          <input
            type="text"
            className="form-control"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;