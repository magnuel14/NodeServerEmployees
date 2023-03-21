const mongoose = require('mongoose');
/*
mongoose
    .connect('mongodb://localhost/mean-employees')
    .then((db)=> console.log('DB is connected'))
    .catch((err)=>console.log(err));
*/
//para que no salga las abvertencias
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/mean-employees', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.log('error: ', err))
