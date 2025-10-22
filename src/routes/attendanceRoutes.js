const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.get('/', attendanceController.getAllAttendance);
router.get('/:id', attendanceController.getAttendanceByEmployee);
router.post('/entry', attendanceController.markEntry);
router.post('/exit', attendanceController.markExit);

module.exports = router;
