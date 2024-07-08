
// shayad iski jaroorat nahi hai

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;

const employeeDetails = new Schema({
    name : {type : String, required : true},
    phoneNo : {type : Number, required : true},
    email : {type : String, required : true, unique : true},
    resume : {type : String}
})

employeeDetails.plugin(uniqueValidator);

module.exports = mongoose.model('EmployeeDetails', employeeDetails);