const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    username:String,
    email:String,
    nunmber:Number
})
const usermodel = mongoose.model('users',UserSchema)
module.exports = usermodel