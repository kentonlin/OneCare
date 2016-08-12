import React, { Component } from 'react';

export default class DRXView extends React.Component {
  constructor(props) {
    super(props);
  }

  // this line of code will display insurance taken of each doctor, which is an array:
  // <div><span className="drx-attribute">Bio: </span>{this.props.info.insurances[i].insurance_provider.name}</div>
  render() {
    console.log(this.props.info);
    return (
      <div className="drx-view-container">
        <div><span className="drx-attribute">Image: </span><img src={this.props.info.profile.image_url}></img></div>
        <div><span className="drx-attribute">Rating: </span>{this.props.info.ratings[0] ? this.props.info.ratings[0].rating+' stars' : 'No rating found'}</div>
        <div><span className="drx-attribute">Name: </span>{this.props.info.profile.first_name+' '+this.props.info.profile.last_name}</div>
        <div><span className="drx-attribute">Bio: </span>{this.props.info.profile.bio}</div>
      </div>
    );
  }
}
