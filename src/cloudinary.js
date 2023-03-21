
const cloudinary = require('cloudinary').v2;
const config = require('../config');

const cloudinaryControl = {};

// Configuration 
cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.API_KEY,
  api_secret: config.API_SECRET,
  secure: true
});


cloudinaryControl.uploadImage= async (filePath)=>{
   return await cloudinary.uploader.upload(filePath,{
    folder: 'container'
   })
}

module.exports = cloudinaryControl;