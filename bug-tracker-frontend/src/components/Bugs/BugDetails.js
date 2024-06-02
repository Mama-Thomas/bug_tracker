import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import bugService from "../../services/bugService";
import { Container, Typography, Button } from "@mui/material";

const BugDetails = () => {
  const { id } = useParams();
  const [bug, setBug] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBug = async () => {
      const response = await bugService.getBug(id);
      setBug(response.data);
    };
    fetchBug();
  }, [id]);

  const handleEdit = () => {
    navigate(`/bugs/edit/${id}`);
  };

  if (!bug) return <div>Loading...</div>;

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Bug Details
      </Typography>
      <Typography variant="h6">Title: {bug.title}</Typography>
      <Typography>Description: {bug.description}</Typography>
      <Typography>Status: {bug.status}</Typography>
      <Typography>Severity: {bug.severity}</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleEdit}
        style={{ marginTop: "20px" }}
      >
        Edit Bug
      </Button>
    </Container>
  );
};

export default BugDetails;
