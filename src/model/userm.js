var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

// Define collection and schema for Items
var User = new Schema({

 nom: String,
 prenom: String,
 mail: String,
 password: String
},
{
	collection: 'user'
});

//authenticate input against database
User.statics.authenticate = function (mail, password, callback) {
	User.findOne({ mail: mail })
	  .exec(function (err, user) {
		if (err) {
		  return callback(err)
		} else if (!user) {
		  var err = new Error('User not found.');
		  err.status = 401;
		  return callback(err);
		}
		bcrypt.compare(password, user.password, function (err, result) {
		  if (result === true) {
			return callback(null, user);
		  } else {
			return callback();
		  }
		})
	  });
  }
  
  //hashing a password before saving it to the database
  User.pre('save', function (next) {
	var user = this;
	bcrypt.hash(user.password, 10, function (err, hash) {
	  if (err) {
		return next(err);
	  }
	  user.password = hash;
	  next();
	})
	});
	

	var User = mongoose.model('User', User)
	module.exports = User; 
//module.exports = mongoose.model('User', User);

