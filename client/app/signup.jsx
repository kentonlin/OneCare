import React, { Component } from 'react';
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
          $.get("/", function(data){
            console.log('signup successful');
            location.reload();
          });
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
          {/* <span> Username </span> <input type= "text" onChange= {(event) => {this.setState({"username": event.target.value})}}> </input>
          <span> Password </span> <input type= "password" onChange= {(event) => {this.setState({"password": event.target.value})}}></input>
          <span> Address </span> <input type= "text" onChange= {(event) => {this.setState({"address": event.target.value})}}></input>
          <span> Zip Code </span> <input type= "text" onChange= {(event) => {this.setState({"zipcode": event.target.value})}}></input>
          <span> Phone </span> <input type= "text" onChange={(event) => {this.setState({"phone": event.target.value})}}></input> */}
          <button onClick={ this.submitLogin }>Submit</button>
        </form>
      </div>
    );
  }
}
