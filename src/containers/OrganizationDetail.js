/**
 * Created by jesma on 12/11/2017.
 */
import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router-dom';

import {
    FormGroup, FormControl, ControlLabel, ButtonToolbar, Button,
    Panel, Form, Col, Alert, Radio, Well, MenuItem, DropdownButton, Jumbotron, Row
} from 'react-bootstrap';


const PAGE_SIZE = 10;

class OrganizationDetail extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            organization: {
                _id: 0,
                name: '',
                initials: '',
                creationDate: '',
                counselorName: '',
                counselorEmail: '',
                counselorTelephone: '',
                counselorFaculty: '',
                counselorDepartment: '',
                counselorOfficeNumber: ''
            },
            organizationActivities: []
        }
    }

    componentDidMount() {
        console.log('this.props.params.id: ' + this.props.match.params.id);
        let id = this.props.match.params.id;
        fetch(`http://localhost:3001/api/organizations/${id}`).then(response => {
            response.json().then(data => {
                console.log(data);
                this.setState({organization: data});
                console.log(this.state.organization._id);
            }).catch(err => {
                console.log(err)
                //this.props.showError(`Error in sending data to server: ${err.message}`);
            });
        });

        fetch(`/api/organizations/${id}/activities`).then(response => {
            response.json().then(data => {
                console.log(data);
                this.setState({organizationActivities: data});
            })
        })


    }

    onSubmit(event) {
        event.preventDefault();
    }


    render() {
        const organizationActivities = this.state.organizationActivities.map(activity =>
            <Col md={12}>
                <Panel  header={activity.requestTitle}>
                    <td><Link to={`/activities/${activity._id}`}>{activity.requestTitle}</Link></td>
                    <p>Organization Acronym: {activity.organization.name}</p>
                    <p>Request Title: {activity.requestDate}</p>
                    <p>Request Description: {activity.facilities.name}</p>
                </Panel>

            </Col>
        );

        const tabsInstance = (
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/request">Request</Link></li>
                    <li><Link to="/activities">Activities</Link></li>
                    <li><Link to="/stats">Stats</Link></li>
                    <li><Link to="/admin">Admin</Link></li>
                </ul>
            </div>
        );

        return (
            <div className="container">
                <Col md={2}>
                    {tabsInstance}
                </Col>

                <Col md={10}>
                    <ol className="breadcrumb">
                        <li/>
                        <li><Link to={`/admin/`}>Admin Panel</Link></li>
                        <li><Link to={`/admin/organizations`}>Organizations</Link></li>
                        <li className="active">Organization Details</li>
                    </ol>

                    <Panel  header={this.state.organization.name}>
                        <p>Organization Name: {this.state.organization.name}</p>
                        <p>Organization Initials: {this.state.organization.initials}</p>
                        <p>Creation Date: {this.state.organization.creationDate}</p>
                        <p>Counselor Name: {this.state.organization.counselorName}</p>
                        <p>Counselor Email: {this.state.organization.counselorEmail}</p>
                        <p>Counselor Telephone: {this.state.organization.counselorTelephone}</p>
                        <p>Counselor Faculty: {this.state.organization.counselorFaculty}</p>
                        <p>Counselor Department: {this.state.organization.counselorDepartment}</p>
                        <p>Counselor Office Number: {this.state.organization.counselorOfficeNumber}</p>
                        <Row>
                            <Col md="1"><Link to={`/activities/`}><Button className="btn btn-primary">Back</Button></Link></Col>
                            <Col md="1"><Button className="btn-success">Contact</Button></Col>
                            <Col md="1"><Button className="btn-warning">Edit</Button></Col>
                        </Row>
                    </Panel>
                </Col>

                <Col md={10}>
                    <Panel header="Recent Activities">
                        {organizationActivities}
                    </Panel>
                </Col>
            </div>
        )
    }
}


OrganizationDetail.contextTypes = {
    initialState: React.PropTypes.object,
};

export default OrganizationDetail;