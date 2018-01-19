/**
 * Created by jesma on 12/11/2017.
 */
import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router-dom';

import {
    FormGroup, FormControl, ControlLabel, Button, Badge,
    Panel, Form, Col, Row, Nav, NavItem, HelpBlock, Modal
} from 'react-bootstrap';
import ReactCenter from "react-center";
import AlertContainer from 'react-alert';
import Icon from 'react-icons-kit';
import {statsDots} from 'react-icons-kit/icomoon/statsDots';
import {iosPaw} from 'react-icons-kit/ionicons/iosPaw';
import {home} from 'react-icons-kit/icomoon/home';
import {fileText2} from 'react-icons-kit/icomoon/fileText2';
import {userTie} from 'react-icons-kit/icomoon/userTie';


class OrganizationDetail extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            notEditMode: true,
            activeKey: '1',
            organization: {
                _id: 0,
                name: '',
                initials: '',
                creationDate: '',
                counselorName: '',
                counselorEmail: '',
                counselorTelephone: '',
                counselorFaculty: '',
                counselorDepartment: '',
                counselorOfficeNumber: ''
            },
            showModal: false,
            orgNameValue: '',
            orgInitialsValue: '',
            orgTypeValue: false,
            orgTypePicked: '',
            orgId: null,
            organizationActivities: [],
            organizationCounselors: [],
            organizationMembers: [],
            organizationTypes: [],
            organizationRoles: [],
            selectedOrganizationType: {},
            counselors: [],
            students: [],
            newCounselorValue: '',
            newMemberValue: '',
            selectedMemberRole: 0
        }

        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.removeMember = this.removeMember.bind(this);
        this.onCounselorChange = this.onCounselorChange.bind(this);
    }


    componentDidMount() {
        console.log('this.props.params.id: ' + this.props.match.params.id);
        let id = this.props.match.params.id;
        // fetch(`http://localhost:8000/api/organizations/${id}`).then(response => {
        this.setState({orgNameValue: 'Sociedad del Perreo'});
        this.setState({orgInitialsValue: 'SP'});

        // fetch(`http://localhost:8000/api/organizations/${id}`).then(response => {
        fetch(`http://localhost:8000/api/organizations/${id}`).then(response => {
            response.json().then(data => {

                console.log(`http://localhost:8000/api/organizations/${id}`);
                console.log(data);
                this.setState({orgNameValue: data[0].organizationName});
                this.setState({orgInitialsValue: data[0].organizationInitials});
                this.setState({orgTypeValue: data[0].organizationType_code});
                this.setState({orgId: data[0].id});

                // TODO Fetch organization activities
                // fetch(`http://localhost:8000/api/activityByOrg/${id}`).then(response => {
                fetch(`http://localhost:8000/api/activityByOrg/${id}`).then(response => {
                    response.json().then(data => {

                        console.log(`http://localhost:8000/api/organizations/${id}`);
                        console.log(data);
                        this.setState({organizationActivities: data});

                    }).catch(err => {
                        console.log(err)
                        //this.props.showError(`Error in sending data to server: ${err.message}`);
                    });
                });

                // fetch(`http://localhost:8000/api/organizations/counselors/${id}`).then(response => {
                fetch(`http://localhost:8000/api/organizations/counselors/${id}`).then(response => {
                    response.json().then(data => {
                        this.setState({organizationCounselors: data});


                    }).catch(err => {
                        console.log(err)
                        //this.props.showError(`Error in sending data to server: ${err.message}`);
                    });
                });


                // fetch(`http://localhost:8000/api/organizations/members/${id}`).then(response => {
                fetch(`http://localhost:8000/api/organizations/members/${id}`).then(response => {
                    response.json().then(data => {
                        this.setState({organizationMembers: data});

                    }).catch(err => {
                        console.log(err)
                        //this.props.showError(`Error in sending data to server: ${err.message}`);
                    });
                });

                // fetch(`http://localhost:8000/api/organizations/members/${id}`).then(response => {
                fetch(`http://localhost:8000/api/organizations/members/${id}`).then(response => {
                    response.json().then(data => {
                        this.setState({organizationMembers: data});

                    }).catch(err => {
                        console.log(err)
                        //this.props.showError(`Error in sending data to server: ${err.message}`);
                    });
                });


            }).catch(err => {
                console.log(err)
                //this.props.showError(`Error in sending data to server: ${err.message}`);
            });
        });

        // fetch(`/api/admin/organizations/${id}/activities`).then(response => {
        //     response.json().then(data => {
        //         console.log(data);
        //         this.setState({organizationActivities: data});
        //     });
        // });

        // fetch('http://localhost:8000/api/organization_types').then(response => {
        fetch('http://localhost:8000/api/organization_types').then(response => {
            if (response.ok) {
                response.json().then(results => {
                    console.log("Organization Types");
                    console.log(results);
                    this.setState({organizationTypes: results});
                    console.log(this.state.organizationTypes);
                    //this.props.router.push(`/activities/${createdRequest._id}`);
                });
            } else {
                // response.json().then(error => {
                //     this.props.showError(`Failed to add issue: ${error.message}`);
                // });
            }
        }).catch(err => {
            //this.props.showError(`Error in sending data to server: ${err.message}`);
        });

        // fetch('http://localhost:8000/api/organization_types').then(response => {
        fetch('http://localhost:8000/api/organization_roles').then(response => {
            if (response.ok) {
                response.json().then(results => {
                    console.log("Organization Types");
                    console.log(results);

                    // TODO Replace once route is ready
                    // let organizationRoles = [
                    //     {
                    //         "code": 1,
                    //         "description": "Presidente"
                    //     },
                    //     {
                    //         "code": 2,
                    //         "description": "Tesorero"
                    //     },
                    //     {
                    //         "code": 3,
                    //         "description": "Alicate"
                    //     }
                    // ];


                    // this.setState({organizationRoles: organizationRoles});
                    this.setState({organizationRoles: results});
                    //this.props.router.push(`/activities/${createdRequest._id}`);
                });
            } else {
                // response.json().then(error => {
                //     this.props.showError(`Failed to add issue: ${error.message}`);
                // });
            }
        }).catch(err => {
            //this.props.showError(`Error in sending data to server: ${err.message}`);
        });

        // fetch(`http://localhost:8000/api/users`).then(response => {
        fetch(`http://localhost:8000/api/users`).then(response => {
            response.json().then(data => {

                this.setState({counselors: data.counselors});
                this.setState({students: data.students});

                console.log('this.state.counselors: ');
                console.log(this.state.counselors);

            }).catch(err => {
                console.log(err)
                //this.props.showError(`Error in sending data to server: ${err.message}`);
            });
        });


    }

    handleSelect = (event) => {
        // event.preventDefault();
        this.setState({activeKey: event});
    }

    toggleEditMode() {
        this.setState({notEditMode: !this.state.notEditMode});
        console.log(this.state.notEditMode);
    }

    removeMember = (memberId) => {

        console.log('El memberId');
        console.log(memberId);

        fetch(`http://localhost:8000/api/organizations/members/delete/${memberId}/${this.state.orgId}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        }).then(response => {
            if (response.ok) {
                console.log('PUNETA :DDDD');
                response.json().then(createdOrganization => {

                    console.log('Esasdasdasdnjasdnklasdnjklasdnklnksaldnklask');
                    // TODO Pop member from organizationCounselors
                    // this.props.history.push(`/admin/organizations/`);
                    // this.props.history.push(`/admin/organizations/${createdOrganization._id}`);
                    fetch(`http://localhost:8000/api/organizations/members/${this.state.orgId}`).then(response => {
                        response.json().then(data => {
                            this.setState({organizationMembers: data});

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

    removeCounselor = (counselorId) => {


        fetch(`http://localhost:8000/api/organizations/counselors/delete/${counselorId}/${this.state.orgId}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        }).then(response => {
            if (response.ok) {
                console.log('PUNETA :DDDD');
                response.json().then(createdOrganization => {

                    console.log('Esasdasdasdnjasdnklasdnjklasdnklnksaldnklask');
                    // TODO Pop member from organizationCounselors
                    // this.props.history.push(`/admin/organizations/`);
                    // this.props.history.push(`/admin/organizations/${createdOrganization._id}`);
                    fetch(`http://localhost:8000/api/organizations/counselors/${this.state.orgId}`).then(response => {
                        response.json().then(data => {
                            this.setState({organizationCounselors: data});

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

    addCounselor = () => {

        const counselorEmail = this.state.newCounselorValue;
        const selectedCounselor = this.state.counselors.filter(function (counselor) {

            console.log('Current counselor email: ' + counselor.userEmail);
            console.log('this.state.newCounselorValue: ' + counselorEmail);

            console.log(counselor.userEmail == counselorEmail);
            return counselor.userEmail == counselorEmail;
        });

        console.log('selectedCounselor array');
        console.log(selectedCounselor);

        const counselorId = selectedCounselor[0].counselors[0].id;
        const organizationId = this.state.orgId;


        console.log('counselor_id: ' + counselorId);
        console.log('organization_id: ' + this.state.orgId);

        fetch(`http://localhost:8000/api/organizations/${organizationId}/addCounselor/${counselorId}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            if (response.ok) {
                console.log(response);
                response.json().then(createCounsels => {


                    // this.props.history.push(`/admin/organizations/`);
                    console.log('New counsel was created');
                    fetch(`http://localhost:8000/api/organizations/counselors/${this.state.orgId}`).then(response => {
                        response.json().then(data => {
                            this.setState({organizationCounselors: data});


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


    addMember = () => {

        const studentEmail = this.state.newMemberValue;
        const selectedStudent = this.state.students.filter(function (student) {

            console.log('Current counselor email: ' + student.userEmail);
            console.log('this.state.newCounselorValue: ' + studentEmail);

            console.log(student.userEmail == studentEmail);
            return student.userEmail == studentEmail;
        });

        console.log('selectedCounselor array');
        console.log(selectedStudent);

        const studentId = selectedStudent[0].students[0].id;
        const studentRole = this.state.selectedMemberRole;

        const organizationId = this.state.orgId;


        console.log('counselor_id: ' + studentId);
        console.log('organization_id: ' + this.state.orgId);

        fetch(`http://localhost:8000/api/organizations/${organizationId}/addMember/${studentId}/role/${studentRole}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            if (response.ok) {
                console.log(response);
                response.json().then(newMembership => {


                    console.log('New membership was created');
                    fetch(`http://localhost:8000/api/organizations/members/${this.state.orgId}`).then(response => {
                        response.json().then(data => {
                            this.setState({organizationMembers: data});

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

    onCounselorChange = (event) => {
        console.log(event.target);
        event.preventDefault();
        this.setState({newCounselorValue: event.target.value});

        console.log(this.state.newCounselorValue);
    }


    onMemberChange = (event) => {
        console.log(event.target);
        event.preventDefault();
        this.setState({newMemberValue: event.target.value});
    }

    onMemberRoleSelected = (event) => {
        // event.preventDefault();
        //this.setState({orgTypePicked: '2'});
        const selectedMemberRole = this.state.organizationRoles.filter(function (obj) {

            console.log('Current object code: ' + obj.code);
            console.log('Event target value: ' + event.target.value);

            console.log(obj.code == event.target.value);
            return obj.code == event.target.value;
        });
        console.log("Selected member role array ");
        console.log(selectedMemberRole);
        this.setState({selectedMemberRole: selectedMemberRole[0].code});

        // console.log("Selected organization type: " + this.state.selectedOrganizationType);
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.setState({notEditMode: !this.state.notEditMode});
        const newOrganization = {
            organizationName: this.state.orgNameValue,
            organizationType_code: this.state.orgTypeValue,
            organizationInitials: this.state.orgInitialsValue,

        };

        // fetch('http://localhost:8000/api/organizations', {
        fetch(`http://localhost:8000/api/organizations/${this.state.orgId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newOrganization),
        }).then(response => {
            if (response.ok) {
                console.log(response);
                response.json().then(createdOrganization => {


                    this.props.history.push(`/admin/organizations/`);
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

    handleOrgNameValue = (e) => {
        this.setState({orgNameValue: e.target.value})
    }

    handleOrgInitialsValue = (e) => {
        this.setState({orgInitialsValue: e.target.value})
    }

    onOrganizationTypeSelected = (event) => {
        // event.preventDefault();
        //this.setState({orgTypePicked: '2'});
        const selectedOrganizationType = this.state.organizationTypes.filter(function (obj) {

            console.log('Current object code: ' + obj.code);
            console.log('Event target value: ' + event.target.value);

            console.log(obj.code == event.target.value);
            return obj.code == event.target.value;
        });
        console.log("Selected organization type: ");
        console.log(selectedOrganizationType);
        this.setState({selectedOrganizationType: selectedOrganizationType[0]});
        this.setState({orgTypeValue: selectedOrganizationType[0].code});

        console.log('Shiiiittt');
        console.log(this.state.selectedOrganizationType);

        // console.log("Selected organization type: " + this.state.selectedOrganizationType);

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


        const organizationTypes = this.state.organizationTypes.map(option =>
            <option value={option.code}>{option.description}</option>
        );

        const organizationRoles = this.state.organizationRoles.map(option =>
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
                                                                                                  style={{paddingRight: "20px"}}/>Estadísticas</Link></NavItem>
                    <NavItem> <Link to="/admin"><Icon icon={userTie}
                                                      style={{paddingRight: "20px"}}/>Admin</Link></NavItem>
                </Nav>
            </div>
        );

        let organizationActivities;

        if (this.state.organizationActivities.length === 0) {
            organizationActivities =
                <p style={{color: 'grey', marginLeft: '20px'}}>No hay actividades para esta organización.</p>
        } else {


            organizationActivities = this.state.organizationActivities.map(activity =>

                <Col md={12}>
                    <Link to={`/activities/${activity.id}`}><Panel header={activity.activityName}>
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
                    </Link>
                </Col>
            );
        }

        let organizationCounselors;

        console.log('Orgnization Counselors');
        console.log(this.state.organizationCounselors);

        if (this.state.organizationCounselors.length === 0) {
            organizationCounselors =
                <p style={{color: 'grey', marginLeft: '20px'}}>No hay consejeros para esta organización.</p>
        } else {


            organizationCounselors = this.state.organizationCounselors.map(counselor =>

                <Col md={12}>
                    <Panel header={counselor.counselorName}


                           style={{fontFamily: 'Helvetica'}}>
                        <Col md={6}>
                            <Row>
                                <Col md={6}><p>Nombre:</p></Col><Col md={6}><p> {counselor.counselorName}</p></Col>
                                <Col md={6}><p>Email:</p></Col><Col md={6}><p> {counselor.counselorEmail}</p></Col>
                            </Row>
                        </Col>
                        <Col md={6}>

                            <Row>
                                <Row>
                                    <Col md={12}><Button className="btn-info btn-large pull-right"
                                                         style={{width: '100px', marginBottom: '10px'}}
                                                         onClick={this.toggleEditMode}>Detalles</Button> </Col>
                                </Row>
                                <Row>
                                    <Col md={12}><Button className="btn-danger btn-large pull-right"
                                                         style={{width: '100px'}}
                                                         onClick={() => this.removeCounselor(counselor.id)}>Remover</Button>
                                    </Col>
                                </Row>
                            </Row>
                        </Col>

                    </Panel>

                </Col>
            );
        }

        let organizationMembers;

        if (this.state.organizationMembers.length === 0) {
            organizationMembers =
                <p style={{color: 'grey', marginLeft: '20px'}}>No hay miembros para esta organización.</p>
        } else {


            organizationMembers = this.state.organizationMembers.map(member =>

                <Col md={12}>
                    <Panel header={member.studentName}


                           style={{fontFamily: 'Helvetica'}}>
                        <Col md={6}>
                            <Row>
                                <Col md={6}><p>Nombre:</p></Col><Col md={6}><p> {member.studentName}</p></Col>
                                <Col md={6}><p>Email:</p></Col><Col md={6}><p> {member.studentEmail}</p></Col>
                                <Col md={6}><p>Rol:</p></Col><Col md={6}><p> {member.description}</p></Col>
                            </Row>
                        </Col>
                        <Col md={6}>

                            <Row>
                                <Row>
                                    <Col md={12}><Button className="btn-info btn-large pull-right"
                                                         style={{width: '100px', marginBottom: '10px'}}
                                    >Detalles</Button> </Col>
                                </Row>
                                <Row>
                                    <Col md={12}><Button className="btn-danger btn-large pull-right"
                                                         style={{width: '100px'}}
                                                         onClick={() => this.removeMember(member.id)}>Remover</Button>
                                    </Col>
                                </Row>
                            </Row>
                        </Col>

                    </Panel>
                </Col>
            );
        }

        return (
            <div className="container">
                <Col md={2}>
                    {tabsInstance}
                </Col>

                <Col md={10}>
                    <ol className="breadcrumb">
                        <li/>
                        <li><Link to={`/admin/`}>Panel de admistración</Link></li>
                        <li><Link to={`/admin/organizations`}>Organizaciones</Link></li>
                        <li className="active">Detalles de la organización</li>
                    </ol>

                    <Panel header="Detalles de la organización">
                        <Form horizontal name="newOrganization" onSubmit={this.open}>

                            <FormGroup>
                                <Col sm={4}>

                                    <Col componentClass={ControlLabel}>Nombre de la organización</Col>
                                    {
                                        (this.state.orgNameValue.length >= 100) ?
                                            (<div>
                                                <FormControl name="organizationName"
                                                             onChange={this.handleOrgNameValue}
                                                             placeholder="Ex. Association for Computing Machinery"
                                                             style={errorFormStyle}
                                                             disabled={this.state.notEditMode}
                                                             value={this.state.orgNameValue}
                                                             required
                                                />
                                                <HelpBlock style={errorHelpBlockStyle}>El nombre es demasiado
                                                    largo</HelpBlock>
                                            </div>)
                                            :
                                            (this.state.orgNameValue.length <= 5 && this.state.orgNameValue.length != 0 ) ?
                                                (<div>
                                                    <FormControl name="organizationName"
                                                                 onChange={this.handleOrgNameValue}
                                                                 placeholder="Ex. Association for Computing Machinery"
                                                                 style={errorFormStyle}
                                                                 value={this.state.orgNameValue}
                                                                 disabled={this.state.notEditMode}
                                                                 required/>
                                                    <HelpBlock style={errorHelpBlockStyle}>El nombre es muy
                                                        pequeno</HelpBlock>
                                                </div>)
                                                :
                                                (/^[0-9]+$/.test(this.state.orgNameValue) === true) ?
                                                    (<div>
                                                        <FormControl name="organizationName"
                                                                     onChange={this.handleOrgNameValue}
                                                                     placeholder="Ex. Association for Computing Machinery"
                                                                     style={errorFormStyle}
                                                                     disabled={this.state.notEditMode}
                                                                     value={this.state.orgNameValue}
                                                                     required/>
                                                        <HelpBlock style={errorHelpBlockStyle}>El nombre de la
                                                            organizacion
                                                            no puede ser un numero</HelpBlock>

                                                    </div>)
                                                    :
                                                    (/^[0-9]+$/.test(this.state.orgNameValue) === false && this.state.orgNameValue != 0) ?
                                                        (<div>
                                                            <FormControl name="organizationName"
                                                                         onChange={this.handleOrgNameValue}
                                                                         placeholder="Ex. Association for Computing Machinery"
                                                                         style={successFormStyle}
                                                                         disabled={this.state.notEditMode}
                                                                         value={this.state.orgNameValue}
                                                                         required/>
                                                        </div>)
                                                        :
                                                        (<div>
                                                            <FormControl name="organizationName"
                                                                         onChange={this.handleOrgNameValue}
                                                                         placeholder="Ex. Association for Computing Machinery"
                                                                         disabled={this.state.notEditMode}
                                                                         value={this.state.orgNameValue}
                                                                         required/>
                                                        </div>)
                                    }
                                </Col>

                                <Col md={4}>
                                    <Col componentClass={ControlLabel}>Tipo</Col>
                                    {
                                        (this.state.orgTypePicked != '1') ?
                                            (this.state.orgTypePicked === '2') ?
                                                (<div>
                                                    <FormControl componentClass="select"
                                                                 name="organizationType"
                                                                 onChange={this.onOrganizationTypeSelected}
                                                                 placeholder="select"
                                                                 style={successFormStyle}
                                                                 disabled={this.state.notEditMode}
                                                                 value={this.state.orgTypeValue}
                                                                 required>
                                                        <option>select</option>
                                                        {organizationTypes}
                                                    </FormControl>
                                                </div>)
                                                :
                                                (<div>
                                                    <FormControl componentClass="select"
                                                                 name="organizationType"
                                                                 onChange={this.onOrganizationTypeSelected}
                                                                 placeholder="select"
                                                                 disabled={this.state.notEditMode}
                                                                 value={this.state.orgTypeValue}
                                                                 required>
                                                        <option>select</option>
                                                        {organizationTypes}
                                                    </FormControl>
                                                </div>)
                                            :
                                            (<div>
                                                <FormControl componentClass="select" name="organizationType"
                                                             onChange={this.onOrganizationTypeSelected}
                                                             placeholder="select"
                                                             style={errorFormStyle}
                                                             disabled={this.state.notEditMode}
                                                             value={this.state.orgTypeValue}
                                                             required>
                                                    <option>select</option>
                                                    {organizationTypes}
                                                </FormControl>
                                                <HelpBlock style={errorHelpBlockStyle}>Escoja el tipo de la
                                                    organización</HelpBlock>
                                            </div>)
                                    }

                                </Col>

                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Siglas</Col>
                                    {
                                        (this.state.orgInitialsValue.length > 20) ?
                                            (<div>
                                                <FormControl name="organizationInitials"
                                                             placeholder="Ex. ACM"
                                                             onChange={this.handleOrgInitialsValue}
                                                             style={errorFormStyle}
                                                             disabled={this.state.notEditMode}
                                                             value={this.state.orgInitialsValue}
                                                             required/>
                                                <HelpBlock style={errorHelpBlockStyle}>El numero de siglas es muy
                                                    grande</HelpBlock>
                                            </div>)
                                            :
                                            (this.state.orgInitialsValue.length === 1) ?
                                                (<div>
                                                    <FormControl name="organizationInitials"
                                                                 placeholder="Ex. ACM"
                                                                 onChange={this.handleOrgInitialsValue}
                                                                 style={errorFormStyle}
                                                                 disabled={this.state.notEditMode}
                                                                 value={this.state.orgInitialsValue}
                                                                 required/>
                                                    <HelpBlock style={errorHelpBlockStyle}>El numero de siglas es muy
                                                        pequeno</HelpBlock>
                                                </div>)
                                                :
                                                (/^[0-9]+$/.test(this.state.orgInitialsValue) === true) ?
                                                    (<div>
                                                        <FormControl name="organizationInitials"
                                                                     placeholder="Ex. ACM"
                                                                     onChange={this.handleOrgInitialsValue}
                                                                     style={errorFormStyle}
                                                                     disabled={this.state.notEditMode}
                                                                     value={this.state.orgInitialsValue}
                                                                     required/>
                                                        <HelpBlock style={errorHelpBlockStyle}>Las siglas
                                                            no pueden ser un numero</HelpBlock>
                                                    </div>)
                                                    :
                                                    (/^[0-9]+$/.test(this.state.orgInitialsValue) === false && this.state.orgInitialsValue.length > 2) ?
                                                        (<div>
                                                            <FormControl name="organizationInitials"
                                                                         placeholder="Ex. ACM"
                                                                         onChange={this.handleOrgInitialsValue}
                                                                         style={successFormStyle}
                                                                         disabled={this.state.notEditMode}
                                                                         value={this.state.orgInitialsValue}
                                                                         required/>
                                                        </div>)
                                                        :
                                                        (<div>
                                                            <FormControl name="organizationInitials"
                                                                         placeholder="Ex. ACM"
                                                                         onChange={this.handleOrgInitialsValue}
                                                                         disabled={this.state.notEditMode}
                                                                         value={this.state.orgInitialsValue}
                                                                         required/>
                                                        </div>)

                                    }
                                </Col>
                            </FormGroup>


                            <AlertContainer ref={a => this.msg = a}/>

                            <ReactCenter>

                                <Row>
                                    <Col md={6}><Link to={`/admin/organizations/`}><Button
                                        className="btn btn-primary">Atrás</Button></Link></Col>
                                    {
                                        this.state.notEditMode ?
                                            <Col md="1"><Button className="btn-warning" onClick={this.toggleEditMode}>Editar</Button></Col>
                                            :
                                            <Col md={6}><Button className="btn-success"
                                                                onClick={this.onSubmit}>Guardar</Button></Col>
                                    }

                                </Row>
                            </ReactCenter>

                            <Modal show={this.state.showModal} onHide={this.close}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Submit organization?</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <h4>Are you sure you want to submit the organization?</h4>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={this.onSubmit} bsStyle="primary"
                                            type="button">Ok</Button>
                                    <Button onClick={this.close}>Cancel</Button>
                                </Modal.Footer>
                            </Modal>

                        </Form>
                    </Panel>
                    <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect}>
                        <NavItem eventKey="1">Actividades</NavItem>
                        <NavItem eventKey="2" title="Item">Consejeros </NavItem>
                        <NavItem eventKey="3" title="Item">Miembros </NavItem>
                    </Nav>
                    <br/>

                </Col>

                <Col md={2}></Col>

                <Col md={10}>
                    {this.state.activeKey === '1' ? organizationActivities : null}
                    {this.state.activeKey === '2' ?
                        <div>
                            <Col md={12}>
                                <Panel>

                                    <Col md={6}>
                                        <Col componentClass={ControlLabel}>Email del consejero</Col>
                                        {
                                            (/^[a-zA-Z]+\.?[a-zA-Z]+[0-9]*?@(upr.edu|ece.upr.edu|uprm.edu)+$/.test(this.state.newCounselorValue) === false && this.state.newCounselorValue.length != 0) ?
                                                (<div>
                                                    <FormControl name="adminEmail"
                                                                 onChange={this.onCounselorChange}
                                                                 style={errorFormStyle}
                                                                 placeholder="Ex. maria.cruz@upr.edu"
                                                                 required/>
                                                    <HelpBlock style={errorHelpBlockStyle}>Correo debe ser del dominio
                                                        @upr.edu</HelpBlock>
                                                </div>)
                                                :
                                                (/^[a-zA-Z]+\.?[a-zA-Z]+[0-9]*?@(upr.edu|ece.upr.edu|uprm.edu)+$/.test(this.state.newCounselorValue) === true) ?
                                                    (<div>
                                                        <FormControl name="adminEmail"
                                                                     onChange={this.onCounselorChange}
                                                                     style={successFormStyle}
                                                                     placeholder="Ex. maria.cruz@upr.edu"
                                                                     required/>
                                                    </div>)
                                                    :
                                                    (<div>
                                                        <FormControl name="adminEmail"
                                                                     onChange={this.onCounselorChange}
                                                                     placeholder="Ex. maria.cruz@upr.edu"
                                                                     required/>
                                                    </div>)
                                        }
                                    </Col>


                                    {/*<Col md={6}><FormControl name="organizationInitials"*/}
                                    {/*placeholder="juan.delpueblo@upr.edu"*/}
                                    {/*onChange={this.onCounselorChange}*/}
                                    {/*value={this.state.newCounselorValue}*/}
                                    {/*required/></Col>*/}
                                    <Col md={3}></Col>
                                    <Col md={3}>

                                    <Button className="btn-success btn-large pull-right"
                                            style={{width: '100px', marginBottom: '10px'}}
                                            onClick={this.addCounselor}>Añadir</Button>
                                    </Col>

                                </Panel>
                            </Col>
                            {organizationCounselors}

                        </div>

                        :
                        null
                    }
                    {this.state.activeKey === '3' ? <div>
                        <Col md={12}>
                            <Panel>
                                <Col md={6}>
                                    <Col componentClass={ControlLabel}>Email del estudiante</Col>
                                    {
                                        (/^[a-zA-Z]+\.?[a-zA-Z]+[0-9]*?@(upr.edu|ece.upr.edu|uprm.edu)+$/.test(this.state.newMemberValue) === false && this.state.newMemberValue.length != 0) ?
                                            (<div>
                                                <FormControl name="adminEmail"
                                                             onChange={this.onMemberChange}
                                                             style={errorFormStyle}
                                                             placeholder="Ex. maria.cruz@upr.edu"
                                                             required/>
                                                <HelpBlock style={errorHelpBlockStyle}>Correo debe ser del dominio
                                                    @upr.edu</HelpBlock>
                                            </div>)
                                            :
                                            (/^[a-zA-Z]+\.?[a-zA-Z]+[0-9]*?@(upr.edu|ece.upr.edu|uprm.edu)+$/.test(this.state.newMemberValue) === true) ?
                                                (<div>
                                                    <FormControl name="adminEmail"
                                                                 onChange={this.onMemberChange}
                                                                 style={successFormStyle}
                                                                 placeholder="Ex. maria.cruz@upr.edu"
                                                                 required/>
                                                </div>)
                                                :
                                                (<div>
                                                    <FormControl name="adminEmail"
                                                                 onChange={this.onMemberChange}
                                                                 placeholder="Ex. maria.cruz@upr.edu"
                                                                 required/>
                                                </div>)
                                    }
                                </Col>


                                <Col md={3}>
                                    <Col componentClass={ControlLabel}>Rol </Col>

                                    <FormControl componentClass="select"
                                                 name="memberRole"
                                                 onChange={this.onMemberRoleSelected}
                                                 placeholder="select"
                                                 value={this.state.selectedMemberRole}
                                                 required>
                                        <option>select</option>
                                        {organizationRoles}
                                    </FormControl>
                                </Col>
                                <Col md={3}>
                                    <Button className="btn-success btn-large pull-right"
                                            style={{width: '100px', marginBottom: '10px'}}
                                            onClick={this.addMember}>Añadir</Button>
                                </Col>
                            </Panel>

                        </Col>
                        {organizationMembers}

                    </div> : null}
                </Col>
            </div>
        )
    }
}


OrganizationDetail.contextTypes = {
    initialState: React.PropTypes.object,
};

export default OrganizationDetail;