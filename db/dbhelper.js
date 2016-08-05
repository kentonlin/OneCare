var accountSid = 'AC5e784cc0b718fb1573cdc572e67f4914';
var authToken = 'e222367896ed8b225294cd28b6097fd0';
var twilio = require('twilio')
var Model = require('./db.js');
var jwt  = require('jwt-simple');
var client = new twilio.RestClient(accountSid, authToken);
var cron = require('cron');
var cronJob = cron.CronJob;
var ObjectId = require('mongoose').Types.ObjectId;

var dbFunc = {

	addScript: function(script, res, next) {
		/*
			Script Format
			{
				"name": 'bactrim',
				"dosage": '1 tablet',
				"refill": '08-17-2016',
				"frequency": '2x per day',
				"username": 'harish'
		}
		*/
		var message = "Time to take your " + script.name + ' (' + script.dosage + ')!';
		//hard-coded time right now...need to change time to be based on frequency
		var time = '36 19 * * *'
		var newScript = new Model.script(script);
		newScript.save(function(err){
			if(err) {
				console.log('error', err);
			}

			Model.user.update({"username": script.username}, {$push:{"scripts": newScript}},
			function(err){
				if(err){
					res.send(new Error("script not added to user document"));
				}
				// res.status(200).send("script added to user model");

				//call set reminder function
				this.setReminder(script.username, message, time, next);

			}.bind(this));
		}.bind(this));

	},


	getScripts: function(username, res) {
		Model.user.findOne({'username': username}).populate('scripts').exec(function (err, found) {
			if(err){
				console.log('error in fetching tasks', err);
			}
			console.log('these are the found scripts for harish', found.scripts)
			res.send(found.scripts);
		});
	},

  addDoc: function(data, res) {
  	var newDoc = new Model.doctor(data);
  	newDoc.save(function(err) {
  		if (err) {
  			console.log(err);
  		}
  		console.log("Doctor added!");
  		res.send(newDoc);
  	});
  },

  getDocs: function(target, res) {
    Model.doctor.find({}, function(err, docs) {
      console.log(docs);
      res.send(docs);
    });
  },

	/* AUTHENTICATION FUNCTIONS */

	signup: function(newUser, res, next) {
		Model.user.findOne({"username": newUser.username}, function(err, user){
			if(err) {
				console.log("Error: ", error);
			}
			if(!user) {
				var user = new Model.user(newUser);
				user.save(function(err){
					if(err) {
						console.log("new user not saved", err);
					}
				console.log("new user saved");
				var token = jwt.encode(user, 'secret'); //create new token
	      res.json({"token": token, "user": {"id": user._id, "username": user.username}}); //send new token and user object
			});

			}
			else {
				next(new Error("user already exists"));
			}
		});
	},

	signin: function(reqUser, res, next){
		var userPassword = reqUser.password;
		Model.user.findOne({"username": reqUser.username}, function(err, user){

			if(err){
				console.log("err was hit"); //if error in query
				next("Error: ", err);
			}
			if(!user){ //if user not found
				next(new Error("username does not exist"));
			}
			else{ //if user found

				console.log("*** this is the user", user);
				user.comparePassword(reqUser.password, function(err, isMatch){
					if(err) {
						console.log("error occurred", err);
						next(new Error("EREROER",  err));
					}
					if(!isMatch){
						next(new Error("Incorrect password")); //will send an error if incorrect password
					}
					else{
						console.log("password correct!");
						var token = jwt.encode(user, 'secret'); //create new token
						console.log('this is token',token);
						var resultData = {"token": token, "user": {"id": user._id, "username": user.username}}
						console.log('to be sent', resultData);
						console.log(res);
						// res.send({"token": token, "user": {"id": user._id, "username": user.username}});
						// next(JSON.stringify({"token": token, "user": {"id": user._id, "username": user.username}}));
	          res.status(201).send(resultData); //send new token and user object
					}
				});
			}
		});
	},

	checkAuth: function(req, res, next){
		var token = req.headers['x-access-token'];
	  if (!token) {
	    next(new Error('No token'));
	  }
	  else {
	    var user = jwt.decode(token, 'secret');
	    console.log("Decoded user:", user);
	    Model.user.find(user, function(err, user){
	    	if(err){
	    		next("Error: ", error);
	    	}
	    	if(!user.length){ //user not found
	    		res.status(401).send();
	    	}
	    	else{ //token decoded and user found in database
	    		console.log("user authenticated");
	    		res.status(200).send();
	    	}
	    });
	  }
	},

	addSymptom: function(data, res) {
		var newSymptom = new Model.symptom(data);
			newSymptom.save(function(err) {
				if (err) {
					console.log(err);
				}
				console.log('New sympson added!');
				res.send(newSymptom);
			});
	},

	setReminder: function(username, message, time, next) {
		console.log("sendReminder called for", username, "with the message:", message);
		// look up user object and find their phone number
				Model.user.findOne({"username": username}, function(err, user){
					if(err){
						next(new Error(err));
					}
					phoneNum = "+" + user.phone;
					console.log("Number on file", phoneNum);
				//set cron job for script reminder
				var textJob = new cronJob(time, function(){ // Time format for cronJob: '03 19 * * *'
				  client.sendMessage( {
						to: phoneNum,
						from:"+16462332065",
						body: message,
					}, function( err, data ) {
						if(err){
							console.log("CronJob not set: ", err);
						}
						next("Message sent.");
					});
				},  null, true);
				next("Reminder successfully set");
	})
},

	saveBrain: function(brainState, trainingData, name) {
		var success = Model.brain.findOneAndUpdate({"_id": ObjectId("57a3a316dcba0f71400f021a")}, {
			$set: {
				brainState: brainState,
		  	trainingInputs: trainingData,
			  name: name
			}
		})
		.then(function(res) {
			console.log("Brain ", name, " updated! ");
		})
		.catch(function(err) {
			console.error("dun goofed!  ", err);
		});
	}
};



module.exports = dbFunc;
