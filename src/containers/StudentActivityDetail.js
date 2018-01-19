/**
 * Created by jesma on 12/12/2017.
 */
import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router-dom';
import Icon from 'react-icons-kit';
import {statsDots} from 'react-icons-kit/icomoon/statsDots';
import {iosPaw} from 'react-icons-kit/ionicons/iosPaw';
import {home} from 'react-icons-kit/icomoon/home';
import {fileText2} from 'react-icons-kit/icomoon/fileText2';
import {userTie} from 'react-icons-kit/icomoon/userTie';
import DatePicker from 'react-bootstrap-date-picker';
import TimePicker from 'react-bootstrap-time-picker';

import {
    FormGroup, FormControl, ControlLabel, ButtonToolbar, Button,
    Panel, Form, Col, Alert, Radio, Well, MenuItem, DropdownButton, Jumbotron, Row, Nav, NavItem, Label, Checkbox
} from 'react-bootstrap';
import ReactCenter from "react-center";


class StudentActivityDetail extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {

            activity: {
                id: '',
                activityName: '',
                activityDescription: '',
                attendantsNumber: '',
                activityDate: '',
                activityStart: '',
                activityEnd: '',
                hasFood: '',
                guestName: '',
                activityStatus_code: '',
                counselorStatus_code: '',
                managerStatus_code: '',
                activityType_code: '',
                counselorComment: '',
                managerComment: '',
                staffComment: '',
                student: {
                    id: '',
                    studentName: '',
                    studentEmail: '',
                    studentNo: '',
                    studentPhone: '',
                    studentAddress: '',
                    studentCity: '',
                    studentCountry: '',
                    studentZipCode: '',
                    user_id: '',
                    isActive: ''
                },
                staff: {
                    id: '',
                    staffName: '',
                    staffEmail: '',
                    staffPhone: '',
                },
                organization: {
                    id: '',
                    organizationName: '',
                    isActive: '',
                    counselors: [
                        {
                            id: '',
                            counselorName: '',
                            counselorEmail: '',
                            counselorPhone: '',
                            counselorFaculty: '',
                            counselorDepartment: '',
                            counselorOffice: '',
                            user_id: '',
                            isActive: ''
                        }
                    ]
                },
                facility: {
                    id: '',
                    building: '',
                    space: '',
                    isActive: '',
                    managers: '',
                    department: {
                        code: '',
                        description: ''
                    }
                },
                status: {
                    code: '',
                    description: ''
                },
                type: {
                    code: '',
                    description: ''
                },
                counselor_status: {
                    code: '',
                    description: ''
                },
                manager_status: {
                    code: '',
                    description: ''
                }
            }
        }

    }

    componentDidMount() {
        console.log('this.props.params.id: ' + this.props.match.params.id);
        let id = this.props.match.params.id;
        console.log("The id: " + id);
        // fetch(`http://dev.uprm.edu/dsca/v1/api/activities/${id}`).then(response => {
        fetch(`http://dev.uprm.edu/dsca/v1/api/activities/${id}`).then(response => {
            response.json().then(data => {
                console.log("DATA" + data);

                if(Object.keys(data).length === 0){
                    this.props.history.push(`/student/activities/`);
                }

                else if (data.student.studentEmail !== this.props.cookies.get('email')){
                    this.props.history.push(`/student/activities/`);
                }

                this.setState({activity: data});
                console.log(this.state.activity.id);
            }).catch(err => {
                console.log(err)
                //this.props.showError(`Error in sending data to server: ${err.message}`);
            });
        })

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

    render() {
        console.log('this.state.selectedType');

        console.log(this.state.selectedType);

        const tabsInstance = (

            <div style={{backgroundColor: '#F8F8F8'}}>
                <Nav fluid>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/student/request"><Icon icon={fileText2}
                                                                                                           style={{paddingRight: "20px"}}/>Solicitud</Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/student/activities"><Icon icon={iosPaw}
                                                                                                              style={{paddingRight: "20px"}}/>Actividades</Link></NavItem>
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
                        <li ><Link to={`/activities/`}>Actividades</Link></li>
                        <li className="active">Detalles de la Actividad</li>
                    </ol>

                    <Row>
                        <Col md={12}>
                                <Panel header="Detalles del Estudiante">
                                    <FormGroup>
                                        <Col sm={4}>
                                            <Col componentClass={ControlLabel}>Nombre Completo</Col>
                                            <FormControl name="requesterName"
                                                         value={this.state.activity.student.studentName} disabled/>
                                        </Col>

                                        <Col sm={4}>
                                            <Col componentClass={ControlLabel}>N&uacute;mero de Identificaci&oacute;n</Col>
                                            <FormControl name="studentIdentificationNumber"
                                                         value={this.state.activity.student.studentNo} disabled/>
                                        </Col>

                                        <Col sm={3}>
                                            <Col componentClass={ControlLabel}>Puesto</Col>
                                            <FormControl name="studentRole" disabled/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <Col sm={10}>
                                            <Col componentClass={ControlLabel}>Direcci&oacute;n</Col>
                                            <FormControl name="studentAddress1"
                                                         value={this.state.activity.student.studentAddress} disabled/>
                                        </Col>

                                    </FormGroup>

                                    <FormGroup>
                                        <Col sm={3}>
                                            <Col componentClass={ControlLabel}>Ciudad</Col>
                                            <FormControl name="studentAddressCity"
                                                         value={this.state.activity.student.studentCity} disabled/>
                                        </Col>

                                        <Col sm={3}>
                                            <Col componentClass={ControlLabel}>Pa&iacute;s</Col>
                                            <FormControl name="studentAddressCountry"
                                                         value={this.state.activity.student.studentCountry} disabled/>
                                        </Col>

                                        <Col sm={3}>
                                            <Col componentClass={ControlLabel}>C&oacute;digo Postal</Col>
                                            <FormControl name="studentAddressZipCode"
                                                         value={this.state.activity.student.studentZipCode} disabled/>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup>
                                        <Col sm={4}>
                                            <Col componentClass={ControlLabel}>Tel&eacute;fono</Col>
                                            <FormControl name="studentTelephone"
                                                         value={this.state.activity.student.studentPhone} disabled/>
                                        </Col>
                                    </FormGroup>
                                </Panel>

                            <Panel header="Detalles de la Actividad">
                                <FormGroup>
                                    <Col sm={3}>
                                        <Col componentClass={ControlLabel}>Nombre</Col>
                                        <FormControl name="requestTitle" value={this.state.activity.activityName}
                                                     disabled/>
                                    </Col>

                                    <Col sm={9}>
                                        <Col componentClass={ControlLabel}>Descripci&oacute;n</Col>
                                        <FormControl name="activityDescription"
                                                     value={this.state.activity.activityDescription} disabled/>
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col sm={3}>
                                        <Col componentClass={ControlLabel}>Invitado(s)</Col>
                                        <FormControl name="activityGuest" value={this.state.activity.guestName}
                                                     disabled/>
                                    </Col>

                                    <Col sm={3}>
                                        <Col componentClass={ControlLabel}>N&uacute;mero de Asistentes</Col>
                                        <FormControl name="activityAssistant"
                                                     value={this.state.activity.attendantsNumber} disabled/>
                                    </Col>

                                    <Col md={3}>
                                        <Col componentClass={ControlLabel}>Espacio/Sal&oacute;n</Col>
                                        <FormControl name="selectFacilities" value={this.state.activity.facility.space}
                                                     disabled/>
                                    </Col>

                                    <Col md={3}>
                                        <Col componentClass={ControlLabel}>Edificio</Col>
                                        <FormControl name="facilityBuilding"
                                                     value={this.state.activity.facility.building} disabled/>
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col md={4}>
                                        <Col componentClass={ControlLabel}>Fecha</Col>
                                        <DatePicker id="example-datepicker" name="selectedDate"
                                                    value={this.state.activity.activityDate} disabled/>
                                    </Col>

                                    <Col md={4}>
                                        <Col componentClass={ControlLabel}>Hora de Comienzo</Col>
                                        <TimePicker name="startTime" value={this.state.activity.activityStart}
                                                    disabled/>
                                    </Col>

                                    <Col md={4}>
                                        <Col componentClass={ControlLabel}>Hora de Finalizaci&oacute;n</Col>
                                        <TimePicker name="endTime" value={this.state.activity.activityEnd} disabled/>
                                    </Col>
                                </FormGroup>
                                <br/>

                                {
                                    (this.state.activity.status.code === 2) ?
                                        (<div>
                                            <FormGroup validationState="success">
                                                <Col md={4}>
                                                    <Col componentClass={ControlLabel}>Estado</Col>
                                                    <FormControl name="status"
                                                                 value={this.state.activity.status.description}
                                                                 disabled/>
                                                </Col>
                                            </FormGroup>
                                        </div>)
                                        :
                                        (<div>
                                            <FormGroup>
                                                <Col md={4}>
                                                    <Col componentClass={ControlLabel}>Estado</Col>
                                                    <FormControl name="status"
                                                                 value={this.state.activity.status.description}
                                                                 disabled/>
                                                </Col>
                                            </FormGroup>
                                        </div>)
                                }
                            </Panel>
                            <br/>

                            <Panel header="Detalles de la Organizaci&oacute;n">
                                <FormGroup>
                                    <Col md={8}>
                                        <Col componentClass={ControlLabel}>Organizaci&oacute;n</Col>
                                        <FormControl name="selectOrganization"
                                                     value={this.state.activity.organization.organizationName}
                                                     disabled/>
                                    </Col>

                                    <Col sm={4}>
                                        <Col componentClass={ControlLabel}>Siglas</Col>
                                        <FormControl name="organizationInitials"
                                                     value={this.state.activity.organization.organizationInitials}
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
                                                     value={this.state.activity.organization.counselors[0].counselorName}
                                                     disabled/>
                                    </Col>

                                    <Col sm={4}>
                                        <Col componentClass={ControlLabel}>Tel&eacute;fono</Col>
                                        <FormControl name="counselorTelephone"
                                                     value={this.state.activity.organization.counselors[0].counselorPhone}
                                                     disabled/>
                                    </Col>

                                    <Col sm={4}>
                                        <Col componentClass={ControlLabel}>Correo Electr&oacute;nico</Col>
                                        <FormControl name="counselorEmail"
                                                     value={this.state.activity.organization.counselors[0].counselorEmail}
                                                     disabled/>
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col sm={3}>
                                        <Col componentClass={ControlLabel}>Facultad</Col>
                                        <FormControl name="counselorFaculty"
                                                     value={this.state.activity.organization.counselors[0].counselorFaculty}
                                                     disabled/>
                                    </Col>

                                    <Col sm={3}>
                                        <Col componentClass={ControlLabel}>Departamento</Col>
                                        <FormControl name="counselorDepartment"
                                                     value={this.state.activity.organization.counselors[0].counselorDepartment}
                                                     disabled/>
                                    </Col>

                                    <Col sm={2}>
                                        <Col componentClass={ControlLabel}>Oficina</Col>
                                        <FormControl name="counselorOfficeNumber"
                                                     value={this.state.activity.organization.counselors[0].counselorOffice}
                                                     disabled/>
                                    </Col>
                                </FormGroup>
                            </Panel>
                            <br/>
                        </Col>
                    </Row>
                </Col>
            </div>
        )

    }
}


StudentActivityDetail.contextTypes = {
    initialState: React.PropTypes.object,
};

export default StudentActivityDetail;