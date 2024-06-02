import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Correct import for named export

const API_URL = "http://localhost:3000/api/users/";

const register = (firstName, lastName, email, password, roleId) => {
  return axios.post(API_URL + "register", {
    firstName,
    lastName,
    email,
    password,
    roleId,
  });
};

const login = async (email, password) => {
  const response = await axios.post(API_URL + "login", {
    email,
    password,
  });
  if (response.data.token) {
    const decodedToken = jwtDecode(response.data.token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        token: response.data.token,
        roleid: decodedToken.roleid, // Store roleid decoded from token
      })
    );
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const getToken = () => {
  const user = getCurrentUser();
  return user ? user.token : null;
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  getToken,
};
