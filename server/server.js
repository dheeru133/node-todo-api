/*
 * @Author: Dheeraj Chaudhary 
 * @Date: 2018-02-11 13:19:25 
 * @Last Modified by: Dheeraj.Chaudhary@contractor.hallmark.com
 * @Last Modified time: 2018-02-11 16:48:25
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
var { ObjectID } = require('mongodb');
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

app.get('/todos', (req, res) => {
    Todo.find().then((docs) => {
        res.send({ docs });
    }).catch((error) => {
        res.send(400).send(error);
    });
});

app.get('/todos/:id', (req, res) => {

    var id = req.params.id;

    if (ObjectID.isValid(id)) {

        Todo.findById(id).then((users) => {
            if (!users) {
                res.status(400).send('User not found');
            }
            res.status(200).send({ users });
        }).catch((error) => {
            res.status(400).send(error);
        });
    } else {
        res.status(400).send('Id is not valid');
    }
});














// Export
module.exports = {
    app: app
}

//#######################Close Database##################################