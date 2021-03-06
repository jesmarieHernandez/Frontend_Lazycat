import React from "react";
import { Route, Redirect } from "react-router-dom";

export default ({ component: C, props: cProps, ...rest }) =>
  <Route
    {...rest}
    render={props =>
        cProps.cookies.get('signedIn') === 'true' && cProps.cookies.get('role') === '3'
        ? <C {...props} {...cProps} />
        : <Redirect
            to={`/login?redirect=/student/activities`}
          />}
  />;

