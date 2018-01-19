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

class ActivityDetail extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            activityTypes: [],
            selectedType: 0,
            commentary: '',
            selectedOption: false,
            editDecision: false,

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
        this.onTypeSelected = this.onTypeSelected.bind(this);
    }

    componentDidMount() {
        console.log('this.props.params.id: ' + this.props.match.params.id);
        let id = this.props.match.params.id;
        console.log("The id: " + id);
        // fetch(`http://192.168.99.100/api/activities/${id}`).then(response => {
        fetch(`http://192.168.99.100/api/activities/${id}`).then(response => {
            response.json().then(data => {
                console.log("DATA" + data);
                this.setState({activity: data});
                console.log(this.state.activity.id);
            }).catch(err => {
                console.log(err)
                //this.props.showError(`Error in sending data to server: ${err.message}`);
            });
        })

        fetch(`http://192.168.99.100/api/activityType/`).then(response => {
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

    onApproval(event) {
        event.preventDefault();

        console.log('Selected status: ' + this.state.selectedStatus);

        // const activityUpdate = {
        //         staffComment : this.state.commentary,
        //         activityType_code: this.state.selectedType,
        //         hasFood: this.state.selectedOption ? 1 : 0
        //
        // };

        if (this.state.activity.type != null && this.state.activity.staffComment != null && this.state.activity.hasFood != null) {
            console.log("Inside the if");
            this.setState({commentary: this.state.activity.staffComment});
            this.setState({selectedType: this.state.activity.activityType_code});
            this.setState({hasFood: this.state.activity.hasFood});
        }


        const activityUpdate = {
            staffComment : this.state.commentary,
            activityType_code: this.state.selectedType,
            hasFood: this.state.selectedOption ? 1 : 0

        };

        // this.setState({dscaDecision: 'approved'});

        console.log("DSCA Decision: " + this.state.dscaDecision);


        console.log("Activity Update Object: " + activityUpdate);
        fetch(`http://192.168.99.100/api/adminApproved/${this.state.activity.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(activityUpdate),
        }).then(response => {
            if (response.ok) {
                console.log(response);
                response.json().then(updatedRequest => {
                    console.log('Activity request was updated successfully!');
                    console.log('Activity request ID: ' + updatedRequest.id);

                    this.props.history.push(`/activities/`);
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

    onDenied(event) {
        event.preventDefault();

        console.log('Selected status: ' + this.state.selectedStatus);

        const activityUpdate = {
            staffComment: this.state.commentary,
            activityType_code: this.state.selectedType,
            hasFood: this.state.selectedOption ? 1 : 0
        };

        this.setState({dscaDecision: 'denied'});

        console.log(activityUpdate);
        fetch(`http://192.168.99.100/api/adminDenied/${this.state.activity.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(activityUpdate),
        }).then(response => {
            if (response.ok) {
                console.log(response);
                response.json().then(updatedRequest => {
                    console.log('Activity request was updated successfully!');
                    console.log('Activity request ID: ' + updatedRequest.id);

                    this.props.router.push(`/activities/`);
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

    onTypeSelected = (event) => {
        console.log("Type here");
        const selectedType = this.state.activityTypes.filter(function (obj) {
            console.log(obj.code == event.target.value);
            return obj.code == event.target.value;
        });
        console.log('Seleceted type');
        console.log(selectedType[0].code);
        this.setState({selectedType: selectedType[0].code});
        // console.log(this.state.selectedType);


    }

    boxToogle = () => {
        console.log("Food");
        console.log(this.state.selectedOption);
        this.setState({selectedOption: !this.state.selectedOption});
    }

    handleCommentChange = (event) => {
        this.setState({commentary: event.target.value});
    }

    onEdit = (event) => {
        event.preventDefault();
        this.setState({editDecision: true});
        console.log("Decision");
        console.log(this.state.editDecision);
    }

    onSave = (event) => {
        event.preventDefault();

        const activityUpdate = {
            activityType_code: this.state.selectedType,
        };
        console.log(activityUpdate);
        console.log("Typeeeeeee");
        console.log(this.state.selectedType);

        fetch(`http://192.168.99.100/api/updateType/${this.state.activity.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(activityUpdate),
        }).then(response => {
            if (response.ok) {
                console.log(response);
                response.json().then(updatedRequest => {
                    console.log('Type request was updated successfully!');
                    this.props.history.push(`/activities/`);
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
        console.log('this.state.selectedType');

        console.log(this.state.selectedType);

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
                            {this.state.activity.student === null ?
                                <Panel header="Detalles del Administrador">
                                    <FormGroup>
                                        <Col sm={4}>
                                            <Col componentClass={ControlLabel}>Nombre Completo</Col>
                                            <FormControl name="requesterName"
                                                         value={this.state.activity.staff.staffName} disabled/>
                                        </Col>

                                        <Col sm={4}>
                                            <Col componentClass={ControlLabel}>Email</Col>
                                            <FormControl name="studentAddressZipCode"
                                                         value={this.state.activity.staff.staffEmail} disabled/>
                                        </Col>

                                        <Col sm={4}>
                                            <Col componentClass={ControlLabel}>Telephone</Col>
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
                            }
                            <Panel header="Detalles de la Actividad">
                                <FormGroup>
                                    <Col sm={12}>
                                        <Col componentClass={ControlLabel}>Nombre</Col>
                                        {/*<FormControl name="requestTitle" value={this.state.activity.activityName}*/}
                                        {/*disabled/>*/}
                                        <br/>
                                        {this.state.activity.activityName}
                                    </Col>
                                </FormGroup>

                                <Row></Row>

                                <FormGroup style={{paddingTop: "20px"}}>
                                    <Col sm={12}>
                                        <Col componentClass={ControlLabel}>Descripci&oacute;n</Col>
                                        {/*<FormControl name="activityDescription"*/}
                                        {/*value={this.state.activity.activityDescription} disabled/>*/}
                                        <br/>
                                        {this.state.activity.activityDescription}
                                    </Col>
                                </FormGroup>

                                <Row></Row>

                                <FormGroup style={{paddingTop: "20px"}}>
                                    <Col sm={12}>
                                        <Col componentClass={ControlLabel}>Invitado(s)</Col>
                                        {/*<FormControl name="activityGuest" value={this.state.activity.guestName}*/}
                                        {/*disabled/>*/}
                                        <br/>
                                        {this.state.activity.guestName}
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col sm={4}>
                                        <Col componentClass={ControlLabel}>N&uacute;mero de Asistentes</Col>
                                        <FormControl name="activityAssistant"
                                                     value={this.state.activity.attendantsNumber} disabled/>
                                    </Col>

                                    <Col md={4}>
                                        <Col componentClass={ControlLabel}>Espacio/Sal&oacute;n</Col>
                                        <FormControl name="selectFacilities" value={this.state.activity.facility.space}
                                                     disabled/>
                                    </Col>

                                    <Col md={4}>
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

                            {/* Panel only for the DCSA Admin/Staff */}
                            <Panel header="Decisi&oacute;n de la Actividad">
                                <FormGroup>
                                    {/* Show already placed category and commentary by the DSCA Staff/Admin */}
                                    {(this.state.activity.status.code === 2 || this.state.activity.status.code === 3) || this.state.activity.type != null ?
                                        (<div>
                                            <Col sm={3}>
                                                <Col componentClass={ControlLabel}>Categor&iacute;a: </Col>
                                                <FormControl name="selectType"
                                                             value={this.state.activity.type.description}
                                                             disabled/>
                                            </Col>

                                            <Col sm={9}>
                                                <Col componentClass={ControlLabel}>Comentario: </Col>
                                                <FormControl name="commentary"
                                                             value={this.state.activity.staffComment}
                                                             disabled/>
                                            </Col>
                                            <br/>
                                            <br/>
                                            <br/>
                                        </div>)
                                        :
                                        ((this.state.activity.counselor_status.code === 3 || this.state.activity.manager_status.code === 3) && this.state.editDecision === true) ?
                                            (<div>
                                                <Col sm={3}>
                                                    <Col componentClass={ControlLabel}>Categor&iacute;a: </Col>
                                                    <FormControl componentClass="select" name="selectType"
                                                                 onChange={this.onTypeSelected}
                                                                 required>
                                                        <option>select</option>
                                                        {typeOptions}
                                                    </FormControl>
                                                </Col>

                                                <Col sm={6}>
                                                    <Col componentClass={ControlLabel}>Comentario: </Col>
                                                    <FormControl name="commentary" onChange={this.handleCommentChange}
                                                                 value={this.state.commentary}
                                                                 required/>
                                                </Col>

                                                <Col sm={3}>
                                                    <Col componentClass={ControlLabel}>Permisos: </Col>
                                                    <Col>
                                                        <Checkbox name="yesValue" onClick={this.boxToogle} inline>Permiso de Comida?</Checkbox>{' '}
                                                    </Col>
                                                </Col>
                                                <br/>
                                                <br/>
                                                <br/>
                                            </div>)
                                            :
                                            ((this.state.activity.counselor_status.code === 3 || this.state.activity.manager_status.code === 3) && this.state.editDecision === false) ?
                                                (<div>
                                                </div>)
                                                :
                                                (<div>
                                                    <Col sm={3}>
                                                        <Col componentClass={ControlLabel}>Categor&iacute;a: </Col>
                                                        <FormControl componentClass="select" name="selectType"
                                                                     onChange={this.onTypeSelected}
                                                                     required>
                                                            <option>select</option>
                                                            {typeOptions}
                                                        </FormControl>
                                                    </Col>

                                                    <Col sm={6}>
                                                        <Col componentClass={ControlLabel}>Comentario: </Col>
                                                        <FormControl name="commentary"
                                                                     onChange={this.handleCommentChange}
                                                                     value={this.state.commentary}
                                                                     required/>
                                                    </Col>

                                                    <Col sm={3}>
                                                        <Col componentClass={ControlLabel}>Permisos: </Col>
                                                        <Col>
                                                            <Checkbox name="yesValue" onClick={this.boxToogle} inline>Permiso
                                                                de Comida?</Checkbox>{' '}
                                                        </Col>
                                                    </Col>
                                                    <br/>
                                                    <br/>
                                                    <br/>
                                                </div>)
                                    }
                                    <br/>

                                    <Row>
                                        <ReactCenter>
                                            <Col md="1"><Link to={`/activities/`}><Button className="btn btn-primary">Atr&aacute;s</Button></Link></Col>
                                            {
                                                ((this.state.activity.counselor_status.code === 3 || this.state.activity.manager_status.code === 3) && this.state.editDecision === true) ?
                                                    (<div>
                                                        <Col md="1"><Button className="btn-success"
                                                                            onClick={this.onSave}
                                                                            style={{marginLeft: "40px"}}>Guardar</Button></Col>
                                                    </div>)
                                                    :
                                                    (this.state.activity.counselor_status.code === 3 || this.state.activity.manager_status.code === 3) && this.state.activity.type === null ?
                                                        (<div>
                                                            <Col md="1"><Button className="btn-warning"
                                                                                onClick={this.onEdit}
                                                                                style={{marginLeft: "40px"}}>Editar</Button></Col>
                                                        </div>)
                                                        :
                                                        (this.state.activity.status.code === 2 || this.state.activity.status.code === 3) ?
                                                            (<div>
                                                            </div>)
                                                            :
                                                            (this.state.activity.counselor_status.code === 2 && this.state.activity.manager_status.code === 2) ?
                                                                (<div>
                                                                    <Col md="1"><Button className="btn-success"
                                                                                        onClick={this.onApproval}
                                                                                        style={{marginLeft: "40px"}}
                                                                                        required>Aprobar</Button></Col>
                                                                    <Col md="1"><Button className="btn-danger"
                                                                                        onClick={this.onDenied}
                                                                                        style={{marginLeft: "140px"}}
                                                                                        required>Denegar</Button></Col>
                                                                </div>)
                                                                :
                                                                (<div>
                                                                    <Col md="1"><Button className="btn-success"
                                                                                        onClick={this.onApproval}
                                                                                        style={{marginLeft: "40px"}}
                                                                                        disabled>Aprobar</Button></Col>
                                                                    <Col md="1"><Button className="btn-danger"
                                                                                        onClick={this.onDenied}
                                                                                        style={{marginLeft: "140px"}}
                                                                                        disabled>Denegar</Button></Col>
                                                                </div>)
                                            }
                                        </ReactCenter>
                                    </Row>

                                </FormGroup>
                            </Panel>
                            <br />

                        </Col>
                    </Row>
                </Col>
            </div>
        )

    }
}


ActivityDetail.contextTypes = {
    initialState: React.PropTypes.object,
};

export default ActivityDetail;