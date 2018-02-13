/*
 * @Author: Dheeraj Chaudhary
 * @Date: 2018-02-11 13:19:25
 * @Last Modified by: Dheeraj.Chaudhary@contractor.hallmark.com
 * @Last Modified time: 2018-02-13 15:52:58
 */
// ######################Required Packages########################
// // ./%npm_package_config_path%
const bodyParser = require('body-parser');
const env = require('./config/config');

// ########################Express App#############################
const express = require('express');
const _ = require('lodash');

const app = express();
const port = process.env.PORT;
app.listen(port, () => {
    console.log('App running on PORT : ', port);
});

// ###############DB Connection#########################################
const { mongoose } = require('./db/mongoose');
const { ObjectID } = require('mongodb');
// MODELS#####################################
const { Todo } = require('./models/todos');
const { Users } = require('./models/users');

// ######################### middleware#################################
app.use(bodyParser.json());

// ######################### ROUTES######################################

app.post('/todos', (req, res) => {
    const newTodo = new Todo({
        text: req.body.text,
        completed: req.body.completed,
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
    const { id } = req.params;
    if (ObjectID.isValid(id)) {
        Todo.findById(id).then((todo) => {
            if (!todo) {
                res.status(404).send('Not found');
            }
            res.status(200).send({ todo });
        }).catch((error) => {
            res.status(404).send(error);
        });
    } else {
        res.status(404).send('Id is not valid');
    }
});

app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;

    if (ObjectID.isValid(id)) {
        Todo.findByIdAndRemove(id).then((todo) => {
            if (!todo) {
                res.status(404).send('No item found to delete');
            }
            res.status(200).send({ todo });
        }).catch((error) => {
            res.status(404).send(error);
        });
    } else {
        res.status(404).send('Id is not valid');
    }
});

app.patch('/todos/:id', (req, res) => {
    const { id } = req.params;
    const body = _.pick(req.body, ['text', 'completed']);

    if (ObjectID.isValid(id)) {
        if (_.isBoolean(body.completed) && body.completed) {
            body.completedAt = new Date().getTime();
        } else {
            body.completed = false;
            body.completedAt = null;
        }

        Todo.findByIdAndUpdate(id, {
            $set: body,
        }, {
            new: true,
        }).then((todo) => {
            if (todo) {
                res.status(200).send({ todo });
            } else {
                res.status(404).send('No Id found to update');
            }
        }).catch((error) => {
            res.status(404).send('Error while connecting DB or something realted to DB:', error);
        });
    } else {
        res.status(404).send();
    }
});

// Export
module.exports = {
    app,
};

// #######################Close Database##################################