const db = require('../config/db');

const Attendance = {
  getAll: (callback) => {
    db.query(`
      SELECT a.id, a.employee_id, e.nom, e.prenom, a.type, a.timestamp
      FROM attendance a
      JOIN employees e ON a.employee_id = e.id
      ORDER BY a.timestamp DESC
    `, callback);
  },

  getByEmployee: (employeeId, callback) => {
    db.query(`
      SELECT a.id, a.type, a.timestamp
      FROM attendance a
      WHERE a.employee_id = ?
      ORDER BY a.timestamp DESC
    `, [employeeId], callback);
  },

  markEntry: (employeeId, callback) => {
    db.query(
      'INSERT INTO attendance (employee_id, type) VALUES (?, "entrée")',
      [employeeId],
      callback
    );
  },

  markExit: (employeeId, callback) => {
    db.query(
      'INSERT INTO attendance (employee_id, type) VALUES (?, "sortie")',
      [employeeId],
      callback
    );
  }
};

module.exports = Attendance;
