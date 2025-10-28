const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const { verifyToken,requireSuperAdmin } = require('../middlewares/authMiddleware')

// 🔐 Toutes les routes accessibles uniquement au superadmin
router.get('/', verifyToken, requireSuperAdmin, companyController.getAllCompanies);
router.get('/:id', verifyToken, requireSuperAdmin, companyController.getCompanyById);
router.post('/', verifyToken, requireSuperAdmin, companyController.createCompany);
router.put('/:id', verifyToken, requireSuperAdmin, companyController.updateCompany);
router.delete('/:id', verifyToken, requireSuperAdmin, companyController.deleteCompany);

module.exports = router;
