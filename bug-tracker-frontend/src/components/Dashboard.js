// import React from "react";
// import { useNavigate } from "react-router-dom";
// import authService from "../services/authService";
// import { Container, Typography, Button, List, ListItem } from "@mui/material";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const currentUser = authService.getCurrentUser();

//   if (!currentUser) {
//     return <Typography variant="h4">Unauthorized Access</Typography>;
//   }

//   return (
//     <Container>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Dashboard
//       </Typography>
//       <List>
//         {(currentUser.roleid === 1 || currentUser.roleid === 2) && (
//           <ListItem>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() => navigate("/projects")}
//             >
//               Manage Projects
//             </Button>
//           </ListItem>
//         )}
//         {currentUser.roleid === 1 && (
//           <ListItem>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() => navigate("/users")}
//             >
//               Manage Users
//             </Button>
//           </ListItem>
//         )}
//         {(currentUser.roleid === 1 || currentUser.roleid === 2) && (
//           <ListItem>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() => navigate("/bugs")}
//             >
//               Manage Bugs
//             </Button>
//           </ListItem>
//         )}
//         {(currentUser.roleid === 3 || currentUser.roleid === 4) && (
//           <ListItem>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() => navigate("/bugs")}
//             >
//               View Bugs
//             </Button>
//           </ListItem>
//         )}
//       </List>
//     </Container>
//   );
// };

// export default Dashboard;
//
//

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import projectService from "../services/projectService";
import bugService from "../services/bugService";
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const Dashboard = () => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const [projects, setProjects] = useState([]);
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    if (currentUser) {
      fetchUserProjects();
      fetchUserBugs();
    }
  }, [currentUser]);

  const fetchUserProjects = async () => {
    try {
      const response = await projectService.getUserProjects(currentUser.id);
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchUserBugs = async () => {
    try {
      const response = await bugService.getUserBugs(currentUser.id);
      setBugs(response.data);
    } catch (error) {
      console.error("Error fetching bugs:", error);
    }
  };

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
          <>
            <ListItem>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/projects")}
              >
                Manage Projects
              </Button>
            </ListItem>
            <ListItem>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/users")}
              >
                Manage Users
              </Button>
            </ListItem>
            <ListItem>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/bugs")}
              >
                Manage Bugs
              </Button>
            </ListItem>
          </>
        )}
        {(currentUser.roleid === 3 || currentUser.roleid === 4) && (
          <>
            <Typography variant="h6">My Projects</Typography>
            {projects.map((project) => (
              <ListItem key={project.projectid}>
                <ListItemText primary={project.name} />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/projects/${project.projectid}`)}
                >
                  View Project
                </Button>
              </ListItem>
            ))}
            <Typography variant="h6">My Bugs</Typography>
            {bugs.map((bug) => (
              <ListItem key={bug.bugid}>
                <ListItemText
                  primary={bug.title}
                  secondary={`Project: ${bug.projectname}`}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/bugs/${bug.bugid}`)}
                >
                  View Bug
                </Button>
              </ListItem>
            ))}
          </>
        )}
      </List>
    </Container>
  );
};

export default Dashboard;
