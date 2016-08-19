import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import $ from 'jquery';
import {Button, ButtonToolbar, Form, FormGroup, Col, FormControl, ControlLabel, Checkbox, Row, Grid} from 'react-bootstrap';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName:"",
      lastName: "",
      username: "",
      password: "",
      address: "",
      phone: "",
      zipcode: 10001,
      email: "",
      invalidPhone: false,
      invalidEmail: false
    };
    this.submitUser = this.submitUser.bind(this);
    this.validatePhone = this.validatePhone.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  submitUser(e) {

    if(!this.state.invalidPhone && !this.state.invalidEmail) {
      alert("Please input a valid phone number and email");
    }
    else if (!this.state.invalidPhone) {
      alert("Please input a valid phone number");
    }
    else if (!this.state.invalidEmail) {
      alert("Please input a valid email");
    }
    else {
      window.localStorage.removeItem("currentPage");
      e.preventDefault();
      var newUser = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        password: this.state.password,
        address: this.state.address,
        phone: this.state.phone,
        zipcode: this.state.zipcode,
        email: this.state.email
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
            console.log('user signup successful! This is the data returned: ', data.user.zipcode);
            window.localStorage.setItem("username", data.user.username);
            window.localStorage.setItem("token", data.token);
            window.location = "/profile";
          },
          error: function(err){
            alert("Sorry! We were unable to sign you up. Please complete the empty fields. If all fields are complete, please select a different username");
            console.log('error in signup :', err);
          }
      });
    }
  }

  validatePhone(phone) {
    this.setState({
      invalidPhone: phone.match(/\d/g).length===10
    });
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log("test", re.test(email));
    console.log("state", this.state.invalidEmail);
    this.setState({
      invalidEmail: re.test(email)
    });
  }

  render() {
    return (
      <div className= "signup-container">
      <Grid>
        <Row>
          <h1> Sign-up </h1>
        </Row>
        <Row>
          <Form>
            <div className='signup-cat'> <span>First Name</span> <input className="signup-input" type="text" onChange={(event) => {this.setState({firstName: event.target.value})}}></input></div><br/>
            <div className='signup-cat'> <span>Last Name</span> <input className="signup-input" type="text" onChange={(event) => {this.setState({lastName: event.target.value})}}></input></div><br/>
            <div className='signup-cat'> &nbsp;<span>Username</span> <input className="signup-input" type="text" onChange={(event) => {this.setState({username: event.target.value})}}></input></div><br/>
            <div className='signup-cat'> &nbsp;<span>Password</span> <input className="signup-input" type="password" onChange={(event) => {this.setState({password: event.target.value})}}></input></div><br/>
            <div className='signup-cat'> &nbsp; &nbsp;&nbsp;<span>Address</span> <input className="signup-input" type="text" onChange={(event) => {this.setState({address: event.target.value})}}></input></div><br/>
            <div className='signup-cat'> &nbsp;&nbsp;&nbsp;<span>Zip code</span> <input className="signup-input" type="text" onChange={(event) => {this.setState({zipcode: event.target.value})}}></input></div><br/>
            <div className='signup-cat'> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>Phone</span> <input className="signup-input" type="text" onChange={(event) => {this.setState({phone: event.target.value})
          this.validatePhone(this.state.phone)}}></input></div><h6 className={(this.state.invalidPhone ? 'hidden' : 'invalid')}>Phone number must be 11 digits</h6>
            <div className='signup-cat'> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>Email</span> <input className="signup-input" type="text" onChange={(event) => {this.setState({email: event.target.value})
            this.validateEmail(this.state.email)}}></input></div><h6 className={(this.state.invalidEmail ? 'hidden' : 'invalid')}>Enter a valid email</h6>
            <Button bsStyle='success' className='signup-cat' onClick={ this.submitUser }>Submit</Button>
          </Form>
          <Link to="/signin">Return to Sign-in </Link>
        </Row>
      </Grid>
      </div>
    );
  }
}
