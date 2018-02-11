/*
 * @Author: Dheeraj Chaudhary 
 * @Date: 2018-02-10 15:56:20 
 * @Last Modified by: Dheeraj.Chaudhary@contractor.hallmark.com
 * @Last Modified time: 2018-02-11 12:24:59
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

    //findOneAndUpdate

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5a7f79d97a22af1be073dd43')
    }, {
        $set: {
            name: 'Dheeraj chaudhary'
        },
        $inc: {
            age: 5
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    // Database close
    client.close();
});