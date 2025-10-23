const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { verifyToken,requireRole } = require('../middlewares/authMiddleware');

// Enregistrer entrée/sortie automatiquement
router.post('/toggle',verifyToken,requireRole('controller'), attendanceController.markAttendance);

// Récupérer toutes les présences
router.get('/',verifyToken,requireRole('admin'), attendanceController.getAll);

// Récupérer les présences d’un employé
router.get('/:id',verifyToken,requireRole('admin'), attendanceController.getByEmployee);

module.exports = router;
