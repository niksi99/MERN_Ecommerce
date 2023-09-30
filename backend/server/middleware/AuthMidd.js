const User = require("../models/User");
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

module.exports.IsAuthenticated = asyncHandler(async(req, res, next) => {
    let token;
    if(req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        try {
            if(token) {
                const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findById(decodedToken.id)
                req.user = user;
                next();
            }
            else {
                throw new Error("Token is not valid from sole reason");
            }
        } catch (error) {
            throw new Error("Not authorized, token expired. Log in again");
        }
    }
    else {
        throw new Error('There is no token to header')
    }
})