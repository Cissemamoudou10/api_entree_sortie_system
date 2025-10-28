// models/employeeModel.js
const db = require('../config/db');

const Employee = {
  // 🔹 Récupérer tous les employés
  getAll: (callback) => {
    const sql = `
      SELECT e.*, u.nom AS created_by_name, c.nom AS company_name
      FROM employees e
      LEFT JOIN users u ON e.created_by = u.id
      LEFT JOIN companies c ON e.company_id = c.id
    `;
    db.query(sql, callback);
  },

  // 🔹 Récupérer un employé par ID
  getById: (id, callback) => {
    const sql = `
      SELECT e.*, u.nom AS created_by_name, c.nom AS company_name
      FROM employees e
      LEFT JOIN users u ON e.created_by = u.id
      LEFT JOIN companies c ON e.company_id = c.id
      WHERE e.id = ?
    `;
    db.query(sql, [id], callback);
  },

  // 🔹 Récupérer les employés d’un créateur donné
  getByCreator: (userId, callback) => {
    const sql = `
      SELECT e.*, c.nom AS company_name
      FROM employees e
      LEFT JOIN companies c ON e.company_id = c.id
      WHERE e.created_by = ?
    `;
    db.query(sql, [userId], callback);
  },

  // 🔹 Récupérer les employés d’une entreprise donnée
  getByCompany: (companyId, callback) => {
    const sql = `SELECT * FROM employees WHERE company_id = ?`;
    db.query(sql, [companyId], callback);
  },

  // 🔹 Créer un nouvel employé
  create: (data, callback) => {
    const sql = `INSERT INTO employees SET ?`;
    db.query(sql, data, callback);
  },

  // 🔹 Mettre à jour un employé
  update: (id, data, callback) => {
    const sql = `UPDATE employees SET ? WHERE id = ?`;
    db.query(sql, [data, id], callback);
  },

  // 🔹 Supprimer un employé
  delete: (id, callback) => {
    const sql = `DELETE FROM employees WHERE id = ?`;
    db.query(sql, [id], callback);
  }
};

module.exports = Employee;
