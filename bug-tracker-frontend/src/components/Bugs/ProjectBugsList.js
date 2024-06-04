// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import bugService from "../../services/bugService";
// import {
//   Container,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   Button,
// } from "@mui/material";

// const ProjectBugsList = () => {
//   const { projectId } = useParams();
//   const [bugs, setBugs] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBugs = async () => {
//       try {
//         const response = await bugService.getBugsByProjectId(projectId);
//         setBugs(response.data);
//       } catch (error) {
//         console.error(
//           "Error fetching bugs:",
//           error.response ? error.response.data : error.message
//         );
//       }
//     };

//     fetchBugs();
//   }, [projectId]);

//   const handleAddBug = () => {
//     navigate(`/projects/${projectId}/bugs/new`);
//   };

//   const handleEditBug = (bugId) => {
//     navigate(`/projects/${projectId}/bugs/${bugId}/edit`);
//   };

//   return (
//     <Container>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Bugs for Project {projectId}
//       </Typography>
//       <Button variant="contained" color="primary" onClick={handleAddBug}>
//         Add Bug
//       </Button>
//       <List>
//         {bugs.map((bug) => (
//           <ListItem
//             key={bug.bugid}
//             button
//             onClick={() => handleEditBug(bug.bugid)}
//           >
//             <ListItemText
//               primary={bug.title}
//               secondary={`Status: ${bug.status} | Severity: ${bug.severity}`}
//             />
//           </ListItem>
//         ))}
//       </List>
//     </Container>
//   );
// };

// export default ProjectBugsList;


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import bugService from "../../services/bugService";
import projectService from "../../services/projectService";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";

const ProjectBugsList = () => {
  const { projectId } = useParams();
  const [bugs, setBugs] = useState([]);
  const [projectName, setProjectName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await projectService.getProject(projectId);
        setProjectName(response.data.name);
      } catch (error) {
        console.error(
          "Error fetching project:",
          error.response ? error.response.data : error.message
        );
      }
    };

    const fetchBugs = async () => {
      try {
        const response = await bugService.getBugsByProjectId(projectId);
        setBugs(response.data);
      } catch (error) {
        console.error(
          "Error fetching bugs:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchProject();
    fetchBugs();
  }, [projectId]);

  const handleAddBug = () => {
    navigate(`/projects/${projectId}/bugs/new`);
  };

  const handleEditBug = (bugId) => {
    navigate(`/projects/${projectId}/bugs/${bugId}/edit`);
  };

  const handleViewBug = (bugId) => {
    navigate(`/bugs/${bugId}`);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Bugs for Project {projectName}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAddBug}>
        Add Bug
      </Button>
      <List>
        {bugs.map((bug) => (
          <ListItem key={bug.bugid}>
            <ListItemText
              primary={bug.title}
              secondary={`Status: ${bug.status} | Severity: ${bug.severity}`}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleViewBug(bug.bugid)}
            >
              View
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleEditBug(bug.bugid)}
            >
              Edit
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ProjectBugsList;
