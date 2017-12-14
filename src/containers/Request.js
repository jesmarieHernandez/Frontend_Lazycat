import React, {Component} from 'react';
import 'isomorphic-fetch';
import DatePicker from 'react-bootstrap-date-picker';
import TimePicker from 'react-bootstrap-time-picker';
import {Link} from "react-router-dom";
import {Modal} from 'react-bootstrap'


import {
    FormGroup, FormControl, ControlLabel, ButtonToolbar, Button,
    Panel, Form, Col, Alert, Radio, Well, MenuItem, DropdownButton, Jumbotron, Tab, Tow, Nav, NavItem, Row
} from 'react-bootstrap';


class Request extends Component {


    constructor(props, context) {
        super(props, context);
        let value = new Date().toISOString();
        let valueDate = false;
        let valueForm = false;

        this.state = {
            organizations: [],
            facilities: [],
            selectedOrganization: {},
            selectedDate: value,
            selectedStartTime: '',
            startTime: '',
            selectedEndTime: '',
            endTime: '',
            selectedFacilities: {},
            statusOptions: ['pending', 'approved', 'denied'],
            selectedStatus: {},
            showModal: '',

            titleValue: '',
            descriptionValue: '',
            guestValue: '',
            attendanceValue: '',
            facilityValue: '',

            datePicked: valueDate,
            formValidated: valueForm

        }

        this.onOrganizationSelected = this.onOrganizationSelected.bind(this);
        this.onFacilitiesSelected = this.onFacilitiesSelected.bind(this);
        this.onStatusSelected = this.onStatusSelected.bind(this);
        this.onDateSelected = this.onDateSelected.bind(this);
        this.onStartTimeSelected = this.onStartTimeSelected.bind(this);
        this.onEndTimeSelected = this.onEndTimeSelected.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.handleChange = this.handleChange.bind(this);
/*
        this.isFormValidated = this.isFormValidated.bind(this);
*/
    }

    componentDidMount() {
        console.log('Ok?');
        fetch('http://localhost:3001/api/organizations').then(response => {
            console.log('Cool...');
            if (response.ok) {
                response.json().then(results => {
                    this.setState({organizations: results});
                });
            } else {
                console.log('Not ok');
                // response.json().then(error => {
                //     this.props.showError(`Failed to add issue: ${error.message}`);
                // });
            }
        }).catch(err => {
            console.log(err);
            // this.props.showError(`Error in sending data to server: ${err.message}`);
        });

        fetch(`http://localhost:3001/api/facilities/`).then(response => {
            if (response.ok) {
                response.json().then(results => {
                    //console.log(results);
                    this.setState({facilities: results});
                    console.log(this.state.facilities);
                    //this.props.router.push(`/activities/${createdRequest._id}`);
                });
            } else {
                console.log('Not ok');
                // response.json().then(error => {
                //     this.props.showError(`Failed to add issue: ${error.message}`);
                // });
            }
        }).catch(err => {
            console.log(err);
            // this.props.showError(`Error in sending data to server: ${err.message}`);
        });
    }

    componentDidUpdate() {
        // Access ISO String and formatted values from the DOM.
        var hiddenInputElement = document.getElementById("example-datepicker");
        console.log(hiddenInputElement.value); // ISO String, ex: "2016-11-19T12:00:00.000Z"
        console.log(hiddenInputElement.getAttribute('data-formattedvalue')) // Formatted String, ex: "11/19/2016"
    }

    onSubmit = (event) => {
        event.preventDefault();

        console.log('Form was submitted');

        console.log('Selected status: ' + this.state.selectedStatus);

        const form = document.forms.activityRequest;

        const activityRequest = {
            requestTitle: form.requestTitle.value,
            activityDescription: form.activityDescription.value,
            activityGuest: form.activityGuest.value,
            activityAssistant: form.activityAssistant.value,
            selectedDate: this.state.selectedDate,
            startTime: this.state.selectedStartTime,
            endTime: this.state.selectedEndTime,
            organizationInitials: form.organizationInitials.value,
            requesterName: form.requesterName.value,
            studentIdentificationNumber: form.studentIdentificationNumber.value,
            studentRole: form.studentRole.value,
            studentAddress1: form.studentAddress1.value,
            studentAddress2: form.studentAddress2.value,
            studentAddressCity: form.studentAddressCity.value,
            studentAddressState: form.studentAddressState.value,
            studentAddressCountry: form.studentAddressCountry.value,
            studentAddressZipCode: form.studentAddressZipCode.value,
            studentTelephone: form.studentTelephone.value,
            counselorName: form.counselorName.value,
            counselorTelephone: form.counselorTelephone.value,
            counselorFaculty: form.counselorFaculty.value,
            counselorDepartment: form.counselorDepartment.value,
            counselorOfficeNumber: form.counselorOfficeNumber.value,
            counselorEmail: form.counselorEmail.value,
            requestDate: new Date(),
            building: form.facilityBuilding.value,
            organization: this.state.selectedOrganization,
            facilities: this.state.selectedFacilities,
            status: this.state.selectedStatus,
            facilityManagerDecision: 'approved',
            counselorDecision: 'approved',
            dscaDecision: 'pending'
        };
        console.log(activityRequest);
        fetch('http://localhost:3001/api/activities', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(activityRequest),
        }).then(response => {
            if (response.ok) {
                console.log(response);
                response.json().then(createdRequest => {
                    console.log('Activity request was created successfully!');
                    console.log('Activity request ID: ' + createdRequest._id);
                    this.setState({showModal: false});
                    console.log(':D');
                    console.log(this);
                    this.props.history.push(`/activities/${createdRequest._id}`);

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

    onOrganizationSelected(event) {
        event.preventDefault();
        console.log('Change happened');
        console.log(event.target.value);
        const selectedOrganization = this.state.organizations.filter(function (organization) {
            console.log(organization);
            console.log(event.target.value);
            console.log(organization._id === event.target.value);
            return organization._id === event.target.value;
        });
        console.log(selectedOrganization);
        this.setState({selectedOrganization: selectedOrganization[0]});
    }

    onFacilitiesSelected(event) {
        event.preventDefault();
        console.log('Change happened');
        console.log(event.target.value);
        const selectedFacilities = this.state.facilities.filter(function (obj) {
            return obj._id == event.target.value;
        });
        console.log(selectedFacilities[0]);
        this.setState({selectedFacilities: selectedFacilities[0]});
        console.log("Selected facilities: " + this.state.selectedFacilities.managerName);
    }

    onStatusSelected(event) {
        const selectedStatus = this.state.statusOptions.filter(function (obj) {
            return obj == event.target.value;
        });
        console.log("Selected status: " + selectedStatus[0]);

        this.setState({selectedStatus: selectedStatus[0]});
        console.log("Selected status: " + this.state.selectedStatus);
    }

    onStartTimeSelected(event) {
        console.log("Event: " + event);

        var date = new Date(null);
        console.log("Date 1: " + date);
        date.setSeconds(event); // Set event (in seconds) on the newly created date
        console.log("Date 2: " + date);


        var res = date.getTimezoneOffset() / 60;

        var newDate = new Date(date.getTime() + res * 3600000);
        console.log("Date 3: " + newDate);
        var result = newDate.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
        console.log("Result: " + result);
        this.setState({selectedStartTime: result});
        this.setState({startTime: event});

    }

    onEndTimeSelected(event) {
        var date = new Date(null);
        date.setSeconds(event); // specify value for SECONDS here
        var res = date.getTimezoneOffset() / 60; //Gives me the hours to offset the time
        var newDate = new Date(date.getTime() + res * 3600000);
        var result = newDate.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
        console.log("Result: " + result);
        this.setState({selectedEndTime: result});
        this.setState({endTime: event});
    }

    onDateSelected(event) {
        this.setState({datePicked: true});
        console.log();
        console.log("Type Of: " + typeof(event));
        var editedDate = event.substr(0, 10);
        console.log("editedDate: " + editedDate);
        this.setState({selectedDate: editedDate});
    }

    getInitialState() {
        return { showModal: false};
    }

    close () {
        this.setState({ showModal: false });
    }

    open() {
        console.log("Opeeeen");
        if (this.state.datePicked === true && this.state.titleValue.length > 0)
        {
            this.setState({showModal: true});
        }
    }

/*    isFormValidated() {
        console.log("Form validated entered");
        console.log(this.activity.requestTitle);
        if (this.state.datePicked === true && this.state.titleValue.length > 0)
            {
                console.log("Form validated entered 2");
                this.setState({formValidated: true});
            }
    }*/

    handleChange(e) {
        this.setState({titleValue: e.target.value})
    }

    render() {
        console.log(this.state.selectedOrganization._id);
        const organizationOptions = this.state.organizations.map(organization =>
            <option value={organization._id}>{organization.name}</option>
        );

        const facilitiesOptions = this.state.facilities.map(facilities =>
            <option value={facilities._id}>{facilities.name}</option>
        );

        const statusOptions = this.state.statusOptions.map(option =>
            <option value={option}>{option}</option>
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
                    <Row>
                        <Col md={12}>
                            <ol className="breadcrumb">
                                <li/>
                                <li className="active">Request</li>
                            </ol>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            {/*<Form horizontal onSubmit={this.onSubmit} name="activityRequest">*/}
                            <Form horizontal name="activityRequest">
                                <br/>

                                <Panel header="Student Information">
                                    <FormGroup id="needs-validation">
                                        <Col sm={4}>
                                            <Col componentClass={ControlLabel} for="validationCustom01">Full Name</Col>
                                            <FormControl name="requesterName" id="validationCustom01" required/>
                                        </Col>

                                        <Col sm={4}>
                                            <Col componentClass={ControlLabel}>Identification Number</Col>
                                            <FormControl name="studentIdentificationNumber" required/>
                                        </Col>

                                        <Col sm={3}>
                                            <Col componentClass={ControlLabel}>Role</Col>
                                            <FormControl name="studentRole" required/>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup>
                                        <Col sm={6}>
                                            <Col componentClass={ControlLabel}>Address 1</Col>
                                            <FormControl name="studentAddress1" required/>
                                        </Col>

                                        <Col sm={6}>
                                            <Col componentClass={ControlLabel}>Address 2</Col>
                                            <FormControl name="studentAddress2" required/>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup>
                                        <Col sm={3}>
                                            <Col componentClass={ControlLabel}>City</Col>
                                            <FormControl name="studentAddressCity" required/>
                                        </Col>

                                        <Col sm={3}>
                                            <Col componentClass={ControlLabel}>State</Col>
                                            <FormControl name="studentAddressState" required/>
                                        </Col>

                                        <Col sm={3}>
                                            <Col componentClass={ControlLabel}>Country</Col>
                                            <FormControl name="studentAddressCountry" required/>
                                        </Col>

                                        <Col sm={3}>
                                            <Col componentClass={ControlLabel}>Zip Code</Col>
                                            <FormControl name="studentAddressZipCode" required/>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup>
                                        <Col sm={4}>
                                            <Col componentClass={ControlLabel}>Telephone</Col>
                                            <FormControl name="studentTelephone" required/>
                                        </Col>
                                    </FormGroup>
                                </Panel>
                                <br/>
                                <br/>

                                <Panel header="Activity Information">
                                    <FormGroup>
                                        <Col sm={3}>
                                            <Col componentClass={ControlLabel}>Title</Col>
                                            <FormControl name="requestTitle" value={this.state.titleValue} placeholder="Ex. Venta de Mantecados" type="text" onChange={this.handleChange}/>
                                        </Col>

                                        <Col sm={9}>
                                            <Col componentClass={ControlLabel}>Description</Col>
                                            <FormControl name="activityDescription" required/>
                                        </Col>

                                    </FormGroup>

                                    <FormGroup>
                                        <Col sm={3}>
                                            <Col componentClass={ControlLabel}>Invited Guests</Col>
                                            <FormControl name="activityGuest" required/>
                                        </Col>

                                        <Col sm={3}>
                                            <Col componentClass={ControlLabel}>Attendants</Col>
                                            <FormControl name="activityAssistant" required/>
                                        </Col>

                                        <Col md={3}>
                                            <Col componentClass={ControlLabel}>Facility Name</Col>

                                            <FormControl componentClass="select" name="selectFacilities"
                                                         onChange={this.onFacilitiesSelected}

                                                         placeholder="select" required>
                                                <option>select</option>
                                                {facilitiesOptions}
                                            </FormControl>
                                        </Col>

                                        <Col md={3}>
                                            <Col componentClass={ControlLabel}>Building</Col>
                                            <FormControl name="facilityBuilding"
                                                         value={this.state.selectedFacilities.building} required disabled/>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup>
                                        <Col sm={4}>
                                            <Col componentClass={ControlLabel}>Date</Col>

                                            <DatePicker id="example-datepicker" name="selectedDate"
                                                        onChange={this.onDateSelected} value={this.state.selectedDate} required/>
                                        </Col>

                                        <Col sm={4}>
                                            <Col componentClass={ControlLabel}>Start Time</Col>
                                            <TimePicker name="startTime" start="7:00" end="24:00" step={30}
                                                        onChange={this.onStartTimeSelected}
                                                        value={this.state.startTime} required/>
                                        </Col>

                                        <Col sm={4}>
                                            <Col componentClass={ControlLabel}>End Time</Col>
                                            <TimePicker name="endTime" start="7:00" end="24:00" step={30}
                                                        onChange={this.onEndTimeSelected} value={this.state.endTime} required/>
                                        </Col>

                                    </FormGroup>
                                </Panel>
                                <br/>
                                <br/>

                                <Panel header="Organization Information">
                                    <FormGroup>
                                        <Col md={4}>
                                            <Col componentClass={ControlLabel}>Organization</Col>

                                            <FormControl componentClass="select" name="selectOrganization"
                                                         onChange={this.onOrganizationSelected}
                                                         placeholder="select" required>
                                                <option>select</option>
                                                {organizationOptions}
                                            </FormControl>
                                        </Col>

                                        <Col sm={2}>
                                            <Col componentClass={ControlLabel}>Initials</Col>
                                            <FormControl name="organizationInitials"
                                                         value={this.state.selectedOrganization.initials} required/>
                                        </Col>
                                    </FormGroup>
                                </Panel>
                                <br/>
                                <br/>

                                <Panel header="Counselor Information">
                                    <FormGroup>
                                        <Col md={4}>
                                            <Col componentClass={ControlLabel}>Name</Col>
                                            <FormControl name="counselorName"
                                                         value={this.state.selectedOrganization.counselorName} disabled/>
                                        </Col>

                                        <Col sm={4}>
                                            <Col componentClass={ControlLabel}>Telephone</Col>
                                            <FormControl name="counselorTelephone"
                                                         value={this.state.selectedOrganization.counselorTelephone} disabled/>
                                        </Col>

                                        <Col sm={4}>
                                            <Col componentClass={ControlLabel}>Email</Col>
                                            <FormControl name="counselorEmail"
                                                         value={this.state.selectedOrganization.counselorEmail} disabled/>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup>
                                        <Col sm={3}>
                                            <Col componentClass={ControlLabel}>Faculty</Col>
                                            <FormControl name="counselorFaculty"
                                                         value={this.state.selectedOrganization.counselorFaculty} disabled/>
                                        </Col>

                                        <Col sm={3}>
                                            <Col componentClass={ControlLabel}>Department</Col>
                                            <FormControl name="counselorDepartment"
                                                         value={this.state.selectedOrganization.counselorDepartment} disabled/>
                                        </Col>

                                        <Col sm={2}>
                                            <Col componentClass={ControlLabel}>Office Number</Col>
                                            <FormControl name="counselorOfficeNumber"
                                                         value={this.state.selectedOrganization.counselorOfficeNumber} disabled/>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup>
                                        <Col md={4}>
                                            <Col componentClass={ControlLabel}>Status</Col>

                                            <FormControl componentClass="select" name="selectStatus"
                                                         onChange={this.onStatusSelected}

                                                         placeholder="select">
                                                <option>select</option>
                                                {statusOptions}
                                            </FormControl>
                                        </Col>
                                    </FormGroup>

                                </Panel>

                                    <Col md={6}>

{/*
                                        { this.state.formValidated === true ?
*/}
                                            <Button bsStyle="primary" type="button" onClick={this.open}>Submit</Button>
{/*                                            : <Button bsStyle="primary" type="submit" onClick={this.isFormValidated}>Submit</Button> }*/}

                                        <Modal show={this.state.showModal} onHide={this.close}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Submit request?</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <h4>Body</h4>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button onClick={this.onSubmit} bsStyle="primary"
                                                            type="button">Ok</Button>
                                                    <Button onClick={this.close}>Cancel</Button>
                                                </Modal.Footer>
                                            </Modal>
                                    </Col>
                                <br />
                                <br />
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </div>
        )
    }
}

Request.contextTypes = {
    initialState: React.PropTypes.object,
};

export default Request;