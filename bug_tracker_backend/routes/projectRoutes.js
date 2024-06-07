

const express = require("express");
const router = express.Router();
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getUserProjects,
  getProjectsByManager,
} = require("../controllers/projectController");
const {
  getBugsByProjectId,
} = require("../controllers/bugController");
const authenticateToken = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");

router.get("/", authenticateToken, getProjects);
router.get("/:id", authenticateToken, getProjectById);
router.post("/", authenticateToken, roleCheck([1, 2]), createProject); // Admin and Project Manager
router.put("/:id", authenticateToken, roleCheck([1, 2]), updateProject); // Admin and Project Manager
router.delete("/:id", authenticateToken, roleCheck([1, 2]), deleteProject); // Admin and Project Manager
router.get("/:projectId/bugs", authenticateToken,  getBugsByProjectId); // Get bugs by project ID
router.get("/user/:userid", authenticateToken, getUserProjects); // New route for fetching user projects
router.get("/manager/:managerId", authenticateToken, getProjectsByManager); // New route for fetching projects by manager
module.exports = router;
