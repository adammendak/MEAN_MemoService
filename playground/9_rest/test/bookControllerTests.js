const should= require('should');
const sinon = require('sinon');

describe('BookControllerTests', ()=> {
    describe('Post' , () => {
        it('should not allow an empty title on post', () => {
            var Book = (Book) => {
                this.save = function () {};

            var req = {
                body: {
                    author : "Adam"
                }
            }

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

            var bookController = require('../controllers/bookController')(Book);
            bookController.post(req,res);

            res.status.calledWith(400).should.equal(true, 'Bad Status', res.status.args[0]);
            res.send.calledWith('Title is requires').should.equal(true);
            }
        })
    })
})