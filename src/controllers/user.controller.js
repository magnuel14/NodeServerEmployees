const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cloudinaryC = require('../cloudinary');
const fs = require('fs-extra');

const config = require('../../config');
const User = require('../models/User');


const userContrl = {};
userContrl.singup = async (req, res) => {
    try {
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const country = req.body.country;
        const email = req.body.email;
        const password1 = req.body.password;
        let password = bcrypt.hashSync(password1, config.BCRYPT_SALT_ROUNDS);
        const newUser = new User({ first_name, last_name, country, email, password });
        //return res.json(req.files.tempFilePath);
        if (!req.files) {
            console.log(password1)
            console.log(password)
            //console.log(newUser)
            const saveUser = await newUser.save();
            //res.send({ message: 'User create' });
            console.log(saveUser);
            //si se usa dos res, te sale error
            const token = jwt.sign({ _id: newUser._id }, config.SecretKeyJWT);
            res.status(200).json({ token });
            return;
        } else {
            if (req.files?.img_user) {3
                const result = await cloudinaryC.uploadImage(req.files.img_user.tempFilePath);
                newUser.img_user = {
                    public_id: result.public_id,
                    secure_url: result.secure_url
                }
                await fs.unlink(req.files.img_user.tempFilePath)
            }
            console.log(newUser)
            //console.log(password)
            //console.log(passwordEncrypt)
            //console.log(newUser)
            const saveUser = await newUser.save();
            //res.send({ message: 'User create' });
            console.log(saveUser);
            //si se usa dos res, te sale error
            const token = jwt.sign({ _id: newUser._id }, config.SecretKeyJWT);
            res.status(200).json({ token });
            return;
        }
    } catch (error) {
        if (req.files?.image) {
            await fs.unlink(req.files.image.tempFilePath)
        }
        return res.status(500).json({ message: error.message })
    }
}
userContrl.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(401).send('This email does not exist');
        //console.log(password);
        let passwordEncript = user.password;
        //console.log(user);
        const passwordValide = await bcrypt.compare(password, passwordEncript);
        //console.log(passwordValide)
        if (!passwordValide) return res.status(401).send('Wrong password');
        const token = jwt.sign({ _id: user._id }, config.SecretKeyJWT);

        return res.status(200).json({ token , user});
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}



module.exports = userContrl;