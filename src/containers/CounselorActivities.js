import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from "react-router-dom";
import {
    Button, Glyphicon, Table, Panel, Pagination, Jumbotron, Col, Row, Checkbox, Breadcrumb,
    BreadcrumbItem, Nav, NavItem
} from 'react-bootstrap';
import Select from 'react-select';
import ReactCenter from "react-center"


class CounselorActivities extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            activities: []
        }
    }

    componentDidMount() {

        fetch(`http://192.168.99.100/api/activity/${this.props.authentication.email}`).then(response => {
            if (response.ok) {
                response.json().then(results => {
                    this.setState({activities: results});
                    //this.props.router.push(`/activities/${createdRequest._id}`);
                });
            } else {
                // response.json().then(error => {
                //     this.props.showError(`Failed to add issue: ${error.message}`);
                // });
            }
        }).catch(err => {
            this.props.showError(`Error in sending data to server: ${err.message}`);
        });

        fetch('http://localhost:3001/api/pending').then(response => {
            if (response.ok) {
                console.log('/api/pending! :D');
                response.json().then(results => {
                    console.log('Total pending activities: ' + results);

                    //console.log(this.state.activities);
                    //this.props.router.push(`/activities/${createdRequest._id}`);
                });
            } else {
                console.log('Unable to fetch pending activities')
                // response.json().then(error => {
                //     this.props.showError(`Failed to add issue: ${error.message}`);
                // });
            }
        }).catch(err => {
            this.props.showError(`Error in sending data to server: ${err.message}`);
        });
    }

    render() {

        const tabsInstance = (

            <div style={{backgroundColor: '#F8F8F8'}}>
                <Nav fluid>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link
                        to="/counselor/activities"><ReactCenter>Actividades</ReactCenter></Link></NavItem>
                </Nav>
            </div>
        );

        const activities = this.state.activities.map(activity =>

            <Col md={12}>

                <Panel  header={activity.activityName}>
                    <td><Link to={`/counselor/activities/${activity.id}`}>{activity.activityName}</Link></td>
                    <p>Description: {activity.activityDescription}</p>
                    <p>Organization: {activity.organization.organizationName}</p>
                    <p>Facility: {activity.facility.building + '-' + activity.facility.space}</p>
                    <p>Status: {activity.status.description}</p>
                </Panel>

            </Col>
        );

        return (
            <div className="container">
                <Col md={2}>
                    {tabsInstance}
                </Col>

                <Col md={10}>

                    <ol className="breadcrumb">
                        <li/>
                        <li className="active">Actividades</li>
                    </ol>

                    <Col md={7}>
                        <div>{activities}</div>
                    </Col>

                </Col>
            </div>
        )
    }
}

CounselorActivities.contextTypes = {
    initialState: React.PropTypes.object,
};

export default CounselorActivities;