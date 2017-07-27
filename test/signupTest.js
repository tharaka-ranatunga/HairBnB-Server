/**
 * Created by tharaka_ra on 7/25/2017.
 */
const chai = require('chai');
const userController = require('../controllers/userController');
const test = require('../controllers/testing');
const sinon = require('sinon');
const model = require('../models');
const server = require('../app');
const chaiHttp = require('chai-http');
const should = chai.should();
const assert = chai.assert;
const expect = chai.expect;


chai.use(chaiHttp);

describe('Signup', function () {
    model.user.findOrCreate = sinon.stub().returns([{user:{email:'tharaka.kamal@gmail.com'}},true]);
    it('should avoid registering same email address', async function ()
    {
        model.user.findOrCreate = sinon.stub().returns([{user:{email:'tharaka.kamal@gmail.com'}},false]);
        const request = {
            body:{
                first : 'Tharaka',
                last : 'Ranatunga',
                email : 'tharaka.kamal@gmail.co',
                password : 'Aa111111'
            }
        };
        let statusStub = sinon.stub().returnsThis();
        let spyStub = sinon.spy();
        let response = {
            status:statusStub,
            json : spyStub
        };

        await userController.signup(request,response);
        assert.equal(statusStub.calledWith(409), true);
    });
    it('should validate email address', async function ()
    {
        const request = {
            body:{
                first : 'Tharaka',
                last : 'Ranatunga',
                email : 'tharaka.kamal',
                password : '111111'
            }
        };
        let statusStub = sinon.stub().returnsThis();
        let spyStub = sinon.spy();
        let response = {
            status:statusStub,
            json : spyStub
        };

        await userController.signup(request,response);
        assert.equal(statusStub.calledWith(400), true);
    });
    it('should validate password', async function ()
    {
        const request = {
            body:{
                first : 'Tharaka',
                last : 'Ranatunga',
                email : 'tharaka.kamal@gmail.com',
                password : '111111'
            }
        };
        let statusStub = sinon.stub().returnsThis();
        let spyStub = sinon.spy();
        let response = {
            status:statusStub,
            json : spyStub
        };

        await userController.signup(request,response);
        assert.equal(statusStub.calledWith(400), true);
    });
    it('should return status 200 on success', async function ()
            {
        model.user.findOrCreate = sinon.stub().returns([{user:{email:'tharaka.kamal@gmail.com'}},true]);
        const request = {
            body:{
                first : 'Tharaka',
                last : 'Ranatunga',
                email : 'tharaka.kamal@gmail.com',
                password : 'aA111111'
            }
        };
        let statusStub = sinon.stub().returnsThis();
        let spyStub = sinon.spy();
        let response = {
            status:statusStub,
            json : spyStub
        };

        await userController.signup(request,response);
        assert.equal(statusStub.calledWith(200), true);
    });
});