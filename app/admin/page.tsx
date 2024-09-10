// app/admin/page.tsx
import Link from 'next/link';

const AdminDashboard = () => {
  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <div className="list-group">
        <Link href="/admin/posts" className="list-group-item list-group-item-action">Manage Posts</Link>
        <Link href="/admin/categories" className="list-group-item list-group-item-action">Manage Categories</Link>
        <Link href="/admin/settings" className="list-group-item list-group-item-action">Settings</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;