const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const AuthenticationMiddleware = require ('../middleware/AuthMidd');

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser)

router.get('/logout', UserController.logout);

router.get("/getAllUsers", 
    AuthenticationMiddleware.IsAuthenticated,
     UserController.getAllUsers);

router.get("/getAUserFromReqUser",
    AuthenticationMiddleware.IsAuthenticated, 
    UserController.getAUserFromReq_User);
router.get("/getAUser/:id", UserController.getAUserFromParams);

router.delete('/deleteAUser/:id', 
    AuthenticationMiddleware.IsAuthenticated,
    AuthenticationMiddleware.IsAdmin,
    UserController.deleteAUser);

router.put('/updateAUser/:id', UserController.updateAUser);

//refToken
router.get('/refreshTokenHandler', UserController.refrestTokenHandler);
module.exports = router