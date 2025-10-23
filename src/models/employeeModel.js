const db = require('../config/db');

const Employee = {
  getAll: (callback) => {
    db.query('SELECT * FROM employees', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM employees WHERE id = ?', [id], callback);
  },

  // ✅ Récupérer tous les employés créés par un utilisateur spécifique
  getByCreator: (userId, callback) => {
    db.query('SELECT * FROM employees WHERE created_by = ?', [userId], callback);
  },

  create: (data, callback) => {
    db.query('INSERT INTO employees SET ?', data, callback);
  },

  update: (id, data, callback) => {
    db.query('UPDATE employees SET ? WHERE id = ?', [data, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM employees WHERE id = ?', [id], callback);
  }
};

module.exports = Employee;
