import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import userService from "../../services/userService";
import { Container, Typography, Button } from "@mui/material";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await userService.getUser(id);
      setUser(response.data);
    };
    fetchUser();
  }, [id]);

  const handleEdit = () => {
    navigate(`/users/edit/${id}`);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        User Details
      </Typography>
      <Typography variant="h6">
        Name: {user.firstname} {user.lastname}
      </Typography>
      <Typography>Email: {user.email}</Typography>
      <Typography>Role: {user.roleid}</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleEdit}
        style={{ marginTop: "20px" }}
      >
        Edit User
      </Button>
    </Container>
  );
};

export default UserDetails;
