import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import projectService from "../../services/projectService";
import auditLogService from "../../services/auditLogService";
import authService from "../../services/authService";
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
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

    const fetchAuditLogs = async () => {
      const response = await auditLogService.getAuditLogsByProjectId(id);
      setAuditLogs(response.data);
    };

    const fetchCurrentUser = async () => {
      const user = await authService.getCurrentUser();
      setCurrentUser(user);
    };

    fetchProject();
    fetchAuditLogs();
    fetchCurrentUser();
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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!project) return <Typography>Loading...</Typography>;

  const isTesterOrDeveloper =
    currentUser && (currentUser.roleid === 3 || currentUser.roleid === 4);
  const hasProjectEnded = project && new Date(project.enddate) < new Date();

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {project.name}
      </Typography>
      <Typography variant="h6">Project Details</Typography>
      <Typography>Start Date: {formatDate(project.startdate)}</Typography>
      <Typography>End Date: {formatDate(project.enddate)}</Typography>
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
      {!isTesterOrDeveloper && (
        <>
          <Button variant="contained" color="primary" onClick={handleEdit}>
            Edit Project
          </Button>
          <Button variant="contained" color="secondary" onClick={handleDelete}>
            Delete Project
          </Button>
        </>
      )}
      {!hasProjectEnded && (
        <Button variant="contained" onClick={handleCreateBug}>
          Create Bug
        </Button>
      )}
      <Button variant="contained" onClick={handleManageBugs}>
        Manage Bugs
      </Button>
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

export default ProjectDetails;


