const express = require('express');
var logger = require('morgan');
var cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();

//enviroment variables
app.set('port',process.env.PORT || 4000);

//app.use(cors({origin:"http://localhost:4200/"}))
app.use(cors());
app.use(logger('dev'));


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: './uploads'
}));

app.use('/uelda',require('./routes/employes.routes'))
app.use('/uelda',require('./routes/user.routes'))
app.use('/uelda',require('./routes/user.profile.routes'))



module.exports=app;