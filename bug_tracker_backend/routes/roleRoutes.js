const express = require("express");
const router = express.Router();
const { getAllRoles } = require("../controllers/roleController");
const authenticateToken = require("../middleware/auth"); // Assuming you have this middleware

router.get("/roles", authenticateToken, getAllRoles);

module.exports = router;
