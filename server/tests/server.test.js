/*
 * @Author: Dheeraj Chaudhary 
 * @Date: 2018-02-11 15:05:08 
 * @Last Modified by: Dheeraj.Chaudhary@contractor.hallmark.com
 * @Last Modified time: 2018-02-11 17:54:50
 */
const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Todo } = require('./../models/todos');
const { ObjectID } = require('mongodb');
// Seed Data

const todos = [{
        _id: new ObjectID(),
        text: 'Test todo 1'
    },
    {
        _id: new ObjectID(),
        text: 'Test todo 2'
    }
];

//Empty database before every request
beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => {
        done();
    });
});


describe('POST / todos', () => {
    it('should create a new todo', () => {
        var newText = 'Test todo text';

        request(app)
            .post('/todos')
            .send({
                text: newText
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(newText);
            })
            .end((error, response) => {
                if (error) {
                    // return done(error);
                    return error;
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(newText);
                }).catch((e) => {
                    // done(e)
                });
            });
    });


    it('should not create a new todo due to invalid data', () => {
        var newText = 'Test todo text';

        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((error, response) => {
                if (error) {
                    // return done(error);
                    return error;
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(0);
                }).catch((e) => {
                    // done(e)
                });
            });
    });
});


describe('GET / todos', () => {
    it('should GET ALL todos', (done) => {

        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.docs.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET / todos/:id', () => {
    it('should return todo Docs', (done) => {

        request(app)
            .get('/todos/' + todos[0]._id.toHexString())
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return todo 400 bad request', (done) => {

        request(app)
            .get('/todos/5a80cef46353e027dc189a9f')
            .expect(404)
            .expect((res) => {
                console.log(res.body);
                // expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });
});