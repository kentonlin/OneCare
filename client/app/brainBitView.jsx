import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class BrainBitView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      halting: false,
      isOn: true
    }
  }

  componentWillUnmount() {
    this.setState({halting: true});
  }

  componentDidMount() {
    setInterval(() => {
      if (this.state.isOn && !this.state.halting) {
        this.setState({isOn: false});
      } else {
        this.setState({isOn: true});
      }
    }, Math.abs(this.props.value)*100)
  }

  render() {
    return (
      <div className="brain-print-block">
          <ReactCSSTransitionGroup 
            transitionName="blink" 
            transitionEnterTimeout={500} 
            transitionLeaveTimeout={300}>
            <span>{this.state.isOn ? (<div className="brain-print-block-show"></div>) : (<div className="brain-print-block-hide"></div>)}</span>
          </ReactCSSTransitionGroup>
      </div>
      )
  }
}