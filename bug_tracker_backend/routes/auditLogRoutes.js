const express = require("express");
const router = express.Router();
const {
  getAuditLogsByProjectId,
  getAuditLogsByBugId,
  getAllAuditLogs,
  getAuditLogsByUserProjects,
  getAuditLogsForManager
} = require("../controllers/auditLogController");
const authenticateToken = require("../middleware/auth");

router.get("/project/:projectId", authenticateToken, getAuditLogsByProjectId);
router.get("/bug/:bugId", authenticateToken, getAuditLogsByBugId);
router.get("/all", authenticateToken, getAllAuditLogs);
router.get("/user/:userId", authenticateToken, getAuditLogsByUserProjects);
router.get("/manager/:userId", authenticateToken, getAuditLogsForManager);

module.exports = router;
