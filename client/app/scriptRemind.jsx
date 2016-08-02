import React, { Component } from 'react';
import 'react-date-picker/index.css';
import { DateField, Calendar } from 'react-date-picker'
import $ from 'jquery';
import Dropdown from 'react-drop-down';

export default class ScriptRemind extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      "currentDrug": "None",
      "dosageAmt": 0,
      "dosageMeasure": 'none',
      "date": null,
      "scheduleNum": "none",
      "scheduleDayWeek": "none"
  }
  this.updateDrugName = this.updateDrugName.bind(this);
  this.submitForm = this.submitForm.bind(this);
  this.handleDayClick = this.handleDayClick.bind(this);
  this.handleDoseMeasurement = this.handleDoseMeasurement.bind(this);
  this.handleScheduleDayWeek = this.handleScheduleDayWeek.bind(this);

}

    updateDrugName(event){
      console.log("value", event.target.value)
      console.log("hi");
      this.setState({
          currentDrug: event.target.value
        });
    }

    handleDayClick(date) {
      this.setState({
        "date": date
      })

    }
    handleScheduleDayWeek(dayWeek){
        this.setState({
          "scheduleDayWeek": dayWeek
        })
    }
    handleDoseMeasurement(measure) {
      console.log("measure", measure)
      this.setState({
        "dosageMeasure": measure
      })

    }

    submitForm () {
      var script = {
        "name": this.state.currentDrug,
        "dosage": this.state.dosageAmt + ' ' + this.state.dosageMeasure,
        "refill": this.state.date,
        "frequency": this.state.scheduleNum + ' per ' + this.state.scheduleDayWeek,
        "phoneNum": "8108414628"
      }
      console.log("submitForm called for: ", script)

      $.ajax({
          type: 'POST',
          url: '/api/script/add',
          dataType: 'json',
          headers: {
            'Content-Type': 'application/json'
          },
          data: JSON.stringify(script),
          success: function(data){
            console.log('A reminder was set for: ', data);
          },
          error: function(err){
            console.log('Reminder not set: ', err);
          }
        });

    }

  render() {
    let date = new Date();
    return (
      <div>
        <div>
          <h1> Current Drug: {this.state.currentDrug} </h1>
          <input
          onChange={this.updateDrugName}
          placeholder='Name'
          />
        </div>
        <div>
          <input
          width='200'
          onChange={(text) => this.setState({"dosageAmt": text})}
          placeholder='Dosage (e.g. if "Take 1 tablet", type "1")'
          />

          <select className="dropdown-replacement" value={this.state.dosageMeasure} onChange={this.handleDoseMeasurement}>
            <option>mg</option>
            <option>mL</option>
            <option>tablet</option>
          </select>
      </div>
        <div>
            <h1> Refill Date</h1>
              <Calendar
                dateFormat="YYYY-MM-DD"
                date={date}
                onChange={this.handleDayClick}
              />
            <h3> You selected {this.state.date} </h3>
        </div>
        <div>
          <input
          width='100'
          onChange={(text) => this.setState({"scheduleNum": text})}
          placeholder='How often? (1x, 2x, etc..)'
          />
          <h3> per </h3>
          <select className="dropdown-replacement" value={this.state.scheduleDayWeek} onChange={this.handleScheduleDayWeek}>
            <option>day</option>
            <option>week</option>
          </select>
        </div>
        <div>
          <button onClick={this.submitForm()}> Remind Me </button>
        </div>
      </div>

    );
  }
}


/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  topbar: {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  backgroundColor: 'black',
  paddingHorizontal: 5,
  paddingVertical: 10
  },
  submit: {
    textAlign: 'center'
  },

});

*/
