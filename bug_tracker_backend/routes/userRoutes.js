const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const authenticateToken = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");

// Public routes
router.post("/login", loginUser);

// Protected routes
router.post("/", authenticateToken, roleCheck([1]), registerUser); //Only Admin
router.get("/", authenticateToken, roleCheck([1,2,3,4]), getUsers); 
router.get("/:id", authenticateToken, roleCheck([1,2]), getUserById); // Only Admin and PM
router.put("/:id", authenticateToken, roleCheck([1]), updateUser); // Only Admin
router.delete("/:id", authenticateToken, roleCheck([1]), deleteUser); // Only Admin

module.exports = router;
