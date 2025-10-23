const crypto = require('crypto');
const Employee = require('../models/employeeModel');

// ✅ Récupère tous les employés
exports.getAllEmployees = (req, res) => {
  Employee.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// ✅ Récupère un employé par son ID
exports.getEmployeeById = (req, res) => {
  Employee.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Employé non trouvé' });
    res.json(results[0]);
  });
};

// ✅ Crée un employé avec un champ created_by = id du user connecté
exports.createEmployee = (req, res) => {
  const data = req.body;

  const qrData = `${data.nom}_${data.prenom}_${Date.now()}`;
  const qr_code = crypto.createHash('sha256').update(qrData).digest('hex');

  // 🔗 On ajoute created_by depuis le token
  const employeeData = { 
    ...data, 
    qr_code, 
    created_by: req.user.id 
  };

  Employee.create(employeeData, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({
      message: 'Employé ajouté avec succès',
      id: result.insertId,
      qr_code
    });
  });
};

// ✅ Récupère les employés créés par un utilisateur (basé sur son token)
exports.getEmployeesByCreator = (req, res) => {
  const userId = req.user.id;
  Employee.getByCreator(userId, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// ✅ Mise à jour d'un employé
exports.updateEmployee = (req, res) => {
  const data = req.body;
  Employee.update(req.params.id, data, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Employé mis à jour avec succès' });
  });
};

// ✅ Suppression d'un employé
exports.deleteEmployee = (req, res) => {
  Employee.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Employé supprimé avec succès' });
  });
};
