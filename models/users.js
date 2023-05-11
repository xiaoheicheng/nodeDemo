let mongoose = require("mongoose")
let Schema = mongoose.Schema
let userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    nickName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    enable_flag:{
        type:String,
        default:"Y"
    }
  
})
module.exports = mongoose.model("users", userSchema)