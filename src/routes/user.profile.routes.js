const {Router} = require('express');
const employeerouter = Router();
const userProfileController = require('../controllers/user.profile.controller');

employeerouter.post('/user/profile/:id',userProfileController.verifyToken,userProfileController.updateUser);
employeerouter.get('/user/profile/:id',userProfileController.getUser);

module.exports = employeerouter;