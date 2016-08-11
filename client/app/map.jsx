import React from 'react';
import Modal from 'react-modal';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: true,
    };
  }

  render() {
    return (
      var zip = {this.props.zipcode}
      <iframe
      width="650"
      height="450"
      // frameborder="0"
      // style="border:0"
      src="https://www.google.com/maps/embed/v1/search?key=AIzaSyCnPK2o-dXX9hTQdMA4dTXIezhxyIzfRB0&q=pharmacy+near+" + zip  allowfullscreen>
      </iframe>
    );
  }
}
