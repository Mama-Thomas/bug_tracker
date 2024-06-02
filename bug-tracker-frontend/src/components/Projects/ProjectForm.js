// import React, { useState, useEffect } from "react";
// import projectService from "../../services/projectService";
// import userService from "../../services/userService";
// import {
//   Container,
//   Typography,
//   TextField,
//   Button,
//   MenuItem,
// } from "@mui/material";
// import { useNavigate, useParams } from "react-router-dom";

// const ProjectForm = () => {
//   const [project, setProject] = useState({
//     name: "",
//     startdate: "",
//     enddate: "",
//     projectmanagerid: "",
//   });
//   const [managers, setManagers] = useState([]);
//   const navigate = useNavigate();
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchManagers = async () => {
//       try {
//         const response = await userService.getUsers();
//         setManagers(response.data.filter((user) => user.roleid === 2)); // Assuming roleid 2 is Project Manager
//         console.log("Fetched Managers:", response.data); // Log fetched managers
//       } catch (error) {
//         console.error("Error fetching managers:", error.response); // Log any errors
//       }
//     };

//     fetchManagers();
//   }, []);

//   useEffect(() => {
//     const fetchProject = async () => {
//       if (id) {
//         try {
//           const response = await projectService.getProject(id);
//           const projectData = response.data;
//           setProject({
//             ...projectData,
//             startdate: projectData.startdate
//               ? projectData.startdate.split("T")[0]
//               : "",
//             enddate: projectData.enddate
//               ? projectData.enddate.split("T")[0]
//               : "",
//             projectmanagerid: projectData.projectmanagerid || "",
//           });
//         } catch (error) {
//           console.error("Error fetching project:", error.response); // Log any errors
//         }
//       }
//     };

//     fetchProject();
//   }, [id]);

//   const handleChange = (e) => {
//     setProject({ ...project, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (id) {
//         await projectService.updateProject(id, project);
//       } else {
//         await projectService.createProject(project);
//       }
//       navigate("/projects");
//     } catch (error) {
//       console.error("Error saving project:", error.response); // Log any errors
//     }
//   };

//   return (
//     <Container>
//       <Typography variant="h4" component="h1" gutterBottom>
//         {id ? "Edit Project" : "Create Project"}
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Project Name"
//           name="name"
//           value={project.name}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Start Date"
//           name="startdate"
//           type="date"
//           value={project.startdate}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//           InputLabelProps={{ shrink: true }}
//         />
//         <TextField
//           label="End Date"
//           name="enddate"
//           type="date"
//           value={project.enddate}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//           InputLabelProps={{ shrink: true }}
//         />
//         <TextField
//           label="Project Manager"
//           name="projectmanagerid"
//           value={project.projectmanagerid}
//           onChange={handleChange}
//           select
//           fullWidth
//           margin="normal"
//         >
//           {managers.map((manager) => (
//             <MenuItem key={manager.userid} value={manager.userid}>
//               {manager.firstname} {manager.lastname}
//             </MenuItem>
//           ))}
//         </TextField>
//         <Button type="submit" variant="contained" color="primary">
//           {id ? "Update Project" : "Create Project"}
//         </Button>
//       </form>
//     </Container>
//   );
// };

// export default ProjectForm;


import React, { useState, useEffect } from "react";
import projectService from "../../services/projectService";
import userService from "../../services/userService";
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const ProjectForm = () => {
  const [project, setProject] = useState({
    name: "",
    startDate: "",
    endDate: "",
    projectManagerId: "",
    userIds: [],
  });
  const [managers, setManagers] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await userService.getUsers();
        setManagers(response.data.filter((user) => user.roleid === 2)); // Assuming roleid 2 is Project Manager
        setUsers(response.data); // All users for user assignment
        console.log("Fetched Managers and Users:", response.data); // Log fetched managers and users
      } catch (error) {
        console.error("Error fetching managers and users:", error.response); // Log any errors
      }
    };

    fetchManagers();
  }, []);

  useEffect(() => {
    const fetchProject = async () => {
      if (id) {
        try {
          const response = await projectService.getProject(id);
          const projectData = response.data;
          setProject({
            ...projectData,
            startDate: projectData.startdate
              ? projectData.startdate.split("T")[0]
              : "",
            endDate: projectData.enddate
              ? projectData.enddate.split("T")[0]
              : "",
            projectManagerId: projectData.projectmanagerid || "",
            userIds: projectData.users.map((user) => user.userid),
          });
        } catch (error) {
          console.error("Error fetching project:", error.response); // Log any errors
        }
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleUserChange = (e) => {
    setProject({ ...project, userIds: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await projectService.updateProject(id, project);
      } else {
        await projectService.createProject(project);
      }
      navigate("/projects");
    } catch (error) {
      console.error("Error saving project:", error.response); // Log any errors
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {id ? "Edit Project" : "Create Project"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Project Name"
          name="name"
          value={project.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Start Date"
          name="startDate"
          type="date"
          value={project.startDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Date"
          name="endDate"
          type="date"
          value={project.endDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Project Manager"
          name="projectManagerId"
          value={project.projectManagerId}
          onChange={handleChange}
          select
          fullWidth
          margin="normal"
        >
          {managers.map((manager) => (
            <MenuItem key={manager.userid} value={manager.userid}>
              {manager.firstname} {manager.lastname}
            </MenuItem>
          ))}
        </TextField>
        <FormControl fullWidth margin="normal">
          <InputLabel>Users</InputLabel>
          <Select
            multiple
            value={project.userIds}
            onChange={handleUserChange}
            renderValue={(selected) =>
              selected
                .map((userId) => {
                  const user = users.find((u) => u.userid === userId);
                  return user ? user.firstname + " " + user.lastname : null;
                })
                .join(", ")
            }
          >
            {users.map((user) => (
              <MenuItem key={user.userid} value={user.userid}>
                {user.firstname} {user.lastname}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          {id ? "Update Project" : "Create Project"}
        </Button>
      </form>
    </Container>
  );
};

export default ProjectForm;
