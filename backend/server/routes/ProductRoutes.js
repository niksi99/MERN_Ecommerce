const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/ProductController')

router.post("/createNewProduct", ProductController.CreateProduct);

router.get("/getAProduct/:id", ProductController.GetAProduct);
router.get("/getAllProducts", ProductController.GetAllProducts);

router.put("/updateAProduct/:id", ProductController.UpdateAProduct)

router.delete("/deleteAproduct/:id", ProductController.DeleteAProduct);
module.exports = router