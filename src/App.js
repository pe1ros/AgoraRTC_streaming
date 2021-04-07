import React, { useEffect } from 'react';
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import Login from './Pages/Login';
import Live from './Pages/Live';
import Verify from './Pages/Verify';


import { getUserDataRequest } from './store/login/actions';

const App = (props) => {
  const {
    user,
    getUserDataRequest,
  } = props;

  const history = useHistory();
  useEffect(() => {
    if (!user && localStorage.getItem('user')) {
      getUserDataRequest();
    }
    user && history.push('/live')
  }, [user]);

  return (
        <>
          <Switch>
            {!user ? 
            <>
              <Route
                path="/login"
                component={Login}
              />
              <Route
                path="/verify"
                component={Verify}
              />
            </>
          : <Route
          path="/live"
          component={Live}
        />}
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
