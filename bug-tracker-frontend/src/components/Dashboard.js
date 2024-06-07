import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import projectService from "../services/projectService";
import bugService from "../services/bugService";
import authService from "../services/authService";
import auditLogService from "../services/auditLogService"; 
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
  const [auditLogs, setAuditLogs] = useState([]); 

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



