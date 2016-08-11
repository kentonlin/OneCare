import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import $ from 'jquery';
import DoctorView from './doctorView.jsx';
import { Link } from 'react-router';


export default class SymptomEntryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: true,
      index: 2,
      currentRec: null,
      isInRolodex: true,
      cloak: true
    };
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
    this.yalp = this.yalp.bind(this);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.recommendations.length !== 0) {
      console.log("de-cloaking", nextProps.recommendations[nextProps.recommendations.length-1].specialty)
      if(nextProps.recommendations[nextProps.recommendations.length-1].specialty) {
        this.setState({isInRolodex: true});
        this.setState({cloak: false});
      } else {
        this.setState({isInRolodex: false});
        this.setState({cloak: false});
      }
      // list is in reverse order
      this.setState({currentRec: nextProps.recommendations[nextProps.recommendations.length-1]});
    }
  }

  upvote() {
    this.setState({currentRec: {id: 1000, name:"success!"}});
    this.setState({isInRolodex: false});
    //training AJAX goes here!
    $.ajax({
        type: "POST",
        url: "/api/brain/add",
        headers: {
          "content-type": "application/json"
        },
        data: JSON.stringify({pair: [this.props.symptoms,[this.state.currentRec]]}),
        success: function(res) {
          console.log("The Brain thanks you for this knowledge.  ", res);
        },
        error: function(err) {
          console.error("You rekt da brain.  ", err);
        }
    });
  }

  downvote() {
    this.setState({index: this.state.index+1})
    if (this.state.index < this.props.recommendations.length) {
      var rec = this.props.recommendations[this.props.recommendations.length - this.state.index]
      this.setState({currentRec: rec});
      if(rec.specialty) {
        this.setState({isInRolodex: true});
      } else {
        this.setState({isInRolodex: false});
      }
    } else {
      this.setState({currentRec: {id: 0, name: "We're sorry, but we have no more recommendations to give you!"}});
    }
  }

  yalp() {
    var lel = 'lel';
    console.log(lel);
  }

  render() {
    return(
      <div>
        <div className={!this.state.currentRec ? '' : 'hidden'}><img src="./assets/spinner.gif"></img></div>
        <div className={this.state.cloak ? 'hidden' : '' +" recommend-modal-container"}>
          <h3 className="title modal-header">Your Selected Symptoms:</h3>
            <div className="modal-symptom-container">
            {
            this.props.symptoms.map((symptom) => {
              return (
                  <div key={symptom.id} className="modal-symptom-entry">
                    <div>{symptom.name}</div>
                  </div>
                )
              })
            }
          </div>
          <h4>We recommend:</h4>
            <div className={this.state.currentRec && this.state.currentRec.id === 1000 ? '' : 'hidden'}>We're glad to have been of assistance!</div>
            <div className={this.state.isInRolodex ? '' : 'hidden'}>
              <DoctorView
                name={this.state.currentRec ? this.state.currentRec.name : ''} 
                phone={this.state.currentRec ? this.state.currentRec.phone : ''}
                email={this.state.currentRec ? this.state.currentRec.email : ''}
                address={this.state.currentRec ? this.state.currentRec.address : ''}
                specialty={this.state.currentRec ? this.state.currentRec.specialty : ''} />
            </div>
            <div className={this.state.currentRec && this.state.currentRec.id !== 1000 && !this.state.isInRolodex ? '' : 'hidden'}>
              <h3>Oops...</h3>
              <div>We were about to recommend your <strong>{this.state.currentRec ? this.state.currentRec.name : '**empty**'}</strong>, but it appears you do not have one listed.  <Link to='/newdoctor'>Click here to register a new {this.state.currentRec ? this.state.currentRec.name : '**empty**'}!</Link></div>
              <div>Or check out some of these {this.state.currentRec ? this.state.currentRec.name : '**empty**'}s near HARDCODEDZIP****10001****HARDCODEDZIP</div>
              <button className={(this.state.currentRec && this.state.currentRec.id !== 1000 ? '' : 'hidden')+' modal-button'} onClick={this.yalp}>Show me the money</button>
            </div>
          <button className={(this.state.currentRec && this.state.currentRec.id !== 1000 ? '' : 'hidden')+' modal-button'} onClick={this.upvote}>Thanks!</button>
          <button className={(this.state.currentRec && this.state.currentRec.id !== 1000 ? '' : 'hidden')+' modal-button'} onClick={this.downvote}>Sorry, try again.</button>
        </div>
      </div>
      )
  }
}
