/**
 * Created by jesma on 12/16/2017.
 */
import React from "react";
import { Route, Redirect } from "react-router-dom";

export default ({ component: C, props: cProps, ...rest }) =>
    <Route
        {...rest}
        render={props =>
            cProps.authentication.signedIn && cProps.authentication.role === '5'
                ? <C {...props} {...cProps} />
                : <Redirect
                to={`/login?redirect=/`}
            />}
    />;


