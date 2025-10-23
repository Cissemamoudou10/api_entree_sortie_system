const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const { verifyToken, requireRole } = require("../middlewares/authMiddleware");

router.get(
  "/",
  verifyToken,
  requireRole("admin"),
  employeeController.getAllEmployees
);
router.get(
  "/my-employees",
  verifyToken,
  requireRole("admin"),
  employeeController.getEmployeesByCreator
);
router.get(
  "/:id",
  verifyToken,
  requireRole("admin"),
  employeeController.getEmployeeById
);
router.post(
  "/",
  verifyToken,
  requireRole("admin"),
  employeeController.createEmployee
);
router.put(
  "/:id",
  verifyToken,
  requireRole("admin"),
  employeeController.updateEmployee
);
router.delete(
  "/:id",
  verifyToken,
  requireRole("admin"),
  employeeController.deleteEmployee
);

module.exports = router;
