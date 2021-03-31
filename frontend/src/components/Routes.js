import React from 'react';
import '../App.css';
import { Login, noUrlMatch, Dashboard, Forgot, Reset } from '../pages'
import { PrivateRoute } from './index'
import { Route, Switch, Redirect } from 'react-router-dom'

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        
        <PrivateRoute exact path="/">
              <Redirect to="/" />
          </PrivateRoute>
        <PrivateRoute exact path="/Dashboard" component={Dashboard} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgot" component={Forgot} />
        <Route exact path="/reset" component={Reset} />
        <Route component={noUrlMatch} />
      </Switch>
    );
  }
}

export default Routes;
