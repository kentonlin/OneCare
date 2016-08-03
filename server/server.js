var express = require('express');
var bodyParser = require('body-parser');
var dbHelpers = require('../db/dbhelper.js');
var path = require('path');
var app = express();
var brain = require('./brain.js');
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

app.get('/', function(req, res) {
  res.sendFile(path.join(rootPath + "/index.html"));
});

app.get('/fuckDan', function(req, res){
  console.log('request received at /fuckDan');
  res.send(JSON.stringify({"message": "Fuck Dan"}));
});

app.post('/api/script/add', function(req, res) {
	var newScript = req.body;
	dbHelpers.addScript(newScript, res);
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

app.post('/api/script/remind', function(req, res) {
  var number = req.body.number;
  var message = req.body.message;
  dbHelpers.sendReminder(number, message);
});

app.post('/api/symptomEntry/add', function(req, res) {
  var newSympson = req.body;
  console.log(newSympson);
  dbHelpers.addSymptom(newSympson, res);
});
