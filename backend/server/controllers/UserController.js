const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

module.exports.registerUser = async (req, res) => {

    const { Email }= req.body;
    try {
        const checkUser = await User.findOne({Email});
        if(checkUser) {
            res.json({
                success: false,
                message: "Already exist user with this email"
            })
        }

        const newUser = await User.create(req.body);
        res.json({
            success: true,
            newUser
        })
    }
    catch(error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

module.exports.loginUser = asyncHandler(async(req, res) => {
    const { Email, Password } = req.body;

    if(Email === "") {
        throw new Error("Email field is empty");
    }

    if(Password === "") {
        throw new Error("Email field is empty");
    }

    const existingUser = await User.findOne({Email});
    if(!existingUser) {
        throw new Error("Invalid cretendtials. Email doesnt exist.");
    }

    const arePasswordMatched_HashedNonHashed = await existingUser.ComparePasswords_Hashed_NonHashed(Password)
    if(!arePasswordMatched_HashedNonHashed) {
        throw new Error("Passwords are not matched");
    }

    const token = await existingUser.GenerateJWT();
    const refresh_token = await existingUser.GenerateRefreshToken();
    await User.findByIdAndUpdate(existingUser.id, 
        {RefreshToken: refresh_token}, {new: true})
    res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000});
    res.json({
        succes: true,
        token,
        refresh_token
    })
})

module.exports.getAllUsers = asyncHandler(async(req, res) => {
    const getAllUsers = await User.find({});
    try {
        res.json({
            success: true,
            getAllUsers
        })
    } catch (error) {
        throw new Error(error.message);
    }
})

module.exports.getAUserFromParams = asyncHandler(async(req, res) => {
    const { id } = req.params;
    try {
        const getAUser = await User.findById(id);
        res.json({
            success: true,
            getAUser
        }) 
    } catch (error) {
        throw new Error(error);
    }
})

module.exports.getAUserFromReq_User = asyncHandler(async(req, res) => {
    try {
        const getAUser = await User.findById(req.user.id);
        res.json({
            success: true,
            getAUser
        }) 
    } catch (error) {
        throw new Error(error);
    }
})

module.exports.deleteAUser = asyncHandler(async(req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        res.json({
            success: true,
            deletedUser
        })
    } catch (error) {
        throw new Error(error);
    }
})

module.exports.updateAUser = asyncHandler(async(req, res) => {
    const { id } = req.params;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {new: true})
        res.json({
            success: true,
            updatedUser
        })
    } catch (error) {
        throw new Error(error);
    }
})

module.exports.refrestTokenHandler = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    console.log(cookie)
    if(!cookie.refresh_token)
        throw new Error(`Refresh token is not in cookie`);

    const RefreshToken = cookie.refresh_token
    console.log(RefreshToken)
    
    const user = await User.findOne({RefreshToken})
    if(!user) 
        throw new Error(`Refresh token is not matched with a user`);
    
    const decodedRefToken = jwt.verify(RefreshToken, process.env.JWT_SECRET);
    if(user.id !== decodedRefToken.id) {
        throw new Error('Refresh token is problematic. Fix error');
    }
    const accessToken = user.GenerateJWT();
    res.json({
        success: true,
        accessToken
    })
})

module.exports.logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if(!cookie.refresh_token)
        throw new Error(`Refresh token is not in cookie`);

    const RefreshToken = cookie.refresh_token
    console.log(RefreshToken)
    
    const user = await User.findOne({RefreshToken})
    if(!user) {
        res.clearCookie("refresh_token", {
            httpOnly: true,
            secure: true
        });
        return res.sendStatus(204); // Forbidden
    }

    await User.findByIdAndUpdate(user.id, {RefreshToken: ""}, {new: true})
    res.clearCookie("refresh_token", {
        httpOnly: true,
        secure: true,
      });
    res.sendStatus(204); // forbidden
})