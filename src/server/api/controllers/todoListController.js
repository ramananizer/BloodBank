'use strict';
var connection = require('../connection/connection');

var jwt = require('jsonwebtoken');
var jwtService = require('../connection/jwtService');
const ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose');
var schemas = require('../models/todoListModel');

var requirementSchema = schemas.requirementSchema;
var responseSchema = schemas.responseSchema;
var requirement = mongoose.model('requirement', requirementSchema);


var vT = jwtService.verifyToken;
exports.updateRequirement = function(req, res)
{
   connection.connection_mongoose((db) => {
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
                // var requirementsCollection = db.collection('requirements');
                var query = requirement.findOne();
                query.where('_id').equals(ObjectID(req.body.requirementId));
               // query.select('responses');
                query.exec(function(err, doc){
                if(err)
                {
                    res.sendError('error');
                }
                else
                {
                   let updatedResponses = doc._doc.responses;
                    if(updatedResponses == undefined)
                    {
                        updatedResponses = [];
                    }
                    updatedResponses.push({
                        "userId" : authData.user._id,
                        "description" : req.body.description,
                        "date" : new Date()
                    })

                    doc.set('responses',updatedResponses);
                    //doc.responses = updatedResponses;
                    doc.save(function(err)
                    {
                        if(!err)
                        {
                            res.json(updatedResponses);
                             mongoose.disconnect();
                        }
                    });

                    //---------------------------

                    


                    //--------------
                    //res.json(result);
                   
                }
                });
                // var requirement= requirementsCollection.findOne({_id: ObjectID(req.body.requirementId)},(err, result) =>
                // {
                //     if(!err)
                //     {
                //         let responseArray  =[];
                //         if(result.responses == undefined)
                //         {
                //             result.responses = [];
                //         }
                //         result.responses.push({
                //             "userId" : authData.user._id,
                //             "description" : req.body.description
                //         })

                //  var newvalues = { $set: { responses: result.responses } };
                //   requirementsCollection.update(
                //         {_id: ObjectID(req.body.requirementId)},
                //         newvalues,
                //     function(err, result){
                //             if(!err){
                //             console.log("response updated");
                //             res.json(result);
                //         } 
                //     });
                //     }
                // });
              
            }
       });
       
})};



exports.fetchmyResponses = function(req,res)
{
    connection.connection_mongoose((db) => {
    var x =  jwt.verify(req.token, 'hhh');
    if(x.user == undefined)
        {
            console.log(err);
            console.log('in error after verify');
            res.sendStatus(403);
        }
        else
        {
            var query = requirement.find();
            query.where('_id').equals(req.body.requirementId);
            query.select('responses');
            query.exec((err,result)=>
            {
                if(err)
                {
                    res.sendError('error');
                }
                else
                {
                    var fetchedResponses = result[0]._doc.responses;
                    if(fetchedResponses != undefined)
                    {
                    var correctResponses = fetchedResponses.filter(resp => resp.userId == x.user._id);
                    res.json(correctResponses);
                    }
                    mongoose.disconnect();
                }
            })
        }

    })
}

