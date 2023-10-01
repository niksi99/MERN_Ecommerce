const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/ProductController')

router.post("/createNewProduct", ProductController.CreateProduct);

module.exports = router