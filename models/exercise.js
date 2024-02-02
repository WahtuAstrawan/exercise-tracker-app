const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    description: {
        type: String,
    },
    duration: {
        type: Number,
    },
    date: {
        type: String,
    }
});

module.exports = exerciseSchema;