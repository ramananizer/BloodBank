const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
var Db = require('mongodb').Db;
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var updateRoutes = require('./updateRequirements');
var schemas = require('../models/todoListModel');

var requirementSchema = schemas.requirementSchema;
var responseSchema = schemas.responseSchema;

var requirement = mongoose.model('requirement', requirementSchema);
//var response = mongoose.model('response', responseSchema);
// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/mean', (err, db) => {
        if (err) return console.log(err);
        //console.log(db.db('mean'));
        closure(db.db('mean'));
    });
};

const connection_mongoose = (closure) => {
mongoose.connect('mongodb://localhost:27017/mean');
 closure(mongoose.connection.db);


}

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users', (req, res) => {
    debugger;
    console.log('you reached here');
    connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.post('/users',verifyToken, (req,res) =>{
console.log('craete users api');
   connection((db) => {
    //    jwt.verify(req.token, 'hhh', (err, authData) =>
    //    {
           
    //         if(err)
    //         {
    //             console.log(err);
    //             console.log('in error after verify');
    //             res.sendStatus(403);
    //         }
    //         else
    //         {
                console.log('not in error after verify');
                var usersCollection = db.collection('users');
                usersCollection.insert(
                    { firstName:req.body.firstName,
                        lastName :req.body.lastName,
                        userName : req.body.username,  
                        password: req.body.password,
                        bloodGroup : req.body.bloodGroup,
                        address : req.body.address
                    },
                    function(err, result){
                            if(!err){
                            console.log("User Created");
                            res.json(result);
                        } 
                    });
            }
       );
});

router.post('/requirement',verifyToken, (req,res) =>{
   connection((db) => {
       jwt.verify(req.token, 'hhh', (err, authData) =>
       {
            if(err)
            {
                console.log(err);
                console.log('in error after verify');
                res.sendStatus(403);
            }
            else
            {
                var requirementsCollection = db.collection('requirements');
                var obj = { 
                        userId : authData.user._id,
                        name:req.body.name,
                        bloodGroup : req.body.bloodGroup,
                        address : req.body.address,
                        description : req.body.description,
                        date : new Date()
                    };
                requirementsCollection.insert(
                    obj,
                    function(err, result){
                            if(!err){
                            console.log("User Created");
                            res.json(obj);
                        } 
                    });
            }
       });
       
});
});

//myRequirements
router.get('/myRequirements/:isPublic',verifyToken, (req, res) => {
   connection_mongoose((db) => {
       var x =  jwt.verify(req.token, 'hhh');
       if(x.user == undefined)
            {
                console.log(err);
                console.log('in error after verify');
                res.sendStatus(403);
            }
            else
            {
                var isPublic = req.params.isPublic;
                 //var requirementsCollection = db.collection('requirements');
                 var query = requirement.find();
                 query.sort({date : -1});
                 
                 if(isPublic == "true")
                 {
                     query.select('bloodGroup name address description date ');
                     query.where('userId').ne(x.user._id+'');
                 }
                 else
                 {
                     query.select('bloodGroup name address description date responses');
                     query.where('userId').equals(x.user._id+'');
                 }
                 query.exec(function(err, result){
                if(err)
                {
                    res.sendError('error');
                }
                else
                {
                    res.json(result);
                    mongoose.disconnect();
                }
            });
            }
       });
       
});


router.post('/authenticate',(req,res) =>{
   connection((db) => {
       console.log(req.body);
       var usersCollection = db.collection('users');
       console.log({userName : req.body.userName, password : req.body.password});
       usersCollection.findOne({userName : req.body.username, password : req.body.password},
       function(err, result){
                            // console.log('kuchh to hua');
                            if(!err){
                            //console.log("Inserted : ");
                            //console.log(result);
                            //res.json(result.userName);
                            console.log('signing in jwt');
                            console.log(result);
                            jwt.sign({user : result}, 'hhh',{expiresIn :'30000s'}, (err, token)=>
                            {
                                    res.json(token);
                            });
                        } 
                    });
});
});

updateRoutes(router);

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
}
module.exports = router;