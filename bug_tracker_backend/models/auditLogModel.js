// const pool = require("../config/dbConfig");

// const createAuditLog = async (
//   bugid,
//   changedby,
//   changetype,
//   changedescription
// ) => {
//   const changedate = new Date();
//   return pool.query(
//     `INSERT INTO audit_logs (bugid, changedby, changetype, changedescription, changedate) 
//      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
//     [bugid, changedby, changetype, changedescription, changedate]
//   );
// };

// const getAuditLogsByProjectId = async (projectId) => {
//   return pool.query(
//     `SELECT al.*, b.projectid, u.firstname || ' ' || u.lastname as changedbyname
//      FROM audit_logs al
//      JOIN bugs b ON al.bugid = b.bugid
//      JOIN users u ON al.changedby = u.userid
//      WHERE b.projectid = $1
//      ORDER BY al.changedate DESC`,
//     [projectId]
//   );
// };

// const getAuditLogsByBugId = async (bugId) => {
//   return pool.query(
//     `SELECT al.*, u.firstname || ' ' || u.lastname as changedbyname
//      FROM audit_logs al
//      JOIN users u ON al.changedby = u.userid
//      WHERE al.bugid = $1
//      ORDER BY al.changedate DESC`,
//     [bugId]
//   );
// };

// const getAllAuditLogs = async () => {
//   return pool.query(
//     `SELECT al.*, b.projectid, p.name as projectname, u.firstname || ' ' || u.lastname as changedbyname
//      FROM audit_logs al
//      JOIN bugs b ON al.bugid = b.bugid
//      JOIN projects p ON b.projectid = p.projectid
//      JOIN users u ON al.changedby = u.userid
//      ORDER BY al.changedate DESC`
//   );
// };

// const getAuditLogsByUserProjects = async (userId) => {
//   return pool.query(
//     `SELECT al.*, b.projectid, p.name as projectname, u.firstname || ' ' || u.lastname as changedbyname
//      FROM audit_logs al
//      JOIN bugs b ON al.bugid = b.bugid
//      JOIN projects p ON b.projectid = p.projectid
//      JOIN users u ON al.changedby = u.userid
//      JOIN users_projects up ON up.projectid = p.projectid
//      WHERE up.userid = $1
//      ORDER BY al.changedate DESC`,
//     [userId]
//   );
// };

// module.exports = {
//   createAuditLog,
//   getAuditLogsByProjectId,
//   getAuditLogsByBugId,
//   getAllAuditLogs,
//   getAuditLogsByUserProjects,
// };


// const pool = require("../config/dbConfig");

// const createAuditLog = async (
//   bugId,
//   changedBy,
//   changeType,
//   changeDescription
// ) => {
//   const query = `
//     INSERT INTO audit_logs (bugid, changedby, changetype, changedescription, changedate)
//     VALUES ($1, $2, $3, $4, NOW())
//   `;
//   const values = [bugId, changedBy, changeType, changeDescription];
//   return pool.query(query, values);
// };

const pool = require("../config/dbConfig");

const createAuditLog = async (
  bugId,
  changedBy,
  changeType,
  changeDescription
) => {
  const query = `
    INSERT INTO audit_logs (bugid, changedby, changetype, changedescription, changedate)
    VALUES ($1, $2, $3, $4, NOW())
  `;
  const values = [bugId, changedBy, changeType, changeDescription];
  console.log("Insert Audit Log Values: ", values); // Log the values for debugging
  return pool.query(query, values);
};

const getAuditLogsByProjectId = async (projectId) => {
  const query = `
    SELECT al.*, u.firstname || ' ' || u.lastname as changedbyname, b.projectid
    FROM audit_logs al
    JOIN users u ON al.changedby = u.userid
    JOIN bugs b ON al.bugid = b.bugid
    WHERE b.projectid = $1
    ORDER BY al.changedate DESC
  `;
  const values = [projectId];
  const result = await pool.query(query, values);
  console.log("Audit Logs by Project ID: ", result.rows); // Debug log
  return result;
};

const getAuditLogsByBugId = async (bugId) => {
  const query = `
    SELECT al.*, u.firstname || ' ' || u.lastname as changedbyname
    FROM audit_logs al
    JOIN users u ON al.changedby = u.userid
    WHERE al.bugid = $1
    ORDER BY al.changedate DESC
  `;
  const values = [bugId];
  const result = await pool.query(query, values);
  console.log("Audit Logs by Bug ID: ", result.rows); // Debug log
  return result;
};

const getAllAuditLogs = async () => {
  const query = `
    SELECT al.*, u.firstname || ' ' || u.lastname as changedbyname, b.projectid
    FROM audit_logs al
    JOIN users u ON al.changedby = u.userid
    JOIN bugs b ON al.bugid = b.bugid
    ORDER BY al.changedate DESC;
  `;
  const result = await pool.query(query);
  console.log("All Audit Logs: ", result.rows); // Debug log
  return result;
};

// const getAuditLogsByUserProjects = async (userId) => {
//   const query = `
//     SELECT al.*, u.firstname || ' ' || u.lastname as changedbyname, b.projectid
//     FROM audit_logs al
//     JOIN users u ON al.changedby = u.userid
//     JOIN bugs b ON al.bugid = b.bugid
//     JOIN users_projects up ON b.projectid = up.projectid
//     WHERE up.userid = $1
//     ORDER BY al.changedate DESC
//   `;
//   const values = [userId];
//   const result = await pool.query(query, values);
//   console.log("Audit Logs by User Projects: ", result.rows); // Debug log
//   return result;
// };

const getAuditLogsByUserProjects = async (userId) => {
  const query = `
    SELECT al.*, u.firstname || ' ' || u.lastname as changedbyname, b.projectid, p.name as projectname
    FROM audit_logs al
    JOIN users u ON al.changedby = u.userid
    JOIN bugs b ON al.bugid = b.bugid
    JOIN projects p ON b.projectid = p.projectid
    JOIN users_projects up ON p.projectid = up.projectid
    WHERE up.userid = $1
    ORDER BY al.changedate DESC
  `;
  const values = [userId];
  const result = await pool.query(query, values);
  console.log("Audit Logs by User Projects: ", result.rows); // Debug log
  return result;
};


module.exports = {
  createAuditLog,
  getAuditLogsByProjectId,
  getAuditLogsByBugId,
  getAllAuditLogs,
  getAuditLogsByUserProjects,
};
