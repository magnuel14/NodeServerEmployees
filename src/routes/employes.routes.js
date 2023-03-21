const {Router} = require('express');
const employeerouter = Router();
const employesController = require('../controllers/employes.controller');
const userContrl = require('../controllers/UserController');

<<<<<<< HEAD
employeerouter.get('/employees/',employesController.verifyToken,employesController.getEmployes);
employeerouter.post('/employees/',employesController.verifyToken,employesController.createEmployes);
employeerouter.get('/employees/:id',employesController.verifyToken,employesController.getEmploye);
employeerouter.get('/employees/user/:cedula',employesController.verifyToken,employesController.getEmployeByCedula);
employeerouter.put('/employees/:id',employesController.verifyToken,employesController.updateEmploye);
employeerouter.delete('/employees/:id',employesController.verifyToken,employesController.deleteEmployes);
=======
router.get('/',employesController.getEmployes);
router.post('/',employesController.createEmployes);
router.get('/:id',employesController.getEmploye);
router.get('/users/:cedula',employesController.getEmployeByCedula);
router.put('/:id',employesController.updateEmploye);
router.delete('/:id',employesController.deleteEmployes);
router.post('/users/signup',userContrl.signup);
router.post('/users/singnin',userContrl.singnin);

>>>>>>> 3576916fd1a5532bebfe6964984fe8aa7b665523


module.exports = employeerouter;