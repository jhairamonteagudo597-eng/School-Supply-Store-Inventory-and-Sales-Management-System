function validateAdminOrOwner(req, res, next) {
  const role = req.headers["x-user-role"] || req.user?.role;
  if (role !== "admin" && role !== "owner") {
    return res.status(403).json({
      status: 403,
      data: null,
      error: "Administrator or owner authorization is required",
      field: "role"
    });
  }
  return next();
}

function requireStaff(req, res, next) {
  const role = req.headers["x-user-role"] || req.user?.role;
  if (!["admin", "owner", "staff"].includes(role)) {
    return res.status(403).json({ status: 403, data: null, error: "Authorized staff access is required", field: "role" });
  }
  return next();
}

module.exports = { validateAdminOrOwner, requireStaff };
