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

// functions for retrieving doctors and scripts
  // makeDocs(doctors) {
  //   this.setState({doctors: doctors});
  // }

  compileScripts(data) {
    this.setState({scripts: data});
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
     data: JSON.stringify({username: window.localStorage.username}),
     success: function(data) {
       console.log('user scripts from AJAX request', data);
       this.setState({scripts: data});
     }.bind(this),
     error: function(err) {
       console.log('error in ajax request for user scripts', data);
     }
   });
  }

  render() {
    return (
      <div>
      <h2> Profile {window.localStorage.username} </h2>

             {
              this.state.scripts.map((script, idx) => {
                return (
                  <ul className="User-Scripts">
                  <li> <span className="user-script"> Name: </span> {script.name} </li>
                  <li> <span className="user-script"> Dosage: </span> {script.dosage} </li>
                  <li> <span className="user-script"> Frequency </span> {script.frequency} </li>
                  <li> <span className="user-script"> Recurring </span> {script.recur} </li>
                  <li> <span className="user-script"> Refill Date </span> {script.refill} </li>
                  <li> <span className="user-script"> Refill Reminder </span> {script.refillRemind} </li>
                  <li> <span className="user-script"> Refill Reminder </span> {script.dailyRemind} </li>
                 <li> <span className="user-script"> Phone: </span> {script.phone} </li>
                 </ul>
               )
              }, this)
            }

      </div>
    );
  }

}
