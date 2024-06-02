import React from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";

const Navbar = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bug Tracker
          </Typography>
          {currentUser ? (
            <>
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
