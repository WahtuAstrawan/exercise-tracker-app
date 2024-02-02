const mongoose = require('mongoose');
const exerciseSchema = require('./exercise');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        default: 0
    },
    logs:{
        type: [exerciseSchema]
    }
});

const Users = mongoose.model('User', userSchema);

module.exports = Users;