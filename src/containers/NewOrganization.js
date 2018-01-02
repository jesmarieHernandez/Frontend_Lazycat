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
import {Modal} from 'react-bootstrap'
import AlertContainer from 'react-alert';
import ReactCenter from "react-center";
import Icon from 'react-icons-kit';
import { statsDots } from 'react-icons-kit/icomoon/statsDots';
import { iosPaw } from 'react-icons-kit/ionicons/iosPaw';
import { home } from 'react-icons-kit/icomoon/home';
import { fileText2 } from 'react-icons-kit/icomoon/fileText2';
import { userTie } from 'react-icons-kit/icomoon/userTie';


const PAGE_SIZE = 10;

class CreateOrganization extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {

            showModal: false,
            orgNameValue: '',
            orgTypeValue: '',
            orgInitialsValue: '',
            counselorNameValue: '',
            counselorEmailValue: '',
            counselorTelephoneValue: '',
            counselorFacultyValue: '',
            counselorDepartmentValue: '',
            counselorOfficeValue: '',
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

        this.showSuccessAlert();

        console.log('Form was submitted');

        const form = document.forms.newOrganization;


        const newOrganization = {
            organizationName: form.organizationName.value,
            organizationType_code: form.organizationType.value,
            organizationInitials: form.organizationInitials.value,
            organizationStatus_code: 1,
            counselorName: form.organizationCounselorName.value,
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

    open = (event) => {
        event.preventDefault();
        console.log(isNaN(this.state.orgNameValue));
        console.log(isNaN(this.state.orgTypeValue) );
        console.log(isNaN(this.state.orgInitialsValue));
        console.log(isNaN(this.state.counselorNameValue));
        console.log(isNaN(this.state.counselorEmailValue));
        console.log(!isNaN(this.state.counselorTelephoneValue));
        console.log(isNaN(this.state.counselorFacultyValue));
        console.log(isNaN(this.state.counselorDepartmentValue));

        if (isNaN(this.state.orgNameValue) &&
            isNaN(this.state.orgTypeValue) &&
            isNaN(this.state.orgInitialsValue) &&
            isNaN(this.state.counselorNameValue) &&
            isNaN(this.state.counselorEmailValue) &&
            !isNaN(this.state.counselorTelephoneValue) &&
            isNaN(this.state.counselorFacultyValue) &&
            isNaN(this.state.counselorDepartmentValue))
        {
            console.log("In herreeeeeee")
            this.setState({showModal: true});
        }

        else {
            this.showErrorAlert("Form filled incorrectly.")
        }
    }

    handleOrgNameValue = (e) => {
        this.setState({orgNameValue: e.target.value})
    }

    handleOrgTypeValue = (e) => {
        this.setState({orgTypeValue: e.target.value})
    }

    handleOrgInitialsValue = (e) => {
        this.setState({orgInitialsValue: e.target.value})
    }

    handleCounselorNameValue = (e) => {
        this.setState({counselorNameValue: e.target.value})
    }

    handleCounselorEmailValue = (e) => {
        this.setState({counselorEmailValue: e.target.value})
    }

    handleCounselorTelephoneValue = (e) => {
        this.setState({counselorTelephoneValue: e.target.value})
    }

    handleCounselorFacultyValue = (e) => {
        this.setState({counselorFacultyValue: e.target.value})
    }

    handleCounselorDepartmentValue = (e) => {
        this.setState({counselorDepartmentValue: e.target.value})
    }

    handleCounselorOfficeNumberValue = (e) => {
        this.setState({counselorOfficeNumber: e.target.value})
    }


    getInitialState = () => {
        return {showModal: false};
    }

    close = () => {
        this.setState({showModal: false});
    }

    showSuccessAlert = () => {
        console.log("Success Alert");
        this.msg.success('Success! New facility created.', {time: 10000000, type: 'success'});
        console.log("Success Alert 2");
    }

    showErrorAlert = (message) => {
        this.msg.error(message, {time: 1000000, type: 'error'});
        return;
    }


    render() {
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
                        <Form horizontal name="newOrganization" onSubmit={this.open}>
                            <FormGroup>
                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Organization Name</Col>
                                    <FormControl name="organizationName" onChange={this.handleOrgNameValue} required/>
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
                                    <FormControl name="organizationInitials" onChange={this.handleOrgInitialsValue} required/>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Counselor Name</Col>
                                    <FormControl name="organizationCounselorName" onChange={this.handleCounselorNameValue} required/>
                                </Col>

                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Counselor Email</Col>
                                    <FormControl name="organizationCounselorEmail" onChange={this.handleCounselorEmailValue} required/>
                                </Col>

                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Counselor Telephone</Col>
                                    <FormControl name="organizationCounselorTelephone" type="number" onChange={this.handleCounselorTelephoneValue} required/>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Counselor Faculty</Col>
                                    <FormControl name="organizationCounselorFaculty" onChange={this.handleCounselorFacultyValue} required/>
                                </Col>

                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Counselor Department</Col>
                                    <FormControl name="organizationCounselorDepartment" onChange={this.handleCounselorDepartmentValue} required/>
                                </Col>

                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Counselor Office Number</Col>
                                    <FormControl name="organizationCounselorOfficeNumber" onChange={this.handleCounselorOfficeNumberValue} required/>
                                </Col>
                            </FormGroup>

                            <AlertContainer ref={a => this.msg = a}/>

                            <ReactCenter>
                                <ButtonToolbar>
                                    <Col md={6}>
                                        <Button bsStyle="primary" type="submit">
                                            Submit </Button>
                                    </Col>
                                </ButtonToolbar>
                            </ReactCenter>

                            <Modal show={this.state.showModal} onHide={this.close}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Submit organization?</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <h4>Are you sure you want to submit the organization?</h4>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={this.onSubmit} bsStyle="primary"
                                            type="button">Ok</Button>
                                    <Button onClick={this.close}>Cancel</Button>
                                </Modal.Footer>
                            </Modal>

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
