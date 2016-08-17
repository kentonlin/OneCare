import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class DRXView extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    console.log(this.props.info);
    return (
      <div className="card-wrap">
        <div className="profile_pic-wrap">
          <img src={this.props.info.profile.image_url} alt=""></img>
        </div>
        <div>
          <p>
            {this.props.info.ratings[0] ? this.props.info.ratings[0].rating+' stars' : 'No rating found'}
          </p>
        </div>
        <div className="info-wrap">
          <h3 className="user-name">{this.props.info.profile.first_name+' '+this.props.info.profile.last_name}</h3>
          <p>{this.props.info.profile.bio}</p>
        </div>
      </div>
    );
  }
}