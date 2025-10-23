const db = require('../config/db');

const Attendance = {
  toggleAttendance: (employeeId, callback) => {
    // On récupère le dernier enregistrement de l'employé
    db.query(
      'SELECT type FROM attendance WHERE employee_id = ? ORDER BY timestamp DESC LIMIT 1',
      [employeeId],
      (err, results) => {
        if (err) return callback(err);

        // Déterminer la prochaine action
        let nextType = 'entrée';
        let newStatus = 'présent';

        if (results.length > 0 && results[0].type === 'entrée') {
          nextType = 'sortie';
          newStatus = 'absent';
        }

        // Enregistrer l'action dans attendance
        db.query(
          'INSERT INTO attendance (employee_id, type) VALUES (?, ?)',
          [employeeId, nextType],
          (err2) => {
            if (err2) return callback(err2);

            // Mettre à jour le statut de l’employé
            db.query(
              'UPDATE employees SET statut_actuel = ? WHERE id = ?',
              [newStatus, employeeId],
              (err3) => {
                if (err3) return callback(err3);
                callback(null, { nextType, newStatus });
              }
            );
          }
        );
      }
    );
  },

  getAll: (callback) => {
    db.query(
      `SELECT a.*, e.nom, e.prenom 
       FROM attendance a
       JOIN employees e ON a.employee_id = e.id
       ORDER BY a.timestamp DESC`,
      callback
    );
  },

  getByEmployee: (employeeId, callback) => {
    db.query(
      'SELECT * FROM attendance WHERE employee_id = ? ORDER BY timestamp DESC',
      [employeeId],
      callback
    );
  },
};

module.exports = Attendance;
