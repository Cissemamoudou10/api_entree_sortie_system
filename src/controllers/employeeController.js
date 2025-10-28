// controllers/employeeController.js
const crypto = require('crypto');
const Employee = require('../models/employeeModel');

// 🔹 Récupère tous les employés
exports.getAllEmployees = (req, res) => {
  Employee.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// 🔹 Récupère un employé par ID
exports.getEmployeeById = (req, res) => {
  const { id } = req.params;

  Employee.getById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results.length) return res.status(404).json({ message: 'Employé non trouvé' });
    res.json(results[0]);
  });
};

// 🔹 Récupère les employés créés par l’utilisateur connecté
exports.getEmployeesByCreator = (req, res) => {
  const userId = req.user.id;
  Employee.getByCreator(userId, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// 🔹 Récupère les employés d’une entreprise
exports.getEmployeesByCompany = (req, res) => {
  const { companyId } = req.params;
  Employee.getByCompany(companyId, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// 🔹 Crée un nouvel employé
exports.createEmployee = (req, res) => {
  const { nom, prenom, email, poste, company_id, statut_actuel } = req.body;

  if (!nom || !prenom || !company_id) {
    return res.status(400).json({ message: 'Champs requis manquants' });
  }

  const qrData = `${nom}_${prenom}_${Date.now()}`;
  const qr_code = crypto.createHash('sha256').update(qrData).digest('hex');

  const employeeData = {
    nom,
    prenom,
    email,
    poste,
    qr_code,
    statut_actuel: statut_actuel || 'absent',
    created_by: req.user.id,
    company_id
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

// 🔹 Mise à jour d’un employé
exports.updateEmployee = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  Employee.update(id, data, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Employé mis à jour avec succès' });
  });
};

// 🔹 Suppression d’un employé
exports.deleteEmployee = (req, res) => {
  const { id } = req.params;

  Employee.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Employé supprimé avec succès' });
  });
};
