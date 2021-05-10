import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './component/Auth/Login';
import Logout from './component/Auth/Logout';
import Register from './component/Auth/Register';
import Dashboard from './component/Dashboard/Dashboard';
import ErrorPage from './component/Error/404';
import requireAuth from './component/Auth/requireAuth';

export default function App() {
  return (
    <Router >
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/logout' component={Logout} />
        <Route exact path='/login' component={Login} />
        <Route component={requireAuth(Dashboard)} />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  )
}
