import React, { Component } from 'react';
import DoctorView from './doctorView.jsx'
import Navigate from './navigate.jsx';


export default class DoctorListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doctors: []
    }
    this.makeDocs = this.makeDocs.bind(this);
  }
  

  makeDocs(doctors) {
    this.setState({doctors: doctors});
    console.log("current docs", this.state.doctors);

  }

  componentDidMount() {
    // console.log('doctor list view about to be mounted');
    $.get("/api/doctor/find", this.makeDocs)
  }

  render() {
    return (

      <div className="doctor-list-view">
        {
         this.state.doctors.map((doctor, idx) => {
          return (<DoctorView key={idx} name={doctor.name} phone={doctor.phone} fax={doctor.fax} address={doctor.address} specialty={doctor.specialty} />)
         }, this)
        }
      </div>
    )
  }

}
