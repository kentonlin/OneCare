import React, { Component } from 'react';
import FilteredMultiSelect from 'react-filtered-multiselect';
import $ from 'jquery';
import Navigate from './navigate.jsx';
import Modal from 'react-modal';
import SymptomEntryModal from './symptomEntryModal.jsx';




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
// [
//   // Energy Level and Sleep
//   {id: 1, name: 'Chronic fatigue'},
//   {id: 2, name: 'Less stamina than others'},
//   {id: 3, name: 'Long recovery period after any activity'},
//   {id: 4, name: 'Inability to concentrate'},
//   {id: 5, name: 'Sleep apnea'},
//   {id: 6, name: 'Snoring'},
//   {id: 7, name: 'Insomnia'},
//   {id: 8, name: 'Need naps in the afternoon'},
//   {id: 9, name: 'Weakness'},
//   {id: 10, name: 'Wake feeling tired'},
//   {id: 11, name: 'Frequently oversleep'},
//   // Weight
//   {id: 12, name: 'Weight gain'},
//   {id: 13, name: 'Inability to lose weight'},
//   {id: 14, name: 'Ascites (abdominal fluid accumulation)'},
//   {id: 15, name: 'Metabolic Syndrome'},
//   {id: 16, name: 'Weight loss'},
//   {id: 17, name: 'Anorexia'},
//   {id: 18, name: 'Heightened appetite'},
//   {id: 19, name: 'Diminished appetite'},
//   {id: 20, name: 'Obesity'},
//   // Body Temperature
//   {id: 21, name: 'Cold extremities'},
//   {id: 22, name: 'Cold sweats'},
//   {id: 23, name: 'Night sweats'},
//   {id: 24, name: 'Heat intolerance'},
//   {id: 25, name: 'Cold intolerance'},
//   {id: 26, name: 'Internal shivering'},
//   {id: 27, name: 'Hypothermia'},
//   {id: 28, name: 'Cold hands'},
//   {id: 29, name: 'Clammy hands'},
//   {id: 30, name: 'Cold feet'},
//   {id: 31, name: 'Excessive perspiration'},
//   {id: 32, name: 'Little perspiration'},
//   {id: 33, name: 'Low basal body temperature (below 97.8 degrees Fahrenheit)'},
//   // Slowness
//   {id: 34, name: 'Slow movements'},
//   {id: 35, name: 'Slowed Achilles reflex'},
//   {id: 36, name: 'Diminished reflexes'},
//   {id: 37, name: 'Slow speech'},
//   // Infections
//   {id: 38, name: 'Frequent infections'},
//   {id: 39, name: 'Chronic illness'},
//   {id: 40, name: 'Low immune system'},
//   {id: 41, name: 'Frequent colds'},
//   {id: 42, name: 'Susceptibility to bronchitis'},
//   {id: 43, name: 'Hard time recovering from infections'},
//   {id: 44, name: 'Recurrent sinus infections'},
//   {id: 45, name: 'Recurrent skin infections'},
//   {id: 46, name: 'Recurrent ear infections'},
//   {id: 47, name: 'Recurrent nose infections'},
//   {id: 48, name: 'Recurrent throat infections'},
//   {id: 49, name: 'Candida (yeast)'},
//   {id: 50, name: 'Pelvic Inflammatory Disease (PID)'},
//   {id: 51, name: 'Repeated urinary tract infections'},
//   {id: 52, name: 'Upper respiratory tract infections'},
//   // Swelling and Thickened Skin of
//   {id: 53, name: 'Eyes'},
//   {id: 54, name: 'Face'},
//   {id: 55, name: 'Lips'},
//   {id: 56, name: 'Neck'},
//   {id: 57, name: 'Hands'},
//   {id: 58, name: 'Arms'},
//   {id: 59, name: 'Legs'},
//   {id: 60, name: 'Feet'},
//   {id: 61, name: 'Ankles'},
//   {id: 62, name: 'Lymphedema'},
//   {id: 63, name: 'Lipodema'},
//   // Mouth and Throat
//   {id: 64, name: 'Difficulty swallowing'},
//   {id: 65, name: 'Sensation of lump in throat'},
//   {id: 66, name: 'Sensation of pressure on throat'},
//   {id: 67, name: 'Pain and tenderness in neck and/or thyroid area'},
//   {id: 68, name: 'Difficulty taking deep breath'},
//   {id: 69, name: 'Goiter'},
//   {id: 70, name: 'Thyroid nodule'},
//   {id: 71, name: 'Burning sensation in throat'},
//   {id: 72, name: 'Sore throats'},
//   {id: 73, name: 'Swollen tongue'},
//   {id: 74, name: 'Choking fits'},
//   {id: 75, name: 'Distorted sense of taste (Dysgeusia)'},
//   {id: 76, name: 'Salt cravings'},
//   {id: 77, name: 'Sweet cravings'},
//   {id: 78, name: 'Speech problems'},
//   {id: 79, name: 'Dry mouth'},
//   {id: 80, name: 'Halitosis'},
//   {id: 81, name: 'Propensity for cavities'},
//   {id: 82, name: 'Propensity for gum disease'},
//   {id: 83, name: 'Low, husky, hoarse voice'},
//   {id: 84, name: 'Bleeding gums'},
//   {id: 85, name: 'Receding gums'},
//   {id: 86, name: 'Irritated gums'},
//   {id: 87, name: 'Swollen gums'},
//   {id: 88, name: 'Persistent teeth clenching'},
//   {id: 89, name: 'TMJ'},
//   // Ears
//   {id: 90, name: 'Oversensitive hearing'},
//   {id: 91, name: 'Noises in ears (hissing, ringing)'},
//   {id: 92, name: 'Deafness'},
//   {id: 93, name: 'Tinnitus'},
//   {id: 94, name: 'Internal itching of ears'},
//   {id: 95, name: 'Dry, scaly ear canal'},
//   {id: 96, name: 'Excess earwax'},
//   {id: 97, name: 'Vertigo'},
//   // Eyes
//   {id: 98, name: 'Poor focusing'},
//   {id: 99, name: 'Double vision'},
//   {id: 100, name: 'Dry eyes'},
//   {id: 101, name: 'Gritty eyes'},
//   {id: 102, name: 'Achy eyes'},
//   {id: 103, name: 'Blurred vision'},
//   {id: 104, name: 'Drooping eyelids'},
//   {id: 105, name: 'Sensitive to light'},
//   {id: 106, name: 'Freuqent tics in the eyes'},
//   {id: 107, name: 'Spasms of the eyelids'},
//   {id: 108, name: 'Bulging of the eyeballs'},
//   {id: 109, name: 'Red inflamed eyes'},
//   {id: 110, name: 'Dark rings under eyes'},
//   {id: 111, name: 'Puffiness around the eyes'},
//   {id: 112, name: 'Rapidly shifting gaze making you feel dizzy'},
//   {id: 113, name: 'Problems with night vision'},
//   {id: 114, name: 'Glaucoma'},
//   {id: 115, name: 'Cataracts'},
//   // Hair
//   {id: 116, name: 'Hair loss'},
//   {id: 117, name: 'Dry hair'},
//   {id: 118, name: 'Frizzy hair'},
//   {id: 119, name: 'Brittle hair'},
//   {id: 120, name: 'Coarse hair'},
//   {id: 121, name: 'Finer hair'},
//   {id: 122, name: 'Oily hair'},
//   {id: 123, name: 'Premature baldness'},
//   {id: 124, name: 'Premature grey hair'},
//   {id: 125, name: 'Change in hair texture'},
//   {id: 126, name: 'Body hair loss'},
//   {id: 127, name: 'Eyelash loss'},
//   {id: 128, name: 'Facial hair in women'},
//   {id: 129, name: 'Thinning or loss of outside third of eyebrows'},
//   // Nails
//   {id: 130, name: 'Brittle'},
//   {id: 131, name: 'Pale'},
//   {id: 132, name: 'Soft'},
//   {id: 133, name: 'Yellowish'},
//   {id: 134, name: 'Ridged'},
//   {id: 135, name: 'Striated'},
//   {id: 136, name: 'Thickened'},
//   {id: 137, name: 'Ingrown toenails'},
//   // Skin
//   {id: 138, name: 'Dry skin'},
//   {id: 139, name: 'Dry itchy scalp'},
//   {id: 140, name: 'Flaky skin'},
//   {id: 141, name: 'Cracked heels'},
//   {id: 142, name: 'Coarse patches'},
//   {id: 143, name: 'Yellowish or amber tint to their skin'},
//   {id: 144, name: 'Dry mucous membranes'},
//   {id: 145, name: 'Pale skin'},
//   {id: 146, name: 'Boils'},
//   {id: 147, name: 'Pigmentation in skin creases'},
//   {id: 148, name: 'Rashes'},
//   {id: 149, name: 'Skin tags'},
//   {id: 150, name: 'Dermographia (wheals)'},
//   {id: 151, name: 'Eczema'},
//   {id: 152, name: 'Impetigo'},
//   {id: 153, name: 'Cellulitis'},
//   {id: 154, name: 'Easy bruising'},
//   {id: 155, name: 'Tendency to form blood clots'},
//   {id: 156, name: 'Slow wound healing'},
//   {id: 157, name: 'Hemophilia'},
//   {id: 158, name: 'Bumps on legs'},
//   {id: 159, name: 'Acne'},
//   {id: 160, name: 'Breakout on chest and arms'},
//   {id: 161, name: 'Raynaud\'s Phenomenon (discoloration of digits)'},
//   {id: 162, name: 'Chronic itching'},
//   {id: 163, name: 'Varicose veins'},
//   {id: 164, name: 'Premature aging'},
//   {id: 165, name: 'Parchment-like fine wrinkles'},
//   {id: 166, name: 'Red butterfly patch over cheeks and nose'},
//   {id: 167, name: 'Absence or diminished perspiration'},
//   {id: 168, name: 'Moles and warty growths'},
//   {id: 169, name: 'Lichen Sclerosus'},
//   {id: 170, name: 'Vitiligo'},
//   {id: 171, name: 'Allergies'},
//   {id: 172, name: 'Hives'},
//   {id: 173, name: 'Psoriasis'},
//   // Numbness and Tingling
//   {id: 174, name: 'Legs'},
//   {id: 175, name: 'Feet'},
//   {id: 176, name: 'Arms'},
//   {id: 177, name: 'Hands'},
//   {id: 178, name: 'Back'},
//   {id: 179, name: 'Face'},
//   // Pain
//   {id: 180, name: 'Migraines'},
//   {id: 181, name: 'Chronic headaches'},
//   {id: 182, name: 'Chronic back and loin pain'},
//   {id: 183, name: 'Wrist pain'},
//   {id: 184, name: 'Muscles and joint pain'},
//   {id: 185, name: 'Carpal Tunnel Syndrome (hands or forearms)'},
//   {id: 186, name: 'Tarsal Tunner Syndrome (legs)'},
//   {id: 187, name: 'Joint stiffness'},
//   {id: 188, name: 'Tendonitis'},
//   {id: 189, name: 'Heel spur'},
//   {id: 190, name: 'Plantar fasciitis'},
//   {id: 191, name: 'Arthritis'},
//   {id: 192, name: 'Gout'},
//   {id: 193, name: 'Painful soles of feet'},
//   {id: 194, name: 'Muscle cramps'},
//   {id: 195, name: 'Aching bones'},
//   {id: 196, name: 'Aching muscles'},
//   {id: 197, name: 'Joint pain'},
//   {id: 198, name: 'TMJ'},
//   {id: 199, name: 'Fibromyalgia'},
//   // Digestion
//   {id: 200, name: 'Constipation'},
//   {id: 201, name: 'Hemorrhoids'},
//   {id: 202, name: 'Hard stools'},
//   {id: 203, name: 'Loss of appetite'},
//   {id: 204, name: 'Alcohol intolerance'},
//   {id: 205, name: 'Irritable Bowel Syndrome'},
//   {id: 206, name: 'Lactose intolerance'},
//   {id: 207, name: 'Gluten Sensitivity/Intolerance'},
//   {id: 208, name: 'Colitis'},
//   {id: 209, name: 'Abdominal distention'},
//   {id: 210, name: 'Weight gain in abdominal area'},
//   {id: 211, name: 'Protruding abdomen in children'},
//   {id: 212, name: 'Flatulence'},
//   {id: 213, name: 'Nausea'},
//   {id: 214, name: 'Ulcers'},
//   {id: 215, name: 'Acid reflux'},
//   {id: 216, name: 'Excessive belching'},
//   // Menstrual Disorders
//   {id: 217, name: 'Cessation of periods (amenorrhoea)'},
//   {id: 218, name: 'Scanty (light) periods (oligomenorrhoea)'},
//   {id: 219, name: 'Heavy periods (menorrhagia)'},
//   {id: 220, name: 'Irregular periods'},
//   {id: 221, name: 'Very short cycles'},
//   {id: 222, name: 'Very long cycles'},
//   {id: 223, name: 'Severe cramping'},
//   {id: 224, name: 'Failure to ovulate'},
//   {id: 225, name: 'Constant bleeding'},
//   {id: 226, name: 'Premenstrual syndrome (PMS)'},
//   {id: 227, name: 'Premenstrual tension (PMT)'},
//   {id: 228, name: 'Extreme bloating and water retention'},
//   {id: 229, name: 'Premature or delayed puberty'},
//   {id: 230, name: 'Premature or delayed menopause'},
//   // Reproductive Disorders and Pregnancy
//   {id: 231, name: 'Infertility'},
//   {id: 232, name: 'Miscarriage'},
//   {id: 233, name: 'Still birth'},
//   {id: 234, name: 'In vitro fertilization failure'},
//   {id: 235, name: 'Donor egg failure'},
//   {id: 236, name: 'Abnormal estrogen levels'},
//   {id: 237, name: 'Abnormal progesterone levels'},
//   {id: 238, name: 'Abnormal testosterone levels'},
//   {id: 239, name: 'Drop in sperm count'},
//   {id: 240, name: 'Erectile dysfunction'},
//   {id: 241, name: 'Loss of libido'},
//   {id: 242, name: 'Sexual dysfunction'},
//   {id: 243, name: 'Vaginal dryness'},
//   {id: 244, name: 'Painful sex'},
//   {id: 245, name: 'Breasts leaking milk (but not lactating or breastfeeding)'},
//   {id: 246, name: 'Maternal anemia'},
//   {id: 247, name: 'Placental abruption'},
//   {id: 248, name: 'Postpartum hemorrhage'},
//   {id: 249, name: 'Prolonged labour'},
//   {id: 250, name: 'Inability to dilate'},
//   {id: 251, name: 'Difficulty breast-feeding'},
//   {id: 252, name: 'Premature birth'},
//   {id: 253, name: 'Low birth weight'},
//   {id: 254, name: 'High birthweight'},
//   {id: 255, name: 'Newborn with deficits in intellectual development'},
//   {id: 256, name: 'Newborns with jaundice'},
//   {id: 257, name: 'Autism'},
//   {id: 258, name: 'ADD/ADHD'},
//   // Emotional
//   {id: 259, name: 'Irritability'},
//   {id: 260, name: 'Wanting to be solitary'},
//   {id: 261, name: 'Mood swings'},
//   {id: 262, name: 'Anxiety'},
//   {id: 263, name: 'Personality changes'},
//   {id: 264, name: 'Feelings of resentment'},
//   {id: 265, name: 'Jumpy'},
//   {id: 266, name: 'Easily startled'},
//   {id: 267, name: 'Lack of confidence'},
//   // Other Related Conditions
//   {id: 268, name: 'Adrenal Fatigue'},
//   {id: 269, name: 'Anemia'},
//   {id: 270, name: 'Hyponatremia (low blood sodium)'},
//   {id: 271, name: 'Lack of coordination'},
//   {id: 272, name: 'Clumsiness'},
//   {id: 273, name: 'Tendency to fall'},
//   {id: 274, name: 'Dizziness'},
//   {id: 275, name: 'Fainting episodes'},
//   {id: 276, name: 'Tremor'},
//   {id: 277, name: 'Chemical sensitivities'},
//   {id: 278, name: 'Restless Leg Syndrome'},
//   {id: 279, name: 'Rhabdomyolysis (destruction of skeletal muscle)'},
//   {id: 280, name: 'Hernia'},
//   // Brain
//   {id: 281, name: 'Depression'},
//   {id: 282, name: 'Panic attacks'},
//   {id: 283, name: 'Memory loss'},
//   {id: 284, name: 'Confusion'},
//   {id: 285, name: 'Brain fog'},
//   {id: 286, name: 'Mental sluggishness'},
//   {id: 287, name: 'Porr concentration'},
//   {id: 288, name: 'Noises and/or voices in head'},
//   {id: 289, name: 'Hallucinations'},
//   {id: 290, name: 'Delusions'},
//   {id: 291, name: 'Mania'},
//   {id: 292, name: 'Phobias'},
//   {id: 293, name: 'Obsessions'},
//   {id: 294, name: 'Alcohol & substance abuse'},
//   {id: 295, name: 'Rage'},
//   {id: 296, name: 'Loss of drive'},
//   {id: 297, name: 'Personality disorders'},
//   {id: 298, name: 'Schizophrenia'},
//   {id: 299, name: 'Postpartum Depression'},
//   {id: 300, name: 'Seasonal Affective Disorder (SAD)'},
//   {id: 301, name: 'Nightmares'},
//   {id: 302, name: 'Bipolar'},
//   {id: 303, name: 'Suicide'},
//   {id: 304, name: 'ADHD'},
//   {id: 305, name: 'Dementia'},
//   {id: 306, name: 'Alzheimer\'s Disease'},
//   {id: 307, name: 'Parkinson\'s Disease'},
//   // Kidney and Bladder
//   {id: 308, name: 'Albuminuria (protein in urine)'},
//   {id: 309, name: 'Urinary incontinence'},
//   {id: 310, name: 'Frequent need to urinate'},
//   {id: 311, name: 'Decreased output of urine'},
//   {id: 312, name: 'Interstitial cystitis (chronic bladder problems)'},
//   {id: 313, name: 'Urinary incontinence while sleeping'},
//   {id: 314, name: 'Kidney stones'},
//   {id: 315, name: 'Recurrent kidney infections'},
//   {id: 316, name: 'Recurrent bladder infections'},
//   {id: 317, name: 'Irritable bladder syndrome'},
//   {id: 318, name: 'Chronic kidney failure'},
//   // Gallbladder
//   {id: 319, name: 'Gallbladder Disease'},
//   {id: 320, name: 'Gallstones'},
//   // Liver
//   {id: 321, name: 'Liver tenderness and enlargement'},
//   {id: 322, name: 'Congestion of the liver'},
//   {id: 323, name: 'Elevated liver enzymes'},
//   // Lungs
//   {id: 324, name: 'Asthma'},
//   {id: 325, name: 'Bronchitis'},
//   {id: 326, name: 'Emphysema'},
//   {id: 327, name: 'Air hunger'},
//   {id: 328, name: 'Shortness of breath'},
//   {id: 329, name: 'Tightness in chest'},
//   {id: 330, name: 'Pneumonia'},
//   // Heart
//   {id: 331, name: 'High blood pressure'},
//   {id: 332, name: 'Low blood pressure'},
//   {id: 333, name: 'Slow/weak pulse (under 60bpm)'},
//   {id: 334, name: 'Fast pulse (over 90bpm at rest)'},
//   {id: 335, name: 'Arrhythmia (irregular heartbeat)'},
//   {id: 336, name: 'Skipped beats'},
//   {id: 337, name: 'Chest pain'},
//   {id: 338, name: 'Heart palpitations'},
//   {id: 339, name: 'High cholesterol'},
//   {id: 340, name: 'High triglycerides'},
//   {id: 341, name: 'High LDL'},
//   {id: 342, name: 'Coronary Artery Disease'},
//   {id: 343, name: 'Plaque buildup'},
//   {id: 344, name: 'Poor circulation'},
//   {id: 345, name: 'Enlarged heart'},
//   {id: 346, name: 'Stroke'},
//   {id: 347, name: 'Heart attack'}
// ];

export default class SymptomEntryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalStyles: {
        overlay : {
          position          : 'fixed',
          top               : 0,
          left              : 0,
          right             : 0,
          bottom            : 0,
          backgroundColor   : 'rgba(255, 255, 255, 0.75)'
        },
        content : {
          position                   : 'absolute',
          top                        : '10%',
          left                       : '10%',
          right                      : '30%',
          bottom                     : '30%',
          border                     : '4px solid #ccc',
          background                 : '#fff',
          overflow                   : 'auto',
          WebkitOverflowScrolling    : 'touch',
          borderRadius               : '4px',
          outline                    : 'none',
          padding                    : '20px'

        }
      },
      selectedSymptoms: [],
      recs: [],
      modalIsOpen: false
    };
    this.handleDeselect = this.handleDeselect.bind(this);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.submitSymptoms = this.submitSymptoms.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleRecData = this.handleRecData.bind(this);
    this.exitModal = this.exitModal.bind(this);
  };

  closeModal() {
    this.setState({modalIsOpen: false})
  }

  openModal() {
    this.setState({modalIsOpen: true})
  }

  exitModal() {
    this.setState({selectedSymptoms: []});
    this.setState({recs: []});
    this.closeModal();
  }

  handleDeselect(index) {
    var selectedSymptoms = this.state.selectedSymptoms.slice();
    selectedSymptoms.splice(index, 1);
    this.setState({ selectedSymptoms });
  };

  handleRecData(recData) {
    console.log(recData)
    this.setState( {recs: recData})
  }

  handleSelectionChange(selectedSymptoms) {
    this.setState({ selectedSymptoms });
  };

  submitSymptoms() {
    console.log('you chose: ', this.state.selectedSymptoms);
    this.openModal();
    $.ajax({
      type: 'POST',
      url: '/api/brain/recommend',
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        username: window.localStorage.getItem("username"),
        symptoms: this.state.selectedSymptoms}),
      success: this.handleRecData,
      error: function(err) {
        console.log('Congrats you are superhuman', err);
      }
    })
  };

  render() {
    var { selectedSymptoms } = this.state;

    return (
      <div>
      <Navigate />
        <h2>Please select your symptoms from the list below.</h2>
        <h4>Energy Level and Sleep</h4>
        <FilteredMultiSelect className="symptom-select"
          onChange={this.handleSelectionChange}
          options={SYMPTOMS}
          selectedOptions={selectedSymptoms}
          textProp='name'
          valueProp='id' />
        {selectedSymptoms.length === 0 && <p>(nothing selected yet)</p>}
        {selectedSymptoms.length > 0 && <ul>
          {selectedSymptoms.map((symptom, i) => <li key={symptom.id}>
            {`${symptom.name} `}
            <button type='button' onClick={this.handleDeselect.bind(null, i)}>
              &times;
            </button>
          </li>)}
        </ul>}
        <button onClick={this.submitSymptoms}>Submit!</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          shouldCloseOnOverlayClick={false}
          style={this.state.modalStyles}
        > 
          <button onClick={this.exitModal}>Exit</button>
          <SymptomEntryModal symptoms={this.state.selectedSymptoms} recommendations={this.state.recs} />
        </Modal>
      </div>
    );
  }
}

// export default SymptomEntry;
//add more bad boiz;
// http://hypothyroidmom.com/300-hypothyroidism-symptoms-yes-really/
