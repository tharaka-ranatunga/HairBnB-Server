/**
 * Created by tharaka_ra on 7/25/2017.
 */
const chai = require('chai');
const userController = require('../controllers/userController');
const test = require('../controllers/testing');
const sinon = require('sinon');
var model = require('../models');

const request = {
    'body':{
        'email' : 'tharaka.kamal@gmail.com',
        'password' : '111111'
    }
}

// describe('signup',function () {
//     it('should have an email', async function () {
//         let respond={};
//         await userController.signin(request,respond);
//         console.log(respond);
//         // chai.assert.equal(respond.status,200);
//     })
// })

describe('test',function () {
    it('should have an email', async function () {
        model.user.findOne = sinon.stub().returns({'yes':'one'})
        console.log(await test());
        });
    });