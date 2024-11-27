import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Typography,
  IconButton,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  CardActions,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Checkbox,
  Snackbar,
  Slide,
  Tooltip,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as VisibilityIcon, Close as CloseIcon } from "@mui/icons-material";

const PermissionManagement = () => {
  const [permissions, setPermissions] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Load permissions from local storage on component mount
  useEffect(() => {
    const storedPermissions = JSON.parse(localStorage.getItem("permissions")) || [];
    setPermissions(storedPermissions);
  }, []);

  // Save permissions to local storage whenever permissions change
  useEffect(() => {
    if (permissions.length > 0) {
      localStorage.setItem("permissions", JSON.stringify(permissions));
    }
  }, [permissions]);

  const handleRowSelect = (id) => {
    setSelectedRows((prev) => {
      if (prev.includes(id)) {
        return prev.filter((rowId) => rowId !== id);
      }
      return [...prev, id];
    });
  };

  const handleBulkDelete = () => {
    const updatedPermissions = permissions.filter((perm) => !selectedRows.includes(perm.id));
    setPermissions(updatedPermissions);
    setSelectedRows([]);
    setSnackbarMessage("Selected permissions deleted successfully!");
    setOpenSnackbar(true);
  };

  const handleDelete = (id) => {
    const updatedPermissions = permissions.filter((perm) => perm.id !== id);
    setPermissions(updatedPermissions);
    setSnackbarMessage("Permission deleted successfully!");
    setOpenSnackbar(true);
  };

  const handleAddPermission = (permission) => {
    setPermissions((prev) => [...prev, { ...permission, id: Date.now() }]);
    setSnackbarMessage("Permission added successfully!");
    setOpenSnackbar(true);
    setOpenForm(false);
  };

  const handleUpdatePermission = (updatedPermission) => {
    setPermissions((prev) =>
      prev.map((perm) => (perm.id === updatedPermission.id ? updatedPermission : perm))
    );
    setSnackbarMessage("Permission updated successfully!");
    setOpenSnackbar(true);
    setOpenForm(false);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPermissions = permissions.filter(
    (perm) =>
      perm.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      perm.module.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        Permission Management
      </Typography>

      {/* Controls Section */}
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setOpenForm(true)}
          >
            Add Permission
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleBulkDelete}
            disabled={!selectedRows.length}
            sx={{ marginLeft: "10px" }}
          >
            Delete Selected
          </Button>
        </Grid>
        <Grid item>
          <TextField
            label="Search"
            value={searchQuery}
            onChange={handleSearch}
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>

      {/* Table Section */}
      <Table sx={{ marginTop: "20px" }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox
                indeterminate={selectedRows.length > 0 && selectedRows.length < permissions.length}
                checked={selectedRows.length === permissions.length}
                onChange={(e) => {
                  setSelectedRows(e.target.checked ? permissions.map((perm) => perm.id) : []);
                }}
              />
            </TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Module</TableCell>
            <TableCell>Access</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredPermissions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((perm) => (
            <TableRow key={perm.id}>
              <TableCell>
                <Checkbox
                  checked={selectedRows.includes(perm.id)}
                  onChange={() => handleRowSelect(perm.id)}
                />
              </TableCell>
              <TableCell>{perm.role}</TableCell>
              <TableCell>{perm.module}</TableCell>
              <TableCell>{perm.access}</TableCell>
              <TableCell>{perm.status}</TableCell>
              <TableCell>
                <Tooltip title="Edit">
                  <IconButton onClick={() => { setFormData(perm); setOpenForm(true); }}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => handleDelete(perm.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="View">
                  <IconButton>
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Section */}
      <TablePagination
        component="div"
        count={filteredPermissions.length}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
      />

      {/* Add/Edit Permission Form Dialog */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>{formData ? "Edit Permission" : "Add Permission"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Module"
            value={formData ? formData.module : ""}
            onChange={(e) => setFormData({ ...formData, module: e.target.value })}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              value={formData ? formData.role : ""}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Access</InputLabel>
            <Select
              value={formData ? formData.access : ""}
              onChange={(e) => setFormData({ ...formData, access: e.target.value })}
            >
              <MenuItem value="Full Access">Full Access</MenuItem>
              <MenuItem value="Edit Access">Edit Access</MenuItem>
              <MenuItem value="View Only">View Only</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={formData ? formData.status : ""}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Cancel</Button>
          <Button
            onClick={() => {
              if (formData) {
                handleUpdatePermission(formData);
              } else {
                handleAddPermission(formData);
              }
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
        autoHideDuration={3000}
        TransitionComponent={(props) => <Slide {...props} direction="up" />}
        action={
          <IconButton size="small" color="inherit" onClick={() => setOpenSnackbar(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Container>
  );
};

export default PermissionManagement;
