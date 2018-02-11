/*
 * @Author: Dheeraj Chaudhary 
 * @Date: 2018-02-10 15:56:20 
 * @Last Modified by: Dheeraj.Chaudhary@contractor.hallmark.com
 * @Last Modified time: 2018-02-10 16:58:13
 */
// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

// Creating new Object ID what Mongo is doing for us by default
// var obj = new ObjectID();
// console.log(obj);

//Databse Connect
MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    var db = client.db('TodoApp');
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    //Object destructuring
    // var user = { name: 'hello', age: 25 };
    // var { age } = user;
    // console.log(age);


    // Insert Document

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo');
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     _id: 123,
    //     name: 'saurav',
    //     age: 27,
    //     location: '8888 lucille street'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert Users');
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // Database close
    client.close();
});