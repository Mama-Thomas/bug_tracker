//Functions in this file are written by MAMA THOMAS

const pool = require("../config/dbConfig");

const getBugs = async () => {
  return pool.query(
    `SELECT 
      b.bugid, 
      b.title, 
      b.description, 
      b.projectid, 
      s.statusname as status, 
      v.severityname as severity, 
      b.assignedto, 
      b.reportedby 
     FROM Bugs b
     LEFT JOIN Status s ON b.statusid = s.statusid
     LEFT JOIN Severity v ON b.severityid = v.severityid`
  );
};

const getBugsByProjectId = async (projectId) => {
  return pool.query(
    `SELECT 
      b.bugid, 
      b.title, 
      b.description, 
      b.projectid, 
      s.statusname as status, 
      v.severityname as severity, 
      b.assignedto, 
      at.firstname || ' ' || at.lastname as assignedtoname,
      b.reportedby,
      rb.firstname || ' ' || rb.lastname as reportedbyname,
      p.name as projectname
     FROM Bugs b
     LEFT JOIN Status s ON b.statusid = s.statusid
     LEFT JOIN Severity v ON b.severityid = v.severityid
     LEFT JOIN Users at ON b.assignedto = at.userid
     LEFT JOIN Users rb ON b.reportedby = rb.userid
     LEFT JOIN Projects p ON b.projectid = p.projectid
     WHERE b.projectid = $1`,
    [projectId]
  );
};

const getBugById = async (id) => {
  return pool.query(
    `SELECT 
      b.bugid, 
      b.title, 
      b.description, 
      b.projectid, 
      s.statusname as status, 
      v.severityname as severity, 
      b.statusid,
      b.severityid,
      b.assignedto, 
      at.firstname || ' ' || at.lastname as assignedtoname,
      b.reportedby,
      rb.firstname || ' ' || rb.lastname as reportedbyname,
      p.name as projectname
     FROM Bugs b
     LEFT JOIN Status s ON b.statusid = s.statusid
     LEFT JOIN Severity v ON b.severityid = v.severityid
     LEFT JOIN Users at ON b.assignedto = at.userid
     LEFT JOIN Users rb ON b.reportedby = rb.userid
     LEFT JOIN Projects p ON b.projectid = p.projectid
     WHERE b.bugid = $1`,
    [id]
  );
};

const createBug = async (bug) => {
  const {
    title,
    description,
    projectid,
    statusid,
    severityid,
    assignedto,
    reportedby,
  } = bug;
  return pool.query(
    `INSERT INTO Bugs (title, description, projectid, statusid, severityid, assignedto, reportedby) 
     VALUES ($1, $2, $3, $4, $5, $6, $7) 
     RETURNING *`,
    [
      title,
      description,
      projectid,
      statusid,
      severityid,
      assignedto,
      reportedby,
    ]
  );
};

const updateBug = async (id, bug) => {
  const {
    title,
    description,
    projectid,
    statusid,
    severityid,
    assignedto,
    reportedby,
  } = bug;
  return pool.query(
    `UPDATE Bugs SET title=$1, description=$2, projectid=$3, statusid=$4, severityid=$5, assignedto=$6, reportedby=$7 
     WHERE bugid=$8 RETURNING *`,
    [
      title,
      description,
      projectid,
      statusid,
      severityid,
      assignedto,
      reportedby,
      id,
    ]
  );
};

const deleteBug = async (id) => {
  return pool.query("DELETE FROM Bugs WHERE BugId=$1", [id]);
};

// const getUserBugs = async (userId) => {
//   return pool.query(
//     `SELECT b.bugid, b.title, p.name as projectname
//      FROM Bugs b
//      JOIN Projects p ON b.projectid = p.projectid
//      WHERE b.assignedto = $1 OR b.reportedby = $1`,
//     [userId]
//   );
// };

const getBugsReportedByUser = async (userId) => {
  return pool.query(
    `SELECT b.bugid, b.title, b.description, b.statusid, b.severityid, 
            b.projectid, b.assignedto, b.reportedby,
            s.statusname as status, sv.severityname as severity,
            u1.firstname || ' ' || u1.lastname as assignedtoname,
            u2.firstname || ' ' || u2.lastname as reportedbyname,
            p.name as projectname
     FROM bugs b
     LEFT JOIN status s ON b.statusid = s.statusid
     LEFT JOIN severity sv ON b.severityid = sv.severityid
     LEFT JOIN users u1 ON b.assignedto = u1.userid
     LEFT JOIN users u2 ON b.reportedby = u2.userid
     LEFT JOIN projects p ON b.projectid = p.projectid
     WHERE b.reportedby = $1`,
    [userId]
  );
};

const getBugsAssignedToUser = async (userId) => {
  return pool.query(
    `SELECT b.bugid, b.title, b.description, b.statusid, b.severityid, 
            b.projectid, b.assignedto, b.reportedby,
            s.statusname as status, sv.severityname as severity,
            u1.firstname || ' ' || u1.lastname as assignedtoname,
            u2.firstname || ' ' || u2.lastname as reportedbyname,
            p.name as projectname
     FROM bugs b
     LEFT JOIN status s ON b.statusid = s.statusid
     LEFT JOIN severity sv ON b.severityid = sv.severityid
     LEFT JOIN users u1 ON b.assignedto = u1.userid
     LEFT JOIN users u2 ON b.reportedby = u2.userid
     LEFT JOIN projects p ON b.projectid = p.projectid
     WHERE b.assignedto = $1`,
    [userId]
  );
};

const removeBugAuditLogs = async (bugId) => {
  const query = "DELETE FROM audit_logs WHERE bugid = $1";
  await pool.query(query, [bugId]);
};

module.exports = {
  getBugs,
  getBugsByProjectId,
  getBugById,
  createBug,
  updateBug,
  deleteBug,
  getBugsReportedByUser,
  getBugsAssignedToUser,
  removeBugAuditLogs,
};
