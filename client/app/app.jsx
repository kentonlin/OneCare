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
import SymptomEntry from './symptomEntry.jsx'
import Signup from './signup.jsx';

class App extends React.Component {
  render() {
    return(
      <Router history={browserHistory}>
        <Route path='/' component={Container}>
            <IndexRoute component={Signin} />
            {/* <Route path='/home' component={} /> */}
            <Route path='/remind' component={ScriptRemindView} />
            {/* <Route path= '/alldoctors' component={Signup} /> */}
            <Route path='/newdoctor' component={DoctorEntryView} />
            <Route path='/recommend' component={SymptomEntry} />
            <Route path='/signin' component={Signin} />
            <Route path='*' component={NotFoundView} />
          </Route>
      </Router>

      )
  }
}
if(typeof window !== 'undefined') {
    React.render(<div><App /></div>, document.getElementById("app"));
}