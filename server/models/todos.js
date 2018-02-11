/*
 * @Author: Dheeraj Chaudhary 
 * @Date: 2018-02-11 14:14:11 
 * @Last Modified by: Dheeraj.Chaudhary@contractor.hallmark.com
 * @Last Modified time: 2018-02-11 14:19:31
 */

var mongoose = require('mongoose');

//MODEL TODOS
var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = {
    Todo: Todo
};