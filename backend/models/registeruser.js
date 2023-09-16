const mongoose = require('mongoose')
const RegisterUserSchema =new mongoose.Schema({
name:String,
email:String,
password:String,
role:{
    type:String,
    default:'user'
}
})
const registerusermodel =mongoose.model('registeruser',RegisterUserSchema)
module.exports = registerusermodel