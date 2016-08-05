var synaptic = require('synaptic');
var _ = require("lodash");
var Model = require("../db/db.js");
var ObjectId = require('mongoose').Types.ObjectId; 
var dbHelpers = require('../db/dbhelper.js');

var Brain = function() {

  var ACTIVATION_SPLIT = .5;

  var DOCTORS = [
    {id: 1, name: 'Allergology'}, 
    {id: 2, name: 'Andrology'},
    {id: 3, name: 'Anesthesia'},
    {id: 4, name: 'Angiology‎'},
    {id: 5, name: 'Aviation medicine‎'},
    {id: 6, name: 'Biomedicine‎'},
    {id: 7, name: 'Cardiology‎'},
    {id: 8, name: 'Dentistry‎'},
    {id: 9, name: 'Dentistry branches‎'},
    {id: 10, name: 'Dermatology‎'},
    {id: 11, name: 'Disaster medicine‎'},
    {id: 12, name: 'Sports physicians‎'},
    {id: 13, name: 'Emergency medicine‎'},
    {id: 14, name: 'Endocrinology‎'},
    {id: 15, name: 'Family medicine‎'},
    {id: 16, name: 'Fictional medical specialists‎'},
    {id: 17, name: 'Gastroenterology‎'},
    {id: 18, name: 'General practice‎'},
    {id: 19, name: 'Medical genetics‎'},
    {id: 20, name: 'Geriatrics‎'},
    {id: 21, name: 'Gerontology‎'},
    {id: 22, name: 'Gynaecology‎'},
    {id: 23, name: 'Hematology‎'},
    {id: 24, name: 'Hepatology‎'},
    {id: 25, name: 'Immunology‎'},
    {id: 26, name: 'Infectious diseases‎'},
    {id: 27, name: 'Intensive care medicine‎'},
    {id: 28, name: 'Internal medicine‎'},
    {id: 29, name: 'Mens health‎'},
    {id: 30, name: 'Military medicine‎'},
    {id: 31, name: 'Nephrology‎'},
    {id: 32, name: 'Neurology‎'},
    {id: 33, name: 'Nuclear medicine‎'},
    {id: 34, name: 'Obstetrics‎'},
    {id: 35, name: 'Oncology‎'},
    {id: 36, name: 'Ophthalmology‎'},
    {id: 37, name: 'Otorhinolaryngology‎'},
    {id: 38, name: 'Palliative medicine‎'},
    {id: 39, name: 'Pathology‎'},
    {id: 40, name: 'Pediatrics‎'},
    {id: 41, name: 'Podiatry‎'},
    {id: 42, name: 'Preventive medicine‎'},
    {id: 43, name: 'Prison medicine‎'},
    {id: 44, name: 'Psychiatric'},
    {id: 45, name: 'Psychiatry‎'},
    {id: 46, name: 'Pulmonology‎'},
    {id: 47, name: 'Radiology‎'},
    {id: 48, name: 'Rheumatology‎'},
    {id: 49, name: 'Serology‎'},
    {id: 50, name: 'Sexual health‎'},
    {id: 51, name: 'Sleep medicine‎'},
    {id: 52, name: 'Space medicine‎'},
    {id: 53, name: 'Sports medicine‎'},
    {id: 54, name: 'Surgery‎'},
    {id: 55, name: 'Surgical specialties‎'},
    {id: 56, name: 'Toxicology‎'},
    {id: 57, name: 'Transplantation medicine‎'},
    {id: 58, name: 'Trichology‎'},
    {id: 59, name: 'Tropical medicine‎'},
    {id: 60, name: 'Urology‎'},
    {id: 61, name: 'Wilderness medicine‎'}
  ]

var SYMPTOMS = [ 
  // Energy Level and Sleep
  {id: 1, name: 'Chronic fatigue'}, 
  {id: 2, name: 'Less stamina than others'},
  {id: 3, name: 'Long recovery period after any activity'},
  {id: 4, name: 'Inability to concentrate'},
  {id: 5, name: 'Sleep apnea'},
  {id: 6, name: 'Snoring'},
  {id: 7, name: 'Insomnia'},
  {id: 8, name: 'Need naps in the afternoon'},
  {id: 9, name: 'Weakness'},
  {id: 10, name: 'Wake feeling tired'},
  {id: 11, name: 'Frequently oversleep'},
  // Weight
  {id: 12, name: 'Weight gain'},
  {id: 13, name: 'Inability to lose weight'},
  {id: 14, name: 'Ascites (abdominal fluid accumulation)'},
  {id: 15, name: 'Metabolic Syndrome'},
  {id: 16, name: 'Weight loss'},
  {id: 17, name: 'Anorexia'},
  {id: 18, name: 'Heightened appetite'},
  {id: 19, name: 'Diminished appetite'},
  {id: 20, name: 'Obesity'},
  // Body Temperature
  {id: 21, name: 'Cold extremities'},
  {id: 22, name: 'Cold sweats'},
  {id: 23, name: 'Night sweats'},
  {id: 24, name: 'Heat intolerance'},
  {id: 25, name: 'Cold intolerance'},
  {id: 26, name: 'Internal shivering'},
  {id: 27, name: 'Hypothermia'},
  {id: 28, name: 'Cold hands'},
  {id: 29, name: 'Clammy hands'},
  {id: 30, name: 'Cold feet'},
  {id: 31, name: 'Excessive perspiration'},
  {id: 32, name: 'Little perspiration'},
  {id: 33, name: 'Low basal body temperature (below 97.8 degrees Fahrenheit)'},
  // Slowness
  {id: 34, name: 'Slow movements'},
  {id: 35, name: 'Slowed Achilles reflex'},
  {id: 36, name: 'Diminished reflexes'},
  {id: 37, name: 'Slow speech'},
  // Infections
  {id: 38, name: 'Frequent infections'},
  {id: 39, name: 'Chronic illness'},
  {id: 40, name: 'Low immune system'},
  {id: 41, name: 'Frequent colds'},
  {id: 42, name: 'Susceptibility to bronchitis'},
  {id: 43, name: 'Hard time recovering from infections'},
  {id: 44, name: 'Recurrent sinus infections'},
  {id: 45, name: 'Recurrent skin infections'},
  {id: 46, name: 'Recurrent ear infections'},
  {id: 47, name: 'Recurrent nose infections'},
  {id: 48, name: 'Recurrent throat infections'},
  {id: 49, name: 'Candida (yeast)'},
  {id: 50, name: 'Pelvic Inflammatory Disease (PID)'},
  {id: 51, name: 'Repeated urinary tract infections'},
  {id: 52, name: 'Upper respiratory tract infections'},
  // Swelling and Thickened Skin of
  {id: 53, name: 'Eyes'},
  {id: 54, name: 'Face'},
  {id: 55, name: 'Lips'},
  {id: 56, name: 'Neck'},
  {id: 57, name: 'Hands'},
  {id: 58, name: 'Arms'},
  {id: 59, name: 'Legs'},
  {id: 60, name: 'Feet'},
  {id: 61, name: 'Ankles'},
  {id: 62, name: 'Lymphedema'},
  {id: 63, name: 'Lipodema'},
  // Mouth and Throat
  {id: 64, name: 'Difficulty swallowing'},
  {id: 65, name: 'Sensation of lump in throat'},
  {id: 66, name: 'Sensation of pressure on throat'},
  {id: 67, name: 'Pain and tenderness in neck and/or thyroid area'},
  {id: 68, name: 'Difficulty taking deep breath'},
  {id: 69, name: 'Goiter'},
  {id: 70, name: 'Thyroid nodule'},
  {id: 71, name: 'Burning sensation in throat'},
  {id: 72, name: 'Sore throats'},
  {id: 73, name: 'Swollen tongue'},
  {id: 74, name: 'Choking fits'},
  {id: 75, name: 'Distorted sense of taste (Dysgeusia)'},
  {id: 76, name: 'Salt cravings'},
  {id: 77, name: 'Sweet cravings'},
  {id: 78, name: 'Speech problems'},
  {id: 79, name: 'Dry mouth'},
  {id: 80, name: 'Halitosis'},
  {id: 81, name: 'Propensity for cavities'},
  {id: 82, name: 'Propensity for gum disease'},
  {id: 83, name: 'Low, husky, hoarse voice'},
  {id: 84, name: 'Bleeding gums'},
  {id: 85, name: 'Receding gums'},
  {id: 86, name: 'Irritated gums'},
  {id: 87, name: 'Swollen gums'},
  {id: 88, name: 'Persistent teeth clenching'},
  {id: 89, name: 'TMJ'},
  // Ears
  {id: 90, name: 'Oversensitive hearing'},
  {id: 91, name: 'Noises in ears (hissing, ringing)'},
  {id: 92, name: 'Deafness'},
  {id: 93, name: 'Tinnitus'},
  {id: 94, name: 'Internal itching of ears'},
  {id: 95, name: 'Dry, scaly ear canal'},
  {id: 96, name: 'Excess earwax'},
  {id: 97, name: 'Vertigo'},
  // Eyes
  {id: 98, name: 'Poor focusing'},
  {id: 99, name: 'Double vision'},
  {id: 100, name: 'Dry eyes'},
  {id: 101, name: 'Gritty eyes'},
  {id: 102, name: 'Achy eyes'},
  {id: 103, name: 'Blurred vision'},
  {id: 104, name: 'Drooping eyelids'},
  {id: 105, name: 'Sensitive to light'},
  {id: 106, name: 'Freuqent tics in the eyes'},
  {id: 107, name: 'Spasms of the eyelids'},
  {id: 108, name: 'Bulging of the eyeballs'},
  {id: 109, name: 'Red inflamed eyes'},
  {id: 110, name: 'Dark rings under eyes'},
  {id: 111, name: 'Puffiness around the eyes'},
  {id: 112, name: 'Rapidly shifting gaze making you feel dizzy'},
  {id: 113, name: 'Problems with night vision'},
  {id: 114, name: 'Glaucoma'},
  {id: 115, name: 'Cataracts'},
  // Hair
  {id: 116, name: 'Hair loss'},
  {id: 117, name: 'Dry hair'},
  {id: 118, name: 'Frizzy hair'},
  {id: 119, name: 'Brittle hair'},
  {id: 120, name: 'Coarse hair'},
  {id: 121, name: 'Finer hair'},
  {id: 122, name: 'Oily hair'},
  {id: 123, name: 'Premature baldness'},
  {id: 124, name: 'Premature grey hair'},
  {id: 125, name: 'Change in hair texture'},
  {id: 126, name: 'Body hair loss'},
  {id: 127, name: 'Eyelash loss'},
  {id: 128, name: 'Facial hair in women'},
  {id: 129, name: 'Thinning or loss of outside third of eyebrows'},
  // Nails
  {id: 130, name: 'Brittle'},
  {id: 131, name: 'Pale'},
  {id: 132, name: 'Soft'},
  {id: 133, name: 'Yellowish'},
  {id: 134, name: 'Ridged'},
  {id: 135, name: 'Striated'},
  {id: 136, name: 'Thickened'},
  {id: 137, name: 'Ingrown toenails'},
  // Skin
  {id: 138, name: 'Dry skin'},
  {id: 139, name: 'Dry itchy scalp'},
  {id: 140, name: 'Flaky skin'},
  {id: 141, name: 'Cracked heels'},
  {id: 142, name: 'Coarse patches'},
  {id: 143, name: 'Yellowish or amber tint to their skin'},
  {id: 144, name: 'Dry mucous membranes'},
  {id: 145, name: 'Pale skin'},
  {id: 146, name: 'Boils'},
  {id: 147, name: 'Pigmentation in skin creases'},
  {id: 148, name: 'Rashes'},
  {id: 149, name: 'Skin tags'},
  {id: 150, name: 'Dermographia (wheals)'},
  {id: 151, name: 'Eczema'},
  {id: 152, name: 'Impetigo'},
  {id: 153, name: 'Cellulitis'},
  {id: 154, name: 'Easy bruising'},
  {id: 155, name: 'Tendency to form blood clots'},
  {id: 156, name: 'Slow wound healing'},
  {id: 157, name: 'Hemophilia'},
  {id: 158, name: 'Bumps on legs'},
  {id: 159, name: 'Acne'},
  {id: 160, name: 'Breakout on chest and arms'},
  {id: 161, name: 'Raynaud\'s Phenomenon (discoloration of digits)'},
  {id: 162, name: 'Chronic itching'},
  {id: 163, name: 'Varicose veins'},
  {id: 164, name: 'Premature aging'},
  {id: 165, name: 'Parchment-like fine wrinkles'},
  {id: 166, name: 'Red butterfly patch over cheeks and nose'},
  {id: 167, name: 'Absence or diminished perspiration'},
  {id: 168, name: 'Moles and warty growths'},
  {id: 169, name: 'Lichen Sclerosus'},
  {id: 170, name: 'Vitiligo'},
  {id: 171, name: 'Allergies'},
  {id: 172, name: 'Hives'},
  {id: 173, name: 'Psoriasis'},
  // Numbness and Tingling
  {id: 174, name: 'Legs'},
  {id: 175, name: 'Feet'},
  {id: 176, name: 'Arms'},
  {id: 177, name: 'Hands'},
  {id: 178, name: 'Back'},
  {id: 179, name: 'Face'},
  // Pain
  {id: 180, name: 'Migraines'},
  {id: 181, name: 'Chronic headaches'},
  {id: 182, name: 'Chronic back and loin pain'},
  {id: 183, name: 'Wrist pain'},
  {id: 184, name: 'Muscles and joint pain'},
  {id: 185, name: 'Carpal Tunnel Syndrome (hands or forearms)'},
  {id: 186, name: 'Tarsal Tunner Syndrome (legs)'},
  {id: 187, name: 'Joint stiffness'},
  {id: 188, name: 'Tendonitis'},
  {id: 189, name: 'Heel spur'},
  {id: 190, name: 'Plantar fasciitis'},
  {id: 191, name: 'Arthritis'},
  {id: 192, name: 'Gout'},
  {id: 193, name: 'Painful soles of feet'},
  {id: 194, name: 'Muscle cramps'},
  {id: 195, name: 'Aching bones'},
  {id: 196, name: 'Aching muscles'},
  {id: 197, name: 'Joint pain'},
  {id: 198, name: 'TMJ'},
  {id: 199, name: 'Fibromyalgia'},
  // Digestion
  {id: 200, name: 'Constipation'},
  {id: 201, name: 'Hemorrhoids'},
  {id: 202, name: 'Hard stools'},
  {id: 203, name: 'Loss of appetite'},
  {id: 204, name: 'Alcohol intolerance'},
  {id: 205, name: 'Irritable Bowel Syndrome'},
  {id: 206, name: 'Lactose intolerance'},
  {id: 207, name: 'Gluten Sensitivity/Intolerance'},
  {id: 208, name: 'Colitis'},
  {id: 209, name: 'Abdominal distention'},
  {id: 210, name: 'Weight gain in abdominal area'},
  {id: 211, name: 'Protruding abdomen in children'},
  {id: 212, name: 'Flatulence'},
  {id: 213, name: 'Nausea'},
  {id: 214, name: 'Ulcers'},
  {id: 215, name: 'Acid reflux'},
  {id: 216, name: 'Excessive belching'},
  // Menstrual Disorders
  {id: 217, name: 'Cessation of periods (amenorrhoea)'},
  {id: 218, name: 'Scanty (light) periods (oligomenorrhoea)'},
  {id: 219, name: 'Heavy periods (menorrhagia)'},
  {id: 220, name: 'Irregular periods'},
  {id: 221, name: 'Very short cycles'},
  {id: 222, name: 'Very long cycles'},
  {id: 223, name: 'Severe cramping'},
  {id: 224, name: 'Failure to ovulate'},
  {id: 225, name: 'Constant bleeding'},
  {id: 226, name: 'Premenstrual syndrome (PMS)'},
  {id: 227, name: 'Premenstrual tension (PMT)'},
  {id: 228, name: 'Extreme bloating and water retention'},
  {id: 229, name: 'Premature or delayed puberty'},
  {id: 230, name: 'Premature or delayed menopause'},
  // Reproductive Disorders and Pregnancy
  {id: 231, name: 'Infertility'},
  {id: 232, name: 'Miscarriage'},
  {id: 233, name: 'Still birth'},
  {id: 234, name: 'In vitro fertilization failure'},
  {id: 235, name: 'Donor egg failure'},
  {id: 236, name: 'Abnormal estrogen levels'},
  {id: 237, name: 'Abnormal progesterone levels'},
  {id: 238, name: 'Abnormal testosterone levels'},
  {id: 239, name: 'Drop in sperm count'},
  {id: 240, name: 'Erectile dysfunction'},
  {id: 241, name: 'Loss of libido'},
  {id: 242, name: 'Sexual dysfunction'},
  {id: 243, name: 'Vaginal dryness'},
  {id: 244, name: 'Painful sex'},
  {id: 245, name: 'Breasts leaking milk (but not lactating or breastfeeding)'},
  {id: 246, name: 'Maternal anemia'},
  {id: 247, name: 'Placental abruption'},
  {id: 248, name: 'Postpartum hemorrhage'},
  {id: 249, name: 'Prolonged labour'},
  {id: 250, name: 'Inability to dilate'},
  {id: 251, name: 'Difficulty breast-feeding'},
  {id: 252, name: 'Premature birth'},
  {id: 253, name: 'Low birth weight'},
  {id: 254, name: 'High birthweight'},
  {id: 255, name: 'Newborn with deficits in intellectual development'},
  {id: 256, name: 'Newborns with jaundice'},
  {id: 257, name: 'Autism'},
  {id: 258, name: 'ADD/ADHD'},
  // Emotional
  {id: 259, name: 'Irritability'},
  {id: 260, name: 'Wanting to be solitary'},
  {id: 261, name: 'Mood swings'},
  {id: 262, name: 'Anxiety'},
  {id: 263, name: 'Personality changes'},
  {id: 264, name: 'Feelings of resentment'},
  {id: 265, name: 'Jumpy'},
  {id: 266, name: 'Easily startled'},
  {id: 267, name: 'Lack of confidence'},
  // Other Related Conditions
  {id: 268, name: 'Adrenal Fatigue'},
  {id: 269, name: 'Anemia'},
  {id: 270, name: 'Hyponatremia (low blood sodium)'},
  {id: 271, name: 'Lack of coordination'},
  {id: 272, name: 'Clumsiness'},
  {id: 273, name: 'Tendency to fall'},
  {id: 274, name: 'Dizziness'},
  {id: 275, name: 'Fainting episodes'},
  {id: 276, name: 'Tremor'},
  {id: 277, name: 'Chemical sensitivities'},
  {id: 278, name: 'Restless Leg Syndrome'},
  {id: 279, name: 'Rhabdomyolysis (destruction of skeletal muscle)'},
  {id: 280, name: 'Hernia'},
  // Brain
  {id: 281, name: 'Depression'},
  {id: 282, name: 'Panic attacks'},
  {id: 283, name: 'Memory loss'},
  {id: 284, name: 'Confusion'},
  {id: 285, name: 'Brain fog'},
  {id: 286, name: 'Mental sluggishness'},
  {id: 287, name: 'Porr concentration'},
  {id: 288, name: 'Noises and/or voices in head'},
  {id: 289, name: 'Hallucinations'},
  {id: 290, name: 'Delusions'},
  {id: 291, name: 'Mania'},
  {id: 292, name: 'Phobias'},
  {id: 293, name: 'Obsessions'},
  {id: 294, name: 'Alcohol & substance abuse'},
  {id: 295, name: 'Rage'},
  {id: 296, name: 'Loss of drive'},
  {id: 297, name: 'Personality disorders'},
  {id: 298, name: 'Schizophrenia'},
  {id: 299, name: 'Postpartum Depression'},
  {id: 300, name: 'Seasonal Affective Disorder (SAD)'},
  {id: 301, name: 'Nightmares'},
  {id: 302, name: 'Bipolar'},
  {id: 303, name: 'Suicide'},
  {id: 304, name: 'ADHD'},
  {id: 305, name: 'Dementia'},
  {id: 306, name: 'Alzheimer\'s Disease'},
  {id: 307, name: 'Parkinson\'s Disease'},
  // Kidney and Bladder
  {id: 308, name: 'Albuminuria (protein in urine)'},
  {id: 309, name: 'Urinary incontinence'},
  {id: 310, name: 'Frequent need to urinate'},
  {id: 311, name: 'Decreased output of urine'},
  {id: 312, name: 'Interstitial cystitis (chronic bladder problems)'},
  {id: 313, name: 'Urinary incontinence while sleeping'},
  {id: 314, name: 'Kidney stones'},
  {id: 315, name: 'Recurrent kidney infections'},
  {id: 316, name: 'Recurrent bladder infections'},
  {id: 317, name: 'Irritable bladder syndrome'},
  {id: 318, name: 'Chronic kidney failure'},
  // Gallbladder
  {id: 319, name: 'Gallbladder Disease'},
  {id: 320, name: 'Gallstones'},
  // Liver
  {id: 321, name: 'Liver tenderness and enlargement'},
  {id: 322, name: 'Congestion of the liver'},
  {id: 323, name: 'Elevated liver enzymes'},
  // Lungs
  {id: 324, name: 'Asthma'},
  {id: 325, name: 'Bronchitis'},
  {id: 326, name: 'Emphysema'},
  {id: 327, name: 'Air hunger'},
  {id: 328, name: 'Shortness of breath'},
  {id: 329, name: 'Tightness in chest'},
  {id: 330, name: 'Pneumonia'},
  // Heart
  {id: 331, name: 'High blood pressure'},
  {id: 332, name: 'Low blood pressure'},
  {id: 333, name: 'Slow/weak pulse (under 60bpm)'},
  {id: 334, name: 'Fast pulse (over 90bpm at rest)'},
  {id: 335, name: 'Arrhythmia (irregular heartbeat)'},
  {id: 336, name: 'Skipped beats'},
  {id: 337, name: 'Chest pain'},
  {id: 338, name: 'Heart palpitations'},
  {id: 339, name: 'High cholesterol'},
  {id: 340, name: 'High triglycerides'},
  {id: 341, name: 'High LDL'},
  {id: 342, name: 'Coronary Artery Disease'},
  {id: 343, name: 'Plaque buildup'},
  {id: 344, name: 'Poor circulation'},
  {id: 345, name: 'Enlarged heart'},
  {id: 346, name: 'Stroke'},
  {id: 347, name: 'Heart attack'}
];


  var initBrain = function() {
    //declare some layers for our brain.
    var inputLayer = new synaptic.Layer(SYMPTOMS.length);
    var hiddenLayer = new synaptic.Layer (SYMPTOMS.length+DOCTORS.length);
    var outputLayer = new synaptic.Layer(DOCTORS.length);

    //the learning rate:
    var learningRate = .3;

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
    BrainTrain.train(trainingSet, {
      iterations: iter,
      log: 10
    });
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