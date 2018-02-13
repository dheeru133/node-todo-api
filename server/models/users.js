/*
 * @Author: Dheeraj Chaudhary
 * @Date: 2018-02-11 14:14:15
 * @Last Modified by: Dheeraj.Chaudhary@contractor.hallmark.com
 * @Last Modified time: 2018-02-13 15:42:36
 */


const mongoose = require('mongoose');

// MODEL Users
const Users = mongoose.model('Users', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
});

module.exports = {
    Users,
};