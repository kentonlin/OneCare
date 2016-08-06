import React, {Component} from 'react';
import $ from 'jquery';
import Navigate from './navigate.jsx';
import ScriptRemind from './scriptRemind.jsx';
import Modal from 'react-modal';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // doctors: [],
      scripts: [],
      modalIsOpen: false // or false
    };
    // this.makeDocs = this.makeDocs.bind(this);
    this.compileScripts = this.compileScripts.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getScripts = this.getScripts.bind(this);
    this.deleteReminder= this.deleteReminder.bind(this);
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

  openModal() {
    this.setState({
      modalIsOpen: true
    });
  }

 closeModal() {
   this.setState({
     modalIsOpen: false
   });
 }


  componentDidMount() {
    $.ajax({
     type: "POST",
     url: "/api/script/find",
     dataType: 'json',
     headers: {
       "Content-Type": "application/json"
     },
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

  componentDidMount() {
    this.getScripts();
  }

  render() {
    return (
      <div>
      <Navigate />
      <h1> My Profile </h1>
          <div className="allScripts">
      <button onClick={this.openModal}> Enter New Prescription </button>

      <Modal
        isOpen={this.state.modalIsOpen}
        shouldCloseOnOverlayClick={false}
        >
          <ScriptRemind />
          <button onClick={this.closeModal}>Exit</button>
      </Modal>

      <h2> Profile {window.localStorage.username} </h2>

             {
              this.state.scripts.map((script, idx) => {
                return (
                  <ul className="User-Scripts">
                  <div className="single-script">
                    <li> <span className="user-script"> Name: </span> {script.name} </li>
                    <li> <span className="user-script"> Dosage: </span> {script.dosage} </li>
                    <li> <span className="user-script"> Frequency </span> {script.frequency} </li>
                    <li> <span className="user-script"> Recurring </span> {script.recur} </li>
                    <li> <span className="user-script"> Refill Date </span> {script.refill} </li>
                    <li> <span className="user-script"> Refill Reminder </span> {script.refillRemind} </li>
                    <li> <span className="user-script"> Refill Reminder </span> {script.dailyRemind} </li>
                    <li> <span className="user-script"> Phone: </span> {script.phone} </li>
                  </div>
                 <button onClick={this.deleteReminder.bind(this, idx)} value={idx}>Delete</button>
                 </ul>
               )
              }, this)
            }
          </div>
      </div>
    );
  }

}
