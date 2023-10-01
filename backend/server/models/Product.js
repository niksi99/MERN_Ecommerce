const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    Description: {
        type: String,
        required: true
    },
    Prise: {
        type: Number,
        required: true
    },
    Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category" 
    },
    Quantity: {
        type: Number,
        required: true
    },
    Sold: {
        type: Number,
        default: 0
    },
    Images: {
        type: Array,
    },
    Color: {
        type: String,
    },
    Rating: {
        Star: Number,
        Comment: String,
        PostedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    TotalRanking: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

module.exports = mongoose.model("Product", ProductSchema);