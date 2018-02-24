/*
 * @Author: Dheeraj Chaudhary
 * @Date: 2018-02-11 14:14:11
 * @Last Modified by: Dheeraj.Chaudhary@contractor.hallmark.com
 * @Last Modified time: 2018-02-15 22:32:51
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
    _creator: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
    }
});

module.exports = {
    Todo,
};