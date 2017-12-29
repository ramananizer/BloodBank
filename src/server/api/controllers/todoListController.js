'use strict';
var connection = require('../connection/connection');
var jwt = require('jsonwebtoken');
var jwtService = require('../connection/jwtService');
const ObjectID = require('mongodb').ObjectID;
//var mongoose = require('mongoose'),
  //Task = mongoose.model('Tasks');

// exports.list_all_tasks = function(req, res) {
//   Task.find({}, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };




// exports.create_a_task = function(req, res) {
//   var new_task = new Task(req.body);
//   new_task.save(function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };


// exports.read_a_task = function(req, res) {
//   Task.findById(req.params.taskId, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };


// exports.update_a_task = function(req, res) {
//   Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };


// exports.delete_a_task = function(req, res) {


//   Task.remove({
//     _id: req.params.taskId
//   }, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json({ message: 'Task successfully deleted' });
//   });
// };

var vT = jwtService.verifyToken;
exports.updateRequirement = function(req, res)
{
   connection.connection((db) => {
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
                var requirement= requirementsCollection.findOne({_id: ObjectID(req.body.requirementId)},(err, result) =>
                {
                    if(!err)
                    {
                        let responseArray  =[];
                        if(result.responses == undefined)
                        {
                            result.responses = [];
                        }
                        result.responses.push({
                            "userId" : authData.user._id,
                            "description" : req.body.description
                        })

                 var newvalues = { $set: { responses: result.responses } };
                  requirementsCollection.update(
                        {_id: ObjectID(req.body.requirementId)},
                        newvalues,
                    function(err, result){
                            if(!err){
                            console.log("response updated");
                            res.json(result);
                        } 
                    });
                    }
                });
              
            }
       });
       
})};

