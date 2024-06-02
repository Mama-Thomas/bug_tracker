import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import projectService from "../../services/projectService";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await projectService.getProjects();
      setProjects(response.data);
    };
    fetchProjects();
  }, []);

  const handleView = (id) => {
    navigate(`/projects/${id}`);
  };

  const handleCreate = () => {
    navigate("/projects/new");
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Projects List
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreate}
        style={{ marginBottom: "20px" }}
      >
        Create New Project
      </Button>
      <List>
        {projects.map((project) => (
          <ListItem key={project.projectid}>
            <ListItemText
              primary={project.name}
              secondary={`Manager: ${project.projectmanager}`}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleView(project.projectid)}
            >
              View
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ProjectList;
