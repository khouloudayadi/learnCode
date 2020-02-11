var express = require('express');
var app = express();
var userRouter = express.Router();


// Require Item model in our routes module
var User = require('../model/userm');



// All other routes should redirect to the index.html
/*
app.get('/', function(req, res){
res.sendFile(__dirname + '/views/index.html');
    });
*/
 app.post('/', function (req, res) {
    res.redirect(__dirname + '/views/register.html');
        });


// Defined store route

userRouter.route('/add/post').post(function (req, res) {
var userinfo=req.body;  
var user = new User({
nom: userinfo.nom,
prenom: userinfo.prenom,
mail: userinfo.mail,
password: userinfo.password
});
       
    user.save()
    .then(user => {
    res.redirect('http://localhost:3000/cours');
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});



module.exports = userRouter;