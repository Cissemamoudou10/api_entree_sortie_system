// models/attendanceModel.js
const db = require('../config/db');

const Attendance = {
  // 🔄 Marquer l'entrée ou sortie
  toggleAttendance: (employeeId, companyId, callback) => {
    // On récupère le dernier enregistrement de l'employé
    db.query(
      'SELECT type FROM attendance WHERE employee_id = ? ORDER BY timestamp DESC LIMIT 1',
      [employeeId],
      (err, results) => {
        if (err) return callback(err);

        let nextType = 'entrée';
        let newStatus = 'present';

        if (results.length > 0 && results[0].type === 'entrée') {
          nextType = 'sortie';
          newStatus = 'absent';
        }

        // Enregistrer l'action dans attendance
        db.query(
          'INSERT INTO attendance (employee_id, type, company_id, statut) VALUES (?, ?, ?, ?)',
          [employeeId, nextType, companyId, newStatus],
          (err2) => {
            if (err2) return callback(err2);

            // Mettre à jour le statut actuel de l’employé
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

  // 📋 Récupérer toutes les présences
  getAll: (callback) => {
    const sql = `
      SELECT a.*, e.nom, e.prenom, c.nom AS company_name
      FROM attendance a
      JOIN employees e ON a.employee_id = e.id
      LEFT JOIN companies c ON a.company_id = c.id
      ORDER BY a.timestamp DESC
    `;
    db.query(sql, callback);
  },

  // 📋 Récupérer les présences par employé
  getByEmployee: (employeeId, callback) => {
    const sql = `
      SELECT a.*, e.nom, e.prenom, c.nom AS company_name
      FROM attendance a
      JOIN employees e ON a.employee_id = e.id
      LEFT JOIN companies c ON a.company_id = c.id
      WHERE a.employee_id = ?
      ORDER BY a.timestamp DESC
    `;
    db.query(sql, [employeeId], callback);
  },

  // 📋 Récupérer les présences par entreprise
  getByCompany: (companyId, callback) => {
    const sql = `
      SELECT a.*, e.nom, e.prenom
      FROM attendance a
      JOIN employees e ON a.employee_id = e.id
      WHERE a.company_id = ?
      ORDER BY a.timestamp DESC
    `;
    db.query(sql, [companyId], callback);
  }
};

module.exports = Attendance;
