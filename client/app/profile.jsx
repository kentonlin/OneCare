import React, {Component} from 'react';
import $ from 'jquery';
// import DoctorView from './doctorView.jsx';
// import ScriptView from './script.jsx'

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // doctors: [],
      scripts: []
    };
    // this.makeDocs = this.makeDocs.bind(this);
    this.compileScripts = this.compileScripts.bind(this);
  }

  // makeDocs(doctors) {
  //   this.setState({doctors: doctors});
  // }

  compileScripts(scripts) {
    this.setState({scripts: scripts});
  }

  componentDidMount() {
    $.ajax({
     type: "POST",
     url: "/api/script/find",
     dataType: 'json',
     headers: {
       "Content-Type": "application/json"
     },
     //  cache: false,
     data: JSON.stringify({window.localStorage.username}),
     success: function(data) {
       console.log('user scripts from AJAX request', data);
     },
     error: function(err) {
       console.log('error in ajax request for user scripts', data);
     }
   });
    // $.get("/api/doctor/find", this.makeDocs);
  }

  render() {
    return (
      <div>
      <h2> Profile {window.localStorage.username} </h2>
      {/* <div className="doctor-list-view">
        {
         this.state.doctors.map((doctor, idx) => {
          return (<DoctorView key={idx} name={doctor.name} phone={doctor.phone} fax={doctor.fax} address={doctor.address} specialty={doctor.specialty} />)
         }, this)
        }
      </div>*/}
      {/* </div> */}

      <div className="script-list-view">
        {
          this.state.scripts.map((script, idx) => {
            return (<ScriptView key={idx} name={script.name} dosage={script.dosage} frequency={script.frequency}
               recur={script.recur} refill={script.refill} refillRemind={script.refillRemind} dailyRemind={script.dailyRemind}
             phone={script.phone} />)
          }, this)
        }
      </div>
      </div>
    );
  }
}
