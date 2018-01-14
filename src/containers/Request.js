import React, {Component} from 'react';
import 'isomorphic-fetch';
import DatePicker from 'react-bootstrap-date-picker';
import TimePicker from 'react-bootstrap-time-picker';
import {Link} from "react-router-dom";
import {Modal} from 'react-bootstrap'
import AlertContainer from 'react-alert';
import ReactCenter from "react-center";
import Icon from 'react-icons-kit';
import {statsDots} from 'react-icons-kit/icomoon/statsDots';
import {iosPaw} from 'react-icons-kit/ionicons/iosPaw';
import {home} from 'react-icons-kit/icomoon/home';
import {fileText2} from 'react-icons-kit/icomoon/fileText2';
import {userTie} from 'react-icons-kit/icomoon/userTie';


import {
    FormGroup, FormControl, ControlLabel, ButtonToolbar, Button,
    Panel, Form, Col, Alert, Radio, Well, MenuItem, DropdownButton, Jumbotron, Tab, Tow, Nav, NavItem, Row, HelpBlock
} from 'react-bootstrap';


class Request extends Component {


    constructor(props, context) {
        super(props, context);

        let value = new Date().toISOString();
        let valueDate = '';
        let valueStartTime = '';
        let valueEndTime = '';
        let valueFacility = '';
        let valueOrganization = '';
        /*
         let valueForm = false;
         */

        this.state = {
            organizations: [],
            facilities: [],
            selectedOrganization: {},
            selectedDate: value,
            selectedStartTime: '0',
            startTime: '',
            selectedEndTime: '1',
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
            titleDecision: '',
            descriptionDecision: '',
            guestDecision: '',
            attendanceDecision: '',


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
            studentPhone: form.studentTelephone.value,
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
        fetch('http://localhost:8000/api/activities', {
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
        this.setState({organizationPicked: '2'});
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
        this.setState({facilityPicked: '2'});
        event.preventDefault();
        console.log('Change happened');
        console.log(event.target.value);
        const selectedFacilities = this.state.facilities.filter(function (obj) {
            return obj.id == event.target.value;
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
        console.log("Start time: " + event);
        this.setState({startTimePicked: '2'});
        var date = new Date(null);
        date.setSeconds(event); // Set event (in seconds) on the newly created date
        var res = date.getTimezoneOffset() / 60;
        var newDate = new Date(date.getTime() + res * 3600000);
        var result = newDate.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
        console.log("Start Time Result: " + result);
        this.setState({selectedStartTime: result});
        this.setState({startTime: event});

    }

    onEndTimeSelected(event) {
        console.log("End time: " + event);
        this.setState({endTimePicked: '2'});
        var date = new Date(null);
        date.setSeconds(event); // specify value for SECONDS here
        var res = date.getTimezoneOffset() / 60; //Gives me the hours to offset the time
        var newDate = new Date(date.getTime() + res * 3600000);
        var result = newDate.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
        console.log("End Time Result: " + result);
        this.setState({selectedEndTime: result});
        this.setState({endTime: event});
    }

    onDateSelected(event) {
        console.log("DAAAAAATE: " + event);
        this.setState({datePicked: '2'});
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
        console.log("Results: " + this.state.attendanceValue);
        /*
         console.log(isNaN(this.state.guestValue));
         console.log(typeof(this.state.attendanceValue));
         console.log(this.state.attendanceValue > 0);
         */

        if (this.state.titleValue.length <= 20 && this.state.titleValue.length >= 5 &&
            /^[0-9]+$/.test(this.state.titleValue) === false && /^[`!@#\$%\^&\*()_+{}\|:"<>?~,./;'[\]\\]+$/.test(this.state.titleValue) === false &&
            this.state.descriptionValue.length <= 100 && this.state.descriptionValue.length >= 10  &&
            /^[0-9]+$/.test(this.state.descriptionValue) === false && /^[`!@#\$%\^&\*()_+{}\|:"<>?~,./;'[\]\\]+$/.test(this.state.descriptionValue) === false &&
            this.state.guestValue.length > 0 && this.state.guestValue.length <= 50 &&
            this.state.attendanceValue > 1 && this.state.attendanceValue < 10000 &&
            this.state.datePicked === "2" &&
            this.state.startTimePicked === "2" &&
            this.state.endTimePicked === "2" &&
            this.state.facilityPicked === "2" &&
            this.state.organizationPicked === "2") {
            this.setState({showModal: true});
        }

        if (this.state.organizationPicked === '') {
            this.setState({organizationPicked: '1'});
        }

        if (this.state.facilityPicked === '') {
            this.setState({facilityPicked: '1'});
        }

        if (this.state.startTimePicked === '') {
            this.setState({startTimePicked: '1'});
        }

        if (this.state.endTimePicked === '') {
            this.setState({endTimePicked: '1'});
        }

        if (this.state.datePicked === '') {
            this.setState({datePicked: '1'});
        }

        else {
            this.showErrorAlert("Form filled incorrectly.")
        }
    }

    showErrorAlert = (message) => {
        this.msg.error(message, {time: 5000, type: 'error'});
        return;
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
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/request"><Icon icon={fileText2}
                                                                                                   style={{paddingRight: "20px"}}/>Request</Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/activities"><Icon icon={iosPaw}
                                                                                                      style={{paddingRight: "20px"}}/>Activities</Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}> <Link to="/stats"><Icon icon={statsDots}
                                                                                                  style={{paddingRight: "20px"}}/>Statistics</Link></NavItem>
                    <NavItem> <Link to="/admin"><Icon icon={userTie}
                                                      style={{paddingRight: "20px"}}/>Admin</Link></NavItem>
                </Nav>
            </div>
        );

        var errorFormStyle = {
            borderColor: '#B74442',
            boxShadow: "0px 0px 8px #B74442"
        };

        var errorHelpBlockStyle = {
            color: '#B74442'
        };

        var successFormStyle = {
            borderColor: '#3C765B',
            boxShadow: "0px 0px 8px #3C765B"
        };

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
                                    <FormGroup>
                                        <Col sm={3}>
                                            <Col componentClass={ControlLabel}>Nombre de la actividad</Col>
                                            {
                                                (/^[0-9]+$/.test(this.state.titleValue) === true) ?
                                                    (<div>
                                                        <FormControl name="requestTitle" value={this.state.titleValue}
                                                                     validationState='error'
                                                                     placeholder="Ex. Venta de Mantecados" type="text"
                                                                     style={errorFormStyle}
                                                                     onChange={this.handleChangeTitle} required/>
                                                        <HelpBlock stule={errorHelpBlockStyle}>Title can't be just
                                                            numbers</HelpBlock>
                                                    </div>)
                                                    :
                                                    (/^[`!@#\$%\^&\*()_+{}\|:"<>?~,./;'[\]\\]+$/.test(this.state.titleValue) === true) ?
                                                        (<div>
                                                            <FormControl name="requestTitle"
                                                                         value={this.state.titleValue}
                                                                         placeholder="Ex. Venta de Mantecados"
                                                                         type="text"
                                                                         onChange={this.handleChangeTitle}
                                                                         style={errorFormStyle}/>
                                                            <HelpBlock style={errorHelpBlockStyle}>Nombre no puede ser
                                                                solo
                                                                s&iacute;mbolos</HelpBlock>
                                                        </div>)
                                                        :
                                                        (this.state.titleValue.length > 20) ?
                                                            (<div>
                                                                <FormControl name="requestTitle"
                                                                             value={this.state.titleValue}
                                                                             validationState='error'
                                                                             placeholder="Ex. Venta de Mantecados"
                                                                             type="text"
                                                                             style={errorFormStyle}
                                                                             onChange={this.handleChangeTitle}
                                                                             required/>
                                                                <HelpBlock stule={errorHelpBlockStyle}>Title too
                                                                    long</HelpBlock>
                                                            </div>)
                                                            :
                                                            (this.state.titleValue.length < 5 && this.state.titleValue.length != 0) ?
                                                                (<div>
                                                                    <FormControl name="requestTitle"
                                                                                 value={this.state.titleValue}
                                                                                 placeholder="Ex. Venta de Mantecados"
                                                                                 type="text"
                                                                                 onChange={this.handleChangeTitle}
                                                                                 style={errorFormStyle}/>
                                                                    <HelpBlock style={errorHelpBlockStyle}>Nombre
                                                                        demasiado peque&ntilde;o</HelpBlock>
                                                                </div>)
                                                                :
                                                                (this.state.titleValue.length <= 20 && this.state.titleValue.length >= 5 && this.state.titleValue.length != 0) ?
                                                                    (<div>
                                                                        <FormControl name="requestTitle"
                                                                                     value={this.state.titleValue}
                                                                                     validationState='error'
                                                                                     placeholder="Ex. Venta de Mantecados"
                                                                                     type="text"
                                                                                     style={successFormStyle}
                                                                                     onChange={this.handleChangeTitle}
                                                                                     required/>
                                                                    </div>)
                                                                    :
                                                                    (<div>
                                                                        <FormControl name="requestTitle"
                                                                                     value={this.state.titleValue}
                                                                                     placeholder="Ex. Venta de Mantecados"
                                                                                     type="text"
                                                                                     onChange={this.handleChangeTitle}
                                                                                     required/>
                                                                    </div>)

                                            }
                                        </Col>

                                        <Col sm={9}>
                                            <Col componentClass={ControlLabel}>Descripci&oacute;n</Col>
                                            {
                                                (/^[0-9]+$/.test(this.state.descriptionValue) === true) ?
                                                    (<div>
                                                        <FormControl name="activityDescription"
                                                                     value={this.state.activityDescription}
                                                                     placeholder="Ex. Recaudacion de fondos" type="text"
                                                                     style={errorFormStyle}
                                                                     onChange={this.handleChangeDescription} required/>
                                                        <HelpBlock style={errorHelpBlockStyle}>Descripci&oacute;n no
                                                            puede ser solo n&uacute;meros</HelpBlock>
                                                    </div>)
                                                    :
                                                    (/^[`!@#\$%\^&\*()_+{}\|:"<>?~,./;'[\]\\]+$/.test(this.state.descriptionValue) === true) ?
                                                        (<div>
                                                            <FormControl name="activityDescription"
                                                                         value={this.state.activityDescription}
                                                                         placeholder="Ex. Recaudacion de fondos"
                                                                         type="text"
                                                                         style={errorFormStyle}
                                                                         onChange={this.handleChangeDescription}
                                                                         required/>
                                                            <HelpBlock style={errorHelpBlockStyle}>Descripci&oacute;n no
                                                                puede ser solo s&iacute;mbolos</HelpBlock>
                                                        </div>)
                                                        :
                                                        (this.state.descriptionValue.length > 100) ?
                                                            (<div>
                                                                <FormControl name="activityDescription"
                                                                             value={this.state.activityDescription}
                                                                             placeholder="Ex. Recaudacion de fondos"
                                                                             type="text"
                                                                             style={errorFormStyle}
                                                                             onChange={this.handleChangeDescription}
                                                                             required/>
                                                                <HelpBlock style={errorHelpBlockStyle}>Descripci&oacute;
                                                                    n muy
                                                                    larga</HelpBlock>
                                                            </div>)
                                                            :
                                                            (this.state.descriptionValue.length < 10 && this.state.descriptionValue.length != 0) ?
                                                                (<div>
                                                                    <FormControl name="activityDescription"
                                                                                 value={this.state.activityDescription}
                                                                                 placeholder="Ex. Recaudacion de fondos"
                                                                                 type="text"
                                                                                 style={errorFormStyle}
                                                                                 onChange={this.handleChangeDescription}
                                                                                 required/>
                                                                    <HelpBlock
                                                                        style={errorHelpBlockStyle}>Descripci&oacute;n
                                                                        peque&ntilde;a</HelpBlock>
                                                                </div>)
                                                                :
                                                                (this.state.descriptionValue.length <= 100 && this.state.descriptionValue.length >= 10 && this.state.descriptionValue.length != 0) ?
                                                                    (<div>
                                                                        <FormControl name="activityDescription"
                                                                                     value={this.state.activityDescription}
                                                                                     placeholder="Ex. Recaudacion de fondos"
                                                                                     type="text"
                                                                                     style={successFormStyle}
                                                                                     onChange={this.handleChangeDescription}
                                                                                     required/>
                                                                    </div>)
                                                                    :
                                                                    (<div>
                                                                        <FormControl name="activityDescription"
                                                                                     value={this.state.activityDescription}
                                                                                     placeholder="Ex. Recaudacion de fondos"
                                                                                     type="text"
                                                                                     onChange={this.handleChangeDescription}
                                                                                     required/>
                                                                    </div>)
                                            }
                                        </Col>

                                    </FormGroup>

                                    <FormGroup>
                                        <Col sm={3}>
                                            <Col componentClass={ControlLabel}>Invitado(s)</Col>
                                            {
                                                (/^[0-9]+$/.test(this.state.guestvalue) === true) ?
                                                    (<div>
                                                        <FormControl name="activityGuest"
                                                                     value={this.state.activityGuest}
                                                                     placeholder="Ex. None" type="text"
                                                                     style={errorFormStyle}
                                                                     onChange={this.handleChangeGuest} required/>
                                                        <HelpBlock style={errorHelpBlockStyle}>Lista de invitados no
                                                            puede ser solo n&uacute;meros</HelpBlock>
                                                    </div>)
                                                    :
                                                    (/^[`!@#\$%\^&\*()_+{}\|:"<>?~,./;'[\]\\]+$/.test(this.state.guestValue) === true) ?
                                                        (<div>
                                                            <FormControl name="activityGuest"
                                                                         value={this.state.activityGuest}
                                                                         placeholder="Ex. None" type="text"
                                                                         style={errorFormStyle}
                                                                         onChange={this.handleChangeGuest} required/>
                                                            <HelpBlock style={errorHelpBlockStyle}>Lista de invitados no
                                                                puede ser solo s&iacute;mbolos</HelpBlock>
                                                        </div>)
                                                        :
                                                        (this.state.guestValue.length < 1 && this.state.guestValue.length !=0) ?
                                                            (<div>
                                                                <FormControl name="activityGuest"
                                                                             value={this.state.activityGuest}
                                                                             placeholder="Ex. None" type="text"
                                                                             style={errorFormStyle}
                                                                             onChange={this.handleChangeGuest} required/>
                                                                <HelpBlock style={errorHelpBlockStyle}>Lista de invitados muy extensa</HelpBlock>
                                                            </div>)
                                                            :
                                                            (this.state.guestValue.length > 50) ?

                                                                (<div>
                                                                    <FormControl name="activityGuest"
                                                                                 value={this.state.activityGuest}
                                                                                 placeholder="Ex. None" type="text"
                                                                                 style={errorFormStyle}
                                                                                 onChange={this.handleChangeGuest} required/>
                                                                    <HelpBlock style={errorHelpBlockStyle}>Text too long</HelpBlock>
                                                                </div>)
                                                                :
                                                                (this.state.guestValue.length <= 50 && this.state.guestValue.length >= 1 && this.state.guestValue.length != 0) ?

                                                                    (<div>
                                                                        <FormControl name="activityGuest"
                                                                                     value={this.state.activityGuest}
                                                                                     placeholder="Ex. None" type="text"
                                                                                     style={successFormStyle}
                                                                                     onChange={this.handleChangeGuest} required/>
                                                                    </div>)
                                                                    :
                                                                    (<div>
                                                                        <FormControl name="activityGuest"
                                                                                     value={this.state.activityGuest}
                                                                                     placeholder="Ex. None" type="text"
                                                                                     onChange={this.handleChangeGuest} required/>
                                                                    </div>)
                                            }
                                        </Col>

                                        <Col sm={3}>
                                            <Col componentClass={ControlLabel}>Attendants</Col>
                                            <FormControl name="activityAssistant"
                                                         value={this.state.activityAssistant}
                                                         type="number" min="1" max="10000" start="1"
                                                         onChange={this.handleChangeAttendance} required/>
                                        </Col>

                                        <Col md={3}>
                                            <Col componentClass={ControlLabel}>Facility Name</Col>
                                            {
                                                (this.state.facilityPicked === '1') ?
                                                    (<div>
                                                        <FormControl componentClass="select" name="selectFacilities"
                                                                     onChange={this.onFacilitiesSelected}
                                                                     style={errorFormStyle}

                                                                     placeholder="select">
                                                            <option>select</option>
                                                            {facilitiesOptions}
                                                        </FormControl>
                                                        <HelpBlock style={errorHelpBlockStyle}>Pick a
                                                            facility</HelpBlock>
                                                    </div>)
                                                    :
                                                    (this.state.facilityPicked === '2') ?
                                                        (<div>
                                                            <FormControl componentClass="select" name="selectFacilities"
                                                                         onChange={this.onFacilitiesSelected}
                                                                         style={successFormStyle}

                                                                         placeholder="select">
                                                                <option>select</option>
                                                                {facilitiesOptions}
                                                            </FormControl>
                                                        </div>)
                                                        :
                                                        (<div>
                                                            <FormControl componentClass="select" name="selectFacilities"
                                                                         onChange={this.onFacilitiesSelected}

                                                                         placeholder="select">
                                                                <option>select</option>
                                                                {facilitiesOptions}
                                                            </FormControl>
                                                        </div>)
                                            }
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
                                            {
                                                (this.state.datePicked === '1') ?
                                                    (<div>
                                                        <DatePicker id="example-datepicker" name="selectedDate"
                                                                    onChange={this.onDateSelected}
                                                                    value={this.state.selectedDate}
                                                                    style={errorFormStyle}
                                                                    minDate={(new Date()).toISOString()}
                                                                    required/>
                                                        <HelpBlock style={errorHelpBlockStyle}>Pick a date</HelpBlock>
                                                    </div>)
                                                    :
                                                    (this.state.datePicked === '2') ?
                                                        (<div>
                                                            <DatePicker id="example-datepicker" name="selectedDate"
                                                                        onChange={this.onDateSelected}
                                                                        value={this.state.selectedDate}
                                                                        style={successFormStyle}
                                                                        minDate={(new Date()).toISOString()}
                                                                        required/>
                                                        </div>)
                                                        :
                                                        (<div>
                                                            <DatePicker id="example-datepicker" name="selectedDate"
                                                                        onChange={this.onDateSelected}
                                                                        value={this.state.selectedDate}
                                                                        minDate={(new Date()).toISOString()}
                                                                        required/>
                                                        </div>)
                                            }
                                        </Col>

                                        <Col md={4}>
                                            <Col componentClass={ControlLabel}>Start Time</Col>
                                            {
                                                (this.state.startTimePicked === '1') ?
                                                    <div>
                                                        <TimePicker name="startTime" start="7:00" end="24:00" step={30}
                                                                    onChange={this.onStartTimeSelected}
                                                                    style={errorFormStyle}
                                                                    value={this.state.startTime} required/>
                                                        <HelpBlock>Pick a start time</HelpBlock>
                                                    </div>
                                                    :
                                                    (this.state.startTime > this.state.endTime || this.state.startTime === this.state.endTime && this.state.startTimePicked != '' ) ?
                                                        (<div>
                                                            <TimePicker name="startTime" start="8:00" end="24:00"
                                                                        step={30}
                                                                        onChange={this.onStartTimeSelected}
                                                                        value={this.state.startTime}
                                                                        style={errorFormStyle}
                                                                        required/>
                                                            <HelpBlock style={errorHelpBlockStyle}>Start time should be
                                                                earlier than end
                                                                time</HelpBlock>
                                                        </div>)
                                                        :
                                                        (this.state.startTime < this.state.endTime && this.state.startTimePicked === '2') ?
                                                            <div>
                                                                <TimePicker name="startTime" start="7:00" end="24:00"
                                                                            step={30}
                                                                            onChange={this.onStartTimeSelected}
                                                                            style={successFormStyle}
                                                                            value={this.state.startTime} required/>
                                                            </div>
                                                            :
                                                            <div>
                                                                <TimePicker name="startTime" start="7:00" end="24:00"
                                                                            step={30}
                                                                            onChange={this.onStartTimeSelected}
                                                                            value={this.state.startTime} required/>
                                                            </div>
                                            }
                                        </Col>

                                        <Col md={4}>
                                            <Col componentClass={ControlLabel}>End Time</Col>
                                            {
                                                (this.state.endTimePicked === '1') ?
                                                    (<div>
                                                        <TimePicker name="endTime" start="8:00" end="24:00" step={30}
                                                                    onChange={this.onEndTimeSelected}
                                                                    value={this.state.endTime} style={errorFormStyle}
                                                                    required/>
                                                        <HelpBlock style={errorHelpBlockStyle}>Pick an end
                                                            time</HelpBlock>
                                                    </div>)
                                                    :
                                                    (this.state.startTime > this.state.endTime || this.state.startTime === this.state.endTime && this.state.endTimePicked != '' ) ?
                                                        (<div>
                                                            <TimePicker name="endTime" start="8:00" end="24:00"
                                                                        step={30}
                                                                        onChange={this.onEndTimeSelected}
                                                                        value={this.state.endTime}
                                                                        style={errorFormStyle}
                                                                        required/>
                                                            <HelpBlock style={errorHelpBlockStyle}>End time should be
                                                                later than start time</HelpBlock>
                                                        </div>)
                                                        :
                                                        (this.state.startTime < this.state.endTime && this.state.endTimePicked === '2') ?
                                                            (<div>
                                                                <TimePicker name="endTime" start="7:00" end="24:00"
                                                                            step={30}
                                                                            onChange={this.onEndTimeSelected}
                                                                            value={this.state.endTime}
                                                                            style={successFormStyle}
                                                                            required/>
                                                            </div>)
                                                            :
                                                            (<div>
                                                                <TimePicker name="endTime" start="8:00" end="24:00"
                                                                            step={30}
                                                                            onChange={this.onEndTimeSelected}
                                                                            value={this.state.endTime}
                                                                            required/>
                                                            </div>)
                                            }
                                        </Col>
                                    </FormGroup>
                                </Panel>
                                <br/>
                                <br/>

                                <Panel header="Organization Information">
                                    <FormGroup>
                                        <Col md={4}>
                                            <Col componentClass={ControlLabel}>Organization</Col>
                                            {
                                                (this.state.organizationPicked === '1') ?
                                                    (<div>
                                                        <FormControl componentClass="select" name="selectOrganization"
                                                                     onChange={this.onOrganizationSelected}
                                                                     style={errorFormStyle}
                                                                     placeholder="select" required>
                                                            <option>select</option>
                                                            {organizationOptions}
                                                        </FormControl>
                                                        <HelpBlock style={errorHelpBlockStyle}>Pick an
                                                            organization</HelpBlock>
                                                    </div>)
                                                    :
                                                    (this.state.organizationPicked === '2') ?
                                                        (<div>
                                                            <FormControl componentClass="select"
                                                                         name="selectOrganization"
                                                                         onChange={this.onOrganizationSelected}
                                                                         style={successFormStyle}
                                                                         placeholder="select" required>
                                                                <option>select</option>
                                                                {organizationOptions}
                                                            </FormControl>
                                                        </div>)
                                                        :
                                                        (<div>
                                                            <FormControl componentClass="select"
                                                                         name="selectOrganization"
                                                                         onChange={this.onOrganizationSelected}
                                                                         placeholder="select" required>
                                                                <option>select</option>
                                                                {organizationOptions}
                                                            </FormControl>
                                                        </div>)
                                            }

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

                                <Col md={12}>

                                    <AlertContainer ref={a => this.msg = a}/>

                                    <ReactCenter>
                                        <Button bsStyle="primary" type="submit">Submit</Button>
                                    </ReactCenter>

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