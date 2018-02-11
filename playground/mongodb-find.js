/*
 * @Author: Dheeraj Chaudhary 
 * @Date: 2018-02-10 15:56:20 
 * @Last Modified by: Dheeraj.Chaudhary@contractor.hallmark.com
 * @Last Modified time: 2018-02-10 17:17:08
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



    // Find all the document
    // db.collection('Todos').find().toArray().then((docs) => {
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch document', err);
    // });

    db.collection('Todos').find({ _id: new ObjectID('5a7f6fd80b08e31e10843f03') }).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch document', err);
    });




    // Database close
    client.close();
});