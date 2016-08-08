var synaptic = require('synaptic');
var _ = require("lodash");
var Model = require("../db/db.js");
var ObjectId = require('mongoose').Types.ObjectId; 
var dbHelpers = require('../db/dbhelper.js');

var Brain = function() {

  var ACTIVATION_SPLIT = .005;

  var DOCTORS = [
    {id: 1, name: 'Allergology'}, 
    {id: 2, name: 'Andrology'},
    {id: 3, name: 'Anesthesia'},
    {id: 4, name: 'Angiology‎'},
    {id: 5, name: 'Cardiology‎'},
    {id: 6, name: 'Dentistry‎'},
    {id: 7, name: 'Dermatology‎'},
    {id: 8, name: 'Emergency medicine‎'},
    {id: 9, name: 'Endocrinology‎'},
    {id: 10, name: 'Family medicine‎'},
    {id: 11, name: 'Gastroenterology‎'},
    {id: 12, name: 'General practice‎'},
    {id: 13, name: 'Geriatrics‎'},
    {id: 14, name: 'Gynaecology‎'},
    {id: 15, name: 'Hematology‎'},
    {id: 16, name: 'Hepatology‎'},
    {id: 17, name: 'Immunology‎'},
    {id: 18, name: 'Internal medicine‎'},
    {id: 19, name: 'Nephrology‎'},
    {id: 20, name: 'Neurology‎'},
    {id: 21, name: 'Obstetrics‎'},
    {id: 22, name: 'Oncology‎'},
    {id: 23, name: 'Ophthalmology‎'},
    {id: 24, name: 'Ear, nose, and Throat'},
    {id: 25, name: 'Palliative medicine‎'},
    {id: 26, name: 'Pediatrics‎'},
    {id: 27, name: 'Podiatry‎'},
    {id: 28, name: 'Psychiatric'},
    {id: 29, name: 'Pulmonology‎'},
    {id: 30, name: 'Radiology‎'},
    {id: 31, name: 'Rheumatology‎'},
    {id: 32, name: 'Sleep medicine‎'},
    {id: 33, name: 'Surgery‎'},
    {id: 34, name: 'Toxicology‎'},
    {id: 35, name: 'Urology‎'}
  ]

var SYMPTOMS = [
  {id: 1, name: 'Dizziness'},
  {id: 2, name: 'Faintness'},
  {id: 3, name: 'Headaches'},
  {id: 4, name: 'Bags/dark circles around eyes'},
  {id: 5, name: 'Blurred/tunnel vision'},
  {id: 6, name: 'Swollen, reddened, sticky eyelids'},
  {id: 7, name: 'Watery/itchy eyes'},
  {id: 8, name: 'Drainage from ear'},
  {id: 9, name: 'Earaches, ear infections'},
  {id: 10, name: 'Itchy ears'},
  {id: 11, name: 'Excessive mucus'},
  {id: 12, name: 'Hay fever'},
  {id: 13, name: 'Sinus problems'},
  {id: 14, name: 'Sneezing attacks'},
  {id: 15, name: 'Stuffy nose'},
  {id: 16, name: 'Canker sores'},
  {id: 17, name: 'Chronic coughing'},
  {id: 18, name: 'Frequent need to clear throat'},
  {id: 19, name: 'Sore throat, hoarseness'},
  {id: 20, name: 'Swollen/discolored tongue, gums, lips'},
  {id: 21, name: 'Acne'},
  {id: 22, name: 'Excessive sweating'},
  {id: 23, name: 'Flushing'},
  {id: 24, name: 'Hair loss'},
  {id: 25, name: 'Hives, rashes, dry skin'},
  {id: 26, name: 'Asthma'},
  {id: 27, name: 'Bronchitis'},
  {id: 28, name: 'Chest congestion'},
  {id: 29, name: 'Difficulty breathing'},
  {id: 30, name: 'Shortness of breath'},
  {id: 31, name: 'Joints/Muscle'},
  {id: 32, name: 'Stiffness/limitation of movement'},
  {id: 33, name: 'Feeling of weakness'},
  {id: 34, name: 'Pain/aches in joints'},
  {id: 35, name: 'Pain/aches in muscles'},
  {id: 36, name: 'Apathy, lethargy'},
  {id: 37, name: 'Fatigue, sluggishness'},
  {id: 38, name: 'Hyperactivity'},
  {id: 39, name: 'Restlessness'},
  {id: 40, name: 'Insomnia'},
  {id: 41, name: 'Confusion'},
  {id: 42, name: 'Difficulty making decisions'},
  {id: 43, name: 'Learning disabilities'},
  {id: 44, name: 'Poor concentration'},
  {id: 45, name: 'Poor memory'},
  {id: 46, name: 'Poor physical coordination'},
  {id: 47, name: 'Slurred speech'},
  {id: 48, name: 'Stuttering/stammering'},
  {id: 49, name: 'Anxiety, fear, nervousness'},
  {id: 50, name: 'Depression'},
  {id: 51, name: 'Mood swings'},
  {id: 52, name: 'Lack of Energy/Activity'},
  {id: 53, name: 'Binge eating/drinking'},
  {id: 54, name: 'Craving certain foods'},
  {id: 55, name: 'Excessive weight'},
  {id: 56, name: 'Underweight'},
  {id: 57, name: 'Water retention'},
  {id: 58, name: 'Belching, passing gas'},
  {id: 59, name: 'Bloating'},
  {id: 60, name: 'Constipation'},
  {id: 61, name: 'Diarrhea'},
  {id: 62, name: 'Heartburn'},
  {id: 63, name: 'Intestinal/stomach pain'},
  {id: 64, name: 'Nausea, vomiting'},
  {id: 65, name: 'Genital itch/discharge'},
  {id: 66, name: 'Hot flashes/night sweats'},
  {id: 67, name: 'Loss of libido'},
  {id: 68, name: 'Painful menstrual cycle'},
  {id: 69, name: 'Premenstrual syndrome'},
  {id: 70, name: 'Short/long menstruation'},
  {id: 71, name: 'Early onset of menopause'},
  {id: 72, name: 'Fertility issues'},
  {id: 73, name: 'Difficulty starting/stopping urination'},
  {id: 74, name: 'Difficulty getting/maintaining erection'},
  {id: 75, name: 'Loss of libido'},
  {id: 76, name: 'Fertility issues'},
  {id: 77, name: 'Chest pain'},
  {id: 78, name: 'Frequent illness'},
  {id: 79, name: 'Frequent/urgent urination'},
  {id: 80, name: 'Irregular/skipped heartbeat'},
  {id: 81, name: 'Rapid/pounding heartbeat'},
  {id: 82, name: 'Numbness/tingling in hands'}
]


  var initBrain = function() {
    //declare some layers for our brain.
    var inputLayer = new synaptic.Layer(SYMPTOMS.length);
    var hiddenLayer = new synaptic.Layer (SYMPTOMS.length+DOCTORS.length);
    var outputLayer = new synaptic.Layer(DOCTORS.length);

    //the learning rate:
    var learningRate = .05;

    //project all the layers onto each other ("wire up" our brain.)
    inputLayer.project(hiddenLayer);
    hiddenLayer.project(outputLayer);

    //Let's make a brain!!!
    var newBrain = new synaptic.Network({
      input: inputLayer,
      hidden: [hiddenLayer],
      output: outputLayer
    });
    return newBrain;
  }

  var OneCareNeural;
  var trainingSet = [];

  var loadBrain = function() {
    var data = Model.brain.findOne({
        "_id": ObjectId("57a3a316dcba0f71400f021a")
    })
    .then(function(brain) {
      console.log("Brain is loading.  Standby...");
      var loaded = synaptic.Network.fromJSON(JSON.parse(brain.brainState));
      console.log("Brain loaded successfully:  ", brain.name );
      trainingSet = JSON.parse(brain.trainingInputs);
      console.log("Training set length:  ", trainingSet.length);
      OneCareNeural = loaded;
      BrainTrain = new synaptic.Trainer(OneCareNeural);
    })
    .catch(function(err) {
      console.log("Brain load failed.  Initializing new brain. ", err);
      OneCareNeural = initBrain();
    })
  }

  loadBrain();

  //let's give our brain a trainer.  
  var BrainTrain = new synaptic.Trainer(OneCareNeural);

  //function that takes an array of symptom objects and returns an array
  //that is a well-formed input for the 'brain'
  var makeIO = function(symptomObjs) {
    var hotInputs = symptomObjs.map((symptomObj) => {
      return symptomObj.id;
    });

      var results = SYMPTOMS.map((symptom) => {
      if (_.includes(hotInputs, symptom.id)) {
        return 1;
      } else {
        return 0;
      }
    });
    return results;
  }

  //factory for producing training objects for our network:
  var makeTrainingObj = function(input, targetOutput) {
    return {
      input: makeIO(input),
      output: makeIO(targetOutput)
    }
  }

  var interpretOutput = function(output) {
    return output.map(function(bit, index) {
      if (bit > ACTIVATION_SPLIT) {
        return [bit, DOCTORS[index]];
      } else {return bit;}
    })
    .filter(function(bit) {
      if (bit <= ACTIVATION_SPLIT) {
        return false;
      } else {return true;}
    })
    .sort(function(a, b) {
      return a[0]-b[0];
    })
    .map(function(entry) {
      return entry[1];
    })
  }

  var trainMyBrain = function(iter) {
    if (trainingSet.length > 50) {
      BrainTrain.train(trainingSet, {
        iterations: iter,
        log: 10
      });
    } else {
      console.log("Training length below threshold.  Skipping training...");
    }
  }

  var addTrainingPair = function(pair) {
    //validate input.
    if (!pair || pair.length !== 2) {
      console.error("please enter a valid training pair.");
      return null;
    } else { //push to the module variables.
      trainingSet.push(makeTrainingObj(pair[0], pair[1]));
    }
    return pair;
  }

  var activateMyBrain = function(input) {
    return interpretOutput(OneCareNeural.activate(makeIO(input)));
  }

  var saveBrain = function(name) {
    console.log("Saving.  Training set length:  ", trainingSet.length);
    dbHelpers.saveBrain(JSON.stringify(OneCareNeural.toJSON()), JSON.stringify(trainingSet), name);
  }

  var resetBrain = function() {
    console.log("Deleting everything!")
    trainingSet = [];
    OneCareNeural = initBrain();
    saveBrain("MainBrain");
  }

  return {
    network: OneCareNeural,
    trainer: BrainTrain,
    addTrainingPair: addTrainingPair,
    train: trainMyBrain, 
    activate: activateMyBrain,
    save: saveBrain,
    delete: resetBrain
  }
};

exports.OCBrain = Brain();
