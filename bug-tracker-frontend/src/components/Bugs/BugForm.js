import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import bugService from "../../services/bugService";
import projectService from "../../services/projectService";
import userService from "../../services/userService";
import authService from "../../services/authService";
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

const BugForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [severity, setSeverity] = useState("");
  const [projectId, setProjectId] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [reportedBy, setReportedBy] = useState("");
  const [projects, setProjects] = useState([]);
  const [projectUsers, setProjectUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [projectManager, setProjectManager] = useState(null);
  const { id, projectId: projectRouteId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectResponse = await projectService.getProjects();
        setProjects(projectResponse.data);
        console.log("Projects: ", projectResponse.data);

        const userResponse = await userService.getUsers();
        setAllUsers(userResponse.data);
        console.log("All Users: ", userResponse.data);

        const currentUser = await authService.getCurrentUser();
        setCurrentUser(currentUser);

        if (id) {
          const bugResponse = await bugService.getBug(id);
          const {
            title,
            description,
            statusid,
            severityid,
            projectid,
            assignedto,
            reportedby,
          } = bugResponse.data;
          setTitle(title);
          setDescription(description);
          setStatus(statusid);
          setSeverity(severityid);
          setProjectId(projectid);
          setAssignedTo(assignedto);
          setReportedBy(reportedby);

          if (projectid) {
            const projectDetailResponse = await projectService.getProject(
              projectid
            );
            console.log("Project Users: ", projectDetailResponse.data.users);
            setProjectUsers(projectDetailResponse.data.users);
            setProjectManager({
              name: projectDetailResponse.data.projectmanager,
            });
          }
        } else if (projectRouteId) {
          setProjectId(projectRouteId);
          const projectDetailResponse = await projectService.getProject(
            projectRouteId
          );
          console.log("Project Users: ", projectDetailResponse.data.users);
          setProjectUsers(projectDetailResponse.data.users);
          setProjectManager({
            name: projectDetailResponse.data.projectmanager,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, projectRouteId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bug = {
      title,
      description,
      statusid: status,
      severityid: severity,
      projectid: projectId,
      assignedto: isTesterOrDeveloper ? null : assignedTo,
      reportedby: isTesterOrDeveloper
        ? currentUser.userid // Set reported by to the current user's ID
        : reportedBy
        ? parseInt(reportedBy)
        : currentUser.userid,
    };
    try {
      if (id) {
        await bugService.updateBug(id, bug);
      } else {
        await bugService.createBug(bug);
      }
      navigate(`/projects/${projectId}/bugs`);
    } catch (error) {
      console.error("Error saving bug:", error);
    }
  };

  const isProjectManagerOrAdmin =
    currentUser && (currentUser.roleid === 1 || currentUser.roleid === 2);
  const isTesterOrDeveloper =
    currentUser && (currentUser.roleid === 3 || currentUser.roleid === 4);

  const getProjectManagerId = () => {
    if (!projectManager || !allUsers.length) return null;
    const manager = allUsers.find(
      (user) => `${user.firstname} ${user.lastname}` === projectManager.name
    );
    return manager ? manager.userid : null;
  };

  const projectManagerId = getProjectManagerId();

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {id ? "Edit Bug" : "Add Bug"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Project</InputLabel>
          <Select
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            required
            native
            disabled={!!projectRouteId} // Disable the project selection if we are creating a bug under a specific project
          >
            <option value="" />
            {projects.map((project) => (
              <option key={project.projectid} value={project.projectid}>
                {project.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <MenuItem value={1}>Open</MenuItem>
            <MenuItem value={2}>In Progress</MenuItem>
            <MenuItem value={3}>Resolved</MenuItem>
            <MenuItem value={4}>Closed</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Severity</InputLabel>
          <Select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            required
          >
            <MenuItem value={1}>Critical</MenuItem>
            <MenuItem value={2}>High</MenuItem>
            <MenuItem value={3}>Medium</MenuItem>
            <MenuItem value={4}>Low</MenuItem>
          </Select>
        </FormControl>
        {isProjectManagerOrAdmin && (
          <FormControl fullWidth margin="normal">
            <InputLabel>Assigned To</InputLabel>
            <Select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              native
            >
              <option value="" />
              {projectUsers
                .filter(
                  (user) =>
                    user.rolename === "Developer" || user.rolename === "Tester"
                ) // Only developers and testers in the project
                .map((user) => (
                  <option key={user.userid} value={user.userid}>
                    {user.firstname} {user.lastname}
                  </option>
                ))}
            </Select>
          </FormControl>
        )}
        {!isTesterOrDeveloper && (
          <FormControl fullWidth margin="normal">
            <InputLabel>Reported By</InputLabel>
            <Select
              value={reportedBy}
              onChange={(e) => setReportedBy(e.target.value)}
              native
            >
              <option value="" />
              {projectUsers
                .filter(
                  (user) =>
                    user.rolename === "Developer" || user.rolename === "Tester"
                )
                .map((user) => (
                  <option key={user.userid} value={user.userid}>
                    {user.firstname} {user.lastname}
                  </option>
                ))}
              {projectManagerId && (
                <option value={projectManagerId}>{projectManager.name}</option>
              )}
            </Select>
          </FormControl>
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {id ? "Update Bug" : "Add Bug"}
        </Button>
      </form>
    </Container>
  );
};

export default BugForm;
