var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var SALT_FACTOR = 10;

var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	email: { type: String, required: true },
	createdAt: { type: Date, date: Date.now() }
});

userSchema.pre('save', function(next) {
	var user = this;

	if(!user.isModified('password')) {
		return next();
	};

	bcrypt.genSalt(SALT_FACTOR, function(err, salt) {

		if(err) { return next(); }
        
        bcrypt.hash(user.password, salt, function(err, hashedPassword) {
            user.password = hashedPassword;
            next();
        });
	});
});

userSchema.methods.checkPassword = function(guess, next) {
	bcrypt.compare(guess, this.password, function(err, isMatch) {
		next(err, isMatch);
	});
}

var User = mongoose.model('User', userSchema);

module.exports = User;