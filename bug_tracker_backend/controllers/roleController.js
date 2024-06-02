const { getRoles } = require("../models/roleModel");

exports.getAllRoles = async (req, res) => {
  try {
    const result = await getRoles();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
