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
            facilitiesManagers: []
        }
    }

    componentDidMount() {
        console.log(this.props);
        let id = this.props.match.params.id;
        console.log("The ID: ");
        console.log(id);

        fetch(`http://localhost:8000/api/facilities/${id}`).then(response => {
            response.json().then(data => {
                console.log(data);
                this.setState({facilitiesId: data.id});
                this.setState({buildingValue: data.building});
                this.setState({spaceValue: data.space});
                this.setState({facilityDepartmentValue: data.facilityDepartment});

                // TODO Fetch facilities managers
                // fetch(`http://localhost:8000/api/facilities/${id}`).then(response => {
                //     response.json().then(data => {
                //         console.log(data);
                //         this.setState({facilitiesId: data.id});
                //         this.setState({buildingValue: data.building});
                //         this.setState({spaceValue: data.space});
                //         this.setState({facilityDepartmentValue: data.facilityDepartment});
                //
                //     }).catch(err => {
                //         console.log(err)
                //         //this.props.showError(`Error in sending data to server: ${err.message}`);
                //     });
                // })

            }).catch(err => {
                console.log(err)
                //this.props.showError(`Error in sending data to server: ${err.message}`);
            });
        })
    }

    handleSelect = (event) => {
        // event.preventDefault();
        console.log(event);
        this.setState({activeKey: event});
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.setState({notEditMode: !this.state.notEditMode});
        const newFacilities = {
            building: this.state.buildingValue,
            space: this.state.spaceValue,
            facilityDepartmentValue: this.state.facilityDepartmentValue,

        };

        // fetch('http://localhost:8000/api/organizations', {
        fetch(`http://localhost:8000/api/facilities/${this.state.facilitiesId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newFacilities),
        }).then(response => {
            if (response.ok) {
                console.log(response);
                response.json().then(editedFacilities => {


                    this.props.history.push(`/admin/facilities/`);
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

    toggleEditMode = () => {
        this.setState({notEditMode: !this.state.notEditMode});
        console.log(this.state.notEditMode);
    }

    render() {
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

        if (this.state.facilitiesManagers.length === 0) {
            facilitiesManagers = <p style={{color: 'grey', marginLeft: '20px'}}>No hay consejeros para esta organización.</p>
        } else {


            facilitiesManagers = this.state.facilitiesManagers.map(activity =>

                <Col md={12}>
                    <Panel header={activity.activityName}>
                        <td><Link to={`/activities/${activity.id}`}>{activity.activityName}</Link></td>
                        <br/>
                        <p><b>Description:</b> {activity.activityDescription}</p>
                        <p><b>Organization:</b> {activity.organization.organizationName}</p>
                        <p><b>Facility:</b> {activity.facility.space}</p>
                        <p><b>Status:</b> {activity.status.description}</p>
                    </Panel>
                </Col>
            );
        }

        let facilitiesActivities;

        if (this.state.facilitiesActivities.length === 0) {
            facilitiesActivities = <p style={{color: 'grey', marginLeft: '20px'}}>No hay actividades para esta organización.</p>
        } else {


            facilitiesActivities = this.state.facilitiesActivities.map(activity =>

                <Col md={12}>
                    <Panel header={activity.activityName}>
                        <td><Link to={`/activities/${activity.id}`}>{activity.activityName}</Link></td>
                        <br/>
                        <p><b>Description:</b> {activity.activityDescription}</p>
                        <p><b>Organization:</b> {activity.organization.organizationName}</p>
                        <p><b>Facility:</b> {activity.facility.space}</p>
                        <p><b>Status:</b> {activity.status.description}</p>
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
                                        (this.state.buildingValue.length > 20) ?
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
                                                <HelpBlock style={{color: '#B74442'}}>Nombre del edifico muy
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
                    {this.state.activeKey === '2' ? facilitiesManagers : null}
                </Col>
            </div>
        )
    }
}


FacilitiesDetail.contextTypes = {
    initialState: React.PropTypes.object,
};

export default FacilitiesDetail;