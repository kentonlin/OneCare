var express = require('express');
var bodyParser = require('body-parser');
var dbHelpers = require('../db/dbhelper.js');
var path = require('path');
var app = express();
// var brain = require('./brain.js');
var twilio = require('twilio');

app.use(express.static('public'));

var rootPath = path.normalize(__dirname + '/../client');
// app.use(express.static(__dirname + "/client"));
app.use("/node_modules",express.static(__dirname + "/../node_modules"));
app.use("/styles", express.static(rootPath + "/styles"));
app.use("/public", express.static(rootPath + '/public'));
app.use("/server", express.static(__dirname + "/../server"));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(process.env.PORT || 3000, function(){
  console.log('Server is running');
});


app.get('*', function(req, res) {
  res.sendFile(path.join(rootPath + "/index.html"));
});

app.get('/fuckDan', function(req, res){
  console.log('request received at /fuckDan');
  res.send(JSON.stringify({"message": "Fuck Dan"}));
});

app.post('/api/reminder/add', function(req, res, next) {
  console.log('request received at addScriptReminder with', req.body);
	var newScript = req.body;
	dbHelpers.addScript(newScript, res, next);
});

app.post('/api/reminder/delete', function(req, res, next){
  console.log("request received at deleteReminder with", req.body);
  var reminderID = req.body.reminderID;
  dbHelpers.deleteReminder(reminderID, next)
});

app.post('/api/script/find', function(req, res) {
	var findScript = req.body;
	dbHelpers.getScripts( findScript, res);
});

app.post('/api/doctor/add', function(req, res) {
  var newDoc = req.body;
  dbHelpers.addDoc(newDoc, res);
});

app.get('/api/doctor/find', function(req, res) {
  var targetDocs = req.body;
  dbHelpers.getDocs(targetDocs, res);
});

// USER SIGNUP SIGNIN

app.post('/api/signup', function(req, res, next) {
  var userSignup = req.body;
  dbHelpers.signup(userSignup, res, next);
});

app.post('/api/signin', function(req, res, next) {
  var userSignin = req.body;
  console.log('usersignin server', userSignin);
  dbHelpers.signin(userSignin, res, next);
});

app.post('/api/script/remind', function(req, res, next) {
  console.log("request received at setReminder route");
  var username = req.body.username;
  var message = req.body.message;
  //phone will not be a parameter in final version, we'll look it up based on the username
  var phone = req.body.phone;
  var time = req.body.time;
  dbHelpers.setReminder(username, message, phone, time, next);
})

app.post('/api/symptomEntry/add', function(req, res) {
  var newSympson = req.body;
  console.log(newSympson);
  dbHelpers.addSymptom(newSympson, res);
});

app.post('/api/brain/recommend', function(req, res) {
  var symptoms = req.body;
  console.log("The brain shall now ponder: ", symptoms);
  var data = brain.OCBrain.activate(symptoms);
  console.log("The brain has decided to recommend: ", data);
  res.send(data);
});

app.get('/api/brain/save', function(req, res) {
  brain.OCBrain.save("MainBrain");
  res.send("huehuehue");
});

app.post('/api/brain/add', function(req, res) {
  var pair = req.body.pair;
  res.send(brain.OCBrain.addTrainingPair(pair))
  brain.OCBrain.train(10);
  brain.OCBrain.save("MainBrain");
})
