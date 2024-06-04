// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import projectService from "../../services/projectService";
// import { Container, Typography, Button } from "@mui/material";

// const ProjectDetails = () => {
//   const { id } = useParams();
//   const [project, setProject] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProject = async () => {
//       const response = await projectService.getProject(id);
//       setProject(response.data);
//     };
//     fetchProject();
//   }, [id]);

//   const handleEdit = () => {
//     navigate(`/projects/edit/${id}`);
//   };

//   if (!project) return <div>Loading...</div>;

//   return (
//     <Container>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Project Details
//       </Typography>
//       <Typography variant="h6">Name: {project.name}</Typography>
//       <Typography>Start Date: {project.startdate}</Typography>
//       <Typography>End Date: {project.enddate}</Typography>
//       <Typography>Manager: {project.projectmanager}</Typography>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleEdit}
//         style={{ marginTop: "20px" }}
//       >
//         Edit Project
//       </Button>
//     </Container>
//   );
// };

// export default ProjectDetails;

//
//
//

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import projectService from "../../services/projectService";
// import {
//   Container,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
// } from "@mui/material";

// const ProjectDetail = () => {
//   const { id } = useParams();
//   const [project, setProject] = useState(null);

//   useEffect(() => {
//     const fetchProject = async () => {
//       try {
//         const response = await projectService.getProject(id);
//         setProject(response.data);
//       } catch (error) {
//         console.error("Error fetching project:", error.response); // Log any errors
//       }
//     };

//     fetchProject();
//   }, [id]);

//   if (!project) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Container>
//       <Typography variant="h4" component="h1" gutterBottom>
//         {project.name}
//       </Typography>
//       <Typography variant="h6" component="h2">
//         Project Details
//       </Typography>
//       <Typography variant="body1">Start Date: {project.startdate}</Typography>
//       <Typography variant="body1">End Date: {project.enddate}</Typography>
//       <Typography variant="body1">
//         Project Manager: {project.projectmanagerid}
//       </Typography>
//       <Typography variant="h6" component="h2">
//         Users
//       </Typography>
//       <List>
//         {project.users.map((user) => (
//           <ListItem key={user.userid}>
//             <ListItemText
//               primary={`${user.firstname} ${user.lastname}`}
//               secondary={user.rolename}
//             />
//           </ListItem>
//         ))}
//       </List>
//     </Container>
//   );
// };

// export default ProjectDetail;
//
//


// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import projectService from "../../services/projectService";
// import {
//   Container,
//   Typography,
//   Button,
//   List,
//   ListItem,
//   ListItemText,
// } from "@mui/material";

// const ProjectDetails = () => {
//   const { id } = useParams();
//   const [project, setProject] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProject = async () => {
//       try {
//         const response = await projectService.getProject(id);
//         setProject(response.data);
//       } catch (error) {
//         console.error(
//           "Error fetching project:",
//           error.response ? error.response.data : error.message
//         );
//       }
//     };

//     fetchProject();
//   }, [id]);

//   const handleEdit = () => {
//     navigate(`/projects/edit/${id}`);
//   };

//   const handleDelete = async () => {
//     try {
//       await projectService.deleteProject(id);
//       navigate("/projects");
//     } catch (error) {
//       console.error(
//         "Error deleting project:",
//         error.response ? error.response.data : error.message
//       );
//     }
//   };

//   if (!project) return <Typography>Loading...</Typography>;

//   return (
//     <Container>
//       <Typography variant="h4" component="h1" gutterBottom>
//         {project.name}
//       </Typography>
//       <Typography variant="h6">Project Details</Typography>
//       <Typography>Start Date: {project.startdate}</Typography>
//       <Typography>End Date: {project.enddate}</Typography>
//       <Typography>Project Manager: {project.projectmanager}</Typography>
//       <Typography variant="h6">Users</Typography>
//       <List>
//         {project.users.map((user) => (
//           <ListItem key={user.userid}>
//             <ListItemText
//               primary={`${user.firstname} ${user.lastname}`}
//               secondary={user.rolename}
//             />
//           </ListItem>
//         ))}
//       </List>
//       <Button variant="contained" color="primary" onClick={handleEdit}>
//         Edit Project
//       </Button>
//       <Button variant="contained" color="secondary" onClick={handleDelete}>
//         Delete Project
//       </Button>
//     </Container>
//   );
// };

// export default ProjectDetails;

//
//

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import projectService from "../../services/projectService";
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await projectService.getProject(id);
        setProject(response.data);
      } catch (error) {
        console.error(
          "Error fetching project:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchProject();
  }, [id]);

  const handleEdit = () => {
    navigate(`/projects/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      await projectService.deleteProject(id);
      navigate("/projects");
    } catch (error) {
      console.error(
        "Error deleting project:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleCreateBug = () => {
    navigate(`/projects/${id}/bugs/new`);
  };

  const handleManageBugs = () => {
    navigate(`/projects/${id}/bugs`);
  };

  if (!project) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {project.name}
      </Typography>
      <Typography variant="h6">Project Details</Typography>
      <Typography>Start Date: {project.startdate}</Typography>
      <Typography>End Date: {project.enddate}</Typography>
      <Typography>Project Manager: {project.projectmanager}</Typography>
      <Typography variant="h6">Users</Typography>
      <List>
        {project.users.map((user) => (
          <ListItem key={user.userid}>
            <ListItemText
              primary={`${user.firstname} ${user.lastname}`}
              secondary={user.rolename}
            />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" onClick={handleEdit}>
        Edit Project
      </Button>
      <Button variant="contained" color="secondary" onClick={handleDelete}>
        Delete Project
      </Button>
      <Button variant="contained" onClick={handleCreateBug}>
        Create Bug
      </Button>
      <Button variant="contained" onClick={handleManageBugs}>
        Manage Bugs
      </Button>
    </Container>
  );
};

export default ProjectDetails;
