import React from "react";
import { Route, Redirect } from "react-router-dom";

export default ({ component: C, props: cProps, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      cProps.isAuthenticated && cProps.getUserRole() === '1'
        ? <C {...props} {...cProps} />
        : <Redirect
            to={`/login`}
          />}
  />;

