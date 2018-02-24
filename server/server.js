/*
 * @Author: Dheeraj Chaudhary
 * @Date: 2018-02-11 13:19:25
 * @Last Modified by: Dheeraj.Chaudhary@contractor.hallmark.com
 * @Last Modified time: 2018-02-24 14:38:08
 */
// ######################Required Packages########################
// // ./%npm_package_config_path%
const bodyParser = require('body-parser');
const env = require('./config/config');
const { authenticate } = require('./middleware/authenticate');
const path = require('path');
const fs = require('fs');
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
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} : ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) => {
        if (error) {
            console.log('Unable to write the logs of application');
        }
    });
    next();
});


const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });
// app.use(express.static(__dirname + '/shoppingCart'));
// ######################### ROUTES TODOS######################################
app.post('/todos', authenticate, (req, res) => {
    const newTodo = new Todo({
        text: req.body.text,
        completed: req.body.completed,
        _creator: req.user._id,
    });
    newTodo.save().then((doc) => {
        res.send(doc);
    }, (error) => {
        res.status(400).send(error);
    });
});


app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id,
    }).then((docs) => {
        res.send({
            docs
        });
    }).catch((error) => {
        res.send(400).send(error);
    });
});


app.get('/todos/:id', authenticate, (req, res) => {
    const { id } = req.params;
    if (ObjectID.isValid(id)) {
        Todo.findById({
            _id: id,
            _creator: req.user._id,
        }).then((todo) => {
            if (!todo) {
                res.status(404).send('Not found');
            }
            res.status(200).send({
                todo
            });
        }).catch((error) => {
            res.status(404).send(error);
        });
    } else {
        res.status(404).send('Id is not valid');

    }
});


app.delete('/todos/:id', authenticate, async(req, res) => {
    try {
        const { id } = req.params;
        if (ObjectID.isValid(id)) {
            const todo = await Todo.findOneAndRemove({
                _id: id,
                _creator: req.user._id,
            });
            if (!todo) {
                res.status(404).send('No item found to delete');
            }
            res.status(200).send({
                todo
            });

        } else {
            res.status(404).send('Id is not valid');
        }
    } catch (error) {
        res.status(400).send();
    }
});


app.patch('/todos/:id', authenticate, async(req, res) => {
    try {
        const { id } = req.params;
        const body = _.pick(req.body, ['text', 'completed']);
        if (ObjectID.isValid(id)) {
            if (_.isBoolean(body.completed) && body.completed) {
                body.completedAt = new Date().getTime();
            } else {
                body.completed = false;
                body.completedAt = null;
            }
            const todo = await Todo.findOnedAndUpdate({
                _id: id,
                _creator: req.user._id,
            }, {
                $set: body,
            }, {
                new: true,
            });
            if (!todo) {
                res.status(404).send('No item found to authenticate');
            }
            res.status(200).send(todo);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        res.status(400).send();
    }

});


// ######################### ROUTES Users######################################
app.post('/users', async(req, res) => {
    try {
        const body = _.pick(req.body, ['email', 'password']);
        const newUser = new Users(body);
        await newUser.save();
        const token = newUser.generateAuthToken();
        res.header('x_auth', token).status(200).send(newUser);
    } catch (error) {
        res.sendStatus(400).send();
    }
});


app.get('/users/authenticate', authenticate, (req, res) => {
    res.send(req.user);
});


app.post('/users/login', async(req, res) => {
    try {
        const body = _.pick(req.body, ['email', 'password']);
        const user = await Users.findByCredentials(body.email, body.password);
        const token = await user.generateAuthToken();
        res.header('x_auth', token).status(200).send(user);
    } catch (error) {
        res.sendStatus(400).send();
    }
});


app.delete('/users/logout', authenticate, async(req, res) => {
    // Logout the user here - Delete the token from the User array obejct
    try {
        await req.user.removeToken(req.token);
        res.status(200).send();
    } catch (error) {
        res.status(400).send();
    }
});


// Export
module.exports = {
    app,
};
// #######################Close Database##################################