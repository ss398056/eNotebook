const mongoose = require('mongoose')
const {Schema} = mongoose;

//This is notes model or entity where we store notes details
const NotesSchema = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    tag : {
        type : String,
        default : "Personal"
    },
    date : {
        type : Date,
        default : Date.now
    }
  });

  module.exports = mongoose.model('notes',NotesSchema)