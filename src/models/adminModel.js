const db = require('../config/db');

const Admin = {
  login: (email, password, callback) => {
    db.query('SELECT * FROM admins WHERE email = ? AND password = ?', [email, password], callback);
  },

  create: (data, callback) => {
    db.query('INSERT INTO admins SET ?', data, callback);
  },

  getAll: (callback) => {
    db.query('SELECT id, nom, email FROM admins', callback);
  }
};

module.exports = Admin;
