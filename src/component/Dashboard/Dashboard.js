import React from 'react';
import Home from './Home';
import Movie from '../Movie/Movie';
import EyeTest from '../EyeTest/EyeTest';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default function MiniDrawer() {
  return (
    <Router >
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/movie' component={Movie} />
        <Route exact path='/eye' component={EyeTest} />
      </Switch>
    </Router>
  );
}