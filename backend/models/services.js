


// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const service = new Schema({
//     serviceName : {type : String, required : true, unique : true},
//     employeeName : {type : String, required : true, unique : true},
//     image : {type : String}
// })


const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique : true
  },
  image: {
    type: String,
    required: true
  }
});

serviceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Service', serviceSchema);