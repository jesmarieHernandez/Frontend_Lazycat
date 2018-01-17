import React from "react";
import {Route, Switch, Router, Redirect} from "react-router-dom";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import AdminRoute from "./components/AdminRoute";
import StudentRoute from "./components/StudentRoute";
import CounselorRoute from "./components/CounselorRoute";
import ManagerRoute from "./components/ManagerRoute";
import StaffRoute from "./components/StaffRoute"

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
import StudentRequest from "./containers/StudentRequest";
import StudentActivities from "./containers/StudentActivities";
import StudentActivityDetail from "./containers/StudentActivityDetail"
import CounselorActivities from "./containers/CounselorActivities";
import ManagerActivities from "./containers/ManagerActivities";
import StaffActivities from "./containers/StaffActivities"
import StaffStatistics from "./containers/StaffStatistics";
import EditActivity from "./containers/EditActivity"

export default ({childProps}) => {

    console.log(':D');
    return (
    <Switch>
        {/*<AppliedRoute path="/" exact component={Home} props={childProps}/>*/}
        <UnauthenticatedRoute path="/" exact component={Login} props={childProps}/>
        <UnauthenticatedRoute path="/login" exact component={Login} props={childProps}/>
        <AdminRoute path="/request" exact component={Request} props={childProps}/>
        <AdminRoute path="/activities" exact component={Activities} props={childProps}/>
        <AdminRoute path="/activities/edit" exact component={EditActivity} props={childProps}/>
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
        <StudentRoute path="/student/request/" exact component={StudentRequest} props={childProps}/>
        <StudentRoute path="/student/activities/" exact component={StudentActivities} props={childProps}/>
        <StudentRoute path="/student/activities/:id" exact component={StudentActivityDetail} props={childProps}/>\
        <CounselorRoute path="/counselor/activities" exact component={CounselorActivities} props={childProps}/>
        <ManagerRoute path="/manager/activities" exact component={ManagerActivities} props={childProps}/>
        <ManagerRoute path="/manager/activities/:id" exact component={ActivityDetail} props={childProps}/>
        <StaffRoute path="/staff/activities" exact component={StaffActivities} props={childProps}/>
        <StaffRoute path="/staff/statistics" exact component={StaffStatistics} props={childProps}/>

        {/* Finally, catch all unmatched routes */}
        <UnauthenticatedRoute component={Login} props={childProps}/>
    </Switch>
    )
}


