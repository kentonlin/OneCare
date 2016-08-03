import React, { Component } from 'react';
import $ from 'jquery';

export default class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.submitLogin = this.submitLogin.bind(this);
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
      },
      error: function(err){
        console.log('error in ajax request', err);
      }
    });
  }

  render() {
    return (
      <div className="signin-container">
        <h1>Sign in to OneCare</h1>
        <form>
          <span>username</span><input type="text" onChange={(event) => {this.setState({username: event.target.value})}}></input><br />
          <span>password</span><input type="text" onChange={(event) => {this.setState({password: event.target.value})}}></input><br />
          <h2> Signup create a new account </h2>
          {/* <div className="signin-button" onClick={() => {
            window.localStorage.setItem("username", "Patrick");
            window.localStorage.setItem("token", "KrustyKrab");
            $.get("/", function(data) {
              console.log("login successful!");
              location.reload();
            });
          }}>Log thyself in.</div> */}
          <button onClick={ this.submitLogin}>Submit</button>
        </form>
      </div>
    );
  }
}
