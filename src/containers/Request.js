import React, {Component} from 'react';
import 'isomorphic-fetch';
import DatePicker from 'react-bootstrap-date-picker';
import TimePicker from 'react-bootstrap-time-picker';
import {Link} from "react-router-dom";
import {Modal} from 'react-bootstrap'
import AlertContainer from 'react-alert';
import ReactCenter from "react-center"


import {
    FormGroup, FormControl, ControlLabel, ButtonToolbar, Button,
    Panel, Form, Col, Alert, Radio, Well, MenuItem, DropdownButton, Jumbotron, Tab, Tow, Nav, NavItem, Row, HelpBlock
} from 'react-bootstrap';


class Request extends Component {


    constructor(props, context) {
        super(props, context);

        let value = new Date().toISOString();
        let valueDate = false;
        let valueStartTime = false;
        let valueEndTime = false;
        let valueFacility = false;
        let valueOrganization = false;
        /*
         let valueForm = false;
         */

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

            showModal: false,
            titleValue: '',
            descriptionValue: '',
            guestValue: '',
            attendanceValue: '',
            facilityPicked: valueFacility,
            datePicked: valueDate,
            startTimePicked: valueStartTime,
            endTimePicked: valueEndTime,
            organizationPicked: valueOrganization,

            helpMessage: ''
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
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeGuest = this.handleChangeGuest.bind(this);
        this.handleChangeAttendance = this.handleChangeAttendance.bind(this);
        /*
         this.isFormValidated = this.isFormValidated.bind(this);
         */
    }

    componentDidMount() {
        fetch('http://localhost:3001/api/organizations').then(response => {
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

    // onSubmit = (event) => {
    //     console.log('NOPE! :D')
    // }

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
        this.setState({organizationPicked: true});
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
        this.setState({facilityPicked: true});
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
        this.setState({startTimePicked: true});
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
        this.setState({endTimePicked: true});

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
        return {showModal: false};
    }

    close() {
        this.setState({showModal: false});
    }

    open = (event) => {
        event.preventDefault();
        console.log("Opeeeen");
        console.log(isNaN(this.state.guestValue));
        console.log(typeof(this.state.attendanceValue));
        console.log(this.state.attendanceValue > 0);

        if (this.state.titleValue.length > 0 &&
            this.state.descriptionValue.length > 0 &&
            (this.state.guestValue.length > 0 && isNaN(this.state.guestValue)) &&
            (this.state.attendanceValue > 1) &&
            this.state.datePicked === true &&
            this.state.startTimePicked === true &&
            this.state.endTimePicked === true) {
            this.setState({showModal: true});
        }

        else {
            this.showErrorAlert("Form filled incorrectly.")
        }
    }

    showErrorAlert = (message) => {
        this.msg.error(message, {time: 5000, type: 'error'});
        return;
    }


    getValidationState = () => {
        const length = this.state.titleValue.length;

        if (length > 20) {
            return 'error'
        }
    }

    handleChangeTitle(e) {
        this.setState({titleValue: e.target.value})
    }

    handleChangeDescription(e) {
        this.setState({descriptionValue: e.target.value})

    }

    handleChangeGuest(e) {
        this.setState({guestValue: e.target.value})
    }

    handleChangeAttendance(e) {
        this.setState({attendanceValue: e.target.value})
    }

    render() {
        console.log(this.state.selectedOrganization._id);
        const organizationOptions = this.state.organizations.map(organization =>
            <option value={organization._id}>{organization.name}</option>
        );

        const facilitiesOptions = this.state.facilities.map(facilities =>
            <option value={facilities._id}>{facilities.space}</option>
        );

        const statusOptions = this.state.statusOptions.map(option =>
            <option value={option}>{option}</option>
        );

        const tabsInstance = (

            <div style={{backgroundColor: '#F8F8F8'}}>
                <Nav fluid>
                    {/*<NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link*/}
                        {/*to="/"><ReactCenter>Home</ReactCenter></Link></NavItem>*/}
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link
                        to="/request"><ReactCenter>Request</ReactCenter></Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link
                        to="/activities"><ReactCenter>Activities</ReactCenter></Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}> <Link
                        to="/stats"><ReactCenter>Stats</ReactCenter></Link></NavItem>
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
                        <li className="active">Request</li>
                    </ol>

                    <Row>
                        <Col md={12}>
                            <Form horizontal name="activityRequest" onSubmit={this.open}>

                                <Panel header="Student Information">
                                    <FormGroup id="needs-validation">
                                        <Col sm={4}>
                                            <Col componentClass={ControlLabel} for="validationCustom01">Full Name</Col>
                                            <FormControl name="requesterName" required/>
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
                                        <Col sm={10}>
                                            <Col componentClass={ControlLabel}>Address</Col>
                                            <FormControl name="studentAddress1" required/>
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
                                    <FormGroup validationState={this.getValidationState()}>
                                        <Col sm={3}>
                                            <Col componentClass={ControlLabel}>Title</Col>
                                            <FormControl name="requestTitle" value={this.state.titleValue}
                                                         placeholder="Ex. Venta de Mantecados" type="text"
                                                         onChange={this.handleChangeTitle} required/></Col>

                                        <Col sm={9}>
                                            <Col componentClass={ControlLabel}>Description</Col>
                                            <FormControl name="activityDescription"
                                                         value={this.state.activityDescription}
                                                         placeholder="Ex. Recaudacion de fondos" type="text"
                                                         onChange={this.handleChangeDescription} required/>
                                        </Col>

                                    </FormGroup>

                                    <FormGroup>
                                        <Col sm={3}>
                                            <Col componentClass={ControlLabel}>Guests</Col>
                                            <FormControl name="activityGuest" value={this.state.activityDescription}
                                                         placeholder="Ex. None" type="text"
                                                         onChange={this.handleChangeGuest} required/>
                                        </Col>

                                        <Col sm={3}>
                                            <Col componentClass={ControlLabel}>Attendants</Col>
                                            <FormControl name="activityAssistant" value={this.state.activityAssistant}
                                                         type="number" min="1" start="1"
                                                         onChange={this.handleChangeAttendance} required/>
                                        </Col>

                                        <Col md={3}>
                                            <Col componentClass={ControlLabel}>Facility Name</Col>

                                            <FormControl componentClass="select" name="selectFacilities"
                                                         onChange={this.onFacilitiesSelected}

                                                         placeholder="select">
                                                <option>select</option>
                                                {facilitiesOptions}
                                            </FormControl>
                                        </Col>

                                        <Col md={3}>
                                            <Col componentClass={ControlLabel}>Building</Col>
                                            <FormControl name="facilityBuilding"
                                                         value={this.state.selectedFacilities.building} required
                                                         disabled/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <Col md={4}>

                                            <Col componentClass={ControlLabel}>Date</Col>

                                            <DatePicker id="example-datepicker" name="selectedDate"
                                                        onChange={this.onDateSelected}
                                                        value={this.state.selectedDate}
                                                        required/>
                                        </Col>

                                        <Col md={4}>
                                            <Col componentClass={ControlLabel}>Start Time</Col>
                                            <TimePicker name="startTime" start="7:00" end="24:00" step={30}
                                                        onChange={this.onStartTimeSelected}
                                                        value={this.state.startTime} required/>
                                        </Col>

                                        <Col md={4}>
                                            <Col componentClass={ControlLabel}>End Time</Col>
                                            <TimePicker name="endTime" start="7:00" end="24:00" step={30}
                                                        onChange={this.onEndTimeSelected} value={this.state.endTime}
                                                        required/>
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
                                                         value={this.state.selectedOrganization.initials} disabled/>
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
                                                         value={this.state.selectedOrganization.counselorName}
                                                         disabled/>
                                        </Col>

                                        <Col sm={4}>
                                            <Col componentClass={ControlLabel}>Telephone</Col>
                                            <FormControl name="counselorTelephone"
                                                         value={this.state.selectedOrganization.counselorTelephone}
                                                         disabled/>
                                        </Col>

                                        <Col sm={4}>
                                            <Col componentClass={ControlLabel}>Email</Col>
                                            <FormControl name="counselorEmail"
                                                         value={this.state.selectedOrganization.counselorEmail}
                                                         disabled/>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup>
                                        <Col sm={3}>
                                            <Col componentClass={ControlLabel}>Faculty</Col>
                                            <FormControl name="counselorFaculty"
                                                         value={this.state.selectedOrganization.counselorFaculty}
                                                         disabled/>
                                        </Col>

                                        <Col sm={3}>
                                            <Col componentClass={ControlLabel}>Department</Col>
                                            <FormControl name="counselorDepartment"
                                                         value={this.state.selectedOrganization.counselorDepartment}
                                                         disabled/>
                                        </Col>

                                        <Col sm={2}>
                                            <Col componentClass={ControlLabel}>Office Number</Col>
                                            <FormControl name="counselorOfficeNumber"
                                                         value={this.state.selectedOrganization.counselorOfficeNumber}
                                                         disabled/>
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

                                    <AlertContainer ref={a => this.msg = a}/>


                                    <Button bsStyle="primary" type="submit">Submit</Button>
                                    {/*<Button bsStyle="primary" type="button" onClick={this.open}>Submit</Button>*/}
                                    <Modal show={this.state.showModal} onHide={this.close}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Submit request?</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <h4>Are you sure you want to submit the request?</h4>
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