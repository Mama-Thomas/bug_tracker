//Functions in this file are written by MAMA THOMAS

const pool = require("../config/dbConfig");

const getRoles = async () => {
  return pool.query("SELECT * FROM Roles");
};

module.exports = {
  getRoles,
};
