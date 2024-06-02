import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import bugService from "../../services/bugService";
import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

const BugForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [severity, setSeverity] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchBug = async () => {
        const response = await bugService.getBug(id);
        const { title, description, status, severity } = response.data;
        setTitle(title);
        setDescription(description);
        setStatus(status);
        setSeverity(severity);
      };
      fetchBug();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bug = { title, description, statusid: status, severityid: severity };
    if (id) {
      await bugService.updateBug(id, bug);
    } else {
      await bugService.createBug(bug);
    }
    navigate("/bugs");
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {id ? "Edit Bug" : "Add Bug"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <MenuItem value={1}>Open</MenuItem>
            <MenuItem value={2}>In Progress</MenuItem>
            <MenuItem value={3}>Resolved</MenuItem>
            <MenuItem value={4}>Closed</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Severity</InputLabel>
          <Select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            required
          >
            <MenuItem value={1}>Critical</MenuItem>
            <MenuItem value={2}>High</MenuItem>
            <MenuItem value={3}>Medium</MenuItem>
            <MenuItem value={4}>Low</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {id ? "Update Bug" : "Add Bug"}
        </Button>
      </form>
    </Container>
  );
};

export default BugForm;
