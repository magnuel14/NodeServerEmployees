<<<<<<< HEAD
const { Schema, model } = require('mongoose');
const userSchema = new Schema({
    first_name: { type: String, require: true, trim: true },
    last_name: { type: String, require: true, trim: true },
    img_user: {
        secure_url: {type:String},
        public_id: {type:String}
    },
    country: { type: String, require: true, trim: true },
    email: { type: String, require: true, trim: true },
    password: { type: String, require: true, trim: true },
}, {
    timestamps: true,
    versionKey: false
=======
const {Schema, model} = require('mongoose');
const userSchema = new Schema({
    email:{type: String, require: true},
    password:{type: String, require: true},
},{
    timestamps:true,
    versionKey:false
>>>>>>> 3576916fd1a5532bebfe6964984fe8aa7b665523
})
module.exports = model('User', userSchema);