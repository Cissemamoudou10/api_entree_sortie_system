const db = require('../config/db');

const Company = {
  getAll: (callback) => {
    db.query('SELECT * FROM companies', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM companies WHERE id = ?', [id], callback);
  },

  create: (data, callback) => {
    db.query('INSERT INTO companies SET ?', data, callback);
  },

  update: (id, data, callback) => {
    db.query('UPDATE companies SET ? WHERE id = ?', [data, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM companies WHERE id = ?', [id], callback);
  }
};

module.exports = Company;
