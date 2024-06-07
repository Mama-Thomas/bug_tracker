import axios from "axios";
import authService from "./authService";

const API_URL = "http://localhost:3000/api/auditlogs/";

const getAuditLogsByProjectId = (projectId) => {
  return axios.get(`${API_URL}project/${projectId}`, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

const getAuditLogsByBugId = (bugId) => {
  return axios.get(`${API_URL}bug/${bugId}`, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

const getAllAuditLogs = () => {
  return axios.get(`${API_URL}all`, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

const getAuditLogsByUserProjects = (userId) => {
  return axios.get(`${API_URL}user/${userId}`, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

const getAuditLogsForManager = (userId) => {
  return axios.get(`${API_URL}manager/${userId}`, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};



export default {
  getAuditLogsByProjectId,
  getAuditLogsByBugId,
  getAllAuditLogs,
  getAuditLogsByUserProjects,
  getAuditLogsForManager,
};
