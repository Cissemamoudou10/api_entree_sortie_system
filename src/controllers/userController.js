// controllers/userController.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

// 🔐 Connexion
exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Nom d'utilisateur et mot de passe requis" });

  User.login(username, password, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ message: 'Identifiants invalides' });

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role, company_id: user.company_id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      message: 'Connexion réussie',
      token,
      user: { id: user.id, username: user.username, role: user.role, company_id: user.company_id }
    });
  });
};

// 🔓 Déconnexion
exports.logout = (req, res) => {
  res.json({ message: 'Déconnexion réussie (coté client : supprimer le token)' });
};

// 👤 Création utilisateur
exports.createUser = (req, res) => {
  const { username, password, role, company_id } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "Nom d'utilisateur et mot de passe requis" });

  User.create({ username, password, role, company_id }, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Utilisateur créé avec succès', id: result.insertId });
  });
};

// 📋 Récupérer tous les utilisateurs
exports.getAllUsers = (req, res) => {
  User.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// 🔹 Récupérer un utilisateur par ID
exports.getUserById = (req, res) => {
  const { id } = req.params;
  User.getById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results.length) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json(results[0]);
  });
};

// 🔹 Mettre à jour un utilisateur
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  User.update(id, data, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Utilisateur mis à jour avec succès' });
  });
};

// 🔹 Supprimer un utilisateur
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  User.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Utilisateur supprimé avec succès' });
  });
};
