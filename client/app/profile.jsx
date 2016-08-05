import React, {Component} from 'react';
import $ from 'jquery';
import DoctorView from './doctorView.jsx';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doctors: [],
      scripts: []
    };
    this.makeDocs = this.makeDocs.bind(this);
  }

  makeDocs(doctors) {
    this.setState({doctors: doctors});
  }

  compileScripts(scripts) {
    this.setState({scripts: scripts});
  }

  componentDidMount() {
    $.get("/api/script/find", this.compileScripts);
    $.get("/api/doctor/find", this.makeDocs);
  }

  render() {
    return (
      [
      <div className="doctor-list-view">
        {
         this.state.doctors.map((doctor, idx) => {
          return (<DoctorView key={idx} name={doctor.name} phone={doctor.phone} fax={doctor.fax} address={doctor.address} specialty={doctor.specialty} />)
         }, this)
        }
      </div>,

      <div className="script-list-view">
        {
          this.state.scripts.map((script, idx) => {
            return (<ScriptView key={idx} name={script.name} dosage={script.dosage} frequency={script.frequency}
               recur={script.recur} refill={script.refill} refillRemind={script.refillRemind} dailyRemind={script.dailyRemind}
             phone={script.phone})
          }, this)
        }
      </div>
    ]
    );
  }
}
