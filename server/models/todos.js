/*
 * @Author: Dheeraj Chaudhary
 * @Date: 2018-02-11 14:14:11
 * @Last Modified by: Dheeraj.Chaudhary@contractor.hallmark.com
 * @Last Modified time: 2018-02-13 15:41:52
 */

const mongoose = require('mongoose');


// MODEL TODOS
const Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    completedAt: {
        type: Number,
        default: null,
    },
});

module.exports = {
    Todo,
};