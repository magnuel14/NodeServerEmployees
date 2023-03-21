//const hello=(req,res)=> res.send('hello');
const Employee = require('../models/Employee');
const jwt = require('jsonwebtoken');
const config = require('../../config');


const employesContrl = {};

employesContrl.createEmployes = async (req, res) => {
    //try {
        const newEmploye = new Employee(req.body);
        await newEmploye.save();
        //console.log(newEmploye);
        res.send({ message: 'Employee create' });
    //} catch (error) {
      //  return res.status(500).json({ message: error.message })
   // }
}

employesContrl.getEmployes = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
employesContrl.getEmploye = async (req, res) => {
    try {
        //console.log(req.params);
        const employee = await Employee.findById(req.params.id);
        res.send(employee);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
employesContrl.getEmployeByCedula = async (req, res) => {
    try {
        //console.log(req.params);
        //const nameEmployee=req.body.nameForSearch;
        const cedula = req.params.cedula;
        //console.log(cedula)
        const employee = await Employee.find({ "cedula": cedula });
        res.send(employee);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
employesContrl.updateEmploye = async (req, res) => {
    try {
        await Employee.findByIdAndUpdate(req.params.id, req.body);
        const updateemployee = await Employee.findByIdAndUpdate(req.params.id, req.body);
        res.json({ status: 'Employee update' });
        console.log(updateemployee);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
employesContrl.deleteEmployes = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        res.json({ status: 'Employee Deleted' });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
/** 
employesContrl.verifyToken = (req, res, next) => {
    //console.log(req.headers.autorization)
    if (!req.headers.autorization) {
        return res.status(401).send('Unthorize request');
    }
    const token = req.headers.autorization.split(' ')[1];
    if (token == 'null') {
        return res.status(401).send('Unthorize request');
    }
    const payload = jwt.verify(token, config.SecretKeyJWT);
    //console.log(payload)
    req.userId = payload._id;
    next();
}
*/
employesContrl.verifyToken = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).send('Unauhtorized Request');
        }
        let token = req.headers.authorization.split(' ')[1];
        if (token === 'null') {
            return res.status(401).send('Unauhtorized Request');
        }

        const payload = await jwt.verify(token, config.SecretKeyJWT);
        if (!payload) {
            return res.status(401).send('Unauhtorized Request');
        }
        req.userId = payload._id;
        next();
    } catch (e) {
        //console.log(e)
        return res.status(401).send('Unauhtorized Request');
    }
}

module.exports = employesContrl;