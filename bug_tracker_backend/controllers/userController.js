const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  updateBugsAssignedTo,
  updateBugsReportedBy,
} = require("../models/userModel");

// const jwtSecret = process.env.JWT_SECRET;

exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password, roleId } = req.body;
  if (!firstName || !lastName || !email || !password || !roleId) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await createUser(
      firstName,
      lastName,
      email,
      hashedPassword,
      roleId
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const userResult = await getUserByEmail(email);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.userid, roleid: user.roleid },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    console.log("Generated Token:", token); // Log generated token
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getUsers = async (req, res) => {
  try {
    const result = await getUsers();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getUserById(id);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password, roleId } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await updateUser(
      id,
      firstName,
      lastName,
      email,
      hashedPassword,
      roleId
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await updateBugsAssignedTo(id, null); // Set AssignedTo to NULL
    await updateBugsReportedBy(id, null); // Set ReportedBy to NULL
    await deleteUser(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
