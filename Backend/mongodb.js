const mongoose = require('mongoose');
const MongoUrl = YOUR_MONGODB_URL_HERE;
const ConnectToMongo = ()=>{
    mongoose.connect(MongoUrl,()=>{
        console.log('MongoDB Connected');
    })
}
module.exports = ConnectToMongo;
