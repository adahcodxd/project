import React, { useState, useEffect } from "react";
import "../../cssfiles/roles/manageuser.css";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedUser, setSelectedUser] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "User", status: "Active" });

  // Load users from localStorage when the component mounts
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // If no users are found in localStorage, use mock data
      const mockUsers = [
        { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin", status: "Active" },
        { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "User", status: "Inactive" },
        { id: 3, name: "Mike Brown", email: "mike.brown@example.com", role: "Moderator", status: "Active" },
      ];
      setUsers(mockUsers);
      localStorage.setItem("users", JSON.stringify(mockUsers));  // Save mock data to localStorage
    }
  }, []);  // Empty dependency array to run only once on mount

  // Save users to localStorage whenever users state changes
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]); // This will trigger on any users state change

  const filteredUsers = users
    .filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((user) => (filterRole === "all" ? true : user.role === filterRole))
    .sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return sortOrder === "asc" ? nameA < nameB : nameA > nameB;
    });

  const handleEditUser = (user) => setSelectedUser(user);

  const handleDeleteUser = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      setUsers(users.filter((user) => user.id !== id));
      setFeedback("User has been successfully deleted.");
    }
  };

  const handleSaveChanges = () => {
    setUsers(users.map((user) => (user.id === selectedUser.id ? selectedUser : user)));
    setSelectedUser(null);
    setFeedback("User details have been updated successfully.");
  };

  const handleResetPassword = (user) => {
    const confirmed = window.confirm(`Reset password for ${user.name}?`);
    if (confirmed) {
      setFeedback(`Password for ${user.name} has been reset.`);
    }
  };

  const handleCreateUser = () => {
    const newId = users.length ? users[users.length - 1].id + 1 : 1; // Get next ID
    const createdUser = { ...newUser, id: newId };
    setUsers([...users, createdUser]);
    setNewUser({ name: "", email: "", role: "User", status: "Active" });
    setFeedback("New user has been successfully created.");
  };

  return (
    <div className="manage-users-page">
      <h1>Manage Users</h1>
      <p>Admin panel to manage all users efficiently.</p>

      {/* Feedback */}
      {feedback && <div className="feedback-message">{feedback}</div>}

      {/* Filters and Search */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search users by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
          <option value="all">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
          <option value="Moderator">Moderator</option>
        </select>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Sort: A-Z</option>
          <option value="desc">Sort: Z-A</option>
        </select>
      </div>

      {/* User List */}
      <div className="user-list">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.status}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEditUser(user)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    <button className="reset-btn" onClick={() => handleResetPassword(user)}>Reset Password</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Create New User */}
      <div className="create-user">
        <h2>Create New User</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
          <option value="Moderator">Moderator</option>
        </select>
        <select
          value={newUser.status}
          onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button onClick={handleCreateUser}>Create User</button>
      </div>

      {/* Edit User Modal */}
      {selectedUser && (
        <div className="edit-modal">
          <div className="modal-content">
            <h2>Edit User</h2>
            <label>
              Name:
              <input
                type="text"
                value={selectedUser.name}
                onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={selectedUser.email}
                onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
              />
            </label>
            <label>
              Role:
              <select
                value={selectedUser.role}
                onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Moderator">Moderator</option>
              </select>
            </label>
            <div className="modal-actions">
              <button onClick={handleSaveChanges}>Save Changes</button>
              <button onClick={() => setSelectedUser(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageUsers;
