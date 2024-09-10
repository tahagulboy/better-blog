// app/admin/settings/page.tsx

"use client"; // Add this line at the top

const Settings = () => {
  return (
    <div className="container">
      <h1>Settings</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="siteName" className="form-label">Site Name</label>
          <input type="text" className="form-control" id="siteName" />
        </div>
        <div className="mb-3">
          <label htmlFor="siteDescription" className="form-label">Site Description</label>
          <textarea className="form-control" id="siteDescription"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default Settings;
