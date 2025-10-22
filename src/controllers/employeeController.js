const Employee = require('../models/employeeModel');

exports.getAllEmployees = (req, res) => {
  Employee.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getEmployeeById = (req, res) => {
  Employee.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Employé non trouvé' });
    res.json(results[0]);
  });
};

exports.createEmployee = (req, res) => {
  const data = req.body;
  Employee.create(data, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Employé ajouté avec succès', id: result.insertId });
  });
};

exports.updateEmployee = (req, res) => {
  const data = req.body;
  Employee.update(req.params.id, data, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Employé mis à jour avec succès' });
  });
};

exports.deleteEmployee = (req, res) => {
  Employee.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Employé supprimé avec succès' });
  });
};
