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
    Panel, Form, Col, Alert, Radio, Well, MenuItem, DropdownButton, Jumbotron, Tab, Tow, Nav, NavItem, Row, HelpBlock, Checkbox
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
        let valueType = '';


        this.state = {
            organizations: [],
            facilities: [],
            selectedOrganization: {
                id: '',
                organizationInitials: ''
            },
            activityTypes: [],
            selectedType: 0,
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
            typePicked: valueType,
            titleDecision: '',
            descriptionDecision: '',
            guestDecision: '',
            attendanceDecision: '',

            staffInfo: {
                id: '',
                staffName: '',
                staffEmail: '',
                staffPhone: ''
            },

            helpMessage: '',

            commentary: '',
            counselorInformation: {},
            selectedOption: false
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
        fetch('http://dev.uprm.edu/dsca/v1/api/organizationCounselors').then(response => {
            if (response.ok) {
                response.json().then(results => {
                    this.setState({organizations: results});
                    console.log('Asi salen las organizaciones: ');
                    console.log(this.state.organizations);
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

        fetch(`http://dev.uprm.edu/dsca/v1/api/facilitiesWithManager`).then(response => {
            if (response.ok) {
                response.json().then(results => {
                    //console.log(results);
                    this.setState({facilities: results});
                    console.log('Asi salen las facilities: ');

                    console.log(this.state.facilities);
                    //this.props.history.push(`/activities/${createdRequest._id}`);
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

        fetch(`http://dev.uprm.edu/dsca/v1/api/users/${this.props.cookies.get('email')}`).then(response => {
            // fetch(`http://dev.uprm.edu/dsca/v1/api/users/${this.props.authentication.email}`).then(response => {
            if (response.ok) {
                response.json().then(results => {
                    this.setState({staffInfo: results.staff[0]});
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

        fetch(`http://dev.uprm.edu/dsca/v1/api/activityType/`).then(response => {
            if (response.ok) {
                response.json().then(results => {
                    console.log("Type:");
                    console.log(results);
                    this.setState({activityTypes: results});
                    console.log('Asi son los activityTypes: ' + this.state.activityTypes);
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

        var getTwentyFourHourTime = function(amPmString) {
            var d = new Date("1/1/2013 " + amPmString);
            return d.getHours() + ':' + d.getMinutes();
        };

        const activityRequest = {
            student_id: null,
            organization_id: this.state.selectedOrganization.id,
            facility_id: this.state.selectedFacilities.id,
            staff_id: this.state.staffInfo.id,
            activityName: form.requestTitle.value,
            activityDescription: form.activityDescription.value,
            attendantsNumber: form.activityAssistant.value,
            activityDate: this.state.selectedDate,
            activityStart: getTwentyFourHourTime(this.state.selectedStartTime),
            activityEnd: getTwentyFourHourTime(this.state.selectedEndTime),
            hasFood: this.state.selectedOption ? 1 : 0,
            guestName: form.activityGuest.value,
            activityType_code: this.state.selectedType,
            staffComment: form.commentary.value
        };

        console.log(activityRequest);
        fetch('http://dev.uprm.edu/dsca/v1/api/adminStore', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(activityRequest),
        }).then(response => {
            if (response.ok) {
                console.log(response);
                response.json().then(createdRequest => {
                    console.log('Activity request was created successfully!');
                    console.log('Activity request ID: ' + createdRequest.id);
                    this.setState({showModal: false});
                    console.log(':D');
                    console.log(this);

                    this.props.history.push(`/activities/${createdRequest.id}`);

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
                console.log(organization.id);
                console.log(event.target.value);
                console.log(organization.id == event.target.value);
                return organization.id == event.target.value;
            });
            console.log(selectedOrganization);
            this.setState({selectedOrganization: selectedOrganization[0]});
            this.setState({counselorInformation: selectedOrganization[0].counselors[0]});
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

    onTypeSelected = (event) => {
        event.preventDefault();
        console.log("Type here");
        this.setState({typePicked: '2'});
        const selectedType = this.state.activityTypes.filter(function (obj) {
            return obj.code == event.target.value;
        });
        this.setState({selectedType: selectedType[0].code});

    }

    boxToogle = () => {
        console.log("Food");
        console.log(this.state.selectedOption);
        this.setState({selectedOption: !this.state.selectedOption});
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
            console.log("In date");
            this.setState({datePicked: '1'});
        }

        if (this.state.typePicked === '') {
            this.setState({typePicked: '1'});
        }

        if (this.state.titleValue.length <= 254 &&
            this.state.titleValue.length >= 5 &&
            /^[0-9]+$/.test(this.state.titleValue) === false &&
            /^[`!@#\$%\^&\*()_+{}\|:"<>?~,./;'[\]\\]+$/.test(this.state.titleValue) === false &&
            this.state.descriptionValue.length <= 254 &&
            this.state.descriptionValue.length >= 5 &&
            /^[0-9]+$/.test(this.state.descriptionValue) === false &&
            /^[`!@#\$%\^&\*()_+{}\|:"<>?~,./;'[\]\\]+$/.test(this.state.descriptionValue) === false &&
            this.state.guestValue.length >= 2 &&
            this.state.guestValue.length <= 254 &&
            /^[0-9]+$/.test(this.state.guestValue) === false &&
            /^[`!@#\$%\^&\*()_+{}\|:"<>?~,./;'[\]\\]+$/.test(this.state.guestValue) === false &&
            this.state.attendanceValue > 1 && this.state.attendanceValue < 100000 &&
            this.state.datePicked === "2" &&
            this.state.startTime < this.state.endTime &&
            this.state.startTimePicked === "2" &&
            this.state.endTimePicked === "2" &&
            this.state.facilityPicked === "2" &&
            this.state.organizationPicked === "2" &&
            this.state.typePicked === "2" &&
            this.state.commentary.length <= 254 &&
            /^[0-9]+$/.test(this.state.commentary) === false &&
            /^[`!@#\$%\^&\*()_+{}\|:"<>?~,./;'[\]\\]+$/.test(this.state.commentary) === false) {
            this.setState({showModal: true});
        }

        else {
            this.showErrorAlert("Campos en el formulario llenados incorrectamente.")
        }
    }

    showErrorAlert = (message) => {
        this.msg.error(message, {time: 2000, type: 'error'});
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
        console.log("dfsdfsdfsdfdsf");
        console.log(e.target.value);
        if(e.target.value <= 0)
        {
            this.setState({attendanceValue: 1});
            this.setState({activityAssistant: 1});

        }

        else {
            this.setState({attendanceValue: e.target.value});
            this.setState({activityAssistant: e.target.value});
        }
    }

    handleCommentaryChange = (e) => {
        this.setState({commentary: e.target.value})
    }

    render() {
        const organizationOptions = this.state.organizations.map(organization =>
            <option value={organization.id}>{organization.organizationName}</option>
        );

        const facilitiesOptions = this.state.facilities.map(facilities =>
            <option value={facilities.id}>{facilities.space}</option>
        );

        const typeOptions = this.state.activityTypes.map(option =>
            <option value={option.code}>{option.description}</option>
        );

        const tabsInstance = (

            <div style={{backgroundColor: '#F8F8F8'}}>
                <Nav fluid>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/request"><Icon icon={fileText2}
                                                                                                   style={{paddingRight: "20px"}}/>Solicitud</Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/activities"><Icon icon={iosPaw}
                                                                                                      style={{paddingRight: "20px"}}/>Actividades</Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}> <Link to="/stats"><Icon icon={statsDots}
                                                                                                  style={{paddingRight: "20px"}}/>Estad&iacute;sticas</Link></NavItem>
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
                        <li className="active">Solicitud</li>
                    </ol>

                    <Row>
                        <Col md={12}>
                            <Form horizontal name="activityRequest" onSubmit={this.open}>

                                <Panel header="Detalles del Administrador">
                                    <FormGroup id="needs-validation">
                                        <Col sm={4}>
                                            <Col componentClass={ControlLabel}>Nombre</Col>
                                            <FormControl name="staffName" value={this.state.staffInfo.staffName}
                                                         disabled/>
                                        </Col>

                                        <Col sm={4}>
                                            <Col componentClass={ControlLabel}>Correo Electr&oacute;nico</Col>
                                            <FormControl name="staffEmail" value={this.state.staffInfo.staffEmail}
                                                         disabled/>
                                        </Col>

                                        <Col sm={3}>
                                            <Col componentClass={ControlLabel}>Tel&eacute;fono</Col>
                                            <FormControl name="staffPhone" value={this.state.staffInfo.staffPhone}
                                                         disabled/>
                                        </Col>
                                    </FormGroup>
                                </Panel>
                                <br/>

                                <Panel header="Detalles de la Actividad">
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
                                                        (this.state.titleValue.length > 254) ?
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
                                                                (this.state.titleValue.length <= 254 && this.state.titleValue.length >= 5 && this.state.titleValue.length != 0) ?
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
                                                        (this.state.descriptionValue.length > 254) ?
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
                                                            (this.state.descriptionValue.length < 5 && this.state.descriptionValue.length != 0) ?
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
                                                                (this.state.descriptionValue.length <= 254 && this.state.descriptionValue.length >= 5 && this.state.descriptionValue.length != 0) ?
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
                                                (/^[0-9]+$/.test(this.state.guestValue) === true) ?
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
                                                        (this.state.guestValue.length > 254) ?

                                                            (<div>
                                                                <FormControl name="activityGuest"
                                                                             value={this.state.activityGuest}
                                                                             placeholder="Ex. None" type="text"
                                                                             style={errorFormStyle}
                                                                             onChange={this.handleChangeGuest}
                                                                             required/>
                                                                <HelpBlock style={errorHelpBlockStyle}>Lista de
                                                                    invitados muy extensa</HelpBlock>
                                                            </div>)
                                                            :
                                                            (this.state.guestValue.length <= 2 && this.state.guestValue.length !== 0) ?

                                                                (<div>
                                                                    <FormControl name="activityGuest"
                                                                                 value={this.state.activityGuest}
                                                                                 placeholder="Ex. None" type="text"
                                                                                 style={errorFormStyle}
                                                                                 onChange={this.handleChangeGuest}
                                                                                 required/>
                                                                    <HelpBlock style={errorHelpBlockStyle}>Lista de
                                                                        invitados muy corta</HelpBlock>
                                                                </div>)
                                                                :

                                                            (this.state.guestValue.length <= 254 && this.state.guestValue.length >=2 && this.state.guestValue.length != 0) ?

                                                                (<div>
                                                                    <FormControl name="activityGuest"
                                                                                 value={this.state.activityGuest}
                                                                                 placeholder="Ex. None" type="text"
                                                                                 style={successFormStyle}
                                                                                 onChange={this.handleChangeGuest}
                                                                                 required/>
                                                                </div>)
                                                                :
                                                                (<div>
                                                                    <FormControl name="activityGuest"
                                                                                 value={this.state.activityGuest}
                                                                                 placeholder="Ex. None" type="text"
                                                                                 onChange={this.handleChangeGuest}
                                                                                 required/>
                                                                </div>)
                                            }
                                        </Col>

                                        <Col sm={3}>
                                            <Col componentClass={ControlLabel}>N&uacute;mero de Asistentes</Col>
                                            <FormControl name="activityAssistant"
                                                         value={this.state.activityAssistant}
                                                         type="number" min="1" max="100000" start="1"
                                                         onChange={this.handleChangeAttendance} required/>
                                        </Col>

                                        <Col md={3}>
                                            <Col componentClass={ControlLabel}>Espacio/Sal&oacute;n</Col>
                                            {
                                                (this.state.facilityPicked === '1') ?
                                                    (<div>
                                                        <FormControl componentClass="select" name="selectFacilities"
                                                                     onChange={this.onFacilitiesSelected}
                                                                     style={errorFormStyle}

                                                                     placeholder="select">
                                                            <option hidden>select</option>
                                                            {facilitiesOptions}
                                                        </FormControl>
                                                        <HelpBlock style={errorHelpBlockStyle}>Escoja un
                                                            espacio/sal&oacute;n</HelpBlock>
                                                    </div>)
                                                    :
                                                    (this.state.facilityPicked === '2') ?
                                                        (<div>
                                                            <FormControl componentClass="select" name="selectFacilities"
                                                                         onChange={this.onFacilitiesSelected}
                                                                         style={successFormStyle}

                                                                         placeholder="select">
                                                                <option hidden>select</option>
                                                                {facilitiesOptions}
                                                            </FormControl>
                                                        </div>)
                                                        :
                                                        (<div>
                                                            <FormControl componentClass="select" name="selectFacilities"
                                                                         onChange={this.onFacilitiesSelected}

                                                                         placeholder="select">
                                                                <option hidden>select</option>
                                                                {facilitiesOptions}
                                                            </FormControl>
                                                        </div>)
                                            }
                                        </Col>

                                        <Col md={3}>
                                            <Col componentClass={ControlLabel}>Edificio</Col>
                                            <FormControl name="facilityBuilding"
                                                         value={this.state.selectedFacilities.building} required
                                                         disabled/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <Col md={4}>

                                            <Col componentClass={ControlLabel}>Fecha</Col>
                                            {
                                                (this.state.datePicked === '1') ?
                                                    (<div>
                                                        <DatePicker id="example-datepicker" name="selectedDate"
                                                                    onChange={this.onDateSelected}
                                                                    value={this.state.selectedDate}
                                                                    style={errorFormStyle}
                                                                    minDate={(new Date()).toISOString()}
                                                                    required/>
                                                        <HelpBlock style={errorHelpBlockStyle}>Escoja una
                                                            fecha</HelpBlock>
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
                                            <Col componentClass={ControlLabel}>Horario de Comienzo</Col>
                                            {
                                                (this.state.startTimePicked === '1') ?
                                                    <div>
                                                        <TimePicker name="startTime" start="7:00" end="24:00" step={30}
                                                                    onChange={this.onStartTimeSelected}
                                                                    style={errorFormStyle}
                                                                    value={this.state.startTime} required/>
                                                        <HelpBlock>Escoja un horario de comienzo</HelpBlock>
                                                    </div>
                                                    :
                                                    (this.state.startTime > this.state.endTime || this.state.startTime === this.state.endTime && this.state.startTimePicked != '' ) ?
                                                        (<div>
                                                            <TimePicker name="startTime" start="7:00" end="24:00"
                                                                        step={30}
                                                                        onChange={this.onStartTimeSelected}
                                                                        value={this.state.startTime}
                                                                        style={errorFormStyle}
                                                                        required/>
                                                            <HelpBlock style={errorHelpBlockStyle}>Horario de comienzo
                                                                debe ser m&aacute;s temprano que horario de
                                                                finalizaci&oacute;n</HelpBlock>
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
                                                                            value={this.state.startTime}
                                                                            required/>
                                                            </div>
                                            }
                                        </Col>

                                        <Col md={4}>
                                            <Col componentClass={ControlLabel}>Horario de Finalizaci&oacute;n</Col>
                                            {
                                                (this.state.endTimePicked === '1') ?
                                                    (<div>
                                                        <TimePicker name="endTime" start="8:00" end="24:00" step={30}
                                                                    onChange={this.onEndTimeSelected}
                                                                    value={this.state.endTime} style={errorFormStyle}
                                                                    required/>
                                                        <HelpBlock style={errorHelpBlockStyle}>Escoja un horario de
                                                            finalizaci&oacute;n</HelpBlock>
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
                                                            <HelpBlock style={errorHelpBlockStyle}>Horario de
                                                                finalizaci&oacute;n debe ser mas tarde que hoario de
                                                                comienzo</HelpBlock>
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

                                    <FormGroup>
                                        <Col sm={3}>
                                            <Col componentClass={ControlLabel}>Categor&iacute;a: </Col>

                                            {(this.state.typePicked === '1') ?
                                                (<div>
                                                    <FormControl componentClass="select" name="selectType"
                                                                 onChange={this.onTypeSelected}
                                                                 style={errorFormStyle}
                                                                 required>
                                                        <option hidden>select</option>
                                                        {typeOptions}
                                                    </FormControl>
                                                    <HelpBlock syle={errorHelpBlockStyle}>Escoja una categor&iacute;
                                                        a</HelpBlock>
                                                </div>)
                                                :
                                                (this.state.typePicked === '2') ?
                                                    (<div>

                                                        <FormControl componentClass="select" name="selectType"
                                                                     onChange={this.onTypeSelected}
                                                                     style={successFormStyle}
                                                                     required>
                                                            <option hidden>select</option>
                                                            {typeOptions}
                                                        </FormControl>
                                                    </div>)
                                                    :
                                                    (<div>

                                                        <FormControl componentClass="select" name="selectType"
                                                                     onChange={this.onTypeSelected}
                                                                     required>
                                                            <option hidden>select</option>
                                                            {typeOptions}
                                                        </FormControl>
                                                    </div>)
                                            }

                                        </Col>

                                        <Col sm={6}>
                                            <Col componentClass={ControlLabel}>Observaciones: </Col>
                                            {(/^[0-9]+$/.test(this.state.commentary) === true) ?
                                                (<div>
                                                    <FormControl name="commentary"
                                                                 value={this.state.commentary}
                                                                 onChange={this.handleCommentaryChange}
                                                                 style={errorFormStyle}
                                                                 required/>
                                                    <HelpBlock style={errorHelpBlockStyle}>No puede ser
                                                        solo
                                                        n&uacute;meros</HelpBlock>
                                                </div>)
                                                :
                                                (/^[`!@#\$%\^&\*()_+{}\|:"<>?~,./;'[\]\\]+$/.test(this.state.commentary) === true) ?
                                                    (<div>
                                                        <FormControl name="commentary"
                                                                     value={this.state.commentary}
                                                                     onChange={this.handleCommentaryChange}
                                                                     style={errorFormStyle}
                                                                     required/>
                                                        <HelpBlock style={errorHelpBlockStyle}>No puede ser
                                                            solo
                                                            s&iacute;mbolos</HelpBlock>
                                                    </div>)
                                                    :
                                                    (this.state.commentary.length > 254) ?
                                                (<div>
                                                    <FormControl name="commentary"
                                                                 value={this.state.commentary}
                                                                 onChange={this.handleCommentaryChange}
                                                                 style={errorFormStyle}
                                                                 required/>
                                                    <HelpBlock style={errorHelpBlockStyle}>Observaci&oacute;n muy
                                                        extensa</HelpBlock>
                                                </div>)
                                                :
                                                (this.state.commentary.length <= 254 && this.state.commentary.length != 0) ?
                                                    (<div>
                                                        <FormControl name="commentary"
                                                                     value={this.state.commentary}
                                                                     onChange={this.handleCommentaryChange}
                                                                     style={successFormStyle}
                                                                     required/>
                                                    </div>)
                                                    :
                                                    (<div>
                                                        <FormControl name="commentary"
                                                                     value={this.state.commentary}
                                                                     onChange={this.handleCommentaryChange}
                                                                     required/>
                                                    </div>)
                                            }
                                        </Col>

                                        <Col sm={3}>
                                            <Col componentClass={ControlLabel}>Permisos: </Col>
                                            <Col>
                                                <Checkbox name="yesValue" onClick={this.boxToogle} inline>Permiso de
                                                    Comida?</Checkbox>{' '}
                                            </Col>
                                        </Col>
                                    </FormGroup>

                                </Panel>
                                <br/>

                                <Panel header="Detalles de la Organizaci&oacute;n">
                                    <FormGroup>
                                        <Col md={8}>
                                            <Col componentClass={ControlLabel}>Organizaci&oacute;n</Col>
                                            {
                                                (this.state.organizationPicked === '1') ?
                                                    (<div>
                                                        <FormControl componentClass="select" name="selectOrganization"
                                                                     onChange={this.onOrganizationSelected}
                                                                     style={errorFormStyle}
                                                                     placeholder="select" required>
                                                            <option hidden>select</option>
                                                            {organizationOptions}
                                                        </FormControl>
                                                        <HelpBlock style={errorHelpBlockStyle}>Escoja una
                                                            organizaci&oacute;n</HelpBlock>
                                                    </div>)
                                                    :
                                                    (this.state.organizationPicked === '2') ?
                                                        (<div>
                                                            <FormControl componentClass="select"
                                                                         name="selectOrganization"
                                                                         onChange={this.onOrganizationSelected}
                                                                         style={successFormStyle}
                                                                         placeholder="select" required>
                                                                <option hidden>select</option>
                                                                {organizationOptions}
                                                            </FormControl>
                                                        </div>)
                                                        :
                                                        (<div>
                                                            <FormControl componentClass="select"
                                                                         name="selectOrganization"
                                                                         onChange={this.onOrganizationSelected}
                                                                         placeholder="select" required>
                                                                <option hidden>select</option>
                                                                {organizationOptions}
                                                            </FormControl>
                                                        </div>)
                                            }

                                        </Col>

                                        <Col sm={4}>
                                            <Col componentClass={ControlLabel}>Siglas</Col>
                                            <FormControl name="organizationInitials"
                                                         value={this.state.selectedOrganization.organizationInitials}
                                                         disabled/>
                                        </Col>
                                    </FormGroup>
                                </Panel>
                                <br/>

                                <Panel header="Detalles del Consejero">
                                    <FormGroup>
                                        <Col md={4}>
                                            <Col componentClass={ControlLabel}>Nombre</Col>
                                            <FormControl name="counselorName"
                                                         value={this.state.counselorInformation.counselorName}
                                                         disabled/>
                                        </Col>

                                        <Col sm={4}>
                                            <Col componentClass={ControlLabel}>Tel&eacute;fono</Col>
                                            <FormControl name="counselorTelephone"
                                                         value={this.state.counselorInformation.counselorPhone}
                                                         disabled/>
                                        </Col>

                                        <Col sm={4}>
                                            <Col componentClass={ControlLabel}>Correo Electr&oacute;nico</Col>
                                            <FormControl name="counselorEmail"
                                                         value={this.state.counselorInformation.counselorEmail}
                                                         disabled/>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup>
                                        <Col sm={3}>
                                            <Col componentClass={ControlLabel}>Facultad</Col>
                                            <FormControl name="counselorFaculty"
                                                         value={this.state.counselorInformation.counselorFaculty}
                                                         disabled/>
                                        </Col>

                                        <Col sm={3}>
                                            <Col componentClass={ControlLabel}>Departmento</Col>
                                            <FormControl name="counselorDepartment"
                                                         value={this.state.counselorInformation.counselorDepartment}
                                                         disabled/>
                                        </Col>

                                        <Col sm={2}>
                                            <Col componentClass={ControlLabel}>Oficina</Col>
                                            <FormControl name="counselorOfficeNumber"
                                                         value={this.state.counselorInformation.counselorOffice}
                                                         disabled/>
                                        </Col>
                                    </FormGroup>
                                </Panel>

                                <Col md={12}>

                                    <AlertContainer ref={a => this.msg = a}/>

                                    <ReactCenter>
                                        <Button bsStyle="primary" type="submit">Someter</Button>
                                    </ReactCenter>

                                    <Modal show={this.state.showModal} onHide={this.close}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>¿Someter la solicitud?</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <h4>¿Se asegur&oacute; que toda la informaci&oacute;n est&aacute;
                                                correcta?</h4>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button onClick={this.onSubmit} bsStyle="primary"
                                                    type="button">Ok</Button>
                                            <Button onClick={this.close}>Cancelar</Button>
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