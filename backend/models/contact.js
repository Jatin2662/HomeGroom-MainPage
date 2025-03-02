


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    firstName : {type : String, required : true},
    lastName : {type : String, required : true},
    email : {type : String, required : true},
    query : {type : String, required : true},
    date : {type : Date, default : Date.now}
})

module.exports = mongoose.model('Contact', contactSchema);