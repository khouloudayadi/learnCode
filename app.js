const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var session = require('express-session');
//var userRouter = express.Router();
var port = 3000;

// Mongoose connection with mongodb
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://admin:admin11@ds157503.mlab.com:57503/learncode')
    .then(() => { // if all is ok we will be here
      console.log('Start');
    })
    .catch(err => { // if error we will be here
        console.error('App starting error:', err.stack);
        process.exit(1);
    });


// Required application specific custom router module
var userRouter = require('./src/controller/user');
var loginRouter = require('./src/controller/login');

// Use middlewares to set view engine and post json data to the server
app.set('view engine', 'html');
app.use(express.static('views'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use('/views/register.html', userRouter);
app.use('/views/login.html', loginRouter);

// Define home route
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

// define registre
app.get('/cours', function(req, res){
    res.sendFile(__dirname + '/views/courses.html');
    });
 
              
    // Start the server
app.listen(port, function(){
    console.log('Server is running on Port: ',port);
  });


