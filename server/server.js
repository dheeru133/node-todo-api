/*
 * @Author: Dheeraj Chaudhary
 * @Date: 2018-02-11 13:19:25
 * @Last Modified by: Dheeraj.Chaudhary@contractor.hallmark.com
 * @Last Modified time: 2018-02-15 22:58:06
 */
// ######################Required Packages########################
// // ./%npm_package_config_path%
const bodyParser = require('body-parser');
const env = require('./config/config');
const { authenticate } = require('./middleware/authenticate');

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
        res.send({ docs });
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
            res.status(200).send({ todo });
        }).catch((error) => {
            res.status(404).send(error);
        });
    } else {
        res.status(404).send('Id is not valid');
    }
});

app.delete('/todos/:id', authenticate, (req, res) => {
    const { id } = req.params;

    if (ObjectID.isValid(id)) {
        Todo.findOneAndRemove({
            _id: id,
            _creator: req.user._id,
        }).then((todo) => {
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

app.patch('/todos/:id', authenticate, (req, res) => {
    const { id } = req.params;
    const body = _.pick(req.body, ['text', 'completed']);

    if (ObjectID.isValid(id)) {
        if (_.isBoolean(body.completed) && body.completed) {
            body.completedAt = new Date().getTime();
        } else {
            body.completed = false;
            body.completedAt = null;
        }

        Todo.findOnedAndUpdate({
            _id: id,
            _creator: req.user._id,
        }, {
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



// ######################### ROUTES Users######################################
app.post('/users', (req, res) => {

    const body = _.pick(req.body, ['email', 'password']);
    const newUser = new Users(body);

    newUser.save().then(() => {
        return newUser.generateAuthToken();
    }).then((token) => {
        res.header('x_auth', token).status(200).send(newUser);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

app.get('/users/authenticate', authenticate, (req, res) => {
    res.send(req.user);
});

app.post('/users/login', (req, res) => {

    const body = _.pick(req.body, ['email', 'password']);
    Users.findByCredentials(body.email, body.password).then((user) => {
        // res.status(200).send({
        //     email: user.email,
        //     _id: user._id,
        // });
        return user.generateAuthToken().then((token) => {
            res.header('x_auth', token).status(200).send({
                email: user.email,
                _id: user._id,
            });
        });
    }).catch((error) => {
        res.status(400).send();
    });

});

app.delete('/users/logout', authenticate, (req, res) => {
    // Logout the user here - Delete the token from the User array obejct
    var user = req.user;
    user.removeToken(req.token).then(() => {
        res.status(200).send();
    }).catch((reject) => {
        console.log(error);
    });
});

// Export
module.exports = {
    app,
};


// #######################Close Database##################################