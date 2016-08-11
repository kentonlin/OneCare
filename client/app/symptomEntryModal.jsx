import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import $ from 'jquery';
import DoctorView from './doctorView.jsx';
import { Link } from 'react-router';
import BrainView from './brainView.jsx'

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
    this.drx = this.drx.bind(this);
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

  drx() {
    var api_key = '87b39c90783391ac6ce972736d117741';
    var query = (this.state.currentRec ? this.state.currentRec.name : '**empty**').split(' ').join('%20');
    var latitude = window.localStorage.latitude;
    var longitude = window.localStorage.longitude;
    var location = latitude+'%2C'+longitude;
    var resource_url = 'https://api.betterdoctor.com/2016-03-01/doctors?query='+query+'&user_location='+location+'&skip=0&limit=10&user_key='+api_key;

    $.ajax({
      type: 'GET',
      url: resource_url,
      success: function(data) {
        console.log('++++++++++++++++',query);
        console.log(data);
      },
      error: function(err) {
        console.log('not quite right');
      }
    });

    console.log('===============>', resource_url);
  }

  render() {
    return(
      <div>
        <div className={(!this.state.currentRec ? '' : 'hidden ') + 'brain-print-container'}><BrainView brainState={this.props.brainState} /></div>
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
              <div>Or, check out some {this.state.currentRec ? this.state.currentRec.name : '**empty**'}s near you. Click the MONEY button!</div>
              <button onClick={this.drx}>Show me the MONEY</button>
            </div>
          <button className={(this.state.currentRec && this.state.currentRec.id !== 1000 ? '' : 'hidden')+' modal-button'} onClick={this.upvote}>Thanks!</button>
          <button className={(this.state.currentRec && this.state.currentRec.id !== 1000 ? '' : 'hidden')+' modal-button'} onClick={this.downvote}>Sorry, try again.</button>
        </div>
      </div>
      )
  }
}
