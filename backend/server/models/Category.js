const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true,
        unique: true,
        index: true
    }
}, {timestamps: true})

module.exports = mongoose.model("Category", CategorySchema);