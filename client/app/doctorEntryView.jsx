import React, { Component } from 'react';
import $ from 'jquery';
import Navigate from './navigate.jsx';
import DoctorListView from './doctorListView.jsx';

  var DOCTORS = [
    {id: 1, name: 'Allergologist'}, 
    {id: 2, name: 'Andrologist'},
    {id: 3, name: 'Anesthesiologist'},
    {id: 4, name: 'Angiologist‎'},
    {id: 5, name: 'Cardiologist'},
    {id: 6, name: 'Dentist'},
    {id: 7, name: 'Dermatologist‎'},
    {id: 8, name: 'Emergency Medicine‎ Specialist'},
    {id: 9, name: 'Endocrinology‎'},
    {id: 10, name: 'Family Medicine‎ Specialist'},
    {id: 11, name: 'Gastroenterologist‎'},
    {id: 12, name: 'General practitioner'},
    {id: 13, name: 'Geriatrician'},
    {id: 14, name: 'Gynaecologist'},
    {id: 15, name: 'Hematologist'},
    {id: 16, name: 'Hepatologyist'},
    {id: 17, name: 'Immunologist‎'},
    {id: 18, name: 'Internal Medical Specialist'},
    {id: 19, name: 'Nephrologist‎'},
    {id: 20, name: 'Neurologist'},
    {id: 21, name: 'Obstetrician'},
    {id: 22, name: 'Oncologist'},
    {id: 23, name: 'Ophthalmologist'},
    {id: 24, name: 'Ear, nose, and Throat Doctor'},
    {id: 25, name: 'Palliative Medical Expert'},
    {id: 26, name: 'Pediatrician‎'},
    {id: 27, name: 'Podiatrist'},
    {id: 28, name: 'Psychiatrist'},
    {id: 29, name: 'Pulmonologist'},
    {id: 30, name: 'Radiologist'},
    {id: 31, name: 'Rheumatologist‎'},
    {id: 32, name: 'Expert in Sleep Medicine‎'},
    {id: 33, name: 'Surgeon‎'},
    {id: 34, name: 'Toxicologist'},
    {id: 35, name: 'Urologist'}
  ]


export default class DoctorEntryView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      email: "",
      address: "",
      specialty: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitNewDoctor = this.submitNewDoctor.bind(this);
  }

  handleChange(event) {
    var stateVal = event.target.id;
    if (stateVal === "name") {
      this.setState({name: event.target.value});
    } else if (stateVal === "phone") {
      this.setState({phone: event.target.value});
    } else if (stateVal === "email") {
      this.setState({email: event.target.value});
    } else if (stateVal === "address") {
      this.setState({address: event.target.value});
    } else if (stateVal === "specialty") {
      this.setState({specialty: event.target.value});
    }
  }
  submitNewDoctor() {
    var toSubmit = { "username": window.localStorage.username, "doc": this.state }

    $.ajax({
      type: "POST",
      url: "/api/doctor/add",
      headers: {
        "content-type": "application/json"
      },
      data: JSON.stringify(toSubmit),
      success: function(res) {
        console.log(res, "has been added");
        DoctorListView.getDocs();
      },
      error: function(err) {
        console.error("Doctor not registered: ", err);
      }
    });
  }
  render() {
    return (
      <div className="doctor-input">
      <Navigate />
      <h2>Input a new doctor!</h2>
        <form className="doctor-entry-form">
          <div>Name</div><input id="name" type="text" onChange={this.handleChange} />
          <div>Phone</div><input id="phone" type="text" onChange={this.handleChange}></input><br />
          <div>Email</div><input id="email" type="text" onChange={this.handleChange}></input><br />
          <div>Address</div><input id="address" type="text" onChange={this.handleChange}></input><br />
          <div>Specialty</div><select id="specialty" onChange={this.handleChange}>
            <option>::Select Specialty::</option>
            {
              DOCTORS.map((doctor) => {
                return (
                  <option key={doctor.id} >{doctor.name}</option>
                )
              })
            }
          </select>
          <button onClick={this.submitNewDoctor}>Submit!</button>
        </form>
        <hr />
      </div>
    )
  }
}
