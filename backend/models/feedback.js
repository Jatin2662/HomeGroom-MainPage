

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    features: {
        type: String,
        required: true
    },
    customerService: {
        type: String,
        required: true
    },
    satisfaction: {
        type: String,
        required: true,
        enum: ['Very Bad', 'Bad', 'Average', 'Good', 'Excellent']
    },
    recommendation: {
        type: String,
        required: true,
        enum: ['yes', 'no']
    },
    suggestions: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
