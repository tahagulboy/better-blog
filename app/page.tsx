"use client"; // Indicate that this is a Client Component

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Define PostData and Category interfaces
interface PostData {
  Title: string;
  Desc: string;
  Author: string;
  Date: string;
  CategoryID: Number;
  ImageSrc?: string;
  PostID: string; // Add PostID to uniquely identify each post
}

interface Category {
  CategoryID: Number;
  CategoryName: string;
}

interface SidebarPost {
  href: string;
  imageFill: string;
  title: string;
  date: string;
}

export default function Home() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [categories, setCategories] = useState<Category[]>([]); // Store categories

  // Fetch posts and categories
  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data);
    }

    async function fetchCategories() {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    }

    fetchPosts();
    fetchCategories();
  }, []);

  // Function to get category name from CategoryID
  const getCategoryName = (categoryID: Number): string => {
    const category = categories.find(cat => cat.CategoryID === categoryID);
    return category ? category.CategoryName : 'Unknown Category';
  };

  return (
    <>
      {/* Header and Navigation */}
      <div className="container">
        <header className="border-bottom lh-1 py-3">
          <div className="row flex-nowrap justify-content-between align-items-center">
            <div className="col-4 pt-1">
              <a className="link-secondary" href="#">Subscribe</a>
            </div>
            <div className="col-4 text-center">
              <a className="blog-header-logo text-body-emphasis text-decoration-none" href="#">BLOG</a>
            </div>
            <div className="col-4 d-flex justify-content-end align-items-center">
              <a className="link-secondary" href="#" aria-label="Search">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="mx-3"
                  role="img"
                  viewBox="0 0 24 24"
                >
                  <title>Search</title>
                  <circle cx="10.5" cy="10.5" r="7.5" />
                  <path d="M21 21l-5.2-5.2" />
                </svg>
              </a>
              <a className="btn btn-sm btn-outline-secondary" href="#">Sign up</a>
            </div>
          </div>
        </header>

        <div className="nav-scroller py-1 mb-3 border-bottom">
          <nav className="nav nav-underline justify-content-between">
            <a className="nav-item nav-link link-body-emphasis active" href="#">World</a>
            <a className="nav-item nav-link link-body-emphasis" href="#">U.S.</a>
            <a className="nav-item nav-link link-body-emphasis" href="#">Technology</a>
            <a className="nav-item nav-link link-body-emphasis" href="#">Design</a>
            <a className="nav-item nav-link link-body-emphasis" href="#">Culture</a>
            <a className="nav-item nav-link link-body-emphasis" href="#">Business</a>
            <a className="nav-item nav-link link-body-emphasis" href="#">Politics</a>
            <a className="nav-item nav-link link-body-emphasis" href="#">Opinion</a>
            <a className="nav-item nav-link link-body-emphasis" href="#">Science</a>
            <a className="nav-item nav-link link-body-emphasis" href="#">Health</a>
            <a className="nav-item nav-link link-body-emphasis" href="#">Style</a>
            <a className="nav-item nav-link link-body-emphasis" href="#">Travel</a>
          </nav>
        </div>
      </div>

      <main className="container">
        <div className="row">
          <div className="col-md-8">
            {/* Blog Posts */}
            {posts.map((post, index) => (
              <Post
                key={index}
                category={getCategoryName(post.CategoryID)} // Get category name using the function
                title={post.Title}
                date={post.Date}
                description={post.Desc}
                postId={post.PostID} // Pass the PostID for dynamic routing
                imageSrc={post.ImageSrc || '/path/to/placeholder.jpg'}
                imageAlt={post.Title}
              />
            ))}
          </div>
          <div className="col-md-4">
            {/* Sidebar */}
            <Sidebar />
          </div>
        </div>
      </main>
    </>
  );
}

function Post({
  category,
  title,
  date,
  description,
  postId, // Accept PostID for routing
  imageSrc,
  imageAlt,
}: {
  category: string;
  title: string;
  date: string;
  description: string;
  postId: string; // Type for postId
  imageSrc: string;
  imageAlt: string;
}): JSX.Element {
  return (
    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
      <div className="col p-4 d-flex flex-column position-static">
        <strong className="d-inline-block mb-2 text-primary-emphasis">{category}</strong>
        <h3 className="mb-0">{title}</h3>
        <div className="mb-1 text-body-secondary">{date}</div>
        <p className="card-text mb-auto">{description}</p>
        {/* Use Link component for dynamic routing */}
        <Link href={`/post/${postId}`} className="icon-link gap-1 icon-link-hover stretched-link">
          Continue reading
        </Link>
      </div>
      <div className="col-auto d-none d-lg-block">
        <Image src={imageSrc} alt={imageAlt} width={200} height={250} className="bd-placeholder-img" />
      </div>
    </div>
  );
}

function Sidebar(): JSX.Element {
  // Example static data; should be replaced with actual data
  const recentPosts: SidebarPost[] = [
    { href: "#", imageFill: "#777", title: "Example blog post title", date: "January 15, 2024" },
    { href: "#", imageFill: "#777", title: "Another blog post title", date: "January 14, 2024" },
    { href: "#", imageFill: "#777", title: "Longer blog post title", date: "January 13, 2024" }
  ];

  return (
    <div className="position-sticky" style={{ top: '2rem' }}>
      <div className="p-4 mb-3 bg-body-tertiary rounded">
        <h4 className="fst-italic">About</h4>
        <p className="mb-0">This is a blog description.</p>
      </div>

      <div>
        <h4 className="fst-italic">Recent posts</h4>
        <ul className="list-unstyled">
          {recentPosts.map((post, index) => (
            <li key={index}>
              <a className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top" href={post.href}>
                <svg className="bd-placeholder-img" width="100%" height="96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false">
                  <rect width="100%" height="100%" fill={post.imageFill} />
                </svg>
                <div className="col-lg-8">
                  <h6 className="mb-0">{post.title}</h6>
                  <small className="text-body-secondary">{post.date}</small>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}