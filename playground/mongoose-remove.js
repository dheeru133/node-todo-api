/*
 * @Author: Dheeraj Chaudhary 
 * @Date: 2018-02-11 16:17:11 
 * @Last Modified by: Dheeraj.Chaudhary@contractor.hallmark.com
 * @Last Modified time: 2018-02-11 21:06:24
 */
const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todos');
const { Users } = require('./../server/models/users');

// Todod.remove({})

// Todo.remove({}).then((results) => {
//     console.log(results);

// });

// Todo.findByIdAndRemove

Todo.findOneAndRemove({
    _id: '5a81019b1b7bc1b007d0b077'
}).then((document) => {
    console.log('Removed docs:', document);

});

Todo.findByIdAndRemove('5a81019b1b7bc1b007d0b076').then((doc) => {
    if (!doc) {
        return console.log('Unable to remove doc');
    }
    console.log('Find by id remove docs', doc);
}, (error) => {
    console.log('Error while remvoving from database', error);
});