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

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import projectService from "../services/projectService";
// import bugService from "../services/bugService";
// import authService from "../services/authService";
// import { Container, Typography, Button, List, ListItem } from "@mui/material";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const currentUser = authService.getCurrentUser();
//   const [projects, setProjects] = useState([]);
//   const [bugs, setBugs] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!currentUser) {
//         return;
//       }

//       try {
//         console.log("Current User:", currentUser);

//         console.log("Fetching user projects...");
//         const userProjectsResponse = await projectService.getUserProjects(
//           currentUser.userid
//         );
//         console.log("Fetched Projects:", userProjectsResponse.data);
//         setProjects(userProjectsResponse.data);

//         console.log("Fetching user bugs...");
//         const bugsAssignedResponse = await bugService.getBugsAssignedToUser(
//           currentUser.userid
//         );
//         const bugsReportedResponse = await bugService.getBugsReportedByUser(
//           currentUser.userid
//         );

//         console.log("Fetched Bugs Assigned:", bugsAssignedResponse.data);
//         console.log("Fetched Bugs Reported:", bugsReportedResponse.data);

//         setBugs([...bugsAssignedResponse.data, ...bugsReportedResponse.data]);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [currentUser]);

//   if (!currentUser) {
//     return <Typography variant="h4">Unauthorized Access</Typography>;
//   }

//   return (
//     <Container>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Dashboard
//       </Typography>
//       <List>
//         {projects.map((project) => (
//           <ListItem key={project.projectid}>
//             <Typography variant="h6">{project.name}</Typography>
//           </ListItem>
//         ))}
//       </List>
//       <Typography variant="h5" component="h2" gutterBottom>
//         My Bugs
//       </Typography>
//       <List>
//         {bugs.map((bug) => (
//           <ListItem key={bug.bugid}>
//             <Typography variant="h6">{bug.title}</Typography>
//           </ListItem>
//         ))}
//       </List>
//     </Container>
//   );
// };

// export default Dashboard;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import projectService from "../services/projectService";
// import bugService from "../services/bugService";
// import authService from "../services/authService";
// import {
//   Container,
//   Typography,
//   Button,
//   List,
//   ListItem,
//   Link,
//   Box,
// } from "@mui/material";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const currentUser = authService.getCurrentUser();
//   const [projects, setProjects] = useState([]);
//   const [assignedBugs, setAssignedBugs] = useState([]);
//   const [reportedBugs, setReportedBugs] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!currentUser) {
//         return;
//       }

//       try {
//         console.log("Current User:", currentUser);

//         console.log("Fetching user projects...");
//         const userProjectsResponse = await projectService.getUserProjects(
//           currentUser.userid
//         );
//         console.log("Fetched Projects:", userProjectsResponse.data);
//         setProjects(userProjectsResponse.data);

//         console.log("Fetching user bugs...");
//         const bugsAssignedResponse = await bugService.getBugsAssignedToUser(
//           currentUser.userid
//         );
//         const bugsReportedResponse = await bugService.getBugsReportedByUser(
//           currentUser.userid
//         );

//         console.log("Fetched Bugs Assigned:", bugsAssignedResponse.data);
//         console.log("Fetched Bugs Reported:", bugsReportedResponse.data);

//         setAssignedBugs(bugsAssignedResponse.data);
//         setReportedBugs(bugsReportedResponse.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [currentUser]);

//   if (!currentUser) {
//     return <Typography variant="h4">Unauthorized Access</Typography>;
//   }

//   return (
//     <Container>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Dashboard
//       </Typography>

//       <Box mb={4}>
//         <Typography variant="h5" component="h2" gutterBottom>
//           My Projects
//         </Typography>
//         <List>
//           {projects.map((project) => (
//             <ListItem key={project.projectid}>
//               <Link
//                 href={`/projects/${project.projectid}`}
//                 variant="body1"
//                 underline="hover"
//               >
//                 {project.name}
//               </Link>
//             </ListItem>
//           ))}
//         </List>
//       </Box>

//       <Box mb={4}>
//         <Typography variant="h5" component="h2" gutterBottom>
//           My Bugs
//         </Typography>
//         <List>
//           {assignedBugs.map((bug) => (
//             <ListItem key={bug.bugid}>
//               <Link
//                 href={`/bugs/${bug.bugid}`}
//                 variant="body1"
//                 underline="hover"
//               >
//                 {bug.title} - Assigned to you
//               </Link>
//             </ListItem>
//           ))}
//           {reportedBugs.map((bug) => (
//             <ListItem key={bug.bugid}>
//               <Link
//                 href={`/bugs/${bug.bugid}`}
//                 variant="body1"
//                 underline="hover"
//               >
//                 {bug.title} - Reported by you
//               </Link>
//             </ListItem>
//           ))}
//         </List>
//       </Box>
//     </Container>
//   );
// };

// export default Dashboard;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import projectService from "../services/projectService";
// import bugService from "../services/bugService";
// import authService from "../services/authService";
// import {
//   Container,
//   Typography,
//   Button,
//   List,
//   ListItem,
//   Link,
//   Box,
// } from "@mui/material";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const currentUser = authService.getCurrentUser();
//   const [projects, setProjects] = useState([]);
//   const [assignedBugs, setAssignedBugs] = useState([]);
//   const [reportedBugs, setReportedBugs] = useState([]);
//   const [managerProjects, setManagerProjects] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!currentUser) {
//         return;
//       }

//       try {
//         console.log("Current User:", currentUser);

//         // Fetch all projects
//         console.log("Fetching all projects...");
//         const allProjectsResponse = await projectService.getProjects();
//         console.log("Fetched Projects:", allProjectsResponse.data);
//         setProjects(allProjectsResponse.data);

//         // Filter projects where the current user is the project manager
//         const managedProjects = allProjectsResponse.data.filter(
//           (project) => project.projectmanagerid === currentUser.userid
//         );
//         setManagerProjects(managedProjects);

//         if (currentUser.roleid === 3 || currentUser.roleid === 4) {
//           console.log("Fetching user bugs...");
//           const bugsAssignedResponse = await bugService.getBugsAssignedToUser(
//             currentUser.userid
//           );
//           const bugsReportedResponse = await bugService.getBugsReportedByUser(
//             currentUser.userid
//           );

//           console.log("Fetched Bugs Assigned:", bugsAssignedResponse.data);
//           console.log("Fetched Bugs Reported:", bugsReportedResponse.data);

//           setAssignedBugs(bugsAssignedResponse.data);
//           setReportedBugs(bugsReportedResponse.data);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [currentUser]);

//   if (!currentUser) {
//     return <Typography variant="h4">Unauthorized Access</Typography>;
//   }

//   return (
//     <Container>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Dashboard
//       </Typography>
//       {currentUser.roleid === 1 && (
//         <Box mb={4}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate("/users")}
//           >
//             Manage Users
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate("/projects")}
//           >
//             Manage Projects
//           </Button>
//         </Box>
//       )}
//       {currentUser.roleid === 2 && (
//         <Box mb={4}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate("/projects/new")}
//           >
//             Create Project
//           </Button>
//           <Typography variant="h5" component="h2" gutterBottom>
//             My Managed Projects
//           </Typography>
//           <List>
//             {managerProjects.map((project) => (
//               <ListItem key={project.projectid}>
//                 <Link
//                   href={`/projects/${project.projectid}`}
//                   variant="body1"
//                   underline="hover"
//                 >
//                   {project.name}
//                 </Link>
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       )}
//       {(currentUser.roleid === 3 || currentUser.roleid === 4) && (
//         <>
//           <Box mb={4}>
//             <Typography variant="h5" component="h2" gutterBottom>
//               My Projects
//             </Typography>
//             <List>
//               {projects.map((project) => (
//                 <ListItem key={project.projectid}>
//                   <Link
//                     href={`/projects/${project.projectid}`}
//                     variant="body1"
//                     underline="hover"
//                   >
//                     {project.name}
//                   </Link>
//                 </ListItem>
//               ))}
//             </List>
//           </Box>

//           <Box mb={4}>
//             <Typography variant="h5" component="h2" gutterBottom>
//               My Bugs
//             </Typography>
//             <List>
//               {assignedBugs.map((bug) => (
//                 <ListItem key={bug.bugid}>
//                   <Link
//                     href={`/bugs/${bug.bugid}`}
//                     variant="body1"
//                     underline="hover"
//                   >
//                     {bug.title} - Assigned to you
//                   </Link>
//                 </ListItem>
//               ))}
//               {reportedBugs.map((bug) => (
//                 <ListItem key={bug.bugid}>
//                   <Link
//                     href={`/bugs/${bug.bugid}`}
//                     variant="body1"
//                     underline="hover"
//                   >
//                     {bug.title} - Reported by you
//                   </Link>
//                 </ListItem>
//               ))}
//             </List>
//           </Box>
//         </>
//       )}
//     </Container>
//   );
// };

// export default Dashboard;
//
//


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import projectService from "../services/projectService";
// import bugService from "../services/bugService";
// import authService from "../services/authService";
// import {
//   Container,
//   Typography,
//   Button,
//   List,
//   ListItem,
//   Link,
//   Box,
// } from "@mui/material";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const currentUser = authService.getCurrentUser();
//   const [projects, setProjects] = useState([]);
//   const [assignedBugs, setAssignedBugs] = useState([]);
//   const [reportedBugs, setReportedBugs] = useState([]);
//   const [managerProjects, setManagerProjects] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!currentUser) {
//         return;
//       }

//       try {
//         console.log("Current User:", currentUser);

//         if (currentUser.roleid === 1 || currentUser.roleid === 2) {
//           console.log("Fetching all projects...");
//           const allProjectsResponse = await projectService.getProjects();
//           console.log("Fetched Projects:", allProjectsResponse.data);
//           setProjects(allProjectsResponse.data);
//         }

//         if (currentUser.roleid === 2) {
//           console.log("Fetching manager projects...");
//           const managerProjectsResponse =
//             await projectService.getProjectsByManager(currentUser.userid);
//           console.log(
//             "Fetched Manager Projects:",
//             managerProjectsResponse.data
//           );
//           setManagerProjects(managerProjectsResponse.data);
//         }

//         if (currentUser.roleid === 3 || currentUser.roleid === 4) {
//           console.log("Fetching user bugs...");
//           const bugsAssignedResponse = await bugService.getBugsAssignedToUser(
//             currentUser.userid
//           );
//           const bugsReportedResponse = await bugService.getBugsReportedByUser(
//             currentUser.userid
//           );

//           console.log("Fetched Bugs Assigned:", bugsAssignedResponse.data);
//           console.log("Fetched Bugs Reported:", bugsReportedResponse.data);

//           setAssignedBugs(bugsAssignedResponse.data);
//           setReportedBugs(bugsReportedResponse.data);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [currentUser]);

//   if (!currentUser) {
//     return <Typography variant="h4">Unauthorized Access</Typography>;
//   }

//   return (
//     <Container>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Dashboard
//       </Typography>
//       {currentUser.roleid === 1 && (
//         <Box mb={4}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate("/users")}
//           >
//             Manage Users
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate("/projects")}
//           >
//             Manage Projects
//           </Button>
//         </Box>
//       )}
//       {currentUser.roleid === 2 && (
//         <Box mb={4}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate("/projects/new")}
//           >
//             Create Project
//           </Button>
//           <Typography variant="h5">My Managed Projects</Typography>
//           <List>
//             {managerProjects.map((project) => (
//               <ListItem key={project.projectid}>
//                 <Link href={`/projects/${project.projectid}`} underline="hover">
//                   {project.name}
//                 </Link>
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       )}
//       {(currentUser.roleid === 3 || currentUser.roleid === 4) && (
//         <>
//           <Typography variant="h5">My Projects</Typography>
//           <List>
//             {projects.map((project) => (
//               <ListItem key={project.projectid}>
//                 <Link href={`/projects/${project.projectid}`} underline="hover">
//                   {project.name}
//                 </Link>
//               </ListItem>
//             ))}
//           </List>
//           <Typography variant="h5">My Bugs</Typography>
//           <List>
//             {assignedBugs.map((bug) => (
//               <ListItem key={bug.bugid}>
//                 <Link href={`/bugs/${bug.bugid}`} underline="hover">
//                   {bug.title} (Assigned to you)
//                 </Link>
//               </ListItem>
//             ))}
//             {reportedBugs.map((bug) => (
//               <ListItem key={bug.bugid}>
//                 <Link href={`/bugs/${bug.bugid}`} underline="hover">
//                   {bug.title} (Reported by you)
//                 </Link>
//               </ListItem>
//             ))}
//           </List>
//         </>
//       )}
//     </Container>
//   );
// };

// export default Dashboard;
//


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import authService from "../services/authService";
// import projectService from "../services/projectService";
// import bugService from "../services/bugService";
// import auditLogService from "../services/auditLogService";
// import {
//   Container,
//   Typography,
//   Button,
//   List,
//   ListItem,
//   Link,
//   Box,
// } from "@mui/material";

// const Dashboard = () => {
//   const [projects, setProjects] = useState([]);
//   const [managerProjects, setManagerProjects] = useState([]);
//   const [assignedBugs, setAssignedBugs] = useState([]);
//   const [reportedBugs, setReportedBugs] = useState([]);
//   const [auditLogs, setAuditLogs] = useState([]);
//   const navigate = useNavigate();
//   const currentUser = authService.getCurrentUser();

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!currentUser) {
//         navigate("/login");
//         return;
//       }

//       try {
//         if (currentUser.roleid === 1) {
//           const allProjects = await projectService.getProjects();
//           setProjects(allProjects.data);
//           const allAuditLogs = await auditLogService.getAllAuditLogs();
//           setAuditLogs(allAuditLogs.data);
//         } else if (currentUser.roleid === 2) {
//           const allProjects = await projectService.getProjects();
//           const managedProjects = allProjects.data.filter(
//             (project) => project.projectmanagerid === currentUser.userid
//           );
//           setManagerProjects(managedProjects);
//           const allAuditLogs = await auditLogService.getAllAuditLogs();
//           setAuditLogs(allAuditLogs.data);
//         } else {
//           const userProjects = await projectService.getUserProjects(
//             currentUser.userid
//           );
//           setProjects(userProjects.data);
//           const bugsAssigned = await bugService.getBugsAssignedToUser(
//             currentUser.userid
//           );
//           setAssignedBugs(bugsAssigned.data);
//           const bugsReported = await bugService.getBugsReportedByUser(
//             currentUser.userid
//           );
//           setReportedBugs(bugsReported.data);
//           const projectAuditLogs =
//             await auditLogService.getAuditLogsByUserProjects(
//               currentUser.userid
//             );
//           setAuditLogs(projectAuditLogs.data);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [currentUser, navigate]);

//   if (!currentUser) {
//     return <Typography variant="h4">Unauthorized Access</Typography>;
//   }

//   return (
//     <Container>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Dashboard
//       </Typography>
//       {currentUser.roleid === 1 && (
//         <Box mb={4}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate("/users")}
//           >
//             Manage Users
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate("/projects")}
//           >
//             Manage Projects
//           </Button>
//           <Typography variant="h5">Audit Logs</Typography>
//           <List>
//             {auditLogs.map((log) => (
//               <ListItem key={log.logid}>
//                 {log.changedescription} by {log.changedbyname} on{" "}
//                 {log.changedate}
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       )}
//       {currentUser.roleid === 2 && (
//         <Box mb={4}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate("/projects/new")}
//           >
//             Create Project
//           </Button>
//           <Typography variant="h5">My Managed Projects</Typography>
//           <List>
//             {managerProjects.map((project) => (
//               <ListItem key={project.projectid}>
//                 <Link href={`/projects/${project.projectid}`} underline="hover">
//                   {project.name}
//                 </Link>
//               </ListItem>
//             ))}
//           </List>
//           <Typography variant="h5">Audit Logs</Typography>
//           <List>
//             {auditLogs.map((log) => (
//               <ListItem key={log.logid}>
//                 {log.changedescription} on {log.projectname} by{" "}
//                 {log.changedbyname} on {log.changedate}
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       )}
//       {(currentUser.roleid === 3 || currentUser.roleid === 4) && (
//         <>
//           <Typography variant="h5">My Projects</Typography>
//           <List>
//             {projects.map((project) => (
//               <ListItem key={project.projectid}>
//                 <Link href={`/projects/${project.projectid}`} underline="hover">
//                   {project.name}
//                 </Link>
//               </ListItem>
//             ))}
//           </List>
//           <Typography variant="h5">My Bugs</Typography>
//           <List>
//             {assignedBugs.map((bug) => (
//               <ListItem key={bug.bugid}>
//                 <Link href={`/bugs/${bug.bugid}`} underline="hover">
//                   {bug.title} (Assigned to you)
//                 </Link>
//               </ListItem>
//             ))}
//             {reportedBugs.map((bug) => (
//               <ListItem key={bug.bugid}>
//                 <Link href={`/bugs/${bug.bugid}`} underline="hover">
//                   {bug.title} (Reported by you)
//                 </Link>
//               </ListItem>
//             ))}
//           </List>
//           <Typography variant="h5">Audit Logs</Typography>
//           <List>
//             {auditLogs.map((log) => (
//               <ListItem key={log.logid}>
//                 {log.changedescription} on {log.projectname} by{" "}
//                 {log.changedbyname} on {log.changedate}
//               </ListItem>
//             ))}
//           </List>
//         </>
//       )}
//     </Container>
//   );
// };

// export default Dashboard;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import projectService from "../services/projectService";
// import bugService from "../services/bugService";
// import authService from "../services/authService";
// import {
//   Container,
//   Typography,
//   Button,
//   List,
//   ListItem,
//   Link,
//   Box,
// } from "@mui/material";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const currentUser = authService.getCurrentUser();
//   const [projects, setProjects] = useState([]);
//   const [assignedBugs, setAssignedBugs] = useState([]);
//   const [reportedBugs, setReportedBugs] = useState([]);
//   const [managerProjects, setManagerProjects] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!currentUser) {
//         return;
//       }

//       try {
//         console.log("Current User:", currentUser);

//         if (currentUser.roleid === 1 || currentUser.roleid === 2) {
//           console.log("Fetching all projects...");
//           const allProjectsResponse = await projectService.getProjects();
//           console.log("Fetched Projects:", allProjectsResponse.data);
//           setProjects(allProjectsResponse.data);
//         }

//         if (currentUser.roleid === 2) {
//           console.log("Fetching manager projects...");
//           const managerProjectsResponse =
//             await projectService.getProjectsByManager(currentUser.userid);
//           console.log(
//             "Fetched Manager Projects:",
//             managerProjectsResponse.data
//           );
//           setManagerProjects(managerProjectsResponse.data);
//         }

//         if (currentUser.roleid === 3 || currentUser.roleid === 4) {
//           console.log("Fetching user bugs...");
//           const bugsAssignedResponse = await bugService.getBugsAssignedToUser(
//             currentUser.userid
//           );
//           const bugsReportedResponse = await bugService.getBugsReportedByUser(
//             currentUser.userid
//           );

//           console.log("Fetched Bugs Assigned:", bugsAssignedResponse.data);
//           console.log("Fetched Bugs Reported:", bugsReportedResponse.data);

//           setAssignedBugs(bugsAssignedResponse.data);
//           setReportedBugs(bugsReportedResponse.data);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [currentUser]);

//   if (!currentUser) {
//     return <Typography variant="h4">Unauthorized Access</Typography>;
//   }

//   return (
//     <Container>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Dashboard
//       </Typography>
//       {currentUser.roleid === 1 && (
//         <Box mb={4}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate("/users")}
//           >
//             Manage Users
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate("/projects")}
//           >
//             Manage Projects
//           </Button>
//         </Box>
//       )}
//       {currentUser.roleid === 2 && (
//         <Box mb={4}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate("/projects/new")}
//           >
//             Create Project
//           </Button>
//           <Typography variant="h5">My Managed Projects</Typography>
//           <List>
//             {managerProjects.map((project) => (
//               <ListItem key={project.projectid}>
//                 <Link href={`/projects/${project.projectid}`} underline="hover">
//                   {project.name}
//                 </Link>
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       )}
//       {(currentUser.roleid === 3 || currentUser.roleid === 4) && (
//         <>
//           <Typography variant="h5">My Projects</Typography>
//           <List>
//             {projects.map((project) => (
//               <ListItem key={project.projectid}>
//                 <Link href={`/projects/${project.projectid}`} underline="hover">
//                   {project.name}
//                 </Link>
//               </ListItem>
//             ))}
//           </List>
//           <Typography variant="h5">My Bugs</Typography>
//           <List>
//             {assignedBugs.map((bug) => (
//               <ListItem key={bug.bugid}>
//                 <Link href={`/bugs/${bug.bugid}`} underline="hover">
//                   {bug.title} (Assigned to you)
//                 </Link>
//               </ListItem>
//             ))}
//             {reportedBugs.map((bug) => (
//               <ListItem key={bug.bugid}>
//                 <Link href={`/bugs/${bug.bugid}`} underline="hover">
//                   {bug.title} (Reported by you)
//                 </Link>
//               </ListItem>
//             ))}
//           </List>
//         </>
//       )}
//     </Container>
//   );
// };

// export default Dashboard;
//
//

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import projectService from "../services/projectService";
// import bugService from "../services/bugService";
// import auditLogService from "../services/auditLogService";
// import authService from "../services/authService";
// import {
//   Container,
//   Typography,
//   Button,
//   List,
//   ListItem,
//   Link,
//   Box,
// } from "@mui/material";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const currentUser = authService.getCurrentUser();
//   const [projects, setProjects] = useState([]);
//   const [assignedBugs, setAssignedBugs] = useState([]);
//   const [reportedBugs, setReportedBugs] = useState([]);
//   const [managerProjects, setManagerProjects] = useState([]);
//   const [auditLogs, setAuditLogs] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!currentUser) {
//         return;
//       }

//       try {
//         console.log("Current User:", currentUser);

//         if (currentUser.roleid === 1 || currentUser.roleid === 2) {
//           console.log("Fetching all projects...");
//           const allProjectsResponse = await projectService.getProjects();
//           console.log("Fetched Projects:", allProjectsResponse.data);
//           setProjects(allProjectsResponse.data);
//         }

//         if (currentUser.roleid === 1) {
//           console.log("Fetching all audit logs...");
//           const allAuditLogsResponse = await auditLogService.getAllAuditLogs();
//           console.log("Fetched Audit Logs:", allAuditLogsResponse.data);
//           setAuditLogs(allAuditLogsResponse.data);
//         }

//         if (currentUser.roleid === 2) {
//           console.log("Fetching manager projects...");
//           const managerProjectsResponse =
//             await projectService.getProjectsByManager(currentUser.userid);
//           console.log(
//             "Fetched Manager Projects:",
//             managerProjectsResponse.data
//           );
//           setManagerProjects(managerProjectsResponse.data);

//           console.log("Fetching audit logs for manager's projects...");
//           const managerAuditLogsResponse =
//             await auditLogService.getAuditLogsByUserProjects(
//               currentUser.userid
//             );
//           console.log(
//             "Fetched Manager Audit Logs:",
//             managerAuditLogsResponse.data
//           );
//           setAuditLogs(managerAuditLogsResponse.data);
//         }

//         if (currentUser.roleid === 3 || currentUser.roleid === 4) {
//           console.log("Fetching user bugs...");
//           const bugsAssignedResponse = await bugService.getBugsAssignedToUser(
//             currentUser.userid
//           );
//           const bugsReportedResponse = await bugService.getBugsReportedByUser(
//             currentUser.userid
//           );

//           console.log("Fetched Bugs Assigned:", bugsAssignedResponse.data);
//           console.log("Fetched Bugs Reported:", bugsReportedResponse.data);

//           setAssignedBugs(bugsAssignedResponse.data);
//           setReportedBugs(bugsReportedResponse.data);

//           console.log("Fetching audit logs for user projects...");
//           const userAuditLogsResponse =
//             await auditLogService.getAuditLogsByUserProjects(
//               currentUser.userid
//             );
//           console.log("Fetched User Audit Logs:", userAuditLogsResponse.data);
//           setAuditLogs(userAuditLogsResponse.data);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [currentUser]);

//   if (!currentUser) {
//     return <Typography variant="h4">Unauthorized Access</Typography>;
//   }

//   const renderAuditLogs = () => (
//     <List>
//       {auditLogs.map((log) => (
//         <ListItem key={log.logid}>
//           <Link href={`/bugs/${log.bugid}`} underline="hover">
//             <Typography>
//               {log.changetype} bug: {log.changedescription} by{" "}
//               {log.changedbyname} on {new Date(log.changedate).toLocaleString()}
//             </Typography>
//           </Link>
//         </ListItem>
//       ))}
//     </List>
//   );

//   return (
//     <Container>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Dashboard
//       </Typography>
//       {currentUser.roleid === 1 && (
//         <Box mb={4}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate("/users")}
//           >
//             Manage Users
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate("/projects")}
//           >
//             Manage Projects
//           </Button>
//           <Typography variant="h5" gutterBottom>
//             Audit Logs
//           </Typography>
//           {renderAuditLogs()}
//         </Box>
//       )}
//       {currentUser.roleid === 2 && (
//         <Box mb={4}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate("/projects/new")}
//           >
//             Create Project
//           </Button>
//           <Typography variant="h5" gutterBottom>
//             My Managed Projects
//           </Typography>
//           <List>
//             {managerProjects.map((project) => (
//               <ListItem key={project.projectid}>
//                 <Link href={`/projects/${project.projectid}`} underline="hover">
//                   {project.name}
//                 </Link>
//               </ListItem>
//             ))}
//           </List>
//           <Typography variant="h5" gutterBottom>
//             Audit Logs
//           </Typography>
//           {renderAuditLogs()}
//         </Box>
//       )}
//       {(currentUser.roleid === 3 || currentUser.roleid === 4) && (
//         <>
//           <Typography variant="h5" gutterBottom>
//             My Projects
//           </Typography>
//           <List>
//             {projects.map((project) => (
//               <ListItem key={project.projectid}>
//                 <Link href={`/projects/${project.projectid}`} underline="hover">
//                   {project.name}
//                 </Link>
//               </ListItem>
//             ))}
//           </List>
//           <Typography variant="h5" gutterBottom>
//             My Bugs
//           </Typography>
//           <List>
//             {assignedBugs.map((bug) => (
//               <ListItem key={bug.bugid}>
//                 <Link href={`/bugs/${bug.bugid}`} underline="hover">
//                   {bug.title} (Assigned to you)
//                 </Link>
//               </ListItem>
//             ))}
//             {reportedBugs.map((bug) => (
//               <ListItem key={bug.bugid}>
//                 <Link href={`/bugs/${bug.bugid}`} underline="hover">
//                   {bug.title} (Reported by you)
//                 </Link>
//               </ListItem>
//             ))}
//           </List>
//           <Typography variant="h5" gutterBottom>
//             Audit Logs
//           </Typography>
//           {renderAuditLogs()}
//         </>
//       )}
//     </Container>
//   );
// };

// export default Dashboard;
//
//


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import projectService from "../services/projectService";
// import bugService from "../services/bugService";
// import authService from "../services/authService";
// import auditLogService from "../services/auditLogService"; // Add this import
// import {
//   Container,
//   Typography,
//   Button,
//   List,
//   ListItem,
//   Link,
//   Box,
// } from "@mui/material";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const currentUser = authService.getCurrentUser();
//   const [projects, setProjects] = useState([]);
//   const [assignedBugs, setAssignedBugs] = useState([]);
//   const [reportedBugs, setReportedBugs] = useState([]);
//   const [managerProjects, setManagerProjects] = useState([]);
//   const [auditLogs, setAuditLogs] = useState([]); // Add this state

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!currentUser) {
//         return;
//       }

//       try {
//         console.log("Current User:", currentUser);

//         if (currentUser.roleid === 1 || currentUser.roleid === 2) {
//           console.log("Fetching all projects...");
//           const allProjectsResponse = await projectService.getProjects();
//           console.log("Fetched Projects:", allProjectsResponse.data);
//           setProjects(allProjectsResponse.data);

//           if (currentUser.roleid === 1) {
//             console.log("Fetching audit logs...");
//             const auditLogsResponse = await auditLogService.getAllAuditLogs();
//             console.log("Fetched Audit Logs:", auditLogsResponse.data);
//             setAuditLogs(auditLogsResponse.data);
//           }
//         }

//         if (currentUser.roleid === 2) {
//           console.log("Fetching manager projects...");
//           const managerProjectsResponse =
//             await projectService.getProjectsByManager(currentUser.userid);
//           console.log(
//             "Fetched Manager Projects:",
//             managerProjectsResponse.data
//           );
//           setManagerProjects(managerProjectsResponse.data);

//           console.log("Fetching audit logs for manager's projects...");
//           const auditLogsResponse =
//             await auditLogService.getAuditLogsByUserProjects(
//               currentUser.userid
//             );
//           console.log("Fetched Manager Audit Logs:", auditLogsResponse.data);
//           setAuditLogs(auditLogsResponse.data);
//         }

//         if (currentUser.roleid === 3 || currentUser.roleid === 4) {
//           console.log("Fetching user projects...");
//           const userProjectsResponse = await projectService.getUserProjects(
//             currentUser.userid
//           );
//           console.log("Fetched User Projects:", userProjectsResponse.data);
//           setProjects(userProjectsResponse.data);

//           console.log("Fetching user bugs...");
//           const bugsAssignedResponse = await bugService.getBugsAssignedToUser(
//             currentUser.userid
//           );
//           const bugsReportedResponse = await bugService.getBugsReportedByUser(
//             currentUser.userid
//           );

//           console.log("Fetched Bugs Assigned:", bugsAssignedResponse.data);
//           console.log("Fetched Bugs Reported:", bugsReportedResponse.data);

//           setAssignedBugs(bugsAssignedResponse.data);
//           setReportedBugs(bugsReportedResponse.data);

//           console.log("Fetching audit logs for user's projects...");
//           const auditLogsResponse =
//             await auditLogService.getAuditLogsByUserProjects(
//               currentUser.userid
//             );
//           console.log("Fetched User Audit Logs:", auditLogsResponse.data);
//           setAuditLogs(auditLogsResponse.data);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [currentUser]);

//   if (!currentUser) {
//     return <Typography variant="h4">Unauthorized Access</Typography>;
//   }

//   return (
//     <Container>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Dashboard
//       </Typography>
//       {currentUser.roleid === 1 && (
//         <Box mb={4}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate("/users")}
//           >
//             Manage Users
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate("/projects")}
//           >
//             Manage Projects
//           </Button>
//         </Box>
//       )}
//       {currentUser.roleid === 2 && (
//         <Box mb={4}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate("/projects/new")}
//           >
//             Create Project
//           </Button>
//           <Typography variant="h5">My Managed Projects</Typography>
//           <List>
//             {managerProjects.map((project) => (
//               <ListItem key={project.projectid}>
//                 <Link href={`/projects/${project.projectid}`} underline="hover">
//                   {project.name}
//                 </Link>
//               </ListItem>
//             ))}
//           </List>
//           <Typography variant="h5">Audit Logs</Typography>
//           <List>
//             {auditLogs.map((log) => (
//               <ListItem key={log.logid}>
//                 <Typography>
//                   {log.changetype} bug:{" "}
//                   <Link href={`/bugs/${log.bugid}`} underline="hover">
//                     {log.changedescription}
//                   </Link>{" "}
//                   by {log.changedbyname} on{" "}
//                   {new Date(log.changedate).toLocaleString()}
//                 </Typography>
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       )}
//       {(currentUser.roleid === 3 || currentUser.roleid === 4) && (
//         <>
//           <Typography variant="h5">My Projects</Typography>
//           <List>
//             {projects.map((project) => (
//               <ListItem key={project.projectid}>
//                 <Link href={`/projects/${project.projectid}`} underline="hover">
//                   {project.name}
//                 </Link>
//               </ListItem>
//             ))}
//           </List>
//           <Typography variant="h5">My Bugs</Typography>
//           <List>
//             {assignedBugs.map((bug) => (
//               <ListItem key={bug.bugid}>
//                 <Link href={`/bugs/${bug.bugid}`} underline="hover">
//                   {bug.title} (Assigned to you)
//                 </Link>
//               </ListItem>
//             ))}
//             {reportedBugs.map((bug) => (
//               <ListItem key={bug.bugid}>
//                 <Link href={`/bugs/${bug.bugid}`} underline="hover">
//                   {bug.title} (Reported by you)
//                 </Link>
//               </ListItem>
//             ))}
//           </List>
//           <Typography variant="h5">Audit Logs</Typography>
//           <List>
//             {auditLogs.map((log) => (
//               <ListItem key={log.logid}>
//                 <Typography>
//                   {log.changetype} bug:{" "}
//                   <Link href={`/bugs/${log.bugid}`} underline="hover">
//                     {log.changedescription}
//                   </Link>{" "}
//                   by {log.changedbyname} on{" "}
//                   {new Date(log.changedate).toLocaleString()}
//                 </Typography>
//               </ListItem>
//             ))}
//           </List>
//         </>
//       )}
//     </Container>
//   );
// };

// export default Dashboard;



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import projectService from "../services/projectService";
// import bugService from "../services/bugService";
// import authService from "../services/authService";
// import auditLogService from "../services/auditLogService"; // Add this import
// import {
//   Container,
//   Typography,
//   Button,
//   List,
//   ListItem,
//   Link,
//   Box,
// } from "@mui/material";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const currentUser = authService.getCurrentUser();
//   const [projects, setProjects] = useState([]);
//   const [assignedBugs, setAssignedBugs] = useState([]);
//   const [reportedBugs, setReportedBugs] = useState([]);
//   const [managerProjects, setManagerProjects] = useState([]);
//   const [auditLogs, setAuditLogs] = useState([]); // Add this state

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!currentUser) {
//         return;
//       }

//       try {
//         console.log("Current User:", currentUser);

//         if (currentUser.roleid === 1 || currentUser.roleid === 2) {
//           console.log("Fetching all projects...");
//           const allProjectsResponse = await projectService.getProjects();
//           console.log("Fetched Projects:", allProjectsResponse.data);
//           setProjects(allProjectsResponse.data);

//           if (currentUser.roleid === 1) {
//             console.log("Fetching audit logs...");
//             const auditLogsResponse = await auditLogService.getAllAuditLogs();
//             console.log("Fetched Audit Logs:", auditLogsResponse.data);
//             setAuditLogs(auditLogsResponse.data);
//           }
//         }

//         if (currentUser.roleid === 2) {
//           console.log("Fetching manager projects...");
//           const managerProjectsResponse =
//             await projectService.getProjectsByManager(currentUser.userid);
//           console.log(
//             "Fetched Manager Projects:",
//             managerProjectsResponse.data
//           );
//           setManagerProjects(managerProjectsResponse.data);

//           console.log("Fetching audit logs for manager's projects...");
//           const auditLogsResponse =
//             await auditLogService.getAuditLogsForManager(currentUser.userid);
//           console.log("Fetched Manager Audit Logs:", auditLogsResponse.data);
//           setAuditLogs(auditLogsResponse.data);
//         }

//         if (currentUser.roleid === 3 || currentUser.roleid === 4) {
//           console.log("Fetching user projects...");
//           const userProjectsResponse = await projectService.getUserProjects(
//             currentUser.userid
//           );
//           console.log("Fetched User Projects:", userProjectsResponse.data);
//           setProjects(userProjectsResponse.data);

//           console.log("Fetching user bugs...");
//           const bugsAssignedResponse = await bugService.getBugsAssignedToUser(
//             currentUser.userid
//           );
//           const bugsReportedResponse = await bugService.getBugsReportedByUser(
//             currentUser.userid
//           );

//           console.log("Fetched Bugs Assigned:", bugsAssignedResponse.data);
//           console.log("Fetched Bugs Reported:", bugsReportedResponse.data);

//           setAssignedBugs(bugsAssignedResponse.data);
//           setReportedBugs(bugsReportedResponse.data);

//           console.log("Fetching audit logs for user's projects...");
//           const auditLogsResponse =
//             await auditLogService.getAuditLogsByUserProjects(
//               currentUser.userid
//             );
//           console.log("Fetched User Audit Logs:", auditLogsResponse.data);
//           setAuditLogs(auditLogsResponse.data);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [currentUser]);

//   if (!currentUser) {
//     return <Typography variant="h4">Unauthorized Access</Typography>;
//   }

//   return (
//     <Container>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Dashboard
//       </Typography>
//       {currentUser.roleid === 1 && (
//         <Box mb={4}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate("/users")}
//           >
//             Manage Users
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate("/projects")}
//           >
//             Manage Projects
//           </Button>
          
//         </Box>
//       )}
//       {currentUser.roleid === 2 && (
//         <Box mb={4}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate("/projects/new")}
//           >
//             Create Project
//           </Button>
//           <Typography variant="h5">My Managed Projects</Typography>
//           <List>
//             {managerProjects.map((project) => (
//               <ListItem key={project.projectid}>
//                 <Link href={`/projects/${project.projectid}`} underline="hover">
//                   {project.name}
//                 </Link>
//               </ListItem>
//             ))}
//           </List>
//           <Typography variant="h5">Audit Logs</Typography>
//           <List>
//             {auditLogs.map((log) => (
//               <ListItem key={log.logid}>
//                 <Typography>
//                   {log.changetype} bug:{" "}
//                   <Link href={`/bugs/${log.bugid}`} underline="hover">
//                     {log.changedescription}
//                   </Link>{" "}
//                   by {log.changedbyname} on{" "}
//                   {new Date(log.changedate).toLocaleString()}
//                 </Typography>
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       )}
//       {(currentUser.roleid === 3 || currentUser.roleid === 4) && (
//         <>
//           <Typography variant="h5">My Projects</Typography>
//           <List>
//             {projects.map((project) => (
//               <ListItem key={project.projectid}>
//                 <Link href={`/projects/${project.projectid}`} underline="hover">
//                   {project.name}
//                 </Link>
//               </ListItem>
//             ))}
//           </List>
//           <Typography variant="h5">My Bugs</Typography>
//           <List>
//             {assignedBugs.map((bug) => (
//               <ListItem key={bug.bugid}>
//                 <Link href={`/bugs/${bug.bugid}`} underline="hover">
//                   {bug.title} (Assigned to you)
//                 </Link>
//               </ListItem>
//             ))}
//             {reportedBugs.map((bug) => (
//               <ListItem key={bug.bugid}>
//                 <Link href={`/bugs/${bug.bugid}`} underline="hover">
//                   {bug.title} (Reported by you)
//                 </Link>
//               </ListItem>
//             ))}
//           </List>
//           <Typography variant="h5">Audit Logs</Typography>
//           <List>
//             {auditLogs.map((log) => (
//               <ListItem key={log.logid}>
//                 <Typography>
//                   {log.changetype} bug:{" "}
//                   <Link href={`/bugs/${log.bugid}`} underline="hover">
//                     {log.changedescription}
//                   </Link>{" "}
//                   by {log.changedbyname} on{" "}
//                   {new Date(log.changedate).toLocaleString()}
//                 </Typography>
//               </ListItem>
//             ))}
//           </List>
//         </>
//       )}
//     </Container>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import projectService from "../services/projectService";
import bugService from "../services/bugService";
import authService from "../services/authService";
import auditLogService from "../services/auditLogService"; // Add this import
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  Link,
  Box,
} from "@mui/material";

const Dashboard = () => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const [projects, setProjects] = useState([]);
  const [assignedBugs, setAssignedBugs] = useState([]);
  const [reportedBugs, setReportedBugs] = useState([]);
  const [managerProjects, setManagerProjects] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]); // Add this state

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) {
        return;
      }

      try {
        console.log("Current User:", currentUser);

        if (currentUser.roleid === 1) {
          console.log("Fetching all projects...");
          const allProjectsResponse = await projectService.getProjects();
          console.log("Fetched Projects:", allProjectsResponse.data);
          setProjects(allProjectsResponse.data);

          console.log("Fetching audit logs...");
          const auditLogsResponse = await auditLogService.getAllAuditLogs();
          console.log("Fetched Audit Logs:", auditLogsResponse.data);
          setAuditLogs(auditLogsResponse.data);
        }

        if (currentUser.roleid === 2) {
          console.log("Fetching manager projects...");
          const managerProjectsResponse =
            await projectService.getProjectsByManager(currentUser.userid);
          console.log(
            "Fetched Manager Projects:",
            managerProjectsResponse.data
          );
          setManagerProjects(managerProjectsResponse.data);

          console.log("Fetching audit logs for manager's projects...");
          const auditLogsResponse =
            await auditLogService.getAuditLogsForManager(currentUser.userid);
          console.log("Fetched Manager Audit Logs:", auditLogsResponse.data);
          setAuditLogs(auditLogsResponse.data);
        }

        if (currentUser.roleid === 3 || currentUser.roleid === 4) {
          console.log("Fetching user projects...");
          const userProjectsResponse = await projectService.getUserProjects(
            currentUser.userid
          );
          console.log("Fetched User Projects:", userProjectsResponse.data);
          setProjects(userProjectsResponse.data);

          console.log("Fetching user bugs...");
          const bugsAssignedResponse = await bugService.getBugsAssignedToUser(
            currentUser.userid
          );
          const bugsReportedResponse = await bugService.getBugsReportedByUser(
            currentUser.userid
          );

          console.log("Fetched Bugs Assigned:", bugsAssignedResponse.data);
          console.log("Fetched Bugs Reported:", bugsReportedResponse.data);

          setAssignedBugs(bugsAssignedResponse.data);
          setReportedBugs(bugsReportedResponse.data);

          console.log("Fetching audit logs for user's projects...");
          const auditLogsResponse =
            await auditLogService.getAuditLogsByUserProjects(
              currentUser.userid
            );
          console.log("Fetched User Audit Logs:", auditLogsResponse.data);
          setAuditLogs(auditLogsResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentUser]);

  if (!currentUser) {
    return <Typography variant="h4">Unauthorized Access</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      {currentUser.roleid === 1 && (
        <Box mb={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/users")}
          >
            Manage Users
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/projects")}
          >
            Manage Projects
          </Button>
          <Typography variant="h5" mt={4}>
            Audit Logs
          </Typography>
          <List>
            {auditLogs.map((log) => (
              <ListItem key={log.logid}>
                <Typography>
                  {log.changetype} bug:{" "}
                  <Link href={`/bugs/${log.bugid}`} underline="hover">
                    {log.changedescription}
                  </Link>{" "}
                  by {log.changedbyname} on{" "}
                  {new Date(log.changedate).toLocaleString()}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
      {currentUser.roleid === 2 && (
        <Box mb={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/projects/new")}
          >
            Create Project
          </Button>
          <Typography variant="h5">My Managed Projects</Typography>
          <List>
            {managerProjects.map((project) => (
              <ListItem key={project.projectid}>
                <Link href={`/projects/${project.projectid}`} underline="hover">
                  {project.name}
                </Link>
              </ListItem>
            ))}
          </List>
          <Typography variant="h5">Audit Logs</Typography>
          <List>
            {auditLogs.map((log) => (
              <ListItem key={log.logid}>
                <Typography>
                  {log.changetype} bug:{" "}
                  <Link href={`/bugs/${log.bugid}`} underline="hover">
                    {log.changedescription}
                  </Link>{" "}
                  by {log.changedbyname} on{" "}
                  {new Date(log.changedate).toLocaleString()}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
      {(currentUser.roleid === 3 || currentUser.roleid === 4) && (
        <>
          <Typography variant="h5">My Projects</Typography>
          <List>
            {projects.map((project) => (
              <ListItem key={project.projectid}>
                <Link href={`/projects/${project.projectid}`} underline="hover">
                  {project.name}
                </Link>
              </ListItem>
            ))}
          </List>
          <Typography variant="h5">My Bugs</Typography>
          <List>
            {assignedBugs.map((bug) => (
              <ListItem key={bug.bugid}>
                <Link href={`/bugs/${bug.bugid}`} underline="hover">
                  {bug.title} (Assigned to you)
                </Link>
              </ListItem>
            ))}
            {reportedBugs.map((bug) => (
              <ListItem key={bug.bugid}>
                <Link href={`/bugs/${bug.bugid}`} underline="hover">
                  {bug.title} (Reported by you)
                </Link>
              </ListItem>
            ))}
          </List>
          <Typography variant="h5">Audit Logs</Typography>
          <List>
            {auditLogs.map((log) => (
              <ListItem key={log.logid}>
                <Typography>
                  {log.changetype} bug:{" "}
                  <Link href={`/bugs/${log.bugid}`} underline="hover">
                    {log.changedescription}
                  </Link>{" "}
                  by {log.changedbyname} on{" "}
                  {new Date(log.changedate).toLocaleString()}
                </Typography>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Container>
  );
};

export default Dashboard;



