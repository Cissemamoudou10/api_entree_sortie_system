const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken,requireRole } = require('../middlewares/authMiddleware');


// 🔑 Authentification
router.post('/login', userController.login);
router.post('/logout',verifyToken, userController.logout);

// 🧍‍♂️ Création d’un utilisateur
router.post('/register',verifyToken,requireRole('admin'), userController.createUser);

// 📋 Liste de tous les utilisateurs
router.get('/',verifyToken,requireRole('admin'), userController.getAllUsers);

module.exports = router;
