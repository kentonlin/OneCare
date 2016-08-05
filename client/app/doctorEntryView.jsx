import React, { Component } from 'react';
import $ from 'jquery';
import Navigate from './navigate.jsx';
import DoctorListView from './doctorListView.jsx';


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
            <option>A</option>
            <option>Allergology‎ </option>
            <option>Andrology‎ </option>
            <option>Anesthesia‎ </option>
            <option>Angiology‎ </option>
            <option>Aviation medicine‎ </option>
            <option>B</option>
            <option>Biomedicine‎ </option>
            <option>C</option>
            <option>Cardiology‎ </option>
            <option>D</option>
            <option>Dentistry‎ </option>
            <option>Dentistry branches‎ </option>
            <option>Dermatology‎ </option>
            <option>Disaster medicine‎ </option>
            <option>Sports physicians‎ </option>
            <option>E</option>
            <option>Emergency medicine‎ </option>
            <option>Endocrinology‎ </option>
            <option>F</option>
            <option>Family medicine‎ </option>
            <option>Fictional medical specialists‎ </option>
            <option>G</option>
            <option>Gastroenterology‎ </option>
            <option>General practice‎ </option>
            <option>Medical genetics‎ </option>
            <option>Geriatrics‎ </option>
            <option>Gerontology‎ </option>
            <option>Gynaecology‎ </option>
            <option>H</option>
            <option>Hematology‎ </option>
            <option>Hepatology‎ </option>
            <option>I</option>
            <option>Immunology‎ </option>
            <option>Infectious diseases‎ </option>
            <option>Intensive care medicine‎ </option>
            <option>Internal medicine‎ </option>
            <option>M</option>
            <option>Men's health‎ </option>
            <option>Military medicine‎ </option>
            <option>N</option>
            <option>Nephrology‎ </option>
            <option>Neurology‎ </option>
            <option>Nuclear medicine‎ </option>
            <option>O</option>
            <option>Obstetrics‎ </option>
            <option>Oncology‎ </option>
            <option>Ophthalmology‎ </option>
            <option>Otorhinolaryngology‎ </option>
            <option>P</option>
            <option>Palliative medicine‎ </option>
            <option>Pathology‎ </option>
            <option>Pediatrics‎ </option>
            <option>Podiatry‎ </option>
            <option>Preventive medicine‎ </option>
            <option>Prison medicine‎ </option>
            <option>Psychiatric specialities‎ </option>
            <option>Psychiatry‎ </option>
            <option>Pulmonology‎ </option>
            <option>R</option>
            <option>Radiology‎ </option>
            <option>Rehabilitation medicine‎ </option>
            <option>Rheumatology‎ </option>
            <option>S</option>
            <option>Serology‎ </option>
            <option>Sexual health‎ </option>
            <option>Sleep medicine‎ </option>
            <option>Space medicine‎ </option>
            <option>Sports medicine‎ </option>
            <option>Surgery‎ </option>
            <option>Surgical specialties‎ </option>
            <option>T</option>
            <option>Toxicology‎ </option>
            <option>Transplantation medicine‎ </option>
            <option>Trichology‎ </option>
            <option>Tropical medicine‎ </option>
            <option>U</option>
            <option>Urology‎ </option>
            <option>W</option>
            <option>Wilderness medicine‎ </option>
          </select>
          <button onClick={this.submitNewDoctor}>Submit!</button>
        </form>
        <hr />
        <div>
          <h3>Your current doctors: </h3>
          <DoctorListView />
        </div>
      </div>
    )
  }
}
