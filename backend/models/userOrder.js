


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    // Define the properties of each item you want to store
    title: { type: String, required: true },
    // Add more properties as needed
});

const orderSchema = new Schema({
    items: [itemSchema], // Store an array of items
    orderStatus: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' }
}, {
    timestamps: true // This will add createdAt and updatedAt fields automatically
});

const userOrderSchema = new Schema({
    email: { type: String, required: true },
    orders: [orderSchema]
}, {
    timestamps: true
});

const userOrder = mongoose.model('userOrder', userOrderSchema);

module.exports = userOrder;




// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const orderSchema = new Schema({
//     items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true }],
//     orderStatus: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' }
// }, {
//     timestamps: true // This will add createdAt and updatedAt fields automatically
// });

// const userOrderSchema = new Schema({
//     email: { type: String, required: true },
//     orders: [orderSchema]
// }, {
//     timestamps: true
// });

// const userOrder = mongoose.model('userOrder', userOrderSchema);

// module.exports = userOrder;



// const mongoose = require('mongoose');

// const userOrderSchema = new mongoose.Schema({
//     email: { type: String, required: true },
//     orders: [{
//         items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
//         orderStatus: { type: String, default: 'Pending' }
//     }]
// });

// const userOrder = mongoose.model('userOrder', userOrderSchema);

// module.exports = userOrder;



// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const userOrderSchema = new Schema({
//     email : {type : String, required : true},
//     items: [{
//         work : {type : Array}
//     }],
//     createdAt: { type: Date, default: Date.now },
//     status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' }
// });

// module.exports = mongoose.model('userOrder', userOrderSchema);