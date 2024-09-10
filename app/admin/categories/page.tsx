// app/admin/categories/page.tsx

"use client"; // Add this line at the top

import { useState } from 'react';

const ManageCategories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Technology' },
  ]);

  const handleDelete = (id: number) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  return (
    <div className="container">
      <h1>Manage Categories</h1>
      <button className="btn btn-primary mb-3">Add New Category</button>
      <ul className="list-group">
        {categories.map(category => (
          <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
            {category.name}
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(category.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCategories;