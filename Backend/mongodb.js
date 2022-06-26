const mongoose = require('mongoose');
const MongoUrl = 'mongodb://localhost:27017/iNotebook';
const ConnectToMongo = ()=>{
    mongoose.connect(MongoUrl,()=>{
        console.log('Connected');
    })
}
module.exports = ConnectToMongo;