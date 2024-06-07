import axios from "axios";
import authService from "./authService";

const API_URL = "http://localhost:3000/api/bugs/";

const getBugs = () => {
  return axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

const getBug = (id) => {
  return axios.get(API_URL + id, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

const createBug = (bug) => {
  return axios.post(API_URL, bug, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

const updateBug = (id, bug) => {
  return axios.put(API_URL + id, bug, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

const deleteBug = (id) => {
  return axios.delete(API_URL + id, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

const getBugsByProjectId = (projectId) => {
  return axios.get(`http://localhost:3000/api/projects/${projectId}/bugs`, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};



const getBugsAssignedToUser = (userId) => {
  return axios.get(`${API_URL}user/assigned/${userId}`, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

const getBugsReportedByUser = (userId) => {
  return axios.get(`${API_URL}user/reported/${userId}`, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};


export default {
  getBugs,
  getBug,
  createBug,
  updateBug,
  deleteBug,
  getBugsByProjectId,
  getBugsAssignedToUser,
  getBugsReportedByUser
};
