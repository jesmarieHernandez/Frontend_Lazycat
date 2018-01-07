import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from "react-router-dom";
import {
    Button, Glyphicon, Table, Panel, Pagination, Jumbotron, Col, Row, Checkbox, Breadcrumb,
    BreadcrumbItem, Nav, NavItem
} from 'react-bootstrap';
import Select from 'react-select';
import ReactCenter from "react-center";


class StudentActivities extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            activities: []
        }
    }

    componentDidMount() {

        fetch(`http://localhost:8000/api/activity/${this.props.authentication.email}`).then(response => {
            if (response.ok) {
                console.log('Colon');
                response.json().then(results => {
                    console.log(':)');
                    console.log(results);
                    this.setState({activities: results});
                    console.log(this.state.activities);
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
                        to="/student/activities"><ReactCenter>Activities</ReactCenter></Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link
                        to="/student/request"><ReactCenter>Request</ReactCenter></Link></NavItem>
                </Nav>
            </div>
        );
        const activities = this.state.activities.map(activity =>

            <Col md={12}>

            <Panel  header={activity.activityName}>
                <td><Link to={`/activities/${activity.id}`}>{activity.activityName}</Link></td>
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


                    <Col md={9}>
                        <ol className="breadcrumb">
                            <li/>
                            <li className="active">Activities</li>
                        </ol>
                        {activities}
                    </Col>

                    <Col md={3}>
                        <Panel header='Activities'>
                            <ReactCenter><Link to="/student/request"><Button bsSize="medium">New
                                Request</Button></Link></ReactCenter>
                        </Panel>


                    </Col>
                </Col>
            </div>
        )
    }
}

StudentActivities.contextTypes = {
    initialState: React.PropTypes.object,
};

export default StudentActivities;