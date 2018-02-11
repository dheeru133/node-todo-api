/*
 * @Author: Dheeraj Chaudhary 
 * @Date: 2018-02-11 16:17:11 
 * @Last Modified by: Dheeraj.Chaudhary@contractor.hallmark.com
 * @Last Modified time: 2018-02-11 16:36:17
 */
const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todos');
const { Users } = require('./../server/models/users');

var id = '5a80a0a0fc8d148c1aadb3bc';
//{"_id":"5a80a0a0fc8d148c1aadb3bc","email":"dheeraj133@gmail.com","__v":0}

if (ObjectID.isValid(id)) {
    // //###################Queries LIST TODOS###################
    // //(1)
    // Todo.find({
    //     _id: id
    // }).then((todos) => {
    //     console.log('Toddo Find : ', todos);
    // })

    // //(2)
    // Todo.findOne({
    //     _id: id
    // }).then((todo) => {
    //     console.log('Todo findOne : ', todo);
    // })

    // //(3)
    // Todo.findById(id).then((todo) => {
    //     if (!todo) {
    //         return console.log('Id not found');
    //     }
    //     console.log('To do by ID :', todo);
    // }).catch((error) => {
    //     console.log(error);

    // });

    //###################Queries LIST USERS###################
    //(1)
    Users.find({
        _id: id
    }).then((users) => {
        console.log('Users Find : ', users);
    });

    //(2)
    Todo.findOne({
        _id: id
    }).then((users) => {
        console.log('Users findOne : ', users);
    });

    //(3)
    Todo.findById(id).then((users) => {
        if (!users) {
            return console.log('Users not found');
        }
        console.log('Users by ID :', users);
    }).catch((error) => {
        console.log(error);

    });
} else {
    console.log('Object id  not valid');
}