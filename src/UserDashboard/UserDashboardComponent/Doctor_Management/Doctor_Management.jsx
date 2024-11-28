import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";

// Styled components for table
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// Modal styling
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

const Doctor_Management = () => {
  const [doctors, setDoctors] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("https://medconnect-eta.vercel.app/doctors");
        // Filter data where approval is "false"
        const unapprovedDoctors = response.data.filter(
          (doctor) => doctor.approval === "false"
        );
        setDoctors(unapprovedDoctors);
      } catch (error) {
        console.error("Error fetching doctors data:", error);
      }
    };

    fetchDoctors();
  }, []);

  // Open modal
  const handleOpen = (doctor) => {
    setSelectedDoctor(doctor);
    setOpen(true);
  };

  // Close modal
  const handleClose = () => {
    setSelectedDoctor(null);
    setOpen(false);
  };

  const handleApprove = async () => {
    try {
      if (selectedDoctor) {
        const updatedDoctor = { ...selectedDoctor, approval: "true" }; // approval is a string "true"
  
        console.log("Updating Doctor:", updatedDoctor);
  
        // Send PUT request to update approval status
        const response = await axios.put(
          `https://medconnect-eta.vercel.app/doctors/${selectedDoctor._id}`, // Make sure _id is a valid ObjectId string
          { approval: "true" }, // Send only the 'approval' field
          { headers: { "Content-Type": "application/json" } }
        );
        console.log("Update Response:", response.data); // Log the response from the backend
  
        // Remove the approved doctor from the list
        setDoctors((prev) =>
          prev.filter((doctor) => doctor._id !== selectedDoctor._id)
        );
        handleClose();
      }
    } catch (error) {
      console.error("Error updating doctor approval:", error.response?.data || error.message);
    }
  };
  

  return (
    <div>
      <h1>Doctor Management</h1>

      {/* Table Section */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Index NO</StyledTableCell>
              <StyledTableCell align="left">FullName</StyledTableCell>
              <StyledTableCell align="left">Gender</StyledTableCell>
              <StyledTableCell align="left">Nationality</StyledTableCell>
              <StyledTableCell align="left">Medical Registration</StyledTableCell>
              <StyledTableCell align="left">Specialization</StyledTableCell>
              <StyledTableCell align="left">Experience</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">Medical Degree</StyledTableCell>
              <StyledTableCell align="left">References</StyledTableCell>
              <StyledTableCell align="left">Resume/CV</StyledTableCell>
              <StyledTableCell align="left">Medical License</StyledTableCell>
              <StyledTableCell align="left">Approval</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map((doctor, index) => (
              <StyledTableRow key={doctor._id}>
                <StyledTableCell component="th" scope="row">
                  {String(index + 1).padStart(2, "0")}
                </StyledTableCell>
                <StyledTableCell align="left">{doctor.fullName}</StyledTableCell>
                <StyledTableCell align="left">{doctor.gender}</StyledTableCell>
                <StyledTableCell align="left">{doctor.nationality}</StyledTableCell>
                <StyledTableCell align="left">
                  {doctor.medicalRegistration}
                </StyledTableCell>
                <StyledTableCell align="left">{doctor.specialization}</StyledTableCell>
                <StyledTableCell align="left">{doctor.experience}</StyledTableCell>
                <StyledTableCell align="left">{doctor.email}</StyledTableCell>
                <StyledTableCell align="left">{doctor.medicalDegree}</StyledTableCell>
                <StyledTableCell align="left">{doctor.references}</StyledTableCell>
                <StyledTableCell align="left">{doctor.resume}</StyledTableCell>
                <StyledTableCell align="left">{doctor.medicalLicense}</StyledTableCell>
                <StyledTableCell align="left">
                  <Button onClick={() => handleOpen(doctor)} variant="outlined">
                    Pending
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal Section */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Approve Doctor
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Are you sure you want to approve{" "}
            <strong>{selectedDoctor?.fullName}</strong>?
          </Typography>
          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button variant="contained" color="success" onClick={handleApprove}>
              Approve
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Doctor_Management;
