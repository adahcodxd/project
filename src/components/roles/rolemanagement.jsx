import React, { useState, useEffect } from 'react';
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  Add as AddIcon,
  SaveAlt as SaveAltIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
} from '@mui/icons-material';
import "../../cssfiles/roles/rolemanagement.css";

const RoleManagement = () => {
  // State variables
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({ id: null, name: '', permissions: '', status: '' });
  const [openModal, setOpenModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [pagination, setPagination] = useState({ page: 0, rowsPerPage: 5 });
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  // Load roles from localStorage when the component mounts
  useEffect(() => {
    const storedRoles = localStorage.getItem('roles');
    if (storedRoles) {
      setRoles(JSON.parse(storedRoles));
    }
  }, []);

  // Save roles to localStorage whenever roles state changes
  useEffect(() => {
    if (roles.length > 0) {
      localStorage.setItem('roles', JSON.stringify(roles));
    }
  }, [roles]);

  // Snackbar Handlers
  const openSnackbar = (message) => setSnackbar({ open: true, message });
  const closeSnackbar = () => setSnackbar({ open: false, message: '' });

  // Modal Handlers
  const openFormModal = () => setOpenModal(true);
  const closeFormModal = () => {
    setOpenModal(false);
    setFormData({ id: null, name: '', permissions: '', status: '' });
  };

  const openDeleteConfirmation = (id) => {
    setConfirmDelete(true);
    setDeleteId(id);
  };

  const closeDeleteConfirmation = () => {
    setConfirmDelete(false);
    setDeleteId(null);
  };

  // Input Handlers
  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleFilterChange = (e) => setFilterStatus(e.target.value);

  // Pagination Handlers
  const handlePageChange = (_, newPage) => setPagination((prev) => ({ ...prev, page: newPage }));
  const handleRowsPerPageChange = (e) => {
    setPagination((prev) => ({ ...prev, rowsPerPage: parseInt(e.target.value, 10), page: 0 }));
  };

  // CRUD Operations
  const addOrUpdateRole = () => {
    const { id, name, permissions, status } = formData;

    if (!name || !permissions || !status) {
      openSnackbar('All fields are required!');
      return;
    }

    if (id) {
      setRoles((prevRoles) =>
        prevRoles.map((role) =>
          role.id === id ? { ...role, name, permissions: permissions.split(','), status } : role
        )
      );
      openSnackbar('Role updated successfully!');
    } else {
      const newRole = { id: roles.length + 1, name, permissions: permissions.split(','), status };
      setRoles((prevRoles) => [...prevRoles, newRole]);
      openSnackbar('Role added successfully!');
    }

    closeFormModal();
  };

  const confirmDeleteRole = () => {
    setRoles((prevRoles) => prevRoles.filter((role) => role.id !== deleteId));
    closeDeleteConfirmation();
    openSnackbar('Role deleted successfully!');
  };

  // Export to CSV
  const exportToCSV = () => {
    const csvContent = [
      ['ID', 'Name', 'Permissions', 'Status'],
      ...roles.map((role) => [
        role.id,
        role.name,
        role.permissions.join(';'),
        role.status,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'roles.csv';
    link.click();
  };

  // Sorting
  const sortRoles = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';

    const sortedRoles = [...roles].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setRoles(sortedRoles);
    setSortConfig({ key, direction });
  };

  // Filtering and Searching
  const filteredRoles = roles
    .filter((role) =>
      filterStatus === 'All' || role.status === filterStatus
    )
    .filter((role) =>
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.permissions.join(',').toLowerCase().includes(searchQuery.toLowerCase())
    );

  const paginatedRoles = filteredRoles.slice(
    pagination.page * pagination.rowsPerPage,
    pagination.page * pagination.rowsPerPage + pagination.rowsPerPage
  );

  return (
    <div className={`role-management ${darkMode ? 'dark-mode' : ''}`}>
      <header className="role-management-header">
        <h2>Role Management</h2>
        <div className="actions">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={openFormModal}
          >
            Add Role
          </Button>
          <Tooltip title="Export to CSV">
            <IconButton onClick={exportToCSV}>
              <SaveAltIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Toggle Dark Mode">
            <IconButton onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? '🌞' : '🌙'}
            </IconButton>
          </Tooltip>
        </div>
      </header>

      {/* Search and Filter */}
      <section className="search-bar">
        <TextField
          label="Search Roles"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Select
          value={filterStatus}
          onChange={handleFilterChange}
          displayEmpty
          variant="outlined"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </Select>
      </section>

      {/* Table */}
      <section className="role-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => sortRoles('name')} style={{ cursor: 'pointer' }}>
                Role Name <SortIcon />
              </TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRoles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>{role.permissions.join(', ')}</TableCell>
                <TableCell>{role.status}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<EditIcon />}
                    onClick={() => openFormModal() && setFormData(role)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => openDeleteConfirmation(role.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={filteredRoles.length}
          page={pagination.page}
          onPageChange={handlePageChange}
          rowsPerPage={pagination.rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </section>

      {/* Add/Edit Modal */}
      <Modal open={openModal} onClose={closeFormModal}>
        <Box className="modal-box">
          <h3>{formData.id ? 'Edit Role' : 'Add Role'}</h3>
          <TextField
            label="Role Name"
            name="name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleFormChange}
          />
          <TextField
            label="Permissions (comma-separated)"
            name="permissions"
            fullWidth
            margin="normal"
            value={formData.permissions}
            onChange={handleFormChange}
          />
          <TextField
            label="Status"
            name="status"
            fullWidth
            margin="normal"
            value={formData.status}
            onChange={handleFormChange}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={addOrUpdateRole}
          >
            {formData.id ? 'Update Role' : 'Add Role'}
          </Button>
        </Box>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmDelete} onClose={closeDeleteConfirmation}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this role?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirmation} color="secondary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteRole} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        autoHideDuration={3000}
        onClose={closeSnackbar}
      />
    </div>
  );
};

export default RoleManagement;
