'use strict';
// const express = require('express');
// const router = express.Router();
module.exports = function(router) {
  var todoList = require('../controllers/todoListController');

  // todoList Routes
  // app.route('/tasks')
  //   .get(todoList.list_all_tasks)
  //   .post(todoList.create_a_task);


  // app.route('/tasks/:taskId')
  //   .get(todoList.read_a_task)
  //   .put(todoList.update_a_task)
  //   .delete(todoList.delete_a_task);



    /// Response
router.post('/response',verifyToken,todoList.updateRequirement);
// , (req,res) =>{
//    connection((db) => {
//        jwt.verify(req.token, 'hhh', (err, authData) =>
//        {
//             if(err)
//             {
//                 console.log(err);
//                 console.log('in error after verify');
//                 res.sendStatus(403);
//             }
//             else
//             {
//                 var requirementsCollection = db.collection('requirements');
//                 var requirement= requirementsCollection.findOne({_id: ObjectID(req.body.requirementId)},(err, result) =>
//                 {
//                     if(!err)
//                     {
//                         let responseArray  =[];
//                         if(result.responses == undefined)
//                         {
//                             result.responses = [];
//                         }
//                         result.responses.push({
//                             "description" : req.body.description
//                         })

//                  var newvalues = { $set: { responses: result.responses } };
//                   requirementsCollection.update(
//                         {_id: ObjectID(req.body.requirementId)},
//                         newvalues,
//                     function(err, result){
//                             if(!err){
//                             console.log("response updated");
//                             res.json(result);
//                         } 
//                     });
//                     }
//                 });
              
//             }
//        });
       
// });
// });

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



