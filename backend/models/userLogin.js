
// yeh redundant hai kyo ki login karna ke liye woh userSignUp main check karega ki user hai database main ya nahi

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const userOrder = require('./userOrder')
const Schema = mongoose.Schema;

const userLoginSchema = new Schema({
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true}
})

userLoginSchema.plugin(uniqueValidator);

module.exports = mongoose.model('userLogin', userLoginSchema)