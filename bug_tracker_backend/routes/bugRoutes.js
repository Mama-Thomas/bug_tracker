const express = require("express");
const router = express.Router();
const {
  getBugs,
  getBugById,
  createBug,
  updateBug,
  deleteBug,
  getBugsReportedByUser,
  getBugsAssignedToUser
} = require("../controllers/bugController");
const authenticateToken = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");

router.get("/", authenticateToken, getBugs);
router.get("/:id", authenticateToken, getBugById);
router.post("/", authenticateToken, roleCheck([1, 2, 3, 4]), createBug); // Admin, project manager, Developer and Tester
router.put("/:id", authenticateToken, roleCheck([1, 2, 3, 4]), updateBug); 
router.delete("/:id", authenticateToken, roleCheck([1, 2]), deleteBug); // Only Admin and Project Manager
router.get("/user/reported/:userid", authenticateToken, getBugsReportedByUser); // Get bugs reported by user
router.get("/user/assigned/:userid", authenticateToken, getBugsAssignedToUser);


module.exports = router;

