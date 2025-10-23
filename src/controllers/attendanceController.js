const Attendance = require('../models/attendanceModel');

exports.markAttendance = (req, res) => {
  const { employeeId } = req.body;
  if (!employeeId) {
    return res.status(400).json({ error: "employeeId est requis" });
  }

  Attendance.toggleAttendance(employeeId, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(201).json({
      message: `Action enregistrée : ${result.nextType}`,
      statut_actuel: result.newStatus
    });
  });
};

exports.getAll = (req, res) => {
  Attendance.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

exports.getByEmployee = (req, res) => {
  const { id } = req.params;
  Attendance.getByEmployee(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};
