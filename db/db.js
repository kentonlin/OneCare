var mongoose = require('mongoose');
<<<<<<< 5c2ad5db104e7dfbb75bf30b8f09632654cb13d1
var Schema = mongoose.Schema;
=======
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var SALT_WORK_FACTOR = 10;
>>>>>>> rebase app

mongoose.connect('mongodb://onecare:onecare1@ds031925.mlab.com:31925/onecare');

// USER SCHEMA

var scriptSchema = new Schema({
	name: String, // name of drug // maybe better to concat both the name and dosage for more specific lookup //
	dosage: String, // dosage ex. 30mg
	frequency: String, // number of times in day,week,etc.
	recur: String, // this refers to whether: daily,weekly, monthly
	refill: Date, // date of refill
	refillRemind: Number, //reminder for refill
	dailyRemind: Number, //reminder for doses
	User: {type: Schema.Types.ObjectId, ref: 'User'}
	// refers to a specific user
});

var userSchema = new Schema({
	username: {type: String, required: true, index: {unique: true} },
	password: {type: String, required: true },
	token: String,
	address: String,
	phone: String,
	zipCode: Number,
	scripts: [{type: Schema.Types.ObjectId, ref: 'Script'}],
	doctors: [{type: Schema.Types.ObjectId, ref: 'Doctor'}]// script models for user
});

var doctorSchema = new Schema({
	name: String,
	phone: String,
	fax: String,
	Email: String,
	specialty: String,
	address: String,
	patients: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.pre('save', function(next) {
    var user = this;

	// only hash the password if it has been modified (or is new)
	if (!user.isModified('password')) return next();

	// generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
	    if (err) return next(err);

	    // hash the password using our new salt
	    bcrypt.hash(user.password, salt, function(err, hash) {
	        if (err) return next(err);

	        // override the cleartext password with the hashed one
	        user.password = hash;
	        next();
	    });
	});

});

var symptomSchema = new Schema({
	id: Number,
	selectedSymptoms: Array
});

var Script = mongoose.model('Script', scriptSchema);
var User = mongoose.model('User', userSchema);
var Doctor = mongoose.model('Doctor', doctorSchema); 
var Symptom = mongoose.model('Symptom', symptomSchema);

module.exports = {user: User, script: Script, doctor: Doctor, symptom: Symptom};