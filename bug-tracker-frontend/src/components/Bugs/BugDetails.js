// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import bugService from "../../services/bugService";
// import { Container, Typography, Button } from "@mui/material";

// const BugDetails = () => {
//   const { id } = useParams();
//   const [bug, setBug] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBug = async () => {
//       const response = await bugService.getBug(id);
//       setBug(response.data);
//     };
//     fetchBug();
//   }, [id]);

//   const handleEdit = () => {
//     navigate(`/bugs/edit/${id}`);
//   };

//   if (!bug) return <div>Loading...</div>;

//   return (
//     <Container>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Bug Details
//       </Typography>
//       <Typography variant="h6">Title: {bug.title}</Typography>
//       <Typography>Description: {bug.description}</Typography>
//       <Typography>Status: {bug.status}</Typography>
//       <Typography>Severity: {bug.severity}</Typography>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleEdit}
//         style={{ marginTop: "20px" }}
//       >
//         Edit Bug
//       </Button>
//     </Container>
//   );
// };

// export default BugDetails;



// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import bugService from "../../services/bugService";
// import { Container, Typography, Button } from "@mui/material";

// const BugDetails = () => {
//   const { id } = useParams();
//   const [bug, setBug] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBug = async () => {
//       const response = await bugService.getBug(id);
//       setBug(response.data);
//     };
//     fetchBug();
//   }, [id]);

//   const handleEdit = () => {
//     navigate(`/bugs/edit/${id}`);
//   };

//   const handleDelete = async () => {
//     try {
//       await bugService.deleteBug(id);
//       navigate("/bugs");
//     } catch (error) {
//       console.error("Error deleting bug:", error.response);
//     }
//   };

//   if (!bug) return <div>Loading...</div>;

//   return (
//     <Container>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Bug Details
//       </Typography>
//       <Typography variant="h6">Title: {bug.title}</Typography>
//       <Typography>Description: {bug.description}</Typography>
//       <Typography>Status: {bug.status}</Typography>
//       <Typography>Severity: {bug.severity}</Typography>
//       <Typography>Reported By: {bug.reportedbyname}</Typography>
//       <Typography>Assigned To: {bug.assignedtoname}</Typography>
//       <Typography>Project: {bug.projectname}</Typography>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleEdit}
//         style={{ marginTop: "20px", marginRight: "10px" }}
//       >
//         Edit Bug
//       </Button>
//       <Button
//         variant="contained"
//         color="secondary"
//         onClick={handleDelete}
//         style={{ marginTop: "20px" }}
//       >
//         Delete Bug
//       </Button>
//     </Container>
//   );
// };

// export default BugDetails;
//
//

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import bugService from "../../services/bugService";
// import { Container, Typography, Button } from "@mui/material";

// const BugDetails = () => {
//   const { id } = useParams();
//   const [bug, setBug] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBug = async () => {
//       const response = await bugService.getBug(id);
//       setBug(response.data);
//     };
//     fetchBug();
//   }, [id]);

//   const handleEdit = () => {
//     navigate(`/bugs/edit/${id}`);
//   };

//   const handleDelete = async () => {
//     try {
//       await bugService.deleteBug(id);
//       navigate("/bugs");
//     } catch (error) {
//       console.error("Error deleting bug:", error.response);
//     }
//   };

//   if (!bug) return <div>Loading...</div>;

//   return (
//     <Container>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Bug Details
//       </Typography>
//       <Typography variant="h6">Title: {bug.title}</Typography>
//       <Typography>Description: {bug.description}</Typography>
//       <Typography>Status: {bug.status}</Typography>
//       <Typography>Severity: {bug.severity}</Typography>
//       <Typography>Reported By: {bug.reportedbyname}</Typography>
//       <Typography>Assigned To: {bug.assignedtoname}</Typography>
//       <Typography>Project: {bug.projectname}</Typography>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleEdit}
//         style={{ marginTop: "20px", marginRight: "10px" }}
//       >
//         Edit Bug
//       </Button>
//       <Button
//         variant="contained"
//         color="secondary"
//         onClick={handleDelete}
//         style={{ marginTop: "20px" }}
//       >
//         Delete Bug
//       </Button>
//     </Container>
//   );
// };

// export default BugDetails;

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import bugService from "../../services/bugService";
// import auditLogService from "../../services/auditLogService"; // Import the audit log service
// import {
//   Container,
//   Typography,
//   Button,
//   List,
//   ListItem,
//   Box,
// } from "@mui/material";

// const BugDetails = () => {
//   const { id } = useParams();
//   const [bug, setBug] = useState(null);
//   const [auditLogs, setAuditLogs] = useState([]); // State for audit logs
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBug = async () => {
//       const response = await bugService.getBug(id);
//       setBug(response.data);
//     };

//     const fetchAuditLogs = async () => {
//       const response = await auditLogService.getAuditLogsByBugId(id);
//       setAuditLogs(response.data);
//     };

//     fetchBug();
//     fetchAuditLogs(); // Fetch audit logs
//   }, [id]);

//   const handleEdit = () => {
//     navigate(`/bugs/edit/${id}`);
//   };

  

//   const handleDelete = async () => {
//     try {
//       await bugService.deleteBug(id);
//       navigate(`/projects/${bug.projectid}/bugs`);
//     } catch (error) {
//       console.error("Error deleting bug:", error.response);
//     }
//   };


//   if (!bug) return <div>Loading...</div>;

//   return (
//     <Container>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Bug Details
//       </Typography>
//       <Typography variant="h6">Title: {bug.title}</Typography>
//       <Typography>Description: {bug.description}</Typography>
//       <Typography>Status: {bug.status}</Typography>
//       <Typography>Severity: {bug.severity}</Typography>
//       <Typography>Reported By: {bug.reportedbyname}</Typography>
//       <Typography>Assigned To: {bug.assignedtoname}</Typography>
//       <Typography>Project: {bug.projectname}</Typography>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleEdit}
//         style={{ marginTop: "20px", marginRight: "10px" }}
//       >
//         Edit Bug
//       </Button>
//       <Button
//         variant="contained"
//         color="secondary"
//         onClick={handleDelete}
//         style={{ marginTop: "20px" }}
//       >
//         Delete Bug
//       </Button>
//       <Box mt={4}>
//         <Typography variant="h5">Audit Logs</Typography>
//         <List>
//           {auditLogs.map((log) => (
//             <ListItem key={log.logid}>
//               <Typography>
//                 {log.changetype}: {log.changedescription} by {log.changedbyname}{" "}
//                 on {new Date(log.changedate).toLocaleString()}
//               </Typography>
//             </ListItem>
//           ))}
//         </List>
//       </Box>
//     </Container>
//   );
// };

// export default BugDetails;


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import bugService from "../../services/bugService";
import auditLogService from "../../services/auditLogService";
import authService from "../../services/authService";
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  Box,
} from "@mui/material";

const BugDetails = () => {
  const { id } = useParams();
  const [bug, setBug] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBug = async () => {
      const response = await bugService.getBug(id);
      setBug(response.data);
    };

    const fetchAuditLogs = async () => {
      const response = await auditLogService.getAuditLogsByBugId(id);
      setAuditLogs(response.data);
    };

    const fetchCurrentUser = async () => {
      const user = await authService.getCurrentUser();
      setCurrentUser(user);
    };

    fetchBug();
    fetchAuditLogs();
    fetchCurrentUser();
  }, [id]);

  // const handleEdit = () => {
  //   navigate(`/bugs/edit/${id}`);
  // };

   const handleEdit = () => {
     navigate(`/projects/${bug.projectid}/bugs/${id}/edit`);
   };

  const handleDelete = async () => {
    try {
      await bugService.deleteBug(id);
      navigate(`/projects/${bug.projectid}/bugs`);
    } catch (error) {
      console.error("Error deleting bug:", error.response);
    }
  };

  if (!bug) return <div>Loading...</div>;

  const isTesterOrDeveloper =
    currentUser && (currentUser.roleid === 3 || currentUser.roleid === 4);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Bug Details
      </Typography>
      <Typography variant="h6">Title: {bug.title}</Typography>
      <Typography>Description: {bug.description}</Typography>
      <Typography>Status: {bug.status}</Typography>
      <Typography>Severity: {bug.severity}</Typography>
      <Typography>Reported By: {bug.reportedbyname}</Typography>
      <Typography>Assigned To: {bug.assignedtoname}</Typography>
      <Typography>Project: {bug.projectname}</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleEdit}
        style={{ marginTop: "20px", marginRight: "10px" }}
      >
        Edit Bug
      </Button>
      {!isTesterOrDeveloper && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDelete}
          style={{ marginTop: "20px" }}
        >
          Delete Bug
        </Button>
      )}
      <Box mt={4}>
        <Typography variant="h5">Audit Logs</Typography>
        <List>
          {auditLogs.map((log) => (
            <ListItem key={log.logid}>
              <Typography>
                {log.changetype}: {log.changedescription} by {log.changedbyname}{" "}
                on {new Date(log.changedate).toLocaleString()}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default BugDetails;


