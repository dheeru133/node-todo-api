/*
 * @Author: Dheeraj Chaudhary 
 * @Date: 2018-02-11 14:14:15 
 * @Last Modified by: Dheeraj.Chaudhary@contractor.hallmark.com
 * @Last Modified time: 2018-02-11 14:19:40
 */


var mongoose = require('mongoose');

// MODEL Users
var Users = mongoose.model('Users', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

module.exports = {
    Users: Users
};