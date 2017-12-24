var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'), //created model loading here
  bodyParser = require('body-parser'),
  path = require('path');
  http = require('http');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb'); 

// API file for interacting with MongoDB
const api = require('./api/routes/api');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Angular DIST output folder
// app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static('dist'));

// API location
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  // res.sendFile(path.join('..\..\dist', 'index.html'));
   // res.sendFile(path.join(__dirname, 'index.html'));
    res.sendFile('index.html',{root:'dist'});
});
//var routes = require('./api/routes/todoListRoutes'); //importing route
//routes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);
console.log(__dirname);