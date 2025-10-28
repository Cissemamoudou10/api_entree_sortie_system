// controllers/attendanceController.js
const Attendance = require('../models/attendanceModel');

// 🔄 Marquer présence
exports.markAttendance = (req, res) => {
  const { employeeId } = req.body;
  const companyId = req.user.company_id;

  if (!employeeId) {
    return res.status(400).json({ error: "employeeId est requis" });
  }

  Attendance.toggleAttendance(employeeId, companyId, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(201).json({
      message: `Action enregistrée : ${result.nextType}`,
      statut_actuel: result.newStatus
    });
  });
};

// 📋 Toutes les présences
exports.getAll = (req, res) => {
  Attendance.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// 📋 Présences d'un employé
exports.getByEmployee = (req, res) => {
  const { id } = req.params;

  Attendance.getByEmployee(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// 📋 Présences par entreprise
exports.getByCompany = (req, res) => {
  const companyId = req.user.company_id;

  Attendance.getByCompany(companyId, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};
