/*
 * @Author: Dheeraj Chaudhary 
 * @Date: 2018-02-11 14:12:11 
 * @Last Modified by: Dheeraj.Chaudhary@contractor.hallmark.com
 * @Last Modified time: 2018-02-11 18:10:30
 */
var mongoose = require('mongoose');

//Connect to Database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = {
    mongoose: mongoose
};