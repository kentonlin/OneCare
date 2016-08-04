import React, {Component} from 'react';
import $ from 'jquery';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  submitUser(e) {
    e.preventDefault();
    var newUser = {
      username: this.state.username,
      password: this.state.password,

    }
  }

  render() {
    return (
      <div>
        <h1> Fuck Ken </h1>
      </div>
    )
  }
}
