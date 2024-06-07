import axios from "axios";
import authService from "./authService";

const API_URL = "http://localhost:3000/api/projects/";

const getProjects = () => {
  return axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

const getProject = (id) => {
  return axios.get(API_URL + id, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

const createProject = (project) => {
  return axios.post(API_URL, project, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

const updateProject = (id, project) => {
  return axios.put(API_URL + id, project, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

const deleteProject = (id) => {
  return axios.delete(API_URL + id, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

const getUserProjects = (userId) => {
  return axios.get(`${API_URL}user/${userId}`, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

const getProjectsByManager = (managerId) => {
  return axios.get(`${API_URL}/manager/${managerId}`, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};


export default {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getUserProjects,
  getProjectsByManager,
};
