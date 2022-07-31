const mongoose = require('mongoose');
const MongoUrl = 'mongodb+srv://Gaurav1234:Abc1234@cluster0.rwlbtl0.mongodb.net/?retryWrites=true&w=majority';
// const MongoUrl = 'mongodb+srv://ChatAdmin:Abc%401234@ichatapp.i9eqi.mongodb.net/ChatDatabase?retryWrites=true&w=majority';
const ConnectToMongo = ()=>{
    mongoose.connect(MongoUrl,()=>{
        console.log('MongoDB Connected');
    })
}
module.exports = ConnectToMongo;