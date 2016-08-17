import React, {Component} from 'react';
// impor  t $ from 'jquery';
import { Router, Route, Link, browserHistory } from 'react-router';
import {Image} from 'react-bootstrap';
// import {ButtonGroup} from 'react-bootstrap';
// import {Button} from 'react-bootstrap';
// import {DropdownButton} from 'react-bootstrap';
// import {MenuItem} from 'react-bootstrap';

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    // this.state= {
    //   openSignup: false,
    //   openLogin: false
    // };
    // this.openSignupPage = this.openSignupPage.bind(this);
    // this.openLoginPage = this.openLoginPage.bind(this);
  }

  // openSignupPage() {
  //   this.setState({
  //     openSignup: true
  //   });
  // }
  //
  // openLoginPage() {
  //   this.setState({
  //     openLoginPage: true
  //   })
  // }


  render() {
    return (
      <div>



        <div className= "splashHeader">

          <video autoPlay loop id="video-background">
            <source id="mp4" src="https://fpdl.vimeocdn.com/vimeo-prod-skyfire-std-us/01/3524/5/142623920/428365276.mp4?token=57b2102c_0x72f2cf429c3eaefc2c1b516326b1bcb63a9fe0b4" type="video/mp4"/>
          </video>

          <div className= "splashName">
            <h2> OneCare </h2>
          </div>

          <div>
            <Link to='/signin'> Login </Link>
          </div>

          <div>
            <Link to='/signup'> Signup </Link>
          </div>
        </div>


        <div className= "appDescribe">
          <h2> Prescription Reminder</h2>
          <h3> Text Reminders </h3>
          <h3> Remind by day/week/month </h3>
          <br/>
          <br/>
          <h2> Doctor Recommender </h2>
          <h3> Recommend a specialist </h3>
          <h3> Search for nearby specialists </h3>
        </div>













              {/* <ButtonGroup vertical>
        <Button>Button</Button>
        <Button>Button</Button>
        <DropdownButton title="Dropdown" id="bg-vertical-dropdown-1">
          <MenuItem eventKey="1">Dropdown link</MenuItem>
          <MenuItem eventKey="2">Dropdown link</MenuItem>
        </DropdownButton>
        <Button>Button</Button>
        <Button>Button</Button>
        <DropdownButton title="Dropdown" id="bg-vertical-dropdown-2">
          <MenuItem eventKey="1">Dropdown link</MenuItem>
          <MenuItem eventKey="2">Dropdown link</MenuItem>
        </DropdownButton>
        <DropdownButton title="Dropdown" id="bg-vertical-dropdown-3">
          <MenuItem eventKey="1">Dropdown link</MenuItem>
          <MenuItem eventKey="2">Dropdown link</MenuItem>
        </DropdownButton>
      </ButtonGroup> */}


      </div>
    );
  }
}
