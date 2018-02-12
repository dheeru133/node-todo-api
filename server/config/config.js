/*
 * @Author: Dheeraj Chaudhary 
 * @Date: 2018-02-11 22:47:07 
 * @Last Modified by: Dheeraj.Chaudhary@contractor.hallmark.com
 * @Last Modified time: 2018-02-11 22:48:18
 */
var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}

module.exports = {
    env: env
}