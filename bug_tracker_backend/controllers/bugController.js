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
} = require("../models/bugModel");

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
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBug = async (req, res) => {
  const { id } = req.params;
  try {
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