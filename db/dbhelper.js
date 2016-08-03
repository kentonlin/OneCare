var accountSid = 'AC5e784cc0b718fb1573cdc572e67f4914';
var authToken = 'e222367896ed8b225294cd28b6097fd0';
var twilio = require('twilio')
var Model = require('./db.js');

var client = new twilio.RestClient(accountSid, authToken);

var dbFunc = {

	addScript: function(script, res) {
		var newScript = new Model.script(script);

		newScript.save(function(err){
			if(err) {
				console.log('error', err);
			}
			console.log("Script Added!", newScript);
			res.send(newScript);
		})
	},

	getScripts: function(scriptName, res) {
		Model.script.findOne({'name':scriptName},function (err, found) {
			if(err){
				console.log('error in fetching tasks');
			}
			console.log(found);
			res.send(found);
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
  	})
  },

  getDocs: function(target, res) {
    Model.doctor.find({}, function(err, docs) {
      console.log(docs);
      res.send(docs);
    });
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

	sendReminder: function(number, body) {
		console.log("sendReminder called");
		client.messages.create({
		    to: number,
		    from: "+16462332065",
		    body: body,
		}, function(err, message) {
				if(err){
					console.log("message not sent", err);
				}
				else{
		    	console.log("Message sent", message);
				}
		});
	}
}



module.exports = dbFunc;
