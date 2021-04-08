import React, { useEffect } from 'react';
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './Pages/Login';
import Live from './Pages/Live';
import Verify from './Pages/Verify';


import { getUserDataRequest } from './store/login/actions';
import PrivateRoute from './components/PrivateRoute';

const App = ({user, getUserDataRequest}) => {

  useEffect(() => {
    if (!user && localStorage.getItem('user')) {
      getUserDataRequest();
    }
  }, [user]);

  return (
        <>
          <Switch>
              <Route
              path="/login"
              render={() => (!user
                ? <Login />
                : <Redirect to={`/live`} />)}
            />
              <Route
              path="/verify"
              render={() => (!user
                ? <Verify />
                : <Redirect to={`/live`} />)}
            />
            <PrivateRoute path="/live" component={Live} />
            <Route path="*" render={() => <Redirect to="/login" />} />
          </Switch>
        </>
  );
};

const mapStateToProps = (state) => ({
  user: state.loginReducer.user,
});

const mapDispatchToProps = {
  getUserDataRequest,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
