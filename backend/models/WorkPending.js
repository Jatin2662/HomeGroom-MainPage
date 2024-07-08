


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