import React, { Component } from 'react';

export default class DoctorView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "http://www.google.com/search?q=" + this.props.name + "&btnI"
    }
    this.deleteDoc = this.deleteDoc.bind(this);
  }

   // <a target="_blank" href={"http://www.google.com/search?q=" + this.props.name + "&btnI"}>(get more info)</a>

  deleteDoc(id){
    console.log("docID", id);

    $.ajax({
     type: "POST",
     url: "/api/doctor/delete",
     dataType: 'json',
     headers: {
       "Content-Type": "application/json"
     },
     data: JSON.stringify({ "docID": id }),
     success: function(data) {
       console.log("Doctor deleted");
       location.reload();
     },
     error: function(err) {
       console.log('Doctor not deleted', err);
       location.reload();
     }
   });

  }


  render() {
    return (
      <div className="doctor-view-container">
        <div className="doctor-name"> {this.props.name}</div><a target="_blank" href={this.state.url}>(get more info)</a>
        <div><span className="doctor-attribute">Phone: </span>{this.props.phone}</div>
        <div><span className="doctor-attribute">Email: </span>{this.props.email}</div>
        <div><span className="doctor-attribute">Address: </span>{this.props.address}</div>
        <div><span className="doctor-attribute">Specialty: </span>{this.props.specialty}</div>
        <button onClick={this.deleteDoc.bind(this, this.props.id)}>Delete</button>
      </div>
    );
  }
}

