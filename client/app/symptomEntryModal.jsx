import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import $ from 'jquery';


export default class SymptomEntryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: true,
      index: 2,
      currentRec: {id: 0, name: "Please wait.  We are determining your specialist."}
    };
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.recommendations.length !== 0) {
      this.setState({currentRec: nextProps.recommendations[nextProps.recommendations.length-1]});
    }
  }

  upvote() {
    console.log("upboated.");
    this.setState({currentRec: {id: 0, name: "We're glad to be of service!"}});
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
    console.log("downboated.");
    this.setState({index: this.state.index+1})
    if (this.state.index < this.props.recommendations.length) {
      this.setState({currentRec: this.props.recommendations[this.props.recommendations.length - this.state.index]});
    } else {
      this.setState({currentRec: {id: 0, name: "We're sorry, but we have no more recommendations to give you!"}});
    }
  }

  render() {
    return(
        <div className="recommend-modal-container">
          <h3>Your Selected Symptoms:</h3>
          {
          this.props.symptoms.map((symptom) => {
            return (
                <div key={symptom.id}>
                  <div>{symptom.name}</div>
                </div>
              )
            })
          }
          <h4>We recommend:</h4>
            {
              this.state.currentRec.name
            }

          <button className={this.state.currentRec.id === 0 ? 'hidden' : ''} onClick={this.upvote}>Thanks!</button>
          <button className={this.state.currentRec.id === 0 ? 'hidden' : ''} onClick={this.downvote}>Sorry, try again.</button>
        </div>
      )
  }
}
