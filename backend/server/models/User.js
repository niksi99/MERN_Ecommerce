const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true,
    },
    Cellphone: {
        type: String,
        unique: true
    },
    Email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    Password: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('User', UserSchema)