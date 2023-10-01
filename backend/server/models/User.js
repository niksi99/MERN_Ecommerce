const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true,
    },
    Cellphone: {
        type: String,
        unique: true
    },
    Email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    Password: {
        type: String,
        required: true,
    },
    Role: {
        type: String,
        default: 'user'
    },
    Cart: {
        type: Array,
        default: []
    },
    Address: {
        type: String,
        default: ""
    },
    ListOfProducts: {
        type: mongoose.Schema.Types.ObjectId, ref: "Product"
    },
    RefreshToken: {
        type: String,
        default: ""
    }
}, { timestamps: true })

UserSchema.pre('save', async function(next) {
    if(!this.isModified('Password'))
        next();

    this.Password = await bcrypt.hash(this.Password, 10)
})

UserSchema.methods.ComparePasswords_Hashed_NonHashed = async function(hashed) {
    return await bcrypt.compare(hashed, this.Password)
}

UserSchema.methods.GenerateJWT = function() {
    return jwt.sign(
        {id: this._id, Email: this.Email},
        process.env.JWT_SECRET,
        { expiresIn: 900 }
    )
}

UserSchema.methods.GenerateRefreshToken = function() {
    return jwt.sign(
        {id: this._id, Email: this.Email},
        process.env.JWT_SECRET,
        { expiresIn: 600 }
    )
}

module.exports = mongoose.model('User', UserSchema)