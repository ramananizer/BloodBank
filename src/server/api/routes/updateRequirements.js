'use strict';
var jwtService = require('../connection/jwtService');
// const express = require('express');
// const router = express.Router();
module.exports = function(router) {
  var todoList = require('../controllers/todoListController');


    /// Response
router.post('/response',verifyToken,todoList.updateRequirement);
router.post('/fetchResponse',jwtService.verifyToken,todoList.fetchmyResponses);
};



function verifyToken(req, res, next)
{
    console.log('in verify token');
    const bearerHeader = req.headers['authorization'];
    console.log('header is' + bearerHeader);
    console.log('type of bearerHeader is ' + typeof bearerHeader);
    if(typeof bearerHeader != undefined)
    {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        console.log('token extracted is ' + bearerToken);
        req.token = bearerToken;
        next();
    }else
    {
        res.sendStatus(403);
    }
};



