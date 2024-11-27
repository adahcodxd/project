import React, { useState, useEffect } from 'react';
import '../../cssfiles/users/mypermissons.css'; // Assuming you have a CSS file for styles

// Sample Permissions Data (You can fetch this data from your backend)
const permissionsData = [
  { permission: 'View Dashboard', isGranted: true },
  { permission: 'Manage Users', isGranted: false },
  { permission: 'Edit Profile', isGranted: true },
  { permission: 'Delete Content', isGranted: false },
  { permission: 'View Reports', isGranted: true },
  { permission: 'Access Admin Settings', isGranted: false },
];

const UserProfilePermissions = () => {
  const [permissions, setPermissions] = useState(permissionsData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // You can add a function here to fetch the permissions from the server
    // For now, we're using static data
    setPermissions(permissionsData);
  }, []);

  // Handle toggle of permissions (for enabling/disabling)
  const handleTogglePermission = (index) => {
    const updatedPermissions = [...permissions];
    updatedPermissions[index].isGranted = !updatedPermissions[index].isGranted;
    setPermissions(updatedPermissions);
  };

  // Simulate saving changes (e.g., sending to a server)
  const handleSavePermissions = () => {
    setLoading(true);
    setTimeout(() => {
      alert('Permissions updated successfully!');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="permissions-page">
      <div className="permissions-header">
        <h1>User Permissions</h1>
        <p>Manage your permissions below. You can enable or disable specific permissions for your account.</p>
      </div>

      <div className="permissions-table">
        <table>
          <thead>
            <tr>
              <th>Permission</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((perm, index) => (
              <tr key={index}>
                <td>{perm.permission}</td>
                <td>{perm.isGranted ? 'Granted' : 'Denied'}</td>
                <td>
                  <button
                    className={`toggle-btn ${perm.isGranted ? 'granted' : 'denied'}`}
                    onClick={() => handleTogglePermission(index)}
                  >
                    {perm.isGranted ? 'Revoke' : 'Grant'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="permissions-actions">
        <button
          className="save-btn"
          onClick={handleSavePermissions}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default UserProfilePermissions;
