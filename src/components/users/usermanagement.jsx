import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Modal,
  Box,
  Snackbar,
  TablePagination,
  IconButton,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Close as CloseIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material";
import "../../cssfiles/users/usermanagement.css";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "User", status: "Inactive" },
    { id: 3, name: "James Bond", email: "james.bond@example.com", role: "Agent", status: "Active" },
    { id: 4, name: "Alice Johnson", email: "alice.johnson@example.com", role: "Admin", status: "Active" },
    { id: 5, name: "Bob Brown", email: "bob.brown@example.com", role: "User", status: "Inactive" },
    { id: 6, name: "Charlie King", email: "charlie.king@example.com", role: "Admin", status: "Active" },
  ]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ id: null, name: "", email: "", role: "", status: "" });
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );
  const [roleFilter, setRoleFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSnackbarClose = () => setOpenSnackbar(false);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handlePaginationChange = (event, newPage) => setPage(newPage);
  const handleRowsPerPageChange = (event) => setRowsPerPage(parseInt(event.target.value, 10));

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrEditUser = () => {
    if (!formData.name || !formData.email || !formData.role || !formData.status) {
      setMessage("All fields are required!");
      setOpenSnackbar(true);
      return;
    }
    if (formData.id) {
      // Edit user
      setUsers(users.map((user) => (user.id === formData.id ? formData : user)));
      setMessage("User updated successfully!");
    } else {
      // Add user
      const newUser = { ...formData, id: users.length + 1 };
      setUsers([...users, newUser]);
      setMessage("User added successfully!");
    }
    setOpenSnackbar(true);
    setOpen(false);
    setFormData({ id: null, name: "", email: "", role: "", status: "" });
  };

  const handleEdit = (user) => {
    setFormData(user);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    setMessage("User deleted successfully!");
    setOpenSnackbar(true);
  };

  const handleRoleFilterChange = (event) => {
    setRoleFilter(event.target.value);
  };

  const handleSort = () => {
    const sortedUsers = [...users].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      }
      return b.name.localeCompare(a.name);
    });
    setUsers(sortedUsers);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredUsers = users
    .filter((user) =>
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (roleFilter ? user.role === roleFilter : true)
    )
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className={`usermanagement-container ${darkMode ? "dark-mode" : ""}`}>
      <div className="usermanagement-header">
        <h2>User Management</h2>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add New User
        </Button>
        <Tooltip title="Toggle Dark Mode">
          <IconButton color="default" onClick={() => setDarkMode(!darkMode)}>
            <span role="img" aria-label="dark mode toggle">
              {darkMode ? "🌞" : "🌙"}
            </span>
          </IconButton>
        </Tooltip>
      </div>

      <div className="controls-container">
        <TextField
          label="Search by Name or Email"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: <SearchIcon />,
          }}
        />
        <Select
          value={roleFilter}
          onChange={handleRoleFilterChange}
          displayEmpty
          className="role-filter"
        >
          <MenuItem value="">All Roles</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="User">User</MenuItem>
          <MenuItem value="Agent">Agent</MenuItem>
        </Select>
        <Tooltip title="Sort by Name">
          <IconButton onClick={handleSort}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </div>

      <Table className="usermanagement-table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>
                <Tooltip title="Edit User">
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<EditIcon />}
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </Button>
                </Tooltip>
                <Tooltip title="Delete User">
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={users.length}
        page={page}
        onPageChange={handlePaginationChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      <Modal open={open} onClose={handleClose}>
        <Box className="usermanagement-modal">
          <div className="modal-header">
            <Typography variant="h6">
              {formData.id ? "Edit User" : "Add New User"}
            </Typography>
            <CloseIcon onClick={handleClose} className="modal-close-icon" />
          </div>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            margin="normal"
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            margin="normal"
          />
          <TextField
            label="Role"
            variant="outlined"
            fullWidth
            name="role"
            value={formData.role}
            onChange={handleFormChange}
            margin="normal"
          />
          <TextField
            label="Status"
            variant="outlined"
            fullWidth
            name="status"
            value={formData.status}
            onChange={handleFormChange}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleAddOrEditUser}
            className="modal-submit-btn"
          >
            {formData.id ? "Update User" : "Add User"}
          </Button>
        </Box>
      </Modal>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={message}
      />
    </div>
  );
};

export default UserManagement;
