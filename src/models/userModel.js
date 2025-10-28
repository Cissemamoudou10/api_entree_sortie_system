// models/userModel.js
const db = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
  // 🔐 Authentification
  login: (username, password, callback) => {
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
      if (err) return callback(err);
      if (results.length === 0) return callback(null, null);

      const user = results[0];
      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) return callback(null, null);

      callback(null, user);
    });
  },

  // 👤 Création d’un utilisateur
  create: async (data, callback) => {
    try {
      const hash = await bcrypt.hash(data.password, 10);
      const userData = {
        username: data.username,
        password_hash: hash,
        role: data.role || 'controller',
        company_id: data.company_id || null
      };
      db.query('INSERT INTO users SET ?', userData, callback);
    } catch (err) {
      callback(err);
    }
  },

  // 📋 Récupérer tous les utilisateurs
  getAll: (callback) => {
    const sql = `
      SELECT u.id, u.username, u.role, u.company_id, u.created_at, c.nom AS company_name
      FROM users u
      LEFT JOIN companies c ON u.company_id = c.id
      ORDER BY u.created_at DESC
    `;
    db.query(sql, callback);
  },

  // 🔹 Récupérer un utilisateur par ID
  getById: (id, callback) => {
    const sql = 'SELECT id, username, role, company_id, created_at FROM users WHERE id = ?';
    db.query(sql, [id], callback);
  },

  // 🔹 Mise à jour d’un utilisateur
  update: async (id, data, callback) => {
    try {
      if (data.password) {
        data.password_hash = await bcrypt.hash(data.password, 10);
        delete data.password;
      }
      db.query('UPDATE users SET ? WHERE id = ?', [data, id], callback);
    } catch (err) {
      callback(err);
    }
  },

  // 🔹 Supprimer un utilisateur
  delete: (id, callback) => {
    db.query('DELETE FROM users WHERE id = ?', [id], callback);
  }
};

module.exports = User;
