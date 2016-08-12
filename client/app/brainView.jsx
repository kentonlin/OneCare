import React, { Component } from 'react';
import $ from 'jquery';
import BrainBitView from './brainBitView.jsx';

export default class BrainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brainState: this.props.brainState,
      pulses: []
    };
  }

  render() {
    return(
      <div className={this.state.brainState ? "brain-print-container" : ""}>
        {
          this.state.brainState.output.map((val, idx) => { 
            return (
              <BrainBitView key={idx} value={val} />
            )
          })
        }
      </div>
    )
  }
}
