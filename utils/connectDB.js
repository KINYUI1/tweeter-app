const mongoose = require('mongoose')


module.exports = function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    const db = mongoose.connection;
    db.on('error', (e)=> console.log(e))
    db.on('open', ()=> console.log('connected to mongoDB'))
    db.on('close', ()=> console.log('disconnected to mongoDB'))
}