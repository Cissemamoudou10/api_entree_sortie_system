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
        role: data.role || 'controller'
      };
      db.query('INSERT INTO users SET ?', userData, callback);
    } catch (err) {
      callback(err);
    }
  },

  // 📋 Récupérer tous les utilisateurs
  getAll: (callback) => {
    db.query('SELECT id, username, role, created_at FROM users ORDER BY created_at DESC', callback);
  }
};

module.exports = User;
