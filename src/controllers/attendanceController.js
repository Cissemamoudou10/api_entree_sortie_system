const Attendance = require('../models/attendanceModel');

exports.getAllAttendance = (req, res) => {
  Attendance.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getAttendanceByEmployee = (req, res) => {
  const employeeId = req.params.id;
  Attendance.getByEmployee(employeeId, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.markEntry = (req, res) => {
  const { employeeId } = req.body;
  if (!employeeId) {
    return res.status(400).json({ error: "employeeId est requis" });
  }

  Attendance.markEntry(employeeId, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Entrée enregistrée avec succès" });
  });
};

exports.markExit = (req, res) => {
  const { employeeId } = req.body;
  if (!employeeId) {
    return res.status(400).json({ error: "employeeId est requis" });
  }

  Attendance.markExit(employeeId, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Sortie enregistrée avec succès" });
  });
};
