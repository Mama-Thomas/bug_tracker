

const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getUsersByProjectId,
  getUserProjects,
  getProjectsByManager,
  removeProjectUsers,
  removeProjectBugs,
  removeProjectAuditLogs,
} = require("../models/projectModel");
const { createAuditLog } = require("../models/auditLogModel");

exports.getProjects = async (req, res) => {
  try {
    const result = await getProjects();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const projectResult = await getProjectById(id);
    if (projectResult.rows.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }
    const usersResult = await getUsersByProjectId(id);
    res.json({
      ...projectResult.rows[0],
      users: usersResult.rows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProject = async (req, res) => {
  const { name, startdate, enddate, projectmanagerid, userids } = req.body;
  if (
    !name ||
    !startdate ||
    !enddate ||
    !projectmanagerid ||
    !Array.isArray(userids)
  ) {
    return res
      .status(400)
      .json({ error: "All fields are required and userids must be an array" });
  }

  try {
    const result = await createProject(
      name,
      startdate,
      enddate,
      projectmanagerid,
      userids
    );
    await createAuditLog(
      null,
      req.user.id,
      "CREATE",
      `Created project: ${name}`
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, startdate, enddate, projectmanagerid, userids } = req.body;
  if (
    !name ||
    !startdate ||
    !enddate ||
    !projectmanagerid ||
    !Array.isArray(userids)
  ) {
    return res
      .status(400)
      .json({ error: "All fields are required and userids must be an array" });
  }

  try {
    const result = await updateProject(
      id,
      name,
      startdate,
      enddate,
      projectmanagerid,
      userids
    );
    await createAuditLog(
      null,
      req.user.id,
      "UPDATE",
      `Updated project: ${name}`
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    // First, remove the related records in audit_logs, bugs, and users_projects tables
    await removeProjectAuditLogs(id);
    await removeProjectBugs(id);
    await removeProjectUsers(id);

    // Then delete the project
    await deleteProject(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserProjects = async (req, res) => {
  const { userid } = req.params;
  try {
    const result = await getUserProjects(userid);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProjectsByManager = async (req, res) => {
  const { managerId } = req.params;
  try {
    const result = await getProjectsByManager(managerId);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

