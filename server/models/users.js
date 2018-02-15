/*
 * @Author: Dheeraj Chaudhary
 * @Date: 2018-02-11 14:14:15
 * @Last Modified by: Dheeraj.Chaudhary@contractor.hallmark.com
 * @Last Modified time: 2018-02-15 13:42:42
 */

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
var validator = require('validator');
const bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{value} is not a valid email'
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    tokens: [{
        access: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            required: true,
        }
    }]
});

//Custom method to push token on the basis of user id and password
// Instance method
userSchema.methods.generateAuthToken = function() {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({
        _id: user._id.toHexString(),
        access: access,
    }, 'Hallmark Salt').toString();
    user.tokens.push({
        access: access,
        token: token
    });
    // Array.prototype.push.apply(user.tokens, {
    //     access: acces,
    //     token: token,
    // });

    return user.save().then(() => {
        return token;
    });
};

//Model method
userSchema.statics.findByToken = function(token) {

    var Users = this;
    var decoded;

    try {
        decoded = jwt.verify(token, 'Hallmark Salt');
    } catch (e) {
        // return new Promise((resolv, reject) => {
        //     reject('JWT error');
        // });
        return Promise.reject('JWT error');
    }
    if (decoded) {
        return Users.findOne({
            '_id': decoded,
            'tokens.token': token,
            'tokens.access': 'auth',
        });
    }
};


// ################## Middleware on Mongoose. Before saving bind the event
// Hashin the password before saving it

userSchema.pre('save', function(next) {
    var user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(user.password, salt, (err, hashedPassword) => {
                // console.log(hashedPassword);
                user.password = hashedPassword;
                next();
            });
        });
    } else {
        next();
    }
});



// MODEL Users
const Users = mongoose.model('Users', userSchema);

module.exports = {
    Users,
};