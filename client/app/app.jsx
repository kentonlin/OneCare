import React from 'react';
import ReactDOM from 'react-dom';
import Navigator from './navigator.jsx';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import ScriptRemindView from './scriptRemind.jsx';
import NotFoundView from './notFound.jsx';
import Signin from './signin.jsx';
import Container from './container.jsx';
import DoctorListView from './doctorListView.jsx';
import DoctorEntryView from './doctorEntryView.jsx';
import SymptomEntry from './symptomEntry.jsx';
import Signup from './signup.jsx';
import Profile from './profile.jsx';

class App extends React.Component {

  authCheck() {
    console.log("authcheck called");
    if(!window.localStorage.token) {
        window.location= "/signin";
    }else {
      console.log('authenticated user!');
    }
  }

  render() {
    return(
      <Router history={browserHistory}>
        <Route path='/' component={Container}>
            <IndexRoute component={Signin} />
            <Route path='/remind' onEnter={this.authCheck} component={ScriptRemindView} />
            <Route path= '/alldoctors' component={DoctorListView} />
            <Route path='/profile' onEnter={this.authCheck} component={Profile} />
            <Route path='/newdoctor' onEnter={this.authCheck} component={DoctorEntryView} />
            <Route path='/recommend' onEnter={this.authCheck} component={SymptomEntry} />
            <Route path='/signin' component={Signin} />
            <Route path='/signup' component={Signup} />
            <Route path='/*' component={NotFoundView} />
          </Route>
      </Router>
    );
  }
}

ReactDOM.render(<div><App /></div>, document.getElementById("app"));
