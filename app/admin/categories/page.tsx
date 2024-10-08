'use client'; // Add this directive to mark this component as a client component

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter

// Define a type for category data
interface Category {
  CategoryID: string;
  CategoryName: string;
}

function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
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

    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete category');
      }
      // Refresh the category list after deletion
      setCategories(categories.filter(category => category.CategoryID !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCategory = () => {
    router.push('/admin/categories/add'); // Navigate to the Add Category page
  };

  return (
    <div className="container">
      <h1>Manage Categories</h1>
      <button
        className="btn btn-primary mb-3"
        onClick={handleAddCategory} // Redirect when button is clicked
      >
        Add New Category
      </button>
      <ul className="list-group">
        {categories.map(category => (
          <li
            key={category.CategoryID}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {category.CategoryName}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(category.CategoryID)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoriesPage;