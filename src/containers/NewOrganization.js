/**
 * Created by jesma on 12/11/2017.
 */

import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router-dom';

import {
    FormGroup, FormControl, ControlLabel, ButtonToolbar, Button,
    Panel, Form, Col, Alert, Radio, Well, MenuItem, DropdownButton, Jumbotron, Nav, NavItem
} from 'react-bootstrap';
import ReactCenter from "react-center"



const PAGE_SIZE = 10;

class CreateOrganization extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            organizationTypes: [],
            selectedOrganizationType: {}
        }

        this.onOrganizationTypeSelected = this.onOrganizationTypeSelected.bind(this);

    }

    componentDidMount() {
        fetch('http://localhost:8000/api/organization_types/').then(response => {
            if (response.ok) {
                response.json().then(results => {
                    console.log("Organization Types");
                    console.log(results);
                    this.setState({organizationTypes: results});
                    console.log(this.state.organizationTypes);
                    //this.props.router.push(`/activities/${createdRequest._id}`);
                });
            } else {
                // response.json().then(error => {
                //     this.props.showError(`Failed to add issue: ${error.message}`);
                // });
            }
        }).catch(err => {
            //this.props.showError(`Error in sending data to server: ${err.message}`);
        });

    }
    onOrganizationTypeSelected(event) {
        // event.preventDefault();
        const selectedOrganizationType = this.state.organizationTypes.filter(function (obj) {

            console.log('Current object code' + obj.code);
            console.log('Event target value' + event.target.value);

            console.log(obj.code == event.target.value);
            return obj.code == event.target.value;
        });
        // console.log("Selected organization type: " + selectedOrganizationType[0]);
        console.log(this.state.selectedOrganizationType);
        this.setState({selectedOrganizationType: selectedOrganizationType[0]});
        console.log('Shiiiittt');
        console.log(this.state.selectedOrganizationType);

        // console.log("Selected organization type: " + this.state.selectedOrganizationType);
    }

    onSubmit = (event) => {
        event.preventDefault();

        console.log('Form was submitted');

        const form = document.forms.newOrganization;


        const newOrganization = {
            organizationName: form.organizationName.value,
            organizationType_code: form.organizationType.value,
            organizationInitials: form.organizationInitials.value,
            organizationStatus_code: 1,
            fullName: form.organizationCounselorName.value,
            counselorEmail: form.organizationCounselorEmail.value,
            counselorPhone: form.organizationCounselorTelephone.value,
            counselorFaculty: form.organizationCounselorFaculty.value,
            counselorDepartment: form.organizationCounselorDepartment.value,
            counselorOffice: form.organizationCounselorOfficeNumber.value

        };

        console.log(newOrganization);
        fetch('http://localhost:8000/api/organizations', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newOrganization),
        }).then(response => {
            if (response.ok) {
                console.log(response);
                response.json().then(createdOrganization => {
                    console.log('New organization was created successfully!');
                    console.log('Organization ID: ' + createdOrganization._id);

                    this.props.history.push(`/admin/organizations/`);
                    // this.props.history.push(`/admin/organizations/${createdOrganization._id}`);
                })
            } else {
                response.json().then(error => {
                    //this.props.showError(`Failed to create request: ${error.message}`);
                });
            }
        }).catch(err => {
            //this.props.showError(`Error in sending data to server: ${err.message}`);
        });
    }


    render() {
        const tabsInstance = (

            <div style={{backgroundColor: '#F8F8F8'}}>
                <Nav fluid>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/request"><ReactCenter>Request</ReactCenter></Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/activities"><ReactCenter>Activities</ReactCenter></Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}> <Link to="/stats"><ReactCenter>Stats</ReactCenter></Link></NavItem>
                    <NavItem> <Link to="/admin"><ReactCenter>Admin</ReactCenter></Link></NavItem>
                </Nav>
            </div>
        );

        const organizationTypes = this.state.organizationTypes.map(option =>
            <option value={option.code}>{option.description}</option>
        );

        return (
            <div className="container">
                <Col md={2}>
                    {tabsInstance}
                </Col>

                <Col md={10}>
                    <ol className="breadcrumb">
                        <li/>
                        <li ><Link to={`/admin`}>Admin Panel</Link></li>
                        <li ><Link to={`/admin/organizations`}>Organizations</Link></li>
                        <li className="active">Create New Organization</li>
                    </ol>

                    <Panel header="Create New Organization">
                        <Form horizontal onSubmit={this.onSubmit} name="newOrganization">
                            <FormGroup>
                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Organization Name</Col>
                                    <FormControl name="organizationName"/>
                                </Col>

                                {/*<Col sm={4}>*/}
                                    {/*<Col componentClass={ControlLabel}>Organization Type</Col>*/}
                                    {/*<FormControl name="organizationType"/>*/}
                                {/*</Col>*/}

                                <Col md={4}>
                                    <Col componentClass={ControlLabel}>Organization Type</Col>

                                    <FormControl componentClass="select" name="organizationType"
                                                 onChange={this.onOrganizationTypeSelected}
                                                 placeholder="select" required>
                                        <option>select</option>
                                        {organizationTypes}
                                    </FormControl>
                                </Col>

                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Organization Initials</Col>
                                    <FormControl name="organizationInitials"/>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Counselor Name</Col>
                                    <FormControl name="organizationCounselorName"/>
                                </Col>

                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Counselor Email</Col>
                                    <FormControl name="organizationCounselorEmail"/>
                                </Col>

                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Counselor Telephone</Col>
                                    <FormControl name="organizationCounselorTelephone"/>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Counselor Faculty</Col>
                                    <FormControl name="organizationCounselorFaculty"/>
                                </Col>

                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Counselor Department</Col>
                                    <FormControl name="organizationCounselorDepartment"/>
                                </Col>

                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Counselor Office Number</Col>
                                    <FormControl name="organizationCounselorOfficeNumber"/>
                                </Col>
                            </FormGroup>

                            <ReactCenter>
                            <ButtonToolbar>
                                <Col md={6}>
                                    <Button bsStyle="primary" type="button" onClick={this.onSubmit}>
                                        Submit </Button>
                                </Col>
                            </ButtonToolbar>
                            </ReactCenter>

                        </Form>
                    </Panel>
                </Col>
            </div>
        )
    }
}


CreateOrganization.contextTypes = {
    initialState: React.PropTypes.object,
};

export default CreateOrganization;
