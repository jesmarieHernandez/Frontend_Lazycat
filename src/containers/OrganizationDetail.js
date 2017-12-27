/**
 * Created by jesma on 12/11/2017.
 */
import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router-dom';

import {
    FormGroup, FormControl, ControlLabel, ButtonToolbar, Button,
    Panel, Form, Col, Alert, Radio, Well, MenuItem, DropdownButton, Jumbotron, Row, Nav, NavItem
} from 'react-bootstrap';
import ReactCenter from "react-center";
import Icon from 'react-icons-kit';
import { statsDots } from 'react-icons-kit/icomoon/statsDots';
import { iosPaw } from 'react-icons-kit/ionicons/iosPaw';
import { home } from 'react-icons-kit/icomoon/home';
import { fileText2 } from 'react-icons-kit/icomoon/fileText2';
import { userTie } from 'react-icons-kit/icomoon/userTie';


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
        fetch(`http://localhost:8000/api/organizations/${id}`).then(response => {
            response.json().then(data => {
                console.log(data);
                this.setState({organization: data[0]});
            }).catch(err => {
                console.log(err)
                //this.props.showError(`Error in sending data to server: ${err.message}`);
            });
        });

        fetch(`/api/admin/organizations/${id}/activities`).then(response => {
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
                <Panel header={activity.requestTitle}>
                    <td><Link to={`/activities/${activity._id}`}>{activity.requestTitle}</Link></td>
                    <p>Organization Acronym: {activity.organization.name}</p>
                    <p>Request Title: {activity.requestDate}</p>
                    <p>Request Description: {activity.facilities.name}</p>
                </Panel>

            </Col>
        );

        const tabsInstance = (

            <div style={{backgroundColor: '#F8F8F8'}}>
                <Nav fluid>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/request"><Icon icon={fileText2} style={{paddingRight: "20px"}} />Request</Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/activities"><Icon icon={iosPaw} style={{paddingRight: "20px"}}/>Activities</Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}> <Link to="/stats"><Icon icon={statsDots} style={{paddingRight: "20px"}}/>Statistics</Link></NavItem>
                    <NavItem> <Link to="/admin"><Icon icon={userTie} style={{paddingRight: "20px"}}/>Admin</Link></NavItem>
                </Nav>
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

                        <Panel header={this.state.organization.organizationName}>
                            <p>Organization Name: {this.state.organization.organizationName}</p>
                            <p>Organization Initials: {this.state.organization.organizationInitials}</p>
                            <p>Creation Date: {this.state.organization.created_at}</p>
                            <p>Counselor Name: {this.state.organization.fullName}</p>
                            <p>Counselor Email: {this.state.organization.counselorEmail}</p>
                            <p>Counselor Telephone: {this.state.organization.counselorPhone}</p>
                            <p>Counselor Faculty: {this.state.organization.counselorFaculty}</p>
                            <p>Counselor Department: {this.state.organization.counselorDepartment}</p>
                            <p>Counselor Office Number: {this.state.organization.counselorOffice}</p>
                            <Row>
                                <Col md="1"><Link to={`/activities/`}><Button className="btn btn-primary">Back</Button></Link></Col>
                                <Col md="1"><Link to={`/`}><Button className="btn-success">Contact</Button></Link></Col>
                                <Col md="1"><Link to={`/`}><Button className="btn-warning">Edit</Button></Link></Col>
                                <Col md="1"><Link to={`/`}><Button className="btn-success">Add Member</Button></Link></Col>
                            </Row>
                        </Panel>
                    </Col>

                    <Col md={2}></Col>

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