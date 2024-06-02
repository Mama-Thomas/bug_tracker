import React from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { Container, Typography, Button, List, ListItem } from "@mui/material";

const Dashboard = () => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  if (!currentUser) {
    return <Typography variant="h4">Unauthorized Access</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <List>
        {(currentUser.roleid === 1 || currentUser.roleid === 2) && (
          <ListItem>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/projects")}
            >
              Manage Projects
            </Button>
          </ListItem>
        )}
        {currentUser.roleid === 1 && (
          <ListItem>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/users")}
            >
              Manage Users
            </Button>
          </ListItem>
        )}
        {(currentUser.roleid === 1 || currentUser.roleid === 2) && (
          <ListItem>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/bugs")}
            >
              Manage Bugs
            </Button>
          </ListItem>
        )}
        {(currentUser.roleid === 3 || currentUser.roleid === 4) && (
          <ListItem>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/bugs")}
            >
              View Bugs
            </Button>
          </ListItem>
        )}
      </List>
    </Container>
  );
};

export default Dashboard;
