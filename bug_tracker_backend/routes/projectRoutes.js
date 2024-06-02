const express = require("express");
const router = express.Router();
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const authenticateToken = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");

router.get("/", authenticateToken, getProjects);
router.get("/:id", authenticateToken, getProjectById);

router.post("/", authenticateToken, roleCheck([1, 2]), createProject); // Only Admin and Project Manager
router.put("/:id", authenticateToken, roleCheck([1, 2]), updateProject); // Only Admin and Project Manager
router.delete("/:id", authenticateToken, roleCheck([1, 2]), deleteProject); // Only Admin and Project Manager

module.exports = router;
