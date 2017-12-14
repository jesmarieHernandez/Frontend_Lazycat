import React from "react";
import {Route, Switch, Router} from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import AdminRoute from "./components/AdminRoute"

import Home from "./containers/Home";
import Login from "./containers/Login";
import Request from "./containers/Request";
import Activities from "./containers/Activities";
import ActivityDetail from "./containers/ActivityDetail";
import Stats from "./containers/Stats";
import Admin from "./containers/Admin";
import Facilities from "./containers/Facilities";
import FacilitiesDetail from "./containers/FacilitiesDetail";
import NewFacilities from "./containers/NewFacilities";
import Organizations from "./containers/Organizations";
import NewOrganization from "./containers/NewOrganization";
import OrganizationDetail from "./containers/OrganizationDetail";
import Users from "./containers/Users";
import NewUser from "./containers/NewUser";
import UserDetail from "./containers/UserDetail";
import NotFound from "./containers/NotFound";

export default ({childProps}) =>
    <Switch>
        {/*<AppliedRoute path="/" exact component={Home} props={childProps}/>*/}
        <AuthenticatedRoute path="/" exact component={Home} props={childProps}/>
        <AdminRoute path="/request" exact component={Request} props={childProps}/>
        <UnauthenticatedRoute path="/login" exact component={Login} props={childProps}/>
        <AdminRoute path="/activities" exact component={Activities} props={childProps}/>
        <AdminRoute path="/activities/:id" exact component={ActivityDetail} props={childProps}/>
        <AdminRoute path="/stats" exact component={Stats} props={childProps}/>
        <AdminRoute path="/admin" exact component={Admin} props={childProps}/>
        <AdminRoute path="/admin/facilities" exact component={Facilities} props={childProps}/>
        <AdminRoute path="/admin/facilities/create" exact component={NewFacilities} props={childProps}/>
        <AdminRoute path="/admin/facilities/:id" exact component={FacilitiesDetail} props={childProps}/>
        <AdminRoute path="/admin/organizations" exact component={Organizations} props={childProps}/>
        <AdminRoute path="/admin/organizations/create" exact component={NewOrganization} props={childProps}/>
        <AdminRoute path="/admin/organizations/:id" exact component={OrganizationDetail} props={childProps}/>
        <AdminRoute path="/admin/users/" exact component={Users} props={childProps}/>
        <AdminRoute path="/admin/users/create" exact component={NewUser} props={childProps}/>
        <AdminRoute path="/admin/users/:id" exact component={UserDetail} props={childProps}/>
        {/*
         */}
        {/*
         <AdminRoute path="/admin/facilities/   " exact component={FacilitiesDetail} props={childProps}/>
         */}
        {/*<AuthenticatedRoute path="/notes/new" exact component={NewNote} props={childProps}/>*/}
        {/*<AuthenticatedRoute path="/notes/:id" exact component={Notes} props={childProps}/>*/}
        {/* Finally, catch all unmatched routes */}
        <Route component={NotFound}/>
    </Switch>;
