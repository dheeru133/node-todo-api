/*
 * @Author: Dheeraj Chaudhary 
 * @Date: 2018-02-11 15:05:08 
 * @Last Modified by: Dheeraj.Chaudhary@contractor.hallmark.com
 * @Last Modified time: 2018-02-11 15:45:20
 */
const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Todo } = require('./../models/todos');

//Empty database before every request
beforeEach((done) => {
    Todo.remove({}).then(() => done());
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