/*
 * @Author: Dheeraj Chaudhary 
 * @Date: 2018-02-11 13:19:25 
 * @Last Modified by: Dheeraj.Chaudhary@contractor.hallmark.com
 * @Last Modified time: 2018-02-11 15:44:29
 */
// ######################Required Packages########################
var bodyParser = require('body-parser');

// ########################Express App#############################
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('App running on PORT : ', port);
});

//###############DB Connection#########################################
var { mongoose } = require('./db/mongoose');
// MODELS#####################################
var { Todo } = require('./models/todos');
var { Users } = require('./models/users');

//######################### middleware#################################
app.use(bodyParser.json());

//######################### ROUTES######################################

app.post('/todos', (req, res) => {
    var newTodo = new Todo({
        text: req.body.text
    });

    newTodo.save().then((doc) => {
        res.send(doc);

    }, (error) => {
        res.status(400).send(error);
    });
});


// export
module.exports = {
    app: app
}

//#######################Close Database##################################