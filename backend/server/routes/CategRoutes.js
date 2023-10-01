const express = require('express');
const router = express.Router();

const CategoryController = require('../controllers/CategoryController')

router.post("/addNewCategory", CategoryController.AddNewCategory)
router.post('/elementalCategories', CategoryController.InsertElementalCategories)

router.get('/getAll', CategoryController.GetAllCategories);
module.exports = router;