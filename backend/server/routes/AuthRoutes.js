const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser)

router.get("/getAllUsers", UserController.getAllUsers);
router.get("/getAUser", UserController.getAUser);

router.delete('/deleteAUser/:id', UserController.deleteAUser);

router.put('/updateAUser/:id', UserController.updateAUser);
module.exports = router