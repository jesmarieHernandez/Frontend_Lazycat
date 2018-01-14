/**
 * Created by jesma on 12/11/2017.
 */
import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router-dom';

import {
    FormGroup, FormControl, ControlLabel, ButtonToolbar, Button,
    Panel, Form, Col, Alert, Radio, Well, MenuItem, DropdownButton, Jumbotron, Row, Nav, NavItem, HelpBlock, Modal
} from 'react-bootstrap';
import ReactCenter from "react-center";
import AlertContainer from 'react-alert';
import Icon from 'react-icons-kit';
import { statsDots } from 'react-icons-kit/icomoon/statsDots';
import { iosPaw } from 'react-icons-kit/ionicons/iosPaw';
import { home } from 'react-icons-kit/icomoon/home';
import { fileText2 } from 'react-icons-kit/icomoon/fileText2';
import { userTie } from 'react-icons-kit/icomoon/userTie';


class OrganizationDetail extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            notEditMode: true,
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
            orgId: null,
            orgTypePicked: '',
            organizationActivities: [],
            organizationTypes: [],
        }

        this.toggleEditMode = this.toggleEditMode.bind(this);
    }

    componentDidMount() {
        console.log('this.props.params.id: ' + this.props.match.params.id);
        let id = this.props.match.params.id;
        // fetch(`http://localhost:8000/api/organizations/${id}`).then(response => {
        this.setState({orgNameValue: 'Sociedad del Perreo'});
        this.setState({orgInitialsValue: 'SP'});

        fetch(`http://localhost:8000/api/organizations/${id}`).then(response => {
            response.json().then(data => {

                console.log(`http://localhost:8000/api/organizations/${id}`);
                console.log(data);
                this.setState({orgNameValue: data.organizationName});
                this.setState({orgInitialsValue: data.organizationInitials});
                this.setState({orgTypeValue: 1});
                this.setState({orgId: data.id});

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



    }

    toggleEditMode() {
        this.setState({notEditMode: !this.state.notEditMode});
        console.log(this.state.notEditMode);
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

        const organizationActivities = this.state.organizationActivities.map(activity =>
            <Col md={12}>
                <Panel header={activity.requestTitle}>
                    <td><Link to={`/activities/${activity._id}`}>{activity.requestTitle}</Link></td>
                    <p>Organization Acronym: {activity.organization.name}</p>
                    <p>Request Title: {activity.requestDate}</p>
                    <p>Request Description: {activity.facilities.name}</p>
                </Panel>

            </Col>
        );


        const organizationTypes = this.state.organizationTypes.map(option =>
            <option value={option.code}>{option.description}</option>
        );

        const tabsInstance = (

            <div style={{backgroundColor: '#F8F8F8'}}>
                <Nav fluid>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/request"><Icon icon={fileText2} style={{paddingRight: "20px"}} />Request</Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/activities"><Icon icon={iosPaw} style={{paddingRight: "20px"}}/>Activities</Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}> <Link to="/stats"><Icon icon={statsDots} style={{paddingRight: "20px"}}/>Statistics</Link></NavItem>
                    <NavItem> <Link to="/admin"><Icon icon={userTie} style={{paddingRight: "20px"}}/>Admin</Link></NavItem>
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
                            <li><Link to={`/admin/`}>Admin Panel</Link></li>
                            <li><Link to={`/admin/organizations`}>Organizations</Link></li>
                            <li className="active">Organization Details</li>
                        </ol>

                        <Panel header="Create New Organization">
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
                                                (this.state.orgNameValue.length <= 5 && this.state.orgNameValue.length !=0 ) ?
                                                    (<div>
                                                        <FormControl name="organizationName"
                                                                     onChange={this.handleOrgNameValue}
                                                                     placeholder="Ex. Association for Computing Machinery"
                                                                     style={errorFormStyle}
                                                                     value={this.state.orgNameValue}
                                                                     disabled={this.state.notEditMode}
                                                                     required/>
                                                        <HelpBlock style={errorHelpBlockStyle}>El nombre es muy pequeno</HelpBlock>
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
                                                            <HelpBlock style={errorHelpBlockStyle}>El nombre de la organizacion
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
                                    {/*<ButtonToolbar>*/}
                                        {/*<Col md={6}><Link to={`/admin/organizations/`}><Button*/}
                                            {/*className="btn btn-primary">Back</Button></Link></Col>*/}
                                        {/*<Col md={6}>*/}
                                            {/*<Button bsStyle="btn btn-success" type="submit">*/}
                                                {/*Submit </Button>*/}
                                        {/*</Col>*/}
                                    {/*</ButtonToolbar>*/}

                                    <Row>
                                        <Col md={6}><Link to={`/admin/organizations/`}><Button
                                            className="btn btn-primary">Back</Button></Link></Col>
                                        {
                                            this.state.notEditMode? <Col md="1"><Button className="btn-warning" onClick={this.toggleEditMode}>Edit</Button></Col>
                                                :
                                                <Col md={6}><Button className="btn-success" onClick={this.onSubmit}>Save</Button></Col>
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

                    </Col>

                    <Col md={2}></Col>

                    <Col md={10}>
                        <Panel header="Recent Activities">
                            {organizationActivities}
                        </Panel>
                    </Col>
            </div>
        )
    }
}


OrganizationDetail.contextTypes = {
    initialState: React.PropTypes.object,
};

export default OrganizationDetail;