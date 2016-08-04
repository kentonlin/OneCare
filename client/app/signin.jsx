import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import Signup from './signup.jsx'

export default class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.submitLogin = this.submitLogin.bind(this);
    this.signup = this.signup.bind(this);
  }

  componentDidMount() {
    window.localStorage.currentPage = 'signin';
  }


  submitLogin(e) {
    e.preventDefault();
    var user = {
      "username": this.state.username,
      "password": this.state.password
    };

    $.ajax({
      type: "POST",
      url: "/api/signin",
      dataType: 'json',
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify(user),
      success: function(data){
        console.log("user signed in", data);
        window.localStorage.setItem("username", data.user.username);
        window.localStorage.setItem("token", data.token);
        $.get("/", function(data) {
          console.log("login successful!");
          location.reload();
        });
      },
      error: function(err){
        console.log('user not found in database error in ajax', err);
      }
    });
  }

  signup() {
    console.log("wtf", window.localStorage);
    window.localStorage.currentPage = "signup";
    ReactDOM.render(<div> <Signup/> </div>, document.getElementById("app"));
  }

  render() {
    return (
      <div className="signin-container">
        <h1>Sign in to OneCare</h1>
        <Link to='/remind'>Reminder View</Link>
        <form>
          <span>username</span><input type="text" onChange={(event) => {this.setState({username: event.target.value})}}></input><br />
          <span>password</span><input type="password" onChange={(event) => {this.setState({password: event.target.value})}}></input><br />
          <button onClick= {this.signup}> Signup create a new account </button>
          <button onClick={ this.submitLogin}>Submit</button>
        </form>
      </div>
    );
  }
}
