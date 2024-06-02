const pool = require("../config/dbConfig");

const getUsers = async () => {
  return pool.query(
    `SELECT 
      u.userid, 
      u.firstname, 
      u.lastname, 
      u.email, 
      u.password,
      u.roleid, 
      r.name as rolename, 
      u.isactive 
    FROM Users u
    LEFT JOIN Roles r ON u.roleid = r.roleid`
  );
};

const getUserById = async (id) => {
  return pool.query(
    `SELECT 
      u.userid, 
      u.firstname, 
      u.lastname, 
      u.email, 
      u.password,
      u.roleid, 
      r.name as rolename, 
      u.isactive 
    FROM Users u
    LEFT JOIN Roles r ON u.roleid = r.roleid
    WHERE u.userid = $1`,
    [id]
  );
};

const createUser = async (
  firstname,
  lastname,
  email,
  password,
  roleid,
  isactive
) => {
  return pool.query(
    `INSERT INTO Users (firstname, lastname, email, password, roleid, isactive) 
     VALUES ($1, $2, $3, $4, $5, $6) 
     RETURNING *`,
    [firstname, lastname, email, password, roleid, isactive]
  );
};

const updateUser = async (id, user) => {
  const { firstname, lastname, email, password, roleid, isactive } = user;
  return pool.query(
    `UPDATE Users SET firstname=$1, lastname=$2, email=$3, password=$4, roleid=$5, isactive=$6 
     WHERE userid=$7 RETURNING *`,
    [firstname, lastname, email, password, roleid, isactive, id]
  );
};

const deleteUser = async (id) => {
  return pool.query("DELETE FROM Users WHERE userid=$1", [id]);
};

const getUserByEmail = async (email) => {
  return pool.query("SELECT * FROM Users WHERE Email=$1", [email]);
};

const updateBugsAssignedTo = async (userId, newAssignedTo) => {
  return pool.query("UPDATE Bugs SET assignedto=$1 WHERE assignedto=$2", [
    newAssignedTo,
    userId,
  ]);
};

const updateBugsReportedBy = async (userId, newReportedBy) => {
  return pool.query("UPDATE Bugs SET reportedby=$1 WHERE reportedby=$2", [
    newReportedBy,
    userId,
  ]);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  updateBugsAssignedTo,
  updateBugsReportedBy,
};
