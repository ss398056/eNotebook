const mongoose = require('mongoose')
const {Schema} = mongoose;

//This is user model or entity where we store user details
const UserSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
  });

  module.exports = mongoose.model('user',UserSchema)