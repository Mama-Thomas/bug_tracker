import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../services/userService";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getUsers();
        setUsers(response.data);
        console.log("Fetched Users:", response.data); // Log fetched users
      } catch (error) {
        console.error("Error fetching users:", error); // Log any errors
      }
    };

    fetchUsers();
  }, []);

  const handleView = (id) => {
    navigate(`/users/${id}`);
  };

  const handleCreate = () => {
    navigate("/users/new");
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Users List
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreate}
        style={{ marginBottom: "20px" }}
      >
        Create New User
      </Button>
      <List>
        {users.map((user) => (
          <ListItem key={user.userid}>
            <ListItemText
              primary={`${user.firstname} ${user.lastname}`}
              secondary={`Email: ${user.email}, Role: ${user.rolename}`}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleView(user.userid)}
            >
              View
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default UserList;
