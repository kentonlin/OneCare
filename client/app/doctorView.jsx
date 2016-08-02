import React, { Component } from 'react';

export default class DoctorView extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="doctor-view-container">
        <div className="doctor-name">{this.props.name}</div>
        <div><span className="doctor-attribute">Phone: </span>{this.props.phone}</div>
        <div><span className="doctor-attribute">Fax: </span>{this.props.fax}</div>
        <div><span className="doctor-attribute">Address: </span>{this.props.address}</div>
        <div><span className="doctor-attribute">Specialty: </span>{this.props.specialty}</div>
      </div>
      )
  }
}
