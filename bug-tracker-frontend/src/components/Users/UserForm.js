import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';
import { Container, Typography, TextField, Button, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const UserForm = () => {
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '', password: '', roleId: '' });
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await userService.getRoles();
        setRoles(response.data);
        console.log("Fetched Roles:", response.data); // Log fetched roles
      } catch (error) {
        console.error("Error fetching roles:", error.response); // Log any errors
      }
    };

    const fetchUser = async () => {
      if (id) {
        try {
          const response = await userService.getUser(id);
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user:", error.response); // Log any errors
        }
      }
    };

    fetchRoles();
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await userService.updateUser(id, user);
      } else {
        await userService.createUser(user);
      }
      navigate('/users');
    } catch (error) {
      console.error("Error saving user:", error.response); // Log any errors
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {id ? 'Edit User' : 'Create User'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Role"
          name="roleId"
          value={user.roleId}
          onChange={handleChange}
          select
          fullWidth
          margin="normal"
        >
          {roles.map(role => (
            <MenuItem key={role.id} value={role.id}>
              {role.name}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" color="primary">
          {id ? 'Update User' : 'Create User'}
        </Button>
      </form>
    </Container>
  );
};

export default UserForm;
