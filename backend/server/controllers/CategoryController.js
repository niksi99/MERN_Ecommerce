const asyncHandler = require("express-async-handler");
const Category = require("../models/Category");

module.exports.AddNewCategory = asyncHandler(async(req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.json({
            success: true,
            newCategory
        })
    } catch (error) {
        throw new Error(error);
    }
})

module.exports.InsertElementalCategories = asyncHandler(async(req, res) => {
    try {
        const elementalCategory = await Category.insertMany([
            {Title: "PC"},
            {Title: "LapTop"},
            {Title: "Cellphone"},
            {Title: "Microphone"}
        ]);
        res.json({
            success: true,
            elementalCategory
        })
    } catch (error) {
        throw new Error(error);
    }
})

module.exports.GetAllCategories = asyncHandler(async(req, res) => {
    try {
        const allCategories = await Category.find({})
        res.json({
            success: true,
            allCategories,
            duzina: allCategories.length,
            broj: allCategories.count
        })
    } catch (error) {
        throw new Error(error);
    }
})