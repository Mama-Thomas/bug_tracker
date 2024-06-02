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


const getBugById = async (id) => {
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
     LEFT JOIN Severity v ON b.severityid = v.severityid
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

module.exports = {
  getBugs,
  getBugById,
  createBug,
  updateBug,
  deleteBug,
};
