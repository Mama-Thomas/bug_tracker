import axios from "axios";
import {jwtDecode} from "jwt-decode"; 

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
        userid: decodedToken.userid,
        roleid: decodedToken.roleid, 
      })
    );
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

// const getCurrentUser = () => {
//   return JSON.parse(localStorage.getItem("user"));
// };

// const getToken = () => {
//   const user = getCurrentUser();
//   return user ? user.token : null;
// };
const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return {
      token: user.token,
      userid: user.userid,
      roleid: user.roleid,
      
    };
  }
  return null;
};

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.token : null;
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  getToken,
};
