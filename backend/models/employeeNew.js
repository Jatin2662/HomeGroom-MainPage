 


const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const employee = new Schema({
    name : {type : String, required : true},
    phoneNo : {type : Number, required : true},
    email : {type : String, required : true, unique : true},
    resume : {type : String}
})

employee.plugin(uniqueValidator);

module.exports = mongoose.model('Employee', employee)