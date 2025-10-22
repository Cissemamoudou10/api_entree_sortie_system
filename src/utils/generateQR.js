const crypto = require('crypto');

/**
 * Génère un code QR unique basé sur les informations de l'employé + date
 * @param {Object} employeeData - Données de l'employé (email, nom, prenom)
 * @returns {String} - Code unique
 */
exports.generateUniqueCode = (employeeData) => {
  const { email, nom, prenom } = employeeData;
  
  // Créer une chaîne unique avec les données + date complète + random
  const timestamp = Date.now();
  const date = new Date().toISOString(); // Format: 2025-10-21T20:45:30.123Z
  const randomString = Math.random().toString(36).substring(2, 15);
  const dataString = `${email}-${nom}-${prenom}-${date}-${timestamp}-${randomString}`;
  
  // Générer un hash SHA256
  const hash = crypto
    .createHash('sha256')
    .update(dataString)
    .digest('hex');
  
  // Prendre les 16 premiers caractères pour un code plus court
  const uniqueCode = `EMP-${hash.substring(0, 16).toUpperCase()}`;
  
  return uniqueCode;
};