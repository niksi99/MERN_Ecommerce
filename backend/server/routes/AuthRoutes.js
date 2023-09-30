const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const AuthenticationMiddleware = require ('../middleware/AuthMidd');

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser)

router.get("/getAllUsers", 
    AuthenticationMiddleware.IsAuthenticated, UserController.getAllUsers);
router.get("/getAUser", UserController.getAUser);

router.delete('/deleteAUser/:id', UserController.deleteAUser);

router.put('/updateAUser/:id', UserController.updateAUser);
module.exports = router