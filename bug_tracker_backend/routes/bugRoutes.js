// const express = require("express");
// const router = express.Router();
// const {
//   getBugs,
//   getBugById,
//   createBug,
//   updateBug,
//   deleteBug,
//   assignBug,
// } = require("../controllers/bugController");
// const authenticateToken = require("../middleware/auth");
// const roleCheck = require("../middleware/roleCheck");

// router.get("/", authenticateToken, getBugs);
// router.get("/:id", authenticateToken, getBugById);
// router.post("/", authenticateToken, roleCheck([1, 2, 3, 4]), createBug); // Admin, project manager, Developer and Tester
// router.put("/:id", authenticateToken, roleCheck([1, 2, 3, 4]), updateBug); // Only Admin and Project Manager
// router.delete("/:id", authenticateToken, roleCheck([1, 2]), deleteBug); // Only Admin and Project Manager
// router.put("/assign/:id", authenticateToken, roleCheck([1, 2]), assignBug); // Only Admin and Project Manager

// module.exports = router;
//

const express = require("express");
const router = express.Router();
const {
  getBugs,
  getBugById,
  createBug,
  updateBug,
  deleteBug,
} = require("../controllers/bugController");
const authenticateToken = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");

router.get("/", authenticateToken, getBugs);
router.get("/:id", authenticateToken, getBugById);
router.post("/", authenticateToken, roleCheck([1, 2, 3, 4]), createBug); // Admin, project manager, Developer and Tester
router.put("/:id", authenticateToken, roleCheck([1, 2, 3, 4]), updateBug); // Only Admin and Project Manager
router.delete("/:id", authenticateToken, roleCheck([1, 2]), deleteBug); // Only Admin and Project Manager

module.exports = router;

