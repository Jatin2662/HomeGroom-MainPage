

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// const userSchema = mongoose.Schema({
//     firstname : {type : String, required : true},
//     lastname : {type : String, required : true},
//     email : {type : String, required : true, unique : true},
//     password : {type : String, required : true}
// })

const Schema =  mongoose.Schema;

const AddressSchema = new Schema({
    id: { type: Number, required: true },
    address: { type: String, required: true }
});

const userSignupSchema = new Schema({
    firstname : {type : String, required : true},
    lastname : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    selectedAddress: { type: String, required: false },
    allAddresses: [AddressSchema]
    
})

userSignupSchema.plugin(uniqueValidator);

module.exports = mongoose.model('userSignup', userSignupSchema)