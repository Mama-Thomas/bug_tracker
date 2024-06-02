const roleCheck = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.roleid;
    console.log("User Role:", userRole); // Log user role
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
};

module.exports = roleCheck;
