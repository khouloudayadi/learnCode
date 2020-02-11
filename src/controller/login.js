var mongoose = require('mongoose');
var express = require('express');
var app = express();
var loginRouter = express.Router();

// Require Item model in our routes module
var User = require('../model/userm');


// GET route for reading data
loginRouter.get('/', function (req, res, next) {
  return  res.redirect(__dirname + '/views/login.html');
});


//POST route for updating data
loginRouter.route('/conx/post').post(function (req, res, next)
     {
        if (req.body.maill && req.body.passwordl) {
          User.authenticate(req.body.maill, req.body.passwordl, function (error, user) {
            if (error || !user) {
              //req.session.userId = user._id;
              return res.redirect('http://localhost:3000/cours');
            } 
            else {
              var err = new Error('Wrong email or password.');
              err.status = 401;
              return next(err);  
            }
          });
        } else {
          var err = new Error('All fields required.');
          err.status = 400;
          return next(err);
        }
      })
      
      module.exports = loginRouter ;

      