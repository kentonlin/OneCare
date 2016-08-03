import React, { Component } from 'react';
import FilteredMultiSelect from 'react-filtered-multiselect';
import $ from 'jquery';

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
  {id: 231, name: 'Drop in sperm count'},
  {id: 232, name: 'Erectile dysfunction'},
  {id: 233, name: 'Loss of libido'},
  {id: 234, name: 'Sexual dysfunction'},
  {id: 235, name: 'Vaginal dryness'},
  {id: 236, name: 'Painful sex'},
  {id: 237, name: 'Breasts leaking milk (but not lactating or breastfeeding)'},
  {id: 238, name: 'Maternal anemia'},
  {id: 239, name: 'Placental abruption'},
  {id: 240, name: 'Postpartum hemorrhage'},
  {id: 241, name: 'Prolonged labour'},
  {id: 242, name: 'Inability to dilate'},
  {id: 243, name: 'Difficulty breast-feeding'},
  {id: 244, name: 'Premature birth'},
  {id: 245, name: 'Low birth weight'},
  {id: 246, name: 'High birthweight'},
  {id: 247, name: 'Newborn with deficits in intellectual development'},
  {id: 248, name: 'Newborns with jaundice'},
  {id: 249, name: 'Autism'},
  {id: 250, name: 'ADD/ADHD'},
  // Emotional
  {id: 251, name: 'Irritability'},
  {id: 252, name: 'Wanting to be solitary'},
  {id: 253, name: 'Mood swings'},
  {id: 254, name: 'Anxiety'},
  {id: 255, name: 'Personality changes'},
  {id: 256, name: 'Feelings of resentment'},
  {id: 257, name: 'Jumpy'},
  {id: 258, name: 'Easily startled'},
  {id: 259, name: 'Lack of confidence'},
  // Other Related Conditions
  {id: 260, name: 'Adrenal Fatigue'},
  {id: 261, name: 'Anemia'},
  {id: 262, name: 'Hyponatremia (low blood sodium)'},
  {id: 263, name: 'Lack of coordination'},
  {id: 264, name: 'Clumsiness'},
  {id: 265, name: 'Tendency to fall'},
  {id: 266, name: 'Dizziness'},
  {id: 267, name: 'Fainting episodes'},
  {id: 268, name: 'Tremor'},
  {id: 269, name: 'Chemical sensitivities'},
  {id: 270, name: 'Restless Leg Syndrome'},
  {id: 271, name: 'Rhabdomyolysis (destruction of skeletal muscle)'},
  {id: 272, name: 'Hernia'},
  // Brain
  {id: 273, name: 'Depression'},
  {id: 274, name: 'Panic attacks'},
  {id: 275, name: 'Memory loss'},
  {id: 276, name: 'Confusion'},
  {id: 277, name: 'Brain fog'},
  {id: 278, name: 'Mental sluggishness'},
  {id: 279, name: 'Porr concentration'},
  {id: 280, name: 'Noises and/or voices in head'},
  {id: 281, name: 'Hallucinations'},
  {id: 282, name: 'Delusions'},
  {id: 283, name: 'Mania'},
  {id: 284, name: 'Phobias'},
  {id: 285, name: 'Obsessions'},
  {id: 286, name: 'Alcohol & substance abuse'},
  {id: 287, name: 'Rage'},
  {id: 288, name: 'Loss of drive'},
  {id: 289, name: 'Personality disorders'},
  {id: 290, name: 'Schizophrenia'},
  {id: 291, name: 'Postpartum Depression'},
  {id: 292, name: 'Seasonal Affective Disorder (SAD)'},
  {id: 293, name: 'Nightmares'},
  {id: 294, name: 'Bipolar'},
  {id: 295, name: 'Suicide'},
  {id: 296, name: 'ADHD'},
  {id: 297, name: 'Dementia'},
  {id: 298, name: 'Alzheimer\'s Disease'},
  {id: 299, name: 'Parkinson\'s Disease'},
  // Kidney and Bladder
  {id: 300, name: 'Albuminuria (protein in urine)'},
  {id: 301, name: 'Urinary incontinence'},
  {id: 302, name: 'Frequent need to urinate'},
  {id: 303, name: 'Decreased output of urine'},
  {id: 304, name: 'Interstitial cystitis (chronic bladder problems)'},
  {id: 305, name: 'Urinary incontinence while sleeping'},
  {id: 306, name: 'Kidney stones'},
  {id: 307, name: 'Recurrent kidney infections'},
  {id: 308, name: 'Recurrent bladder infections'},
  {id: 309, name: 'Irritable bladder syndrome'},
  {id: 310, name: 'Chronic kidney failure'},
  // Gallbladder
  {id: 311, name: 'Gallbladder Disease'},
  {id: 312, name: 'Gallstones'},
  // Liver
  {id: 313, name: 'Liver tenderness and enlargement'},
  {id: 314, name: 'Congestion of the liver'},
  {id: 315, name: 'Elevated liver enzymes'},
  // Lungs
  {id: 316, name: 'Asthma'},
  {id: 317, name: 'Bronchitis'},
  {id: 318, name: 'Emphysema'},
  {id: 319, name: 'Air hunger'},
  {id: 320, name: 'Shortness of breath'},
  {id: 321, name: 'Tightness in chest'},
  {id: 322, name: 'Pneumonia'},
  // Heart
  {id: 323, name: 'High blood pressure'},
  {id: 324, name: 'Low blood pressure'},
  {id: 325, name: 'Slow/weak pulse (under 60bpm)'},
  {id: 326, name: 'Fast pulse (over 90bpm at rest)'},
  {id: 327, name: 'Arrhythmia (irregular heartbeat)'},
  {id: 328, name: 'Skipped beats'},
  {id: 329, name: 'Chest pain'},
  {id: 330, name: 'Heart palpitations'},
  {id: 331, name: 'High cholesterol'},
  {id: 332, name: 'High triglycerides'},
  {id: 333, name: 'High LDL'},
  {id: 334, name: 'Coronary Artery Disease'},
  {id: 335, name: 'Plaque buildup'},
  {id: 336, name: 'Poor circulation'},
  {id: 337, name: 'Enlarged heart'},
  {id: 338, name: 'Stroke'},
  {id: 339, name: 'Heart attack'}
];

export default class SymptomEntryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSymptoms: []
    };
    this.handleDeselect = this.handleDeselect.bind(this);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.submitSymptoms = this.submitSymptoms.bind(this);
  };

  handleDeselect(index) {
    var selectedSymptoms = this.state.selectedSymptoms.slice();
    selectedSymptoms.splice(index, 1);
    this.setState({ selectedSymptoms });
  };

  handleSelectionChange(selectedSymptoms) {
    this.setState({ selectedSymptoms });
  };

  submitSymptoms() {
    console.log('you chose: ', this.state.selectedSymptoms);
    $.ajax({
      type: 'POST',
      url: '/api/symptomEntry/add',
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(this.state),
      success: function(data) {
        console.log('You have cancer!', data);
      },
      error: function(err) {
        console.log('Congrats you are superhuman', err);  
      }
    })
  };

  render() {
    var { selectedSymptoms } = this.state;

    return (
      <div>
        <h2>Choose your symptoms, weakling. They will appear at the bottom.</h2>
        <h4>Energy Level and Sleep</h4>
        <FilteredMultiSelect
          onChange={this.handleSelectionChange}
          options={SYMPTOMS.slice(0, 11)}
          selectedOptions={selectedSymptoms}
          textProp='name'
          valueProp='id' />
        <h4>Weight</h4>
        <FilteredMultiSelect
          onChange={this.handleSelectionChange}
          options={SYMPTOMS.slice(11, 21)}
          selectedOptions={selectedSymptoms}
          textProp='name'
          valueProp='id' />
        <h4>Body Temperature</h4>
        <FilteredMultiSelect
          onChange={this.handleSelectionChange}
          options={SYMPTOMS.slice(21, 34)}
          selectedOptions={selectedSymptoms}
          textProp='name'
          valueProp='id' />
        <h4>Slowness</h4>
        <FilteredMultiSelect
          onChange={this.handleSelectionChange}
          options={SYMPTOMS.slice(34, 38)}
          selectedOptions={selectedSymptoms}
          textProp='name'
          valueProp='id' />
        <h4>Infections</h4>
        <FilteredMultiSelect
          onChange={this.handleSelectionChange}
          options={SYMPTOMS.slice(38, 54)}
          selectedOptions={selectedSymptoms}
          textProp='name'
          valueProp='id' />
        <h4>Swelling and Thickened Skin of</h4>
        <FilteredMultiSelect
          onChange={this.handleSelectionChange}
          options={SYMPTOMS.slice(54, 64)}
          selectedOptions={selectedSymptoms}
          textProp='name'
          valueProp='id' />
        <h4>Mouth and Throat</h4>
        <FilteredMultiSelect
          onChange={this.handleSelectionChange}
          options={SYMPTOMS.slice(64, 90)}
          selectedOptions={selectedSymptoms}
          textProp='name'
          valueProp='id' />
        <h4>Ears</h4>
        <FilteredMultiSelect
          onChange={this.handleSelectionChange}
          options={SYMPTOMS.slice(90, 98)}
          selectedOptions={selectedSymptoms}
          textProp='name'
          valueProp='id' />
        <h4>Eyes</h4>
        <FilteredMultiSelect
          onChange={this.handleSelectionChange}
          options={SYMPTOMS.slice(98, 116)}
          selectedOptions={selectedSymptoms}
          textProp='name'
          valueProp='id' />
        <h4>Hair</h4>
        <FilteredMultiSelect
          onChange={this.handleSelectionChange}
          options={SYMPTOMS.slice(116, 130)}
          selectedOptions={selectedSymptoms}
          textProp='name'
          valueProp='id' />
        <h4>Nails</h4>
        <FilteredMultiSelect
          onChange={this.handleSelectionChange}
          options={SYMPTOMS.slice(130, 138)}
          selectedOptions={selectedSymptoms}
          textProp='name'
          valueProp='id' />
        <h4>Skin</h4>
        <FilteredMultiSelect
          onChange={this.handleSelectionChange}
          options={SYMPTOMS.slice(138, 174)}
          selectedOptions={selectedSymptoms}
          textProp='name'
          valueProp='id' />
        <h4>Numbness and Tingling</h4>
        <FilteredMultiSelect
          onChange={this.handleSelectionChange}
          options={SYMPTOMS.slice(174, 180)}
          selectedOptions={selectedSymptoms}
          textProp='name'
          valueProp='id' />
        <h4>Pain</h4>
        <FilteredMultiSelect
          onChange={this.handleSelectionChange}
          options={SYMPTOMS.slice(180, 200)}
          selectedOptions={selectedSymptoms}
          textProp='name'
          valueProp='id' />
        <h4>Digestion</h4>
        <FilteredMultiSelect
          onChange={this.handleSelectionChange}
          options={SYMPTOMS.slice(200, 217)}
          selectedOptions={selectedSymptoms}
          textProp='name'
          valueProp='id' />
        <h4>Menstrual Disorders</h4>
        <FilteredMultiSelect
          onChange={this.handleSelectionChange}
          options={SYMPTOMS.slice(217, 231)}
          selectedOptions={selectedSymptoms}
          textProp='name'
          valueProp='id' />
        <h4>Reproductive Disorders and Pregnancy</h4>
        <FilteredMultiSelect
          onChange={this.handleSelectionChange}
          options={SYMPTOMS.slice(231, 251)}
          selectedOptions={selectedSymptoms}
          textProp='name'
          valueProp='id' />
        <h4>Emotional</h4>
        <FilteredMultiSelect
          onChange={this.handleSelectionChange}
          options={SYMPTOMS.slice(251, 260)}
          selectedOptions={selectedSymptoms}
          textProp='name'
          valueProp='id' />
        <h4>Other Related Conditions</h4>
        <FilteredMultiSelect
          onChange={this.handleSelectionChange}
          options={SYMPTOMS.slice(260, 273)}
          selectedOptions={selectedSymptoms}
          textProp='name'
          valueProp='id' />
        <h4>Brain</h4>
        <FilteredMultiSelect
          onChange={this.handleSelectionChange}
          options={SYMPTOMS.slice(273, 300)}
          selectedOptions={selectedSymptoms}
          textProp='name'
          valueProp='id' />
        <h4>Kidney and Bladder</h4>
        <FilteredMultiSelect
          onChange={this.handleSelectionChange}
          options={SYMPTOMS.slice(300, 311)}
          selectedOptions={selectedSymptoms}
          textProp='name'
          valueProp='id' />
        <h4>Gallbladder</h4>
        <FilteredMultiSelect
          onChange={this.handleSelectionChange}
          options={SYMPTOMS.slice(311, 313)}
          selectedOptions={selectedSymptoms}
          textProp='name'
          valueProp='id' />
        <h4>Liver</h4>
        <FilteredMultiSelect
          onChange={this.handleSelectionChange}
          options={SYMPTOMS.slice(313, 316)}
          selectedOptions={selectedSymptoms}
          textProp='name'
          valueProp='id' />
        <h4>Lungs</h4>
        <FilteredMultiSelect
          onChange={this.handleSelectionChange}
          options={SYMPTOMS.slice(316, 323)}
          selectedOptions={selectedSymptoms}
          textProp='name'
          valueProp='id' />
        <h4>Heart</h4>
        <FilteredMultiSelect
          onChange={this.handleSelectionChange}
          options={SYMPTOMS.slice(323, 339)}
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
      </div>
    );
  }
}

// export default SymptomEntry;
//add more bad boiz;
// http://hypothyroidmom.com/300-hypothyroidism-symptoms-yes-really/