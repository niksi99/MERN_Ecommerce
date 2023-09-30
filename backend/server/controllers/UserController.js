const User = require('../models/User')
const asyncHandler = require('express-async-handler')

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
    //req.existingUser;
    req.user = await User.findOne({Email});
    console.log(req.user)
    res.json({
        succes: true,
        token
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

module.exports.getAUser = asyncHandler(async(req, res) => {
    //const { _id } = req.existingUser.id;
    console.log(req.user)
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