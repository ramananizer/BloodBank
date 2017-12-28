const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
var Db = require('mongodb').Db;
var jwt = require('jsonwebtoken');

// Connect
exports.connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/mean', (err, db) => {
        if (err) return console.log(err);
        //console.log(db.db('mean'));
        closure(db.db('mean'));
    });
};