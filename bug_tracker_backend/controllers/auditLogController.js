const {
  getAuditLogsByProjectId,
  getAuditLogsByBugId,
  getAllAuditLogs,
  getAuditLogsByUserProjects,
} = require("../models/auditLogModel");

const pool = require("../config/dbConfig");

exports.getAuditLogsByProjectId = async (req, res) => {
  const { projectId } = req.params;
  try {
    const result = await getAuditLogsByProjectId(projectId);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAuditLogsByBugId = async (req, res) => {
  const { bugId } = req.params;
  try {
    const result = await getAuditLogsByBugId(bugId);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllAuditLogs = async (req, res) => {
  try {
    const result = await getAllAuditLogs();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.getAuditLogsByUserProjects = async (req, res) => {
//   const { userId } = req.params;
//   try {
//     const result = await getAuditLogsByUserProjects(userId);
//     res.json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
exports.getAuditLogsByUserProjects = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await getAuditLogsByUserProjects(userId);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAuditLogsForManager = async (req, res) => {
  const { userId } = req.params;
  try {
    const query = `
      SELECT al.*, u.firstname || ' ' || u.lastname as changedbyname, b.projectid
      FROM audit_logs al
      JOIN users u ON al.changedby = u.userid
      JOIN bugs b ON al.bugid = b.bugid
      JOIN projects p ON b.projectid = p.projectid
      WHERE p.projectmanagerid = $1
      ORDER BY al.changedate DESC
    `;
    const result = await pool.query(query, [userId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
