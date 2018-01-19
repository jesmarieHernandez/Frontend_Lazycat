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
import AlertContainer from 'react-alert';

import {
    FormGroup, FormControl, ControlLabel, ButtonToolbar, Button,
    Panel, Form, Col, Alert, Radio, Well, MenuItem, DropdownButton, Jumbotron, Row, Nav, NavItem, Label, Checkbox, HelpBlock
} from 'react-bootstrap';
import ReactCenter from "react-center";


const PAGE_SIZE = 10;

class CounselorActivityDetail extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            commentary: '',
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

        this.onApproval = this.onApproval.bind(this);
        this.onDenied = this.onDenied.bind(this);
    }

    componentDidMount() {
        console.log('this.props.params.id: ' + this.props.match.params.id);
        let id = this.props.match.params.id;
        console.log("The id: " + id);
        // fetch(`http://dev.uprm.edu/dsca/v1/api/activities/${id}`).then(response => {
        fetch(`http://dev.uprm.edu/dsca/v1/api/activities/${id}`).then(response => {
            response.json().then(data => {
                console.log("DATA" + data);
                // if(Object.keys(data).length === 0){
                //     this.props.history.push(`/counselor/activities/`);
                // }
                //
                // else if (data.organization.counselors[0].counselorEmail !== this.props.cookies.get('email')){
                //     this.props.history.push(`/counselor/activities/`);
                // }
                this.setState({activity: data});
                console.log(this.state.activity.id);
            }).catch(err => {
                console.log(err)
                //this.props.showError(`Error in sending data to server: ${err.message}`);
            });
        })
    }

    onApproval(event) {
        event.preventDefault();

        if(this.state.commentary.length >=254 || this.state.commentary.length === 0)
            {
                this.showErrorAlert("Campos en el formulario llenados incorrectamente.")
            }

        else {
            const activityUpdate = {
                counselorComment: this.state.commentary,
            };

            // this.setState({managerDecision: 'approved'});
            // console.log("DSCA Decision: " + this.state.dscaDecision);


            console.log("Activity Update Object: " + activityUpdate);
            fetch(`http://dev.uprm.edu/dsca/v1/api/counselorApproved/${this.state.activity.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(activityUpdate),
            }).then(response => {
                if (response.ok) {
                    console.log(response);
                    response.json().then(updatedRequest => {
                        console.log('Activity request was updated successfully!');
                        console.log('Activity request ID: ' + updatedRequest.id);

                        this.props.history.push(`/counselor/activities/`);
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
    }

    onDenied(event) {
        event.preventDefault();

        if(this.state.commentary.length >=254 || this.state.commentary.length === 0)
        {
            this.showErrorAlert("Campos en el formulario escritos incorrectamente.")
        }

        else {
            const activityUpdate = {
                counselorComment: this.state.commentary,
            };

            // this.setState({dscaDecision: 'denied'});

            console.log(activityUpdate);
            fetch(`http://dev.uprm.edu/dsca/v1/api/counselorDenied/${this.state.activity.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(activityUpdate),
            }).then(response => {
                if (response.ok) {
                    console.log(response);
                    response.json().then(updatedRequest => {
                        console.log('Activity request was updated successfully!');
                        console.log('Activity request ID: ' + updatedRequest.id);

                        this.props.history.push(`/counselor/activities/`);
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
    }

    handleCommentChange = (event) => {
        this.setState({commentary: event.target.value});
    }

    showErrorAlert = (message) => {
        this.msg.error(message, {time: 500, type: 'error'});
        return;
    }


    render() {
        // console.log('this.state.selectedType');

        // console.log(this.state.selectedType);

        const tabsInstance = (

            <div style={{backgroundColor: '#F8F8F8'}}>
                <Nav fluid>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/counselor/activities"><Icon
                        icon={iosPaw}
                        style={{paddingRight: "20px"}}/>Actividades</Link></NavItem>
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
                        <li ><Link to={`/counselor/activities/`}>Actividades</Link></li>
                        <li className="active">Detalles de la Actividad</li>
                    </ol>

                    <Row>
                        <Col md={12}>
                            {this.state.activity.student === null ?
                                <Panel header="Detalles del Administrador">
                                    <FormGroup>
                                        <Col sm={4}>
                                            <Col componentClass={ControlLabel}>Nombre Completo</Col>
                                            <FormControl name="requesterName"
                                                         value={this.state.activity.staff.staffName} disabled/>
                                        </Col>

                                        <Col sm={4}>
                                            <Col componentClass={ControlLabel}>Correo Electr&oacute;nico</Col>
                                            <FormControl name="studentAddressZipCode"
                                                         value={this.state.activity.staff.staffEmail} disabled/>
                                        </Col>

                                        <Col sm={4}>
                                            <Col componentClass={ControlLabel}>Tel&eacute;fono</Col>
                                            <FormControl name="studentTelephone"
                                                         value={this.state.activity.staff.staffPhone} disabled/>
                                        </Col>
                                    </FormGroup>
                                </Panel>
                                :
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
                                            <Col componentClass={ControlLabel}>Direci&oacute;n</Col>
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
                            }
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
                                            <FormGroup bsStyle="success">
                                                <Col md={4}>
                                                    <Col componentClass={ControlLabel}>Estado</Col>
                                                    <FormControl name="status"
                                                                 value={this.state.activity.status.description}
                                                                 disabled/>
                                                </Col>
                                            </FormGroup>
                                        </div>)
                                        :
                                        (<div bsStyle="danger">
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

                            <Panel header="Decisión de la Actividad">

                                <FormGroup>
                                    {(this.state.activity.counselor_status.code === 2 || this.state.activity.counselor_status.code === 3) ?
                                        (<div>
                                                <Col sm={12}>
                                                    <Col componentClass={ControlLabel} required>Observaciones: </Col>
                                                    <br/>
                                                    {this.state.activity.counselorComment}
                                                </Col>
                                            <br/>

                                            <Row></Row>

                                            <ReactCenter>
                                                <Col md="1"><Link to={`/counselor/activities/`}><Button
                                                    className="btn btn-primary">Atr&aacute;s</Button></Link></Col>
                                                <br/>
                                                <br/>
                                            </ReactCenter>
                                        </div>)
                                        :
                                        (<div>
                                            <Row>
                                                <Col sm={12}>
                                                    <Col componentClass={ControlLabel}>Observaciones: </Col>
                                                    {
                                                        (this.state.commentary.length >= 254) ?
                                                            (<div>
                                                                <FormControl name="commentary"
                                                                             onChange={this.handleCommentChange}
                                                                             value={this.state.commentary}
                                                                             style={errorFormStyle}
                                                                             required/>
                                                                <HelpBlock style={errorHelpBlockStyle}>N&uacute;mero de
                                                                    caract&eacute;res demasiado grande.</HelpBlock>
                                                            </div>)
                                                            :
                                                            (this.state.commentary.length <= 254 && this.state.commentary.length != 0) ?
                                                                (<div>
                                                                    <FormControl name="commentary"
                                                                                 onChange={this.handleCommentChange}
                                                                                 value={this.state.commentary}
                                                                                 style={successFormStyle}
                                                                                 required/>
                                                                </div>)
                                                                :
                                                            (<div>
                                                                <FormControl name="commentary"
                                                                             onChange={this.handleCommentChange}
                                                                             value={this.state.commentary}
                                                                             required/>
                                                            </div>)
                                                    }
                                                </Col>
                                            </Row>
                                            <br/>
                                            <br/>

                                            <Row>
                                                <ReactCenter>
                                                    <AlertContainer ref={a => this.msg = a}/>
                                                    <Col md="1"><Link to={`/counselor/activities/`}>
                                                        <Button
                                                            className="btn btn-primary">
                                                            Atr&aacute;s</Button>
                                                    </Link></Col>
                                                    <Col md="1"><Button className="btn-success"
                                                                        onClick={this.onApproval}
                                                                        style={{marginLeft: "10px"}}
                                                                        required>Aprobar</Button></Col>
                                                    <Col md="1"><Button className="btn-danger"
                                                                        onClick={this.onDenied}
                                                                        style={{marginLeft: "40px"}}
                                                                        required>Denegar</Button></Col>
                                                </ReactCenter>
                                            </Row>
                                        </div>)
                                    }
                                </FormGroup>
                            </Panel>
                            <br/>
                            <br/>
                        </Col>
                    </Row>
                </Col>
            </div>
        )

    }
}


CounselorActivityDetail.contextTypes = {
    initialState: React.PropTypes.object,
};

export default CounselorActivityDetail;