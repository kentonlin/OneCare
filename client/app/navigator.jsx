import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Signin from './signin.jsx';
import DoctorEntryView from './doctorEntryView.jsx';
import DoctorListView from './doctorListView.jsx';
import ScriptRemindView from './scriptRemind.jsx';
import SymptomEntryView from './symptomEntry.jsx';
import ReactDOM from 'react-dom'

export default class Navigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      $mainRender: document.getElementById("main-render"),
      username: window.localStorage.username || "none",
      token: window.localStorage.token || "none"
    }
    this.viewDocs = this.viewDocs.bind(this);
    this.enterDocs = this.enterDocs.bind(this);
    this.scriptReminder = this.scriptReminder.bind(this);
    this.authCheck = this.authCheck.bind(this);
    this.enterSympsons = this.enterSympsons.bind(this);
  }

//
  componentDidMount() {
    this.setState({$mainRender: document.getElementById("main-render")})
    console.log("username", this.state.username, "token", this.state.token);
    this.authCheck((username, token) => {
      console.log("authentication complete!");
      // this.enterDocs();
    });
  }

  authCheck(cb) {
    if (this.state.username ==="none" || this.state.token === "none") {
      //re-route to login page
      ReactDOM.render(<div>
        <Signin />
      </div>, document.getElementById("app"));
    } else {
      cb(this.state.username, this.state.token);
    }
  }

  enterDocs() {
    var $target = this.state.$mainRender;
    console.log($target);
    ReactDOM.render(<div>
        <DoctorEntryView />
      </div>, $target);
    console.log("Narf!");
  }

  viewDocs() {
    var $target = this.state.$mainRender;
    console.log($target);
    ReactDOM.render(<div>
        <DoctorListView />
      </div>, $target);
    console.log("troz!");
  }

  scriptReminder() {
    var $target = this.state.$mainRender;
    console.log($target);
    ReactDOM.render(<div>
        <ScriptRemindView />
      </div>, $target);
  }

  enterSympsons() {
    var $target = this.state.$mainRender;
    console.log($target);
    ReactDOM.render(<div>
        <SymptomEntryView />
      </div>, $target);
    console.log("nuts!");
  }

  enterSympsons() {
    var $target = this.state.$mainRender;
    console.log($target);
    ReactDOM.render(<div>
        <SymptomEntryView />
      </div>, $target);
    console.log("nuts!");
  }

  enterSympsons() {
    var $target = this.state.$mainRender;
    console.log($target);
    ReactDOM.render(<div>
        <SymptomEntryView />
      </div>, $target);
    console.log("nuts!");
  }

  render() {
    return (
      <div className="navbar-container">
        <h1 className="title">Welcome to OneCare!</h1>
        <div className="navbar-button navbar-view-doctors" onClick={this.viewDocs}> View Your Doctors </div>
        <div className="navbar-button navbar-enter-doctors" onClick={this.enterDocs}> Enter New Doctor </div>
        <div className="navbar-button navbar-enter-doctors" onClick={this.scriptReminder}> New Prescription? </div>
        <div className="navbar-button navbar-enter-doctors" onClick={this.enterSympsons}> What ails you? </div>
        <div className="navbar-button navbar-enter-doctors" onClick={() => {window.localStorage.removeItem("username"); window.localStorage.removeItem("token"); location.reload()}}> Logout </div>
      </div>
      )
  }
}
