const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employee');

router.get('/', EmployeeController.getAll);
router.get('/:id', EmployeeController.getById);
router.get('/department/:id', EmployeeController.getByDepartmentId);
router.post('/', EmployeeController.create);
router.put('/:id', EmployeeController.update);
router.delete('/:id', EmployeeController.delete);

module.exports = router;