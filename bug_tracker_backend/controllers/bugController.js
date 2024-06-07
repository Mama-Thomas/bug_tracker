

const {
  getBugs,
  getBugById,
  getBugsByProjectId,
  createBug,
  updateBug,
  deleteBug,
  assignBug,
  getUserBugs,
  getBugsReportedByUser,
  getBugsAssignedToUser,
  removeBugAuditLogs,
} = require("../models/bugModel");

const { createAuditLog } = require("../models/auditLogModel");

exports.getBugs = async (req, res) => {
  try {
    const result = await getBugs();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBugById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getBugById(id);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Bug not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.createBug = async (req, res) => {
  const {
    title,
    description,
    projectid,
    statusid,
    severityid,
    assignedto,
    reportedby,
  } = req.body;
  const userId = req.user.userid; // Get the user ID from the authenticated request
  try {
    const result = await createBug({
      title,
      description,
      projectid,
      statusid,
      severityid,
      assignedto,
      reportedby,
    });

    // Create audit log entry
    await createAuditLog(
      result.rows[0].bugid,
      userId,
      "CREATE",
      `Created bug: ${title}`
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBug = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    projectid,
    statusid,
    severityid,
    assignedto,
    reportedby,
  } = req.body;
  const userId = req.user.userid; // Get the user ID from the authenticated request
  try {
    const result = await updateBug(id, {
      title,
      description,
      projectid,
      statusid,
      severityid,
      assignedto,
      reportedby,
    });

    // Create audit log entry
    await createAuditLog(id, userId, "UPDATE", `Updated bug: ${title}`);

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteBug = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userid; // Get the user ID from the authenticated request
  try {
    // Create audit log entry for the deletion action before actually deleting the bug
    await createAuditLog(id, userId, "DELETE", `Deleted bug with ID: ${id}`);

    // First, remove the related records in audit_logs table
    await removeBugAuditLogs(id);

    // Then delete the bug
    await deleteBug(id);

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getBugsByProjectId = async (req, res) => {
  const { projectId } = req.params;
  try {
    const result = await getBugsByProjectId(projectId);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBugsReportedByUser = async (req, res) => {
  const { userid } = req.params;
  try {
    const result = await getBugsReportedByUser(userid);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBugsAssignedToUser = async (req, res) => {
  const { userid } = req.params;
  try {
    const result = await getBugsAssignedToUser(userid);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.assignBug = async (req, res) => {
  const { id } = req.params;
  const { assignedto } = req.body;
  try {
    const result = await assignBug(id, assignedto);

    // Create audit log
    await createAuditLog(
      id,
      req.user.id,
      "ASSIGN",
      `Assigned bug with ID: ${id} to user ID: ${assignedto}`
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserBugs = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await getUserBugs(userId);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
