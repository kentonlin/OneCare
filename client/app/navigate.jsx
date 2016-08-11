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

componentDidMount(){
  if(!window.localStorage.latitude) {
    navigator.geolocation.getCurrentPosition(function(location) {
      window.localStorage.latitude = location.coords.latitude;
      window.localStorage.longitude = location.coords.longitude;

      console.log("lat", location.coords.latitude);
      console.log("long", location.coords.longitude);
      console.log("accur", location.coords.accuracy);
    });
  }
}

  render() {
    return(
     <div className="navbar-container">
       <h1 className="title">Welcome to OneCare, {this.state.username}!</h1>
       <div className="navbar-button navbar-home">
        <Link to='/profile'> Profile </Link>
       </div>
       <div className="navbar-button navbar-recommend-doctors">
          <Link to='/recommend'> Physician Recommender </Link>
       </div>
       <div className="navbar-enter-doctors right logout" onClick={() => {window.localStorage.removeItem("username"); window.localStorage.removeItem("token");}}>
          <Link to='/signin'> Logout </Link>
       </div>
     </div>
   );
  }
}
