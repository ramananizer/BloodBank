const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const jwt = require('jsonwebtoken');


// API file for interacting with MongoDB
const api = require('./src/server/api/routes/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));
console.log('here now');
// API location
app.use('/api', api);
console.log('here now -- 1');
// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});
console.log('here now --2');
//Set Port
const port = process.env.PORT || '4200';
app.set('port', port);
console.log('here now --3');
const server = http.createServer(app);
console.log('here now --4');
server.listen(port, () => console.log(`Running on localhost:${port}`));

console.log('here now --5');