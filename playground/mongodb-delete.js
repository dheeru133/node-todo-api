/*
 * @Author: Dheeraj Chaudhary 
 * @Date: 2018-02-10 15:56:20 
 * @Last Modified by: Dheeraj.Chaudhary@contractor.hallmark.com
 * @Last Modified time: 2018-02-11 12:11:51
 */
// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

//Databse Connect
MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    var db = client.db('TodoApp');
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // deleteMany

    // db.collection('Users').deleteMany({
    //     name: 'Dheeraj'
    // }).then((result) => {
    //     console.log(result);
    // });

    //deleteOne

    // db.collection('Todos').deleteOne({
    //     text: 'lunch'
    // }).then((result) => {
    //     console.log(result);
    // });

    //findOneAndDelete
    db.collection('Users').findOneAndDelete({
        _id: 123
    }).then((result) => {
        console.log(result);
    });


    // Database close
    client.close();
});