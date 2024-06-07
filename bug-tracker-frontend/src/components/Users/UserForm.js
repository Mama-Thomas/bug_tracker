// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import userService from "../../services/userService";
// import {
//   Container,
//   TextField,
//   Button,
//   Typography,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
// } from "@mui/material";

// const UserForm = () => {
//   const [firstname, setFirstName] = useState("");
//   const [lastname, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (id) {
//       const fetchUser = async () => {
//         const response = await userService.getUser(id);
//         const { firstname, lastname, email, roleid } = response.data;
//         setFirstName(firstname);
//         setLastName(lastname);
//         setEmail(email);
//         setRole(roleid);
//       };
//       fetchUser();
//     }
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const user = { firstname, lastname, email, password, roleid: role };
//     if (id) {
//       await userService.updateUser(id, user);
//     } else {
//       await userService.createUser(user);
//     }
//     navigate("/users");
//   };

//   return (
//     <Container>
//       <Typography variant="h4" component="h1" gutterBottom>
//         {id ? "Edit User" : "Add User"}
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="First Name"
//           value={firstname}
//           onChange={(e) => setFirstName(e.target.value)}
//           fullWidth
//           margin="normal"
//           required
//         />
//         <TextField
//           label="Last Name"
//           value={lastname}
//           onChange={(e) => setLastName(e.target.value)}
//           fullWidth
//           margin="normal"
//           required
//         />
//         <TextField
//           label="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           fullWidth
//           margin="normal"
//           required
//         />
//         <TextField
//           label="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           fullWidth
//           margin="normal"
//           required={!id} // Password is required only when creating a new user
//         />
//         <FormControl fullWidth margin="normal">
//           <InputLabel>Role</InputLabel>
//           <Select
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             required
//           >
//             <MenuItem value={1}>Admin</MenuItem>
//             <MenuItem value={2}>Project Manager</MenuItem>
//             <MenuItem value={3}>Developer</MenuItem>
//             <MenuItem value={4}>Tester</MenuItem>
//           </Select>
//         </FormControl>
//         <Button type="submit" variant="contained" color="primary" fullWidth>
//           {id ? "Update User" : "Add User"}
//         </Button>
//       </form>
//     </Container>
//   );
// };

// export default UserForm;
//
//




import React, { useState, useEffect } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import userService from "../../services/userService";
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

const UserForm = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isActive, setIsActive] = useState(true);
  
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        const response = await userService.getUser(id);
        const { firstname, lastname, email, roleid, isactive } = response.data;
        setFirstName(firstname);
        setLastName(lastname);
        setEmail(email);
        setRole(roleid);
        setIsActive(isactive);
      };
      fetchUser();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      firstname,
      lastname,
      email,
      password,
      roleid: role,
      isactive: isActive,
    };
    if (id) {
      await userService.updateUser(id, user);
    } else {
      await userService.createUser(user);
    }
    navigate("/users");
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {id ? "Edit User" : "Add User"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Last Name"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required={!id} // Password is required only when creating a new user
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <MenuItem value={1}>Admin</MenuItem>
            <MenuItem value={2}>Project Manager</MenuItem>
            <MenuItem value={3}>Developer</MenuItem>
            <MenuItem value={4}>Tester</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Active Status</InputLabel>
          <Select
            value={isActive}
            onChange={(e) => setIsActive(e.target.value)}
            required
          >
            <MenuItem value={true}>Active</MenuItem>
            <MenuItem value={false}>Inactive</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {id ? "Update User" : "Add User"}
        </Button>
      </form>
    </Container>
  );
};

export default UserForm;
