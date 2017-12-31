'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseSchema = mongoose.Schema;
var ObjectID = mongooseSchema.ObjectID;

var responseSchema = new Schema({
    userId : String,
    description : String,
    date : String
})

var requirementSchema = new Schema({
  //id:  ObjectID,
  userId : String,
  name : String,
  bloodGroup : String,
  address : String,
  description : String,
  responses : [responseSchema]
  //,
  //responses : [responseSchema]
});



//module.exports = mongoose.model('Tasks', TaskSchema);
exports.requirementSchema = requirementSchema;
exports.responseSchema = responseSchema;