


const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema =  mongoose.Schema;

const userSignupSchema = new Schema({
    firstname : {type : String, required : true},
    lastname : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    
})

userSignupSchema.plugin(uniqueValidator);

module.exports = mongoose.model('userSignup', userSignupSchema)