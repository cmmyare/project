import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip
} from "@mui/material";
import PageContainer from "src/components/container/PageContainer";
import customFetch from "../utilities/customFetch"; // API handler
import { toast } from "react-toastify";
import Pagination from "../utilities/Pagination";
import { IconArrowUp, IconArrowDown } from "@tabler/icons-react";

const TypographyPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshData, setRefreshData] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // ✅ Pagination data
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 5;
  const [sortConfig, setSortConfig] = useState({
    key: 'createdAt',
    direction: 'desc'
  });

  // Sort function
  const sortData = (dataToSort, key, direction) => {
    return [...dataToSort].sort((a, b) => {
      if (key === 'createdAt') {
        return direction === 'asc' 
          ? new Date(a[key]) - new Date(b[key])
          : new Date(b[key]) - new Date(a[key]);
      }
      if (!a[key]) return 1;
      if (!b[key]) return -1;
      return direction === 'asc'
        ? a[key].localeCompare(b[key])
        : b[key].localeCompare(a[key]);
    });
  };

  // Handle sort
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Get sorted and paginated data
  const sortedData = sortData(data, sortConfig.key, sortConfig.direction);
  
  // Filter data based on search query
  const filteredData = sortedData.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const records = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
  const numberOfPages = Math.max(1, Math.ceil(filteredData.length / recordPerPage));

  // Reset to first page when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // ✅ Page Change Function
  const changeCPage = (page) => {
    if (page >= 1 && page <= numberOfPages) {
      setCurrentPage(page);
    }
  };
  // ✅ Next & Previous Functions
  const nextPage = () => {
    if (currentPage < numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // State for Update Modal
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedData, setSelectedData] = useState(null); // Stores row data for editing
  // State for Delete Confirmation Modal
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  // State for Add New Modal
  const [openAdd, setOpenAdd] = useState(false);
  const [newData, setNewData] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
  });

  // Fetch Data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await customFetch.get("test/reg");
        setData(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshData]);
  // prevPage


  // Handle Open Delete Confirmation
  const handleOpenDeleteConfirm = (id) => {
    setDeleteId(id);
    setOpenConfirm(true);
  };

  // Handle Confirm Delete
  const handleDeleteConfirmed = async () => {
    try {
      const response = await customFetch.delete(`test/reg/${deleteId}`);
      if (response.status === 200) {
        setData((prevData) => prevData.filter((item) => item._id !== deleteId));
        toast.success("Record deleted successfully!");
        setRefreshData((prev) => !prev);
      } else {
        toast.error("Failed to delete the record.");
      }
    } catch (error) {
      console.error("Error deleting record:", error);
      toast.error("An error occurred while deleting the record.");
    } finally {
      setOpenConfirm(false);
      setDeleteId(null);
    }
  };

  // Handle Open Update Form
  const handleOpenUpdateForm = (row) => {
    setSelectedData(row); // Set selected row data
    setOpenUpdate(true); // Open update modal
  };

  // Handle Update Form
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setSelectedData(null);
  };

  // Handle Update Submit
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await customFetch.put(`test/reg/${selectedData._id}`, selectedData);
      if (response.status === 200) {
        setData((prevData) =>
          prevData.map((item) => (item._id === selectedData._id ? response.data.data : item))
        );
        toast.success("Data updated successfully!");
        handleCloseUpdate();
      }
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error(error?.response?.data?.msg || "An unexpected error occurred.");
    }
  };

  // Handle Input Change for Update
  const handleChangeUpdate = (e) => {
    setSelectedData({ ...selectedData, [e.target.name]: e.target.value });
  };

  // Handle Open Add New Modal
  const handleOpenAddForm = () => {
    setOpenAdd(true);
  };

  // Handle Close Add New Modal
  const handleCloseAdd = () => {
    setOpenAdd(false);
    setNewData({ name: "", age: "", phone: "61xxxxxx", email: "" });
  };

  // Handle Input Change for Add New
  const handleChangeAdd = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  // Handle Add New Submit
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await customFetch.post("test/reg", newData);
        setData([...data, response.data]); // Add new record to table
        toast.success("Record added successfully!");
        setRefreshData((prev) => !prev);
        handleCloseAdd();
    } catch (error) {
      console.error("Error adding record:", error);
      toast.error(error?.response?.data?.msg || "An unexpected error occurred.");
    }
  };

  if (loading) {
    return (
      <PageContainer title="Typography" description="Loading...">
        Loading...
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer title="Typography" description="Error">
        {error}
      </PageContainer>
    );
  }

  return (
    <>
   <PageContainer title="Typography" description="This is Typography">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search in all fields..."
        />
        <Button variant="contained" color="primary" onClick={handleOpenAddForm} sx={{ alignSelf: 'flex-start' }}>
          Add New
        </Button>
      </Box>

      <TableContainer component={Paper} style={{ marginTop: "16px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => handleSort('name')}>
                  Name
                  {sortConfig.key === 'name' && (
                    <IconButton size="small">
                      {sortConfig.direction === 'asc' ? <IconArrowUp size={16} /> : <IconArrowDown size={16} />}
                    </IconButton>
                  )}
                </Box>
              </TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => handleSort('createdAt')}>
                  Created At
                  {sortConfig.key === 'createdAt' && (
                    <IconButton size="small">
                      {sortConfig.direction === 'asc' ? <IconArrowUp size={16} /> : <IconArrowDown size={16} />}
                    </IconButton>
                  )}
                </Box>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((row,index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleOpenUpdateForm(row)}>
                    Update
                  </Button>
                  <Button variant="contained"style={{marginLeft:7}}  color="secondary" onClick={() => handleOpenDeleteConfirm(row._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add New Modal */}
      <Modal open={openAdd} onClose={handleCloseAdd}>
        <Box sx={modalStyle}>
          <h2 style={{fontSize:18,color:"blue"}}>Add New Record</h2>
          <form onSubmit={handleAddSubmit}>
            <TextField label="Name" name="name" value={newData.name} onChange={handleChangeAdd} fullWidth margin="normal" />
            <TextField label="Age" name="age" type="number" value={newData.age} onChange={handleChangeAdd} fullWidth margin="normal" />
            <TextField label="Phone" name="phone" type="number" value={newData.phone} onChange={handleChangeAdd} fullWidth margin="normal" />
            <TextField label="Email" name="email" type="email" value={newData.email} onChange={handleChangeAdd} fullWidth margin="normal" />
            <Button type="submit"  variant="contained" color="primary">Submit</Button>
            <Button onClick={handleCloseAdd} style={{marginLeft:8}} variant="contained" color="secondary">Close</Button>
          </form>
        </Box>
      </Modal>

          {/* Delete Confirmation Dialog */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this record?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)} color="secondary">Cancel</Button>
          <Button onClick={handleDeleteConfirmed} color="primary">Yes, Delete</Button>
        </DialogActions>
      </Dialog>
      {/* Update Modal */}
      <Modal open={openUpdate} onClose={handleCloseUpdate}>
        <Box sx={modalStyle}>
          <h2>Update Record</h2>
          {selectedData && (
            <form onSubmit={handleUpdateSubmit}>
              <TextField label="Name" name="name" value={selectedData.name} onChange={handleChangeUpdate} fullWidth margin="normal" />
              <TextField label="Age" name="age" type="number" value={selectedData.age} onChange={handleChangeUpdate} fullWidth margin="normal" />
              <TextField label="Phone" name="phone" type="number" value={selectedData.phone} onChange={handleChangeUpdate} fullWidth margin="normal" />
              <TextField label="Email" name="email" type="email" value={selectedData.email} onChange={handleChangeUpdate} fullWidth margin="normal" />
              <Button type="submit" variant="contained" color="primary">Save Changes</Button>
              <Button onClick={handleCloseUpdate} style={{marginLeft:8}} variant="contained" color="secondary">Close</Button>
            </form>
          )}
        </Box>
      </Modal>
   </PageContainer>
   <Pagination 
        currentPage={currentPage} 
        numberOfPages={numberOfPages} 
        prevPage={prevPage} 
        nextPage={nextPage} 
        changeCPage={changeCPage} 
      />
    </>
 
    
  );
};

// Define modal styles
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default TypographyPage;
