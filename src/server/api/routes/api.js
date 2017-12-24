const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
var Db = require('mongodb').Db;
var jwt = require('jsonwebtoken');

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/mean', (err, db) => {
        if (err) return console.log(err);
        //console.log(db.db('mean'));
        closure(db.db('mean'));
    });
};

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
       console.log(req.body);
       console.log(req.token);
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
       });
       
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
                            jwt.sign({user : result}, 'hhh',{expiresIn :'3000s'}, (err, token)=>
                            {
                                    res.json(token);
                            });
                        } 
                    });
});
});

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