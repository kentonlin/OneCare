import React from 'react';
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router';


export default class Navigate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "username": window.localStorage.username
  }

}

  render() {
    return(
     <div className="navbar-container">
       <h1 className="title">Welcome to OneCare!</h1>
       <div className="navbar-button navbar-home">
        <Link to='/profile'> Profile </Link>
       </div>
       <div className="navbar-button navbar-enter-doctors">
          <Link to='/newdoctor'> Enter New Doctor </Link>
       </div>
       <div className="navbar-button navbar-script-reminder">
        <Link to='/remind'> Prescription Reminder </Link>
       </div>
       <div className="navbar-button navbar-recommend-doctors">
          <Link to='/recommend'> Physician Recommender </Link>
       </div>
       <div className="navbar-enter-doctors right logout" onClick={() => {window.localStorage.removeItem("username"); window.localStorage.removeItem("token");}}>
          <Link to='/signin'> Logout </Link>
       </div>
     </div>
      )
  }
}
