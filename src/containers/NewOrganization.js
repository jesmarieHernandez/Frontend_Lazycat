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
    }

    onSubmit = (event) => {
        event.preventDefault();

        console.log('Form was submitted');

        const form = document.forms.newOrganization;


        const newOrganization = {
            name: form.organizationName.value,
            type: form.organizationType.value,
            initials: form.organizationInitials.value,
            creationDate: new Date(),
            counselorName: form.organizationCounselorName.value,
            counselorEmail: form.organizationCounselorEmail.value,
            counselorTelephone: form.organizationCounselorTelephone.value,
            counselorFaculty: form.organizationCounselorFaculty.value,
            counselorDepartment: form.organizationCounselorDepartment.value,
            counselorOfficeNumber: form.organizationCounselorOfficeNumber.value

        };

        console.log(newOrganization);
        fetch('http://localhost:3001/api/admin/organizations', {
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
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/"><ReactCenter>Home</ReactCenter></Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/request"><ReactCenter>Request</ReactCenter></Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/activities"><ReactCenter>Activities</ReactCenter></Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}> <Link to="/stats"><ReactCenter>Stats</ReactCenter></Link></NavItem>
                    <NavItem> <Link to="/admin"><ReactCenter>Admin</ReactCenter></Link></NavItem>
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
                        <li ><Link to={`/admin`}>Admin Panel</Link></li>
                        <li ><Link to={`/admin/organizations`}>Organizations</Link></li>
                        <li className="active">Create New Organization</li>
                    </ol>

                    <Panel header="Create New Organization">
                        <Form horizontal onSubmit={this.onSubmit} name="newOrganization">
                            <FormGroup>
                                <Col sm={5}>
                                    <Col componentClass={ControlLabel}>Organization Name</Col>
                                    <FormControl name="organizationName"/>
                                </Col>

                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Organization Type</Col>
                                    <FormControl name="organizationType"/>
                                </Col>

                                <Col sm={3}>
                                    <Col componentClass={ControlLabel}>Organization Initials</Col>
                                    <FormControl name="organizationInitials"/>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Counselor Name</Col>
                                    <FormControl name="organizationCounselorName"/>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Counselor Email</Col>
                                    <FormControl name="organizationCounselorEmail"/>
                                </Col>
                            </FormGroup>

                            <FormGroup>
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
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Counselor Department</Col>
                                    <FormControl name="organizationCounselorDepartment"/>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Counselor Office Number</Col>
                                    <FormControl name="organizationCounselorOfficeNumber"/>
                                </Col>
                            </FormGroup>

                            <ButtonToolbar>
                                <Col md={6}>
                                    <Button bsStyle="primary" type="button" onClick={this.onSubmit}>
                                        Submit </Button>
                                </Col>
                            </ButtonToolbar>

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
