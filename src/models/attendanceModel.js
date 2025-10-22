const db = require('../config/db');

const Attendance = {
  getAll: (callback) => {
    db.query(`
      SELECT a.*, e.nom, e.prenom 
      FROM attendance a
      JOIN employees e ON a.employee_id = e.id
      ORDER BY a.date DESC
    `, callback);
  },

  getByEmployee: (employeeId, callback) => {
    db.query('SELECT * FROM attendance WHERE employee_id = ?', [employeeId], callback);
  },

  markEntry: (employeeId, callback) => {
    const now = new Date();
    db.query(
      'INSERT INTO attendance (employee_id, date, heure_entree) VALUES (?, CURDATE(), ?)',
      [employeeId, now.toLocaleTimeString()],
      callback
    );
  },

  markExit: (employeeId, callback) => {
    const now = new Date();
    db.query(
      'UPDATE attendance SET heure_sortie = ? WHERE employee_id = ? AND date = CURDATE()',
      [now.toLocaleTimeString(), employeeId],
      callback
    );
  }
};

module.exports = Attendance;
