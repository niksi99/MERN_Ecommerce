const Product = require('../models/Product')
const asyncHandler = require('express-async-handler')
const slugify = require("slugify");

module.exports.CreateProduct = asyncHandler(async(req, res) => {
    try {
        req.body.Slug = slugify(req.body.Title);
        console.log(req.body.Slug)
        const newProduct = await Product.create(req.body);
        res.json({
            success: true,
            newProduct
        })
    } catch (error) {
        console.log(error)
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

module.exports.UpdateAProduct = asyncHandler(async(req, res) => {
    const { id } = req.params;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {new: true})
        res.json({
            success: true,
            updatedProduct
        })
    } catch (error) {
        throw new Error(error);
    }
})

module.exports.DeleteAProduct = asyncHandler(async(req, res) => {
    const { id } = req.params
    try {
        const deletedProject = await Product.findByIdAndDelete(id);
        res.json({
            success: true,
            deletedProject
        })
    } catch (error) {
        throw new Error(error);
    }
})