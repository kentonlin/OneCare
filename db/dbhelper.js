var Model = require('./db.js');
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
  }
}

module.exports = dbFunc;