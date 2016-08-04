import React from 'react';
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router';


export default class Navigate extends React.Component {
  render() {
    return(
     <div className="navbar-container">
       <h1 className="title">Welcome to OneCare!</h1>
       <div className="navbar-button navbar-view-doctors">
        <Link to='/alldoctors'> Your Doctors </Link>
       </div>
       <div className="navbar-button navbar-enter-doctors">
          <Link to='/newdoctor'> Enter New Doctor </Link>
       </div>
       <div className="navbar-button navbar-enter-doctors">
        <Link to='/remind'> Prescription Reminder </Link>
       </div>
       <div className="navbar-button navbar-enter-doctors">
          <Link to='/recommend'> Physician Recommender </Link>
       </div>
       <div className="navbar-enter-doctors right logout" onClick={() => {window.localStorage.removeItem("username"); window.localStorage.removeItem("token");}}>
          <Link to='/signin'> Logout </Link>
       </div>
     </div>
      )
  }
}
