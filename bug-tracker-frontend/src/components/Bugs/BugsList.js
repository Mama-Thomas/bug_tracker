import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bugService from "../../services/bugService";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";

const BugsList = () => {
  const [bugs, setBugs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBugs = async () => {
      const response = await bugService.getBugs();
      setBugs(response.data);
    };
    fetchBugs();
  }, []);

  const handleView = (id) => {
    navigate(`/bugs/${id}`);
  };

  const handleCreate = () => {
    navigate("/bugs/new");
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Bugs List
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreate}
        style={{ marginBottom: "20px" }}
      >
        Create New Bug
      </Button>
      <List>
        {bugs.map((bug) => (
          <ListItem key={bug.bugid}>
            <ListItemText
              primary={bug.title}
              secondary={`Status: ${bug.status}, Severity: ${bug.severity}`}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleView(bug.bugid)}
            >
              View
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default BugsList;
