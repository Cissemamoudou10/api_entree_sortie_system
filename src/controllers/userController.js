const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Nom d'utilisateur et mot de passe requis" });

  User.login(username, password, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ message: 'Identifiants invalides' });

    // ✅ Générer un token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      message: 'Connexion réussie',
      token,
      user: { id: user.id, username: user.username, role: user.role }
    });
  });
};

exports.logout = (req, res) => {
  res.json({ message: 'Déconnexion réussie (coté client : supprimer le token)' });
};

exports.createUser = (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "Nom d'utilisateur et mot de passe requis" });

  User.create({ username, password, role }, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Utilisateur créé avec succès', id: result.insertId });
  });
};

exports.getAllUsers = (req, res) => {
  User.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
