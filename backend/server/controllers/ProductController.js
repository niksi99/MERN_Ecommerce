const Product = require('../models/Product')
const asyncHandler = require('express-async-handler')

module.exports.CreateProduct = asyncHandler(async(req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.json({
            success: true,
            newProduct
        })
    } catch (error) {
        throw new Error(error)
    }
})