const mongoose = require('mongoose')
const TodoSchema = new mongoose.Schema({
    todo:String
})
const todomodel = mongoose.model('todo',TodoSchema)
module.exports=todomodel