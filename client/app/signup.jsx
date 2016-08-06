import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import $ from 'jquery';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      address: "",
      phone: "",
      zipcode: ""
    };
    this.submitUser = this.submitUser.bind(this);
  }

  submitUser(e) {
    window.localStorage.removeItem("currentPage");
    e.preventDefault();
    var newUser = {

      username: this.state.username,
      password: this.state.password,
      address: this.state.address,
      phone: this.state.phone,
      zipcode: this.state.zipcode
    };

    $.ajax({
      type: 'POST',
      url: '/api/signup',
      dataType: 'json',
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify(newUser),
        success: function(data){
          console.log('user signup successful! This is the data returned: ', data);
          window.localStorage.setItem("username", data.user.username);
          window.localStorage.setItem("token", data.token);
          window.location = "/profile";
        },
        error: function(err){
          console.log('error in signup :', err);
        }
    });
  }

  // validateNumber(e) {
  //   e.preventDefault();
  //
  // }

  render() {
    return (
      <div className= "signup-container">
        <h1> Signup </h1>
        <form>
          <span>username</span><input type="text" onChange={(event) => {this.setState({username: event.target.value})}}></input><br />
          <span>password</span><input type="password" onChange={(event) => {this.setState({password: event.target.value})}}></input><br />
          <span>address</span><input type="text" onChange={(event) => {this.setState({address: event.target.value})}}></input><br />
          <span>zip code</span><input type="text" onChange={(event) => {this.setState({zipCode: event.target.value})}}></input><br />
          <span>phone</span><input type="text" onChange={(event) => {this.setState({phone: event.target.value})}}></input><br />
          <button onClick={ this.submitUser }>Submit</button>
        </form>
        <Link to="/signin">Signin </Link>
      </div>
    );
  }
}
