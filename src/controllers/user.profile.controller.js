const cloudinaryC = require('../cloudinary');
const fs = require('fs-extra');

const User = require('../models/User');


const userProfileContrl = {};
userProfileContrl.updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!updatedUser)
            return res.status(404).json({ message: "User Not Found" });
        return res.json(updatedUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
userProfileContrl.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ message: 'User does not exists' })
        await deleteImage(deletedUser.image.public_id)
        return res.json(deletedUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
userProfileContrl.getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const userFound = await User.findById(id);
        if (!userFound)
            return res.status(404).json({ message: "User not found" });
        return res.json(userFound);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
userProfileContrl.verifyToken = async (req, res, next) => {
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
module.exports = userProfileContrl;