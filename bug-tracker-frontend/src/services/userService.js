import axios from "axios";
import authService from "./authService";

const API_URL = "http://localhost:3000/api/users/";

const getUsers = () => {
  const token = authService.getToken();
  console.log("Sending token:", token); // Log the token being sent
  return axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getUser = (id) => {
  const token = authService.getToken();
  console.log("Sending token:", token); // Log the token being sent
  return axios.get(API_URL + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const createUser = (user) => {
  const token = authService.getToken();
  console.log("Sending token:", token); // Log the token being sent
  return axios.post(API_URL, user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateUser = (id, user) => {
  const token = authService.getToken();
  console.log("Sending token:", token); // Log the token being sent
  return axios.put(API_URL + id, user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteUser = (id) => {
  const token = authService.getToken();
  console.log("Sending token:", token); // Log the token being sent
  return axios.delete(API_URL + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
