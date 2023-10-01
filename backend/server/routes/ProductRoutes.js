const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/ProductController')

router.post("/createNewProduct", ProductController.CreateProduct);

router.get("/getAProduct/:id", ProductController.GetAProduct);
router.get("/getAllProducts", ProductController.GetAllProducts);
module.exports = router