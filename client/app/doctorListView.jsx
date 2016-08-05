import React, { Component } from 'react';
import DoctorView from './doctorView.jsx'
import Navigate from './navigate.jsx';


export default class DoctorListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doctors: []
    };
    this.makeDocs = this.makeDocs.bind(this);
  }


  makeDocs(doctors) {
    this.setState({doctors});
    // console.log("current docs", this.state.doctors);

  }

  componentDidMount() {
    $.ajax({
      type: 'POST',
      url: '/api/doctors/get',
      headers: {
        "content-type": "application/json"
      },
      data: JSON.stringify({"username": window.localStorage.username}),
      success: function(docs) {
        console.log("DOCTORS", docs);
        this.setState({
          doctors: docs
        })
      }.bind(this),
      error: function(err) {
        console.log('I can\'t pill you...not today', err);
      }
    });
  }

  render() {
    var { doctors } = this.state;
    return (

      <div className="doctor-list-view">
        {
         doctors.map((doctor, idx) => {
          return (<DoctorView key={idx} name={doctor.name} phone={doctor.phone} fax={doctor.fax} address={doctor.address} specialty={doctor.specialty} />)
         }, this)
        }
      </div>
    );
  }

}
