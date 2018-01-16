import React, {Component} from 'react';
import 'isomorphic-fetch';
import DatePicker from 'react-bootstrap-date-picker';
import TimePicker from 'react-bootstrap-time-picker';
import {Link} from "react-router-dom";
import {Modal} from 'react-bootstrap'
import AlertContainer from 'react-alert';
import ReactCenter from 'react-center';


import {
    FormGroup, FormControl, ControlLabel, ButtonToolbar, Button,
    Panel, Form, Col, Alert, Radio, Well, MenuItem, DropdownButton, Jumbotron, Tab, Tow, Nav, Row, NavItem, HelpBlock
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
            selectedOrganization: {
                id: '',
                organizationInitials: ''
            },
            selectedDate: value,
            selectedStartTime: '',
            startTime: '',
            selectedEndTime: '',
            endTime: '',
            selectedFacilities: {
                building: ''
            },
            statusOptions: ['pending', 'approved', 'denied'],
            selectedStatus: {},

            showModal: '',
            titleValue: '',
            descriptionValue: '',
            guestValue: '',
            attendanceValue: '',
            facilityPicked: valueFacility,
            datePicked: valueDate,
            startTimePicked: valueStartTime,
            endTimePicked: valueEndTime,
            organizationPicked: valueOrganization,
            
            studentInfo: {
                id: '',
                isActive: '',
                studentAddress: '',
                studentCity: '',
                studentCountry: '',
                studentEmail: '',
                studentName: '',
                studentNo: '',
                studentPhone: '',
                studentZipCode: '',
                user_id: ''
            },

            counselorInformation: {

            }
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
        console.log('Ok?');

        fetch(`http://192.168.99.100/api/users/${this.props.authentication.email}`).then(response => {
        // fetch(`http://192.168.99.100/api/users/${this.props.authentication.email}`).then(response => {
            if (response.ok) {
                response.json().then(results => {
                    this.setState({studentInfo: results.students[0]});


                    // fetch(`http://192.168.99.100/api/userOrganizations/${this.state.studentInfo.studentEmail}`).then(response => {
                    fetch(`http://192.168.99.100/api/userOrganizations/${this.state.studentInfo.studentEmail}`).then(response => {
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

                    // fetch(`http://192.168.99.100/api/facilities/`).then(response => {
                    fetch(`http://192.168.99.100/api/facilities/`).then(response => {
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


        var getTwentyFourHourTime = function(amPmString) {
            var d = new Date("1/1/2013 " + amPmString);
            return d.getHours() + ':' + d.getMinutes();
        }

        const activityRequest = {
            student_id: this.state.studentInfo.id,
            organization_id: this.state.selectedOrganization.id,
            facility_id: this.state.selectedFacilities.id,
            staff_id: null,
            activityName: form.requestTitle.value,
            activityDescription: form.activityDescription.value,
            attendantsNumber: form.activityAssistant.value,
            activityDate: this.state.selectedDate,
            // activityStart: date,
            // activityStart: this.state.startTime,
            activityStart: getTwentyFourHourTime(this.state.selectedStartTime),
            // activityEnd: this.state.endTime,
            // activityEnd: this.state.selectedEndTime,
            activityEnd: getTwentyFourHourTime(this.state.selectedEndTime),
            hasFood: null,
            guestName: form.activityGuest.value,
            activityStatus_code: 1,
            counselorStatus_code: 1,
            managerStatus_code: 1,
            activityType_code: 1
        };
        console.log(activityRequest);
        fetch('http://192.168.99.100/api/activities', {
        // fetch('http://192.168.99.100/api/activities', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(activityRequest),
        }).then(response => {
            if (response.ok) {

                response.json().then(createdRequest => {
                    console.log('Activity request was created successfully!');
                    console.log('Activity request ID: ' + createdRequest._id);
                    this.setState({showModal: false});
                    console.log(':D');
                    console.log(this);
                    // this.props.history.push(`/student/activities/${createdRequest._id}`);
                    this.props.history.push(`/student/activities/}`);

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
        const selectedOrganization = this.state.organizations.filter(function (organization) {
            //console.log(organization);
            console.log(event.target.value);
            console.log(organization.id);
            console.log(organization.id == event.target.value);
            return organization.id == event.target.value;
        });

        this.setState({selectedOrganization: selectedOrganization[0]});
        this.setState({counselorInformation: selectedOrganization[0].counselors[0]});
    }

    onFacilitiesSelected(event) {
        this.setState({facilityPicked: true});
        event.preventDefault();
        console.log('Change happened');
        console.log('Aqui se va a la puta: ');
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
        this.setState({startTimePicked: true});
        console.log("Event: " + event);
        this.setState({startTimePicked: '2'});
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
        console.log('Start time: ');
        console.log(this.state.startTime);

    }

    onEndTimeSelected(event) {
        this.setState({endTimePicked: true});
        this.setState({endTimePicked: '2'});
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
        this.setState({datePicked: '2'});
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

    open() {
        console.log("Opeeeen");
        console.log(isNaN(this.state.guestValue));
        console.log(typeof(this.state.attendanceValue));
        console.log(this.state.attendanceValue > 0);

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

        else {

            {
                this.showErrorAlert()
            }

        }
    }

    showErrorAlert = () => {
        this.msg.error('Error in fields. Something is not right.', {time: 5000, type: 'error'});

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

        console.log('Selected Facilities');
        console.log(this.state.selectedFacilities);

        const organizationOptions = this.state.organizations.map(organization =>
            <option value={organization.id}>{organization.organizationName}</option>
        );

        const facilitiesOptions = this.state.facilities.map(facilities =>
            <option value={facilities.id}>{facilities.space}</option>
        );

        const statusOptions = this.state.statusOptions.map(option =>
            <option value={option}>{option}</option>
        );

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
                    <Row>
                        <Col md={12}>
                            <ol className="breadcrumb">
                                <li/>
                                <li>Student</li>

                                <li className="active">Request</li>
                            </ol>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <Form horizontal name="activityRequest">
                                <br/>

                                <Panel header="Student Information">
                                    <FormGroup id="needs-validation">
                                        <Col sm={4}>
                                            <Col componentClass={ControlLabel} for="validationCustom01">Full Name</Col>
                                            <FormControl name="requesterName" value={this.state.studentInfo.studentName}
                                                         disabled={true}/>
                                        </Col>

                                        <Col sm={4}>
                                            <Col componentClass={ControlLabel}>Identification Number</Col>
                                            <FormControl name="studentIdentificationNumber"
                                                         value={this.state.studentInfo.studentNo} disabled={true}/>
                                        </Col>

                                        <Col sm={4}>
                                            <Col componentClass={ControlLabel}>Role</Col>
                                            <FormControl name="studentRole" value={this.state.studentInfo.studentNo}
                                                         disabled={true}/>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup>
                                        <Col sm={12}>
                                            <Col componentClass={ControlLabel}>Address 1</Col>
                                            <FormControl name="studentAddress1"
                                                         value={this.state.studentInfo.studentAddress} disabled={true}/>
                                        </Col>

                                    </FormGroup>

                                    <FormGroup>
                                        <Col sm={3}>
                                            <Col componentClass={ControlLabel}>City</Col>
                                            <FormControl name="studentAddressCity"
                                                         value={this.state.studentInfo.studentCity} disabled={true}/>
                                        </Col>


                                        <Col sm={3}>
                                            <Col componentClass={ControlLabel}>Country</Col>
                                            <FormControl name="studentAddressCountry"
                                                         value={this.state.studentInfo.studentCountry} disabled={true}/>
                                        </Col>

                                        <Col sm={3}>
                                            <Col componentClass={ControlLabel}>Zip Code</Col>
                                            <FormControl name="studentAddressZipCode"
                                                         value={this.state.studentInfo.studentZipCode} disabled={true}/>
                                        </Col>

                                        <Col sm={3}>
                                        </Col>

                                    </FormGroup>

                                    <FormGroup>
                                        <Col sm={4}>
                                            <Col componentClass={ControlLabel}>Telephone</Col>
                                            <FormControl name="studentTelephone"
                                                         value={this.state.studentInfo.studentPhone} disabled={true}/>
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
                                                                     placeholder="Ex. Venta de Mantecados" type="text"
                                                                     onChange={this.handleChangeTitle}
                                                                     style={errorFormStyle}/>

                                                        <HelpBlock style={errorHelpBlockStyle}>Nombre no puede ser solo
                                                            n&uacute;meros</HelpBlock>
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
                                                                             placeholder="Ex. Venta de Mantecados"
                                                                             type="text"
                                                                             onChange={this.handleChangeTitle}
                                                                             style={errorFormStyle}/>
                                                                <HelpBlock style={errorHelpBlockStyle}>Nombre demasiado
                                                                    grande</HelpBlock>
                                                            </div>)
                                                            :
                                                            (this.state.titleValue.length < 4 && this.state.titleValue.length != 0) ?
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
                                                                (this.state.titleValue.length <= 20 && this.state.titleValue.length >= 4 && this.state.titleValue.length != 0) ?
                                                                    (<div>
                                                                        <FormControl name="requestTitle"
                                                                                     value={this.state.titleValue}
                                                                                     placeholder="Ex. Venta de Mantecados"
                                                                                     type="text"
                                                                                     onChange={this.handleChangeTitle}
                                                                                     style={successFormStyle}/>
                                                                    </div>)
                                                                    :
                                                                    (<div>
                                                                        <FormControl name="requestTitle"
                                                                                     value={this.state.titleValue}
                                                                                     placeholder="Ex. Venta de Mantecados"
                                                                                     type="text"
                                                                                     onChange={this.handleChangeTitle}/>
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
                                            <FormControl name="activityAssistant" value={this.state.activityAssistant}
                                                         type="number" min="1" max="10000" start="1"
                                                         onChange={this.handleChangeAttendance}/>
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
                                        <Col sm={4}>
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

                                        <Col sm={4}>
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

                                        <Col sm={4}>
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
                                                         value={this.state.selectedOrganization.organizationInitials}
                                                         required disable={true}/>
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

                                                         value={this.state.counselorInformation.counselorName} disabled/>
                                        </Col>

                                        <Col sm={4}>
                                            <Col componentClass={ControlLabel}>Telephone</Col>
                                            <FormControl name="counselorTelephone"

                                                         value={this.state.counselorInformation.counselorPhone} disabled/>
                                        </Col>

                                        <Col sm={4}>
                                            <Col componentClass={ControlLabel}>Email</Col>
                                            <FormControl name="counselorEmail"

                                                         value={this.state.counselorInformation.counselorEmail} disabled/>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup>
                                        <Col sm={3}>
                                            <Col componentClass={ControlLabel}>Faculty</Col>
                                            <FormControl name="counselorFaculty"

                                                         value={this.state.counselorInformation.counselorFaculty} disabled/>
                                        </Col>

                                        <Col sm={3}>
                                            <Col componentClass={ControlLabel}>Department</Col>
                                            <FormControl name="counselorDepartment"

                                                         value={this.state.counselorInformation.counselorDepartment} disabled/>
                                        </Col>

                                        <Col sm={2}>
                                            <Col componentClass={ControlLabel}>Office Number</Col>
                                            <FormControl name="counselorOfficeNumber"

                                                         value={this.state.counselorInformation.counselorOffice} disabled/>
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


                                    <ReactCenter><Button bsStyle="primary" type="button"
                                                         onClick={this.open}>Submit</Button></ReactCenter>
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