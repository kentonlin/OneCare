import React, {Component} from 'react';
import $ from 'jquery';
import Navigate from './navigate.jsx';
import ScriptRemind from './scriptRemind.jsx';
import Modal from 'react-modal';
import DoctorEntryView from './doctorEntryView.jsx';
import Map from './map.jsx';
import _ from 'lodash';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doctors: [],
      scripts: [],
      // zipcode: null,
      scriptmodalIsOpen: false,
      docmodalIsOpen: false,
      mapmodalIsOpen: false,
      modalStyles: {
        overlay : {
          position          : 'fixed',
          top               : 0,
          left              : 0,
          right             : 0,
          bottom            : 0,
          backgroundColor   : 'rgba(255, 255, 255, 0.75)'
        },
        content : {
          position                   : 'absolute',
          top                        : '10%',
          left                       : '10%',
          right                      : '30%',
          bottom                     : '30%',
          border                     : '4px solid #ccc',
          background                 : '#fff',
          overflow                   : 'auto',
          WebkitOverflowScrolling    : 'touch',
          borderRadius               : '4px',
          outline                    : 'none',
          padding                    : '20px'

        }
      },
    };
    this.openModalScript = this.openModalScript.bind(this);
    this.closeModalScript = this.closeModalScript.bind(this);
    this.openModalDoctor = this.openModalDoctor.bind(this);
    this.closeModalDoctor = this.closeModalDoctor.bind(this);
    this.getScripts = this.getScripts.bind(this);
    this.deleteReminder= this.deleteReminder.bind(this);
    this.getDocs = this.getDocs.bind(this);
    this.deleteDoc = this.deleteDoc.bind(this);
    this.openModalMap = this.openModalMap.bind(this);
    this.closeModalMap = this.closeModalMap.bind(this);
    // this.getZip = this.getZip.bind(this);
  }

  deleteDoc(idx){
    console.log("index", idx);
    var id = this.state.doctors[idx]._id;

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
       // delete doctor object from doctor state
     },
     error: function(err) {
       console.log('Doctor not deleted', err);
       location.reload();
     }
   });

  }

  deleteReminder(index) {
    var id = this.state.scripts[index]._id;
    console.log("reminderID", id);
    $.ajax({
     type: "POST",
     url: "/api/reminder/delete",
     dataType: 'json',
     headers: {
       "Content-Type": "application/json"
     },
     data: JSON.stringify({ "reminderID": id }),
     success: function(data) {
       console.log("Script deleted");
       this.getScripts();
     }.bind(this),
     error: function(err) {
       console.log('script not deleted', err);
       this.getScripts();
     }.bind(this)
   });
  }

  openModalScript() {
    this.setState({
      scriptmodalIsOpen: true
    });
  }

  openModalDoctor() {
    this.setState({
      docmodalIsOpen: true
    });
  }

  openModalMap() {
    this.setState({
      mapmodalIsOpen: true
    });
  }

 closeModalScript() {
   this.setState({
     scriptmodalIsOpen: false
   });
 }

 closeModalDoctor() {
   this.setState({
     docmodalIsOpen: false
   });
 }

 closeModalMap() {
   this.setState({
     mapmodalIsOpen: false
   });
 }


  getScripts() {
    $.ajax({
     type: "POST",
     url: "/api/script/find",
     dataType: 'json',
     headers: {
       "Content-Type": "application/json"
     },
     data: JSON.stringify({username: window.localStorage.username}),
     success: function(data) {
       var sorted  = _.sortBy(data, 'refill'); //sorts scripts by refill date
       this.setState({scripts: sorted});
     }.bind(this),
     error: function(err) {
       console.log('error in ajax request for user scripts', data);
     }
   });

  }

  getDocs() {
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
        });
      }.bind(this),
      error: function(err) {
        console.log('I can\'t pill you...not today', err);
      }
    });
  }

  // getZip() {
  //   $.ajax({
  //     type: 'POST',
  //     url: '/api/user/zip',
  //     headers: {
  //       "content-type": "application/json"
  //     },
  //     data: JSON.stringify({"username": window.localStorage.username}),
  //     success: function(zipcode) {
  //       console.log("USER zipcode", zipcode);
  //       this.setState({
  //         zipcode: zipcode
  //       });
  //     }.bind(this),
  //     error: function(err) {
  //       console.log('Could not retrieve user zipcode', err);
  //     }
  //   });
  // }



  componentDidMount() {
    this.getScripts();
    this.getDocs();
    // this.getZip();
  }

  render() {
    return (
      <div>
      <Navigate />
      <h1> My Profile </h1>
          <div className="allScripts">
      <button onClick={this.openModalScript}> New Prescription </button>
      <button onClick={this.openModalDoctor}> New Doctor </button>
      <button onClick={this.openModalMap}> Nearest Pharmacy </button>

      <Modal
        isOpen={this.state.scriptmodalIsOpen}
        shouldCloseOnOverlayClick={false}
      >
          <ScriptRemind />
          <button onClick={this.closeModalScript}>Exit</button>

      </Modal>

      <Modal

        isOpen={this.state.docmodalIsOpen}
        shouldCloseOnOverlayClick={false}
      >
          <DoctorEntryView />
          <button onClick={this.closeModalDoctor}>Exit</button>
      </Modal>

      <Modal
        isOpen={this.state.mapmodalIsOpen}
        shouldCloseOnOverlayClick={false}
      >
        <Map
        // zipcode = {this.state}
        />
        <button onClick={this.closeModalMap}>Exit</button>
      </Modal>

      <h2> Profile {window.localStorage.username} </h2>

             {
              this.state.scripts.map((script, idx) => {
                return (
                  <ul className="User-Scripts" key={idx}>
                  <div className="single-script">
                    <li> <span className="user-script"> Name: </span> {script.name} </li>
                    <li> <span className="user-script"> Dosage: </span> {script.dosage} </li>
                    <li> <span className="user-script"> Frequency: </span> {script.frequency} </li>
                    <li> <span className="user-script"> Refill Date: </span> {String(new Date(script.refill)).split('').slice(0, 15).join('')} </li>
                  </div>
                 <button onClick={this.deleteReminder.bind(this, idx)} >Delete</button>
                 </ul>
               );
              }, this)
            }
          </div>

          <h2> Your Doctors </h2>

            {
              this.state.doctors.map((doctor, idx) => {
                return (
                  <div className="doctor-view-container" key={idx }>
                  <div className="doctor-name">{doctor.name}</div>
                  <div><span className="doctor-attribute">Phone: </span>{doctor.phone}</div>
                  <div><span className="doctor-attribute">Email: </span>{doctor.email}</div>
                  <div><span className="doctor-attribute">Address: </span>{doctor.address}</div>
                  <div><span className="doctor-attribute">Specialty: </span>{doctor.specialty}</div>
                  <button onClick={this.deleteDoc.bind(this, idx)}> Delete </button>
                  </div>
                );
              }, this)
            }
      </div>
    );
  }

}
