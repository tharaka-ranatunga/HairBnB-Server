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

describe('Signin', function () {
    model.user.findOne = sinon.stub().returns({email:'tharaka.kamal@gmail.com', password:'sha1$cf0a2579$1$e52f3d174e1ea35ae6b291b9ae7a697cc6579b1e', first_name:'Tharaka'})

    it('should return status 200 on correct credentials', async function () {
        const request = {
            body:{
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

        await userController.signin(request,response);
        assert.equal(statusStub.calledWith(200), true);
    })

    it('should return user info on correct credentials', async function () {
        const request = {
            body:{
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

        await userController.signin(request,response);
        let firstCall = response.json.args[0][0];
        expect(firstCall).to.have.property('email');
        expect(firstCall).to.have.property('first_name');
        expect(firstCall).to.have.property('token');
    })

    it('should return status 401 on incorrect credentials', async function () {
        const request = {
            body:{
                email : 'tharaka.kamal@gmail.com',
                password : '11111'
            }
        };
        let statusStub = sinon.stub().returnsThis();
        let spyStub = sinon.spy();
        let response = {
            status:statusStub,
            json : spyStub
        };

        await userController.signin(request,response);
        assert.equal(statusStub.calledWith(401), true);
        assert.equal()
    })

    it('should return status 400 on invalid email', async function ()
    {
        model.user.findOne = sinon.stub().returns()
        const request = {
            body:{
                email : 'tharaka.kamal@gmail.com',
                password : '11111'
            }
        };
        let statusStub = sinon.stub().returnsThis();
        let spyStub = sinon.spy();
        let response = {
            status:statusStub,
            json : spyStub
        };

        await userController.signin(request,response);
        assert.equal(statusStub.calledWith(400), true);
    })

    it('should validate email address', async function ()
    {
        const request = {
            body:{
                email : 'tharaka.kamal',
                password : '11111'
            }
        };
        let statusStub = sinon.stub().returnsThis();
        let spyStub = sinon.spy();
        let response = {
            status:statusStub,
            json : spyStub
        };

        await userController.signin(request,response);
        assert.equal(statusStub.calledWith(400), true);
    })
});




// describe('check for correct user info',function () {
//     model.user.findOne = sinon.stub().returns({email:'tharaka.kamal@gmail.com', password:'sha1$cf0a2579$1$e52f3d174e1ea35ae6b291b9ae7a697cc6579b1e', first_name:'Tharaka'})
//
//     it('should return correct status', function(done){
//         chai.request(server)
//             .post('/signin')
//             .send({ email: 'tharaka.kamal@gmail.com', password: '111111' })
//             .end(function(err, res){
//                 assert.equal(res.status, 200);
//                 done();
//             });
//     })
//     it('should return json', function(done){
//         chai.request(server)
//             .post('/signin')
//             .send({ email: 'tharaka.kamal@gmail.com', password: '111111' })
//             .end(function(err, res){
//                 console.log(res.text);
//                 (res.text).should.be.json;
//                 done();
//             });
//     })
// });



// describe('signup',function () {
//     it('should have an email', async function () {
//         let respond={};
//         await userController.signin(request,respond);
//         console.log(respond);
//         // chai.assert.equal(respond.status,200);
//     })
// it('should have an email', async function () {
//     model.user.findOne = sinon.stub().returns({'yes':'one'})
//     console.log(await test());
// });
// })

