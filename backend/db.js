//This file can configure database
const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/mydb";

const connectToMongo = async ()=>{
    await mongoose.connect(mongoURI);
    console.log("connected database")
}

module.exports = connectToMongo;