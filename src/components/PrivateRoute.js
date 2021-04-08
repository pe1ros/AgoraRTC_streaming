import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';

const PrivateRoute = (props) => {
  const { component: Component, user, ...rest } = props;
  return (
    <Route
      {...rest}
      render={
        (routeProps) => (
          user
            ? <Component {...routeProps} />
            : (
              <Redirect to={{ pathname: '/login' }} />
            ))
      }
    />
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.loginReducer.user,
  };
};

export default connect(mapStateToProps)(PrivateRoute);