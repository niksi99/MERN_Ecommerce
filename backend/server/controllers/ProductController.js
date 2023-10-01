const Product = require('../models/Product')
const asyncHandler = require('express-async-handler')
const slugify = ("slugify");

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

module.exports.GetAProduct = asyncHandler(async(req, res) => {
    const { id } = req.params
    try {
        const aProduct = await Product.findById(id);
        res.json({
            success: true,
            aProduct
        })
    } catch (error) {
        throw new Error(error)
    }
})

module.exports.GetAllProducts = asyncHandler(async(req, res) => {
    try {
        const allProducts = await Product.find({});
        res.json({
            success: true,
            allProducts
        })
    } catch (error) {
        throw new Error(error)
    }
})