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

exports.requireRole = (role) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token manquant" });
    }

    const token = authHeader.split(" ")[1];

    try {
      // 🔐 Vérifie et décode le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 🧩 On stocke les infos de l'utilisateur dans la requête
      req.user = decoded;

      // 🛡️ Si c'est un admin, il peut tout faire
      if (decoded.role === "admin") {
        return next();
      }

      // 🎯 Sinon, on vérifie que son rôle correspond à celui exigé
      if (decoded.role !== role) {
        return res
          .status(403)
          .json({ message: "Accès refusé : rôle non autorisé" });
      }

      // ✅ Tout est OK
      next();
    } catch (err) {
      return res.status(403).json({ message: "Token invalide ou expiré" });
    }
  };
};
