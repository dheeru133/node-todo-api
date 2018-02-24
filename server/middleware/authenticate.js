/*
 * @Author: Dheeraj Chaudhary 
 * @Date: 2018-02-15 13:11:56 
 * @Last Modified by: Dheeraj.Chaudhary@contractor.hallmark.com
 * @Last Modified time: 2018-02-15 13:15:59
 */

// ######################### Middleware ROUTES Users######################################
const { Users } = require('./../models/users');

var authenticate = (req, res, next) => {
    var token = req.header('x_auth');
    Users.findByToken(token).then((user) => {
        if (!user) {
            return res.status(401).send();
        }
        //res.send(user);
        req.user = user;
        req.token = token;
        next();
    }).catch((reject) => {
        res.status(401).send();
    });
};


module.exports = {
    authenticate: authenticate,
}