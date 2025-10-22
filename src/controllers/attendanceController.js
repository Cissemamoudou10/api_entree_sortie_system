const Attendance = require('../models/attendanceModel');

exports.getAllAttendance = (req, res) => {
  Attendance.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getAttendanceByEmployee = (req, res) => {
  Attendance.getByEmployee(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.markEntry = (req, res) => {
  const { employeeId } = req.body;
  Attendance.markEntry(employeeId, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Entrée enregistrée avec succès" });
  });
};

exports.markExit = (req, res) => {
  const { employeeId } = req.body;
  Attendance.markExit(employeeId, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Sortie enregistrée avec succès" });
  });
};
