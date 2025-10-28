const Company = require('../models/companyModel');

// ✅ Liste de toutes les entreprises
exports.getAllCompanies = (req, res) => {
  Company.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// ✅ Détails d'une entreprise
exports.getCompanyById = (req, res) => {
  const id = req.params.id;
  Company.getById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ message: 'Entreprise non trouvée' });
    res.json(results[0]);
  });
};

// ✅ Création d'une entreprise
exports.createCompany = (req, res) => {
  const data = req.body;

  if (!data.name || !data.date_debut_travail || !data.date_fin_travail) {
    return res.status(400).json({ message: 'Champs obligatoires manquants' });
  }

  Company.create(data, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({
      message: 'Entreprise créée avec succès',
      id: result.insertId
    });
  });
};

// ✅ Mise à jour d'une entreprise
exports.updateCompany = (req, res) => {
  const id = req.params.id;
  const data = req.body;

  Company.update(id, data, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Entreprise mise à jour avec succès' });
  });
};

// ✅ Suppression d'une entreprise
exports.deleteCompany = (req, res) => {
  const id = req.params.id;

  Company.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Entreprise supprimée avec succès' });
  });
};
