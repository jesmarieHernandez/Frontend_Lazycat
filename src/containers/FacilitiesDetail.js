/**
 * Created by jesma on 12/11/2017.
 */
import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router-dom';
import Icon from 'react-icons-kit';
import {statsDots} from 'react-icons-kit/icomoon/statsDots';
import {iosPaw} from 'react-icons-kit/ionicons/iosPaw';
import {fileText2} from 'react-icons-kit/icomoon/fileText2';
import {userTie} from 'react-icons-kit/icomoon/userTie';


import {
    FormGroup, FormControl, ControlLabel, Button,
    Panel, Form, Col, Row, HelpBlock, Nav, NavItem
} from 'react-bootstrap';
import ReactCenter from "react-center"

class FacilitiesDetail extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showModal: false,
            facilitiesId: null,
            buildingValue: '',
            spaceValue: '',
            facilityDepartmentValue: '',
            editMode: false,
            notEditMode: true,
            activeKey: '1',
            facilitiesActivities: [],
            facilitiesManagers: [],
            managerEmailValue: '',
            managers: []
        }
    }

    componentDidMount() {
        console.log(this.props);
        let id = this.props.match.params.id;
        console.log("The ID: ");
        console.log(id);

        // fetch(`http://192.168.99.100/api/facilities/${id}`).then(response => {
        fetch(`http://192.168.99.100/api/facilities/${id}`).then(response => {
            response.json().then(data => {
                console.log(data);
                this.setState({facilitiesId: data.id});
                this.setState({buildingValue: data.building});
                this.setState({spaceValue: data.space});
                this.setState({facilityDepartmentValue: data.facilityDepartment});

                // TODO Fetch facilities activities
                // fetch(`http://192.168.99.100/api/activityByFacility/${id}`).then(response => {
                fetch(`http://192.168.99.100/api/activityByFacility/${id}`).then(response => {
                    response.json().then(data => {


                        this.setState({facilitiesActivities: data});
                        // this.setState({facilitiesActivities: facilitiesActivities});



                    }).catch(err => {
                        console.log(err)
                        //this.props.showError(`Error in sending data to server: ${err.message}`);
                    });
                });


                // fetch(`http://192.168.99.100/api/facilities/managers/${id}`).then(response => {
                fetch(`http://192.168.99.100/api/facilities/managers/${id}`).then(response => {
                    response.json().then(data => {

                        this.setState({facilitiesManagers: data});
                        // this.setState({facilitiesManagers: facilitiesManagers});

                    }).catch(err => {
                        console.log(err)
                        //this.props.showError(`Error in sending data to server: ${err.message}`);
                    });
                });




            }).catch(err => {
                console.log(err)
                //this.props.showError(`Error in sending data to server: ${err.message}`);
            });
        })

        fetch(`http://192.168.99.100/api/users`).then(response => {
            response.json().then(data => {

                this.setState({managers: data.managers});

                console.log('this.state.managers: ');
                console.log(this.state.managers);

            }).catch(err => {
                console.log(err)
                //this.props.showError(`Error in sending data to server: ${err.message}`);
            });
        });
    }

    addManager = () => {

        const managerEmail = this.state.managerEmailValue;
        const selectedManager = this.state.managers.filter(function (manager) {

            console.log('Current manager email: ' + manager.userEmail);
            console.log('this.state.managerEmailValue: ' + managerEmail);

            console.log(manager.userEmail == managerEmail);
            return manager.userEmail == managerEmail;
        });

        console.log('selectedManager array');
        console.log(selectedManager);

        const managerId = selectedManager[0].managers[0].id;

        const facilitiesId = this.state.facilitiesId;


        console.log('manager_id: ' + managerId);
        console.log('organization_id: ' + this.state.facilitiesId);

        fetch(`http://192.168.99.100/api/facilities/${facilitiesId}/addManager/${managerId}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            if (response.ok) {
                console.log('')
                console.log(response);
                response.json().then(newMembership => {

                    console.log('New membership was created');
                    fetch(`http://192.168.99.100/api/facilities/managers/${facilitiesId}`).then(response => {
                        response.json().then(data => {
                            this.setState({facilitiesManagers: data});

                        }).catch(err => {
                            console.log(err)
                            //this.props.showError(`Error in sending data to server: ${err.message}`);
                        });
                    });
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

    removeManager = (managerId) => {

        console.log('El managerId');
        console.log(managerId);

        fetch(`http://192.168.99.100/api/facilities/managers/${this.state.facilitiesId}/${managerId}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        }).then(response => {
            if (response.ok) {
                response.json().then(removedManager => {

                    fetch(`http://192.168.99.100/api/facilities/managers/${this.state.facilitiesId}`).then(response => {
                        response.json().then(data => {
                            this.setState({facilitiesManagers: data});

                        }).catch(err => {
                            console.log(err)
                            //this.props.showError(`Error in sending data to server: ${err.message}`);
                        });
                    });
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

    handleSelect = (event) => {
        // event.preventDefault();
        console.log(event);
        this.setState({activeKey: event});
    }

    onManagerChange = (event) => {
        console.log(event.target);
        event.preventDefault();
        this.setState({managerEmailValue: event.target.value});
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.setState({notEditMode: !this.state.notEditMode});
        const newFacilities = {
            building: this.state.buildingValue,
            space: this.state.spaceValue,
            facilityDepartment: this.state.facilityDepartmentValue,

        };

        // fetch('http://192.168.99.100/api/organizations', {
        fetch(`http://192.168.99.100/api/facilities/${this.state.facilitiesId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newFacilities),
        }).then(response => {
            if (response.ok) {
                console.log(response);
                response.json().then(editedFacilities => {

                    //this.props.history.push(`/admin/facilities/`);
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



    handleBuildingValue = (e) => {
        this.setState({buildingValue: e.target.value})
    }

    handleSpaceValue = (e) => {
        this.setState({spaceValue: e.target.value})
    }

    handleDepartmentValue = (e) => {
        this.setState({facilityDepartmentValue: e.target.value})
    }


    toggleEditMode = () => {
        this.setState({notEditMode: !this.state.notEditMode});
        console.log(this.state.notEditMode);
    }


    render() {

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

        const tabsInstance = (

            <div style={{backgroundColor: '#F8F8F8'}}>
                <Nav fluid>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/request"><Icon icon={fileText2}
                                                                                                   style={{paddingRight: "20px"}}/>Solicitud</Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/activities"><Icon icon={iosPaw}
                                                                                                      style={{paddingRight: "20px"}}/>Actividades</Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}> <Link to="/stats"><Icon icon={statsDots}
                                                                                                  style={{paddingRight: "20px"}}/>Estadísticas</Link></NavItem>
                    <NavItem> <Link to="/admin"><Icon icon={userTie}
                                                      style={{paddingRight: "20px"}}/>Admin</Link></NavItem>
                </Nav>
            </div>
        );


        let facilitiesManagers;

        console.log('Facilities Managers');
        console.log(this.state.facilitiesManagers);

        if (this.state.facilitiesManagers.length === 0) {
            facilitiesManagers =
                <p style={{color: 'grey', marginLeft: '20px'}}>No hay consejeros para esta organización.</p>
        } else {


            facilitiesManagers = this.state.facilitiesManagers.map(manager =>

                <Col md={12}>
                    <Panel header={manager.managerName}


                           style={{fontFamily: 'Helvetica'}}>
                        <Col md={6}>
                            <Row>
                                <Col md={6}><p>Nombre:</p></Col><Col md={6}><p> {manager.managerName}</p></Col>
                                <Col md={6}><p>Email:</p></Col><Col md={6}><p> {manager.managerEmail}</p></Col>
                            </Row>
                        </Col>
                        <Col md={6}>

                            <Row>
                                <Row>
                                    <Col md={12}><Link to={`/admin/users/${manager.managerEmail}`}><Button className="btn-info btn-large pull-right"
                                                         style={{width: '100px', marginBottom: '10px'}}
                                    >Detalles</Button></Link> </Col>
                                </Row>
                                <Row>
                                    <Col md={12}><Button className="btn-danger btn-large pull-right"
                                                         style={{width: '100px'}}
                                                         onClick={() => this.removeManager(manager.id)}>Remover</Button>
                                    </Col>
                                </Row>
                            </Row>
                        </Col>

                    </Panel>

                </Col>
            );
        }


        let facilitiesActivities;

        if (this.state.facilitiesActivities.length === 0) {
            facilitiesActivities =
                <p style={{color: 'grey', marginLeft: '20px'}}>No hay actividades para esta organización.</p>
        } else {


            facilitiesActivities = this.state.facilitiesActivities.map(activity =>

                <Col md={12}>
                    <Panel header={activity.activityName}>
                        {/*<td><Link to={`/activities/${activity.id}`}>{activity.activityName}</Link></td>*/}
                        {/*<br/>*/}
                        <Col md={6}>
                            <Row>

                                <Col md={6}><p>Título:</p></Col><Col md={6}><p> {activity.activityName}</p></Col>
                                <Col md={6}><p>Descripción:</p></Col><Col md={6}><p> {activity.activityDescription}</p>
                            </Col>
                                <Col md={6}><p>Organización:</p></Col><Col md={6}>
                                <p> {activity.organization.organizationName}</p></Col>
                                <Col md={6}><p>Facilidades:</p></Col><Col md={6}><p> {activity.facility.space}</p></Col>
                                <Col md={6}><p>Estado:</p></Col><Col md={6}><p> {activity.status.description}</p></Col>

                            </Row>
                        </Col>
                        <Col md={6}>
                            <Row>
                                <Col md={12}><Link to={`/activities/${activity.id}`}><Button
                                    className="btn-info btn-large pull-right"
                                    style={{width: '100px', marginBottom: '10px'}}
                                >Detalles</Button></Link> </Col>
                            </Row>
                        </Col>

                    </Panel>
                </Col>
            );
        }

        return (
            <div className="container">

                <Col md="2">
                    {tabsInstance}
                </Col>

                <Col md={10}>

                    <ol className="breadcrumb">
                        <li/>
                        <li><Link to={`/admin/`}>Panel de administración</Link></li>
                        <li><Link to={`/admin/facilities`}>Facilidades</Link></li>
                        <li className="active">Detalles de las facilidades</li>
                    </ol>

                    <Panel header="Detalles de las facilidades">

                        <Form horizontal name="newFacilities">

                            <FormGroup>
                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Edificio</Col>
                                    {
                                        (this.state.buildingValue.length > 50) ?
                                            (<div>
                                                <FormControl name="building"
                                                             placeholder="Ex. Luis A. Stefani"
                                                             onChange={this.handleBuildingValue}
                                                             style={{
                                                                 borderColor: '#B74442',
                                                                 boxShadow: "0px 0px 8px #B74442"
                                                             }}
                                                             disabled={this.state.notEditMode}
                                                             value={this.state.buildingValue}
                                                             required/>
                                                <HelpBlock style={{color: '#B74442'}}>Nombre del edificio muy
                                                    largo</HelpBlock>
                                            </div>)
                                            :
                                            (<div>
                                                <FormControl name="building"
                                                             placeholder="Ex. Luis A. Stefani"
                                                             onChange={this.handleBuildingValue}
                                                             disabled={this.state.notEditMode}
                                                             value={this.state.buildingValue}
                                                             required/>
                                            </div>)
                                    }
                                </Col>

                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Sal&oacute;n/Espacio</Col>
                                    {
                                        (this.state.spaceValue.length > 20) ?
                                            (<div>
                                                <FormControl name="space" placeholder="Ex. S-113"
                                                             onChange={this.handleSpaceValue}
                                                             style={{
                                                                 borderColor: '#B74442',
                                                                 boxShadow: "0px 0px 8px #B74442"
                                                             }}
                                                             disabled={this.state.notEditMode}
                                                             value={this.state.spaceValue}
                                                             required/>
                                                <HelpBlock style={{color: '#B74442'}}>Nombre del sal&oacute;n/espacio
                                                    muy
                                                    largo</HelpBlock>

                                            </div>)
                                            :
                                            (<div>
                                                <FormControl name="space"
                                                             placeholder="Ex. S-113"
                                                             onChange={this.handleSpaceValue}
                                                             disabled={this.state.notEditMode}
                                                             value={this.state.spaceValue}
                                                             required/>
                                            </div>)
                                    }
                                </Col>

                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Department</Col>
                                    <FormControl name="facilitiesDepartmentCode"
                                                 disabled={this.state.notEditMode}
                                                 value={this.state.facilityDepartmentValue}
                                                 onChange={this.handleDepartmentValue}
                                                 required/>
                                </Col>

                            </FormGroup>
                            <br/>
                            <ReactCenter>

                            </ReactCenter>

                        </Form>
                        <ReactCenter>
                        <Row>
                            <Col md={6}><Link to={`/admin/facilities/`}><Button
                                className="btn btn-primary">Atrás</Button></Link>
                            </Col>
                            {
                                this.state.notEditMode ? <Col md={6}><Button className="btn-warning"
                                                                             onClick={this.toggleEditMode}>Editar</Button></Col>
                                    :
                                    <Col md={6}><Button className="btn-success" onClick={this.onSubmit}>Guardar</Button></Col>
                            }
                        </Row>
                        </ReactCenter>
                    </Panel>

                    <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect}>
                        <NavItem eventKey="1" >Actividades</NavItem>
                        <NavItem eventKey="2" title="Item"> Encargados</NavItem>
                    </Nav>
                    <br/>


                </Col>

                <Col md={2}></Col>

                <Col md={10}>
                    {this.state.activeKey === '1' ? facilitiesActivities : null}
                    {this.state.activeKey === '2' ?

                        <div>
                        <Col md={12}>
                            <Panel>
                                <Col md={6}>
                                    <Col componentClass={ControlLabel}>Email del encargado</Col>
                                {
                                    (/^[a-zA-Z]+\.?[a-zA-Z]+[0-9]*?@(upr.edu|ece.upr.edu|uprm.edu)+$/.test(this.state.managerEmailValue) === false && this.state.managerEmailValue.length != 0) ?
                                        (<div>
                                            <FormControl name="studentEmail" style={errorFormStyle}
                                                         onChange={this.onManagerChange}
                                                         placeholder="Ex. carlos.donato@upr.edu" required/>
                                            <HelpBlock style={errorHelpBlockStyle}>Correo debe ser del dominio
                                                @upr.edu</HelpBlock>
                                        </div>)
                                        :
                                        (/^[a-zA-Z]+\.?[a-zA-Z]+[0-9]*?@(upr.edu|ece.upr.edu|uprm.edu)+$/.test(this.state.managerEmailValue) === true) ?
                                            (<div>
                                                <FormControl name="studentEmail" style={successFormStyle}
                                                             onChange={this.onManagerChange}
                                                             placeholder="Ex. carlos.donato@upr.edu" required/>
                                            </div>)
                                            :
                                            (<div>
                                                <FormControl name="studentEmail" onChange={this.onManagerChange}
                                                             placeholder="Ex. carlos.donato@upr.edu"
                                                             required/>
                                            </div>)
                                }
                                </Col>
                                <Col md={3}></Col>

                                <Col md={3}>
                                    <Button className="btn-success btn-large pull-right"
                                            style={{width: '100px', marginBottom: '10px'}}
                                            onClick={this.addManager}>Añadir</Button>
                                </Col>
                            </Panel>

                        </Col>
                        { facilitiesManagers }
                        </div>
                        : null}
                </Col>
            </div>
        )
    }
}


FacilitiesDetail.contextTypes = {
    initialState: React.PropTypes.object,
};

export default FacilitiesDetail;