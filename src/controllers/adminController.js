const Admin = require('../models/adminModel');

exports.login = (req, res) => {
  const { email, password } = req.body;

  Admin.login(email, password, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    res.json({ message: 'Connexion réussie', admin: results[0] });
  });
};

exports.createAdmin = (req, res) => {
  const data = req.body;
  Admin.create(data, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Administrateur créé', id: result.insertId });
  });
};

exports.getAllAdmins = (req, res) => {
  Admin.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
