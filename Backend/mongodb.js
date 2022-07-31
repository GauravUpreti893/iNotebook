const mongoose = require('mongoose');
const MongoUrl = YOUR_MONGODB_URL_HERE;
// const MongoUrl = 'mongodb+srv://ChatAdmin:Abc%401234@ichatapp.i9eqi.mongodb.net/ChatDatabase?retryWrites=true&w=majority';
const ConnectToMongo = ()=>{
    mongoose.connect(MongoUrl,()=>{
        console.log('MongoDB Connected');
    })
}
module.exports = ConnectToMongo;
