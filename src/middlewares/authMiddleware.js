const jwt = require("jsonwebtoken");
require("dotenv").config();

// ✅ Vérifie si le token est valide
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "Token manquant, accès refusé" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token invalide" });
    req.user = user;
    next();
  });
};

// ✅ Vérifie les rôles

/**
 * ✅ Middleware d'autorisation basé sur les rôles
 * @param {string|string[]} roles - Un rôle ou un tableau de rôles autorisés
 */
exports.requireRole = (roles) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Token manquant" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // Si roles est une chaîne (ex: "admin"), on le convertit en tableau
      const allowedRoles = Array.isArray(roles) ? roles : [roles];

      // 🛡️ Si c’est un superadmin, il peut tout faire
      if (decoded.role === "superadmin") {
        return next();
      }

      // 🔎 Vérifie si l'utilisateur a un rôle autorisé
      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({
          message: "Accès refusé : rôle non autorisé",
        });
      }

      next();
    } catch (err) {
      return res.status(403).json({ message: "Token invalide ou expiré" });
    }
  };
};

exports.requireSuperAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (decoded.role !== 'superadmin') {
      return res.status(403).json({ message: 'Accès refusé : superadmin requis' });
    }

    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token invalide ou expiré' });
  }
};
