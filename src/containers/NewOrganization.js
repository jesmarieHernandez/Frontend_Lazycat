/**
 * Created by jesma on 12/11/2017.
 */

import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router-dom';

import {
    FormGroup, FormControl, ControlLabel, ButtonToolbar, Button,
    Panel, Form, Col, Alert, Radio, Well, MenuItem, DropdownButton, Jumbotron, Nav, NavItem, HelpBlock
} from 'react-bootstrap';
import {Modal} from 'react-bootstrap'
import AlertContainer from 'react-alert';
import ReactCenter from "react-center";
import Icon from 'react-icons-kit';
import {statsDots} from 'react-icons-kit/icomoon/statsDots';
import {iosPaw} from 'react-icons-kit/ionicons/iosPaw';
import {home} from 'react-icons-kit/icomoon/home';
import {fileText2} from 'react-icons-kit/icomoon/fileText2';
import {userTie} from 'react-icons-kit/icomoon/userTie';


const PAGE_SIZE = 10;

class CreateOrganization extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {

            showModal: false,
            orgNameValue: '',
            orgTypeValue: false,
            orgTypePicked: '',
            orgInitialsValue: '',
            counselorNameValue: '',
            counselorEmailValue: '',
            counselorTelephoneValue: '',
            counselorFacultyValue: '',
            counselorDepartmentValue: '',
            counselorOfficeValue: '',
            organizationTypes: [],
            selectedOrganizationType: {}
        }

        this.onOrganizationTypeSelected = this.onOrganizationTypeSelected.bind(this);

    }

    componentDidMount() {
        // fetch('http://localhost:8000/api/organization_types/').then(response => {
        fetch('http://192.168.99.100/api/organization_types').then(response => {
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

    onOrganizationTypeSelected(event) {
        // event.preventDefault();
        this.setState({orgTypePicked: '2'});
        const selectedOrganizationType = this.state.organizationTypes.filter(function (obj) {

            console.log('Current object code' + obj.code);
            console.log('Event target value' + event.target.value);

            console.log(obj.code == event.target.value);
            return obj.code == event.target.value;
        });
        // console.log("Selected organization type: " + selectedOrganizationType[0]);
        console.log(this.state.selectedOrganizationType);
        this.setState({selectedOrganizationType: selectedOrganizationType[0]});
        console.log('Shiiiittt');
        console.log(this.state.selectedOrganizationType);

        // console.log("Selected organization type: " + this.state.selectedOrganizationType);

    }

    onSubmit = (event) => {
        event.preventDefault();

        console.log("Adentro de submit");

        if (this.state.orgTypePicked === '') {
            this.setState({orgTypePicked: '1'});
        }

        this.showSuccessAlert();

        console.log('Form was submitted');

        const form = document.forms.newOrganization;


        const newOrganization = {
            organizationName: form.organizationName.value,
            organizationType_code: form.organizationType.value,
            organizationInitials: form.organizationInitials.value,
            organizationStatus_code: 1,
            counselorName: form.organizationCounselorName.value,
            counselorEmail: form.organizationCounselorEmail.value,
            counselorPhone: form.organizationCounselorTelephone.value,
            counselorFaculty: form.organizationCounselorFaculty.value,
            counselorDepartment: form.organizationCounselorDepartment.value,
            counselorOffice: form.organizationCounselorOfficeNumber.value

        };

        console.log(newOrganization);
        // fetch('http://localhost:8000/api/organizations', {
        fetch('http://192.168.99.100/api/organizations', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newOrganization),
        }).then(response => {
            if (response.ok) {
                console.log(response);
                response.json().then(createdOrganization => {
                    console.log('New organization was created successfully!');
                    console.log('Organization ID: ' + createdOrganization._id);

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

    open = (event) => {
        event.preventDefault();
        console.log(isNaN(this.state.orgNameValue));
        console.log(isNaN(this.state.orgTypeValue));
        console.log(isNaN(this.state.orgInitialsValue));
        console.log(isNaN(this.state.counselorNameValue));
        console.log(isNaN(this.state.counselorEmailValue));
        console.log(!isNaN(this.state.counselorTelephoneValue));
        console.log(isNaN(this.state.counselorFacultyValue));
        console.log(isNaN(this.state.counselorDepartmentValue));

        if ((this.state.orgNameValue.length != 0) &&
            (this.state.orgTypePicked === '2') &&
            (this.state.orgInitialsValue.length != 0) &&
            (this.state.counselorNameValue.length != 0) &&
            (this.state.counselorEmailValue.length != 0) && !(this.state.counselorEmailValue.indexOf("@upr.edu") === -1) &&
            (this.state.counselorTelephoneValue.length != 0) &&
            (this.state.counselorFacultyValue.length != 0) &&
            (this.state.counselorDepartmentValue.length != 0)) {
            this.setState({showModal: true});
        }

        else {
            if (this.state.orgTypePicked === '') {
                this.setState({orgTypePicked: '1'});
            }
            this.showErrorAlert("Form filled incorrectly.")
        }
    }

    handleOrgNameValue = (e) => {
        this.setState({orgNameValue: e.target.value})
    }

    handleOrgInitialsValue = (e) => {
        this.setState({orgInitialsValue: e.target.value})
    }

    handleCounselorNameValue = (e) => {
        this.setState({counselorNameValue: e.target.value})
    }

    handleCounselorEmailValue = (e) => {
        this.setState({counselorEmailValue: e.target.value})
    }

    handleCounselorTelephoneValue = (e) => {
        this.setState({counselorTelephoneValue: e.target.value})
    }

    handleCounselorFacultyValue = (e) => {
        this.setState({counselorFacultyValue: e.target.value})
    }

    handleCounselorDepartmentValue = (e) => {
        this.setState({counselorDepartmentValue: e.target.value})
    }

    handleCounselorOfficeNumberValue = (e) => {
        this.setState({counselorOfficeNumber: e.target.value})
    }


    getInitialState = () => {
        return {showModal: false};
    }

    close = () => {
        this.setState({showModal: false});
    }

    showSuccessAlert = () => {
        console.log("Success Alert");
        this.msg.success('Success! New facility created.', {
            time: 10000000,
            type: 'success',
            position: 'bottom center'
        });
        console.log("Success Alert 2");
    }

    showErrorAlert = (message) => {
        this.msg.error(message, {timeout: 500, type: 'error'});
        return;
    }


    render() {
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

        const organizationTypes = this.state.organizationTypes.map(option =>
            <option value={option.code}>{option.description}</option>
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
                        <li ><Link to={`/admin`}>Admin Panel</Link></li>
                        <li ><Link to={`/admin/organizations`}>Organizations</Link></li>
                        <li className="active">Create New Organization</li>
                    </ol>

                    <Panel header="Create New Organization">
                        <Form horizontal name="newOrganization" onSubmit={this.open}>

                            <FormGroup>
                                <Col sm={4}>

                                    <Col componentClass={ControlLabel}>Nombre de la organización</Col>
                                    {
                                        (this.state.orgNameValue.length >= 100) ?
                                            (<div>
                                                <FormControl name="organizationName" onChange={this.handleOrgNameValue}
                                                             placeholder="Ex. Association for Computing Machinery"
                                                             style={errorFormStyle}
                                                             required/>
                                                <HelpBlock style={errorHelpBlockStyle}>El nombre es demasiado
                                                    largo</HelpBlock>
                                            </div>)
                                                :
                                            (this.state.orgNameValue.length <= 5 && this.state.orgNameValue.length !=0 ) ?
                                                (<div>
                                                    <FormControl name="organizationName" onChange={this.handleOrgNameValue}
                                                                 placeholder="Ex. Association for Computing Machinery"
                                                                 style={errorFormStyle}
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
                                                                     required/>
                                                    </div>)
                                                    :
                                                    (<div>
                                                        <FormControl name="organizationName"
                                                                     onChange={this.handleOrgNameValue}
                                                                     placeholder="Ex. Association for Computing Machinery"
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
                                                    <FormControl componentClass="select" name="organizationType"
                                                                 onChange={this.onOrganizationTypeSelected}
                                                                 placeholder="select" style={successFormStyle} required>
                                                        <option>select</option>
                                                        {organizationTypes}
                                                    </FormControl>
                                                </div>)
                                                :
                                                (<div>
                                                    <FormControl componentClass="select" name="organizationType"
                                                                 onChange={this.onOrganizationTypeSelected}
                                                                 placeholder="select" required>
                                                        <option>select</option>
                                                        {organizationTypes}
                                                    </FormControl>
                                                </div>)
                                            :
                                            (<div>
                                                <FormControl componentClass="select" name="organizationType"
                                                             onChange={this.onOrganizationTypeSelected}
                                                             placeholder="select" style={errorFormStyle} required>
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
                                                <FormControl name="organizationInitials" placeholder="Ex. ACM"
                                                             onChange={this.handleOrgInitialsValue}
                                                             style={errorFormStyle}
                                                             required/>
                                                <HelpBlock style={errorHelpBlockStyle}>El numero de siglas es muy
                                                    grande</HelpBlock>
                                            </div>)
                                            :
                                            (this.state.orgInitialsValue.length === 1) ?
                                                (<div>
                                                    <FormControl name="organizationInitials" placeholder="Ex. ACM"
                                                                 onChange={this.handleOrgInitialsValue}
                                                                 style={errorFormStyle}
                                                                 required/>
                                                    <HelpBlock style={errorHelpBlockStyle}>El numero de siglas es muy
                                                        pequeno</HelpBlock>
                                                </div>)
                                                :
                                                (/^[0-9]+$/.test(this.state.orgInitialsValue) === true) ?
                                                    (<div>
                                                        <FormControl name="organizationInitials" placeholder="Ex. ACM"
                                                                     onChange={this.handleOrgInitialsValue}
                                                                     style={errorFormStyle}
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
                                                                         required/>
                                                        </div>)
                                                        :
                                                        (<div>
                                                            <FormControl name="organizationInitials"
                                                                         placeholder="Ex. ACM"
                                                                         onChange={this.handleOrgInitialsValue}
                                                                         required/>
                                                        </div>)

                                    }
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Nombre del Consejero</Col>
                                    {
                                        (/^[a-zA-Z]+\s[a-zA-Z]+\s?[a-zA-Z]*\s*?$/.test(this.state.counselorNameValue) === false && this.state.counselorNameValue.length != 0) ?
                                            (<div>
                                                <FormControl name="organizationCounselorName"
                                                             placeholder="Ex. Raymond Lopez"
                                                             onChange={this.handleCounselorNameValue} style={errorFormStyle} required/>
                                                <HelpBlock style={errorHelpBlockStyle}>Escriba el nombre con los dos
                                                    apellidos</HelpBlock>
                                            </div>)
                                            :
                                            (this.state.counselorNameValue.length < 50 && /^[a-zA-Z]+\s[a-zA-Z]+\s?[a-zA-Z]*\s*?$/.test(this.state.counselorNameValue) === true) ?
                                                (<div>
                                                    <FormControl name="organizationCounselorName"
                                                                 placeholder="Ex. Raymond Lopez"
                                                                 onChange={this.handleCounselorNameValue} style={successFormStyle} required/>
                                                </div>)
                                                :
                                                (
                                                    (this.state.counselorNameValue.length > 50) ?
                                                        (<div>
                                                            <FormControl name="organizationCounselorName"
                                                                         placeholder="Ex. Raymond Lopez"
                                                                         onChange={this.handleCounselorNameValue}
                                                                         style={{
                                                                             borderColor: '#B74442',
                                                                             boxShadow: "0px 0px 8px #B74442"
                                                                         }}
                                                                         required/>
                                                            <HelpBlock style={{color: '#B74442'}}>Nombre muy
                                                                largo</HelpBlock>

                                                        </div>)
                                                        :
                                                        (<div>
                                                            <FormControl name="organizationCounselorName"
                                                                         placeholder="Ex. Raymond Lopez"
                                                                         onChange={this.handleCounselorNameValue}
                                                                         required/>
                                                        </div>)
                                                )
                                    }
                                </Col>

                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Correo Electrónico</Col>
                                    {
                                        (/^[a-zA-Z]+\.?[a-zA-Z]+[0-9]*?@(upr.edu|ece.upr.edu|uprm.edu)+$/.test(this.state.counselorEmailValue) === false && this.state.counselorEmailValue.length != 0) ?
                                            (<div>
                                                <FormControl name="organizationCounselorEmail"
                                                             placeholder="Ex. raymond.lopez@upr.edu"
                                                             onChange={this.handleCounselorEmailValue} style={errorFormStyle} required/>
                                                <HelpBlock style={errorHelpBlockStyle}>Correo debe ser del dominio
                                                    @upr.edu</HelpBlock>
                                            </div>)
                                            :
                                            (/^[a-zA-Z]+\.?[a-zA-Z]+[0-9]*?@(upr.edu|ece.upr.edu|uprm.edu)+$/.test(this.state.counselorEmailValue) === true) ?
                                                (<div>
                                                    <FormControl name="organizationCounselorEmail"
                                                                 placeholder="Ex. raymond.lopez@upr.edu"
                                                                 onChange={this.handleCounselorEmailValue} style={successFormStyle} required/>
                                                </div>)
                                                :
                                                (<div>
                                                    <FormControl name="organizationCounselorEmail"
                                                                 placeholder="Ex. raymond.lopez@upr.edu"
                                                                 onChange={this.handleCounselorEmailValue} required/>
                                                </div>)
                                    }
                                </Col>

                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Extensión de Teléfono</Col>
                                    {
                                        (/^(((x)?[0-9]{4})|([0-9]{10}))$/.test(this.state.counselorTelephoneValue) === false && this.state.counselorTelephoneValue.length != 0) ?
                                            (<div>
                                                <FormControl name="organizationCounselorTelephone" type="text"
                                                             placeholder="Ex. 7266"
                                                             onChange={this.handleCounselorTelephoneValue}
                                                             style={errorFormStyle}
                                                             required/>
                                                <HelpBlock style={errorHelpBlockStyle}>Solo extension (4 digitos) o
                                                    numero completo (10 digitos)</HelpBlock>
                                            </div>)
                                            :
                                            (/^(((x)?[0-9]{4})|([0-9]{10}))$/.test(this.state.counselorTelephoneValue) === true) ?
                                                (<div>
                                                    <FormControl name="organizationCounselorTelephone" type="text"
                                                                 placeholder="Ex. 7266"
                                                                 onChange={this.handleCounselorTelephoneValue} style={successFormStyle}
                                                                 required/>
                                                </div>)
                                                :
                                                (<div>
                                                    <FormControl name="organizationCounselorTelephone" type="text"
                                                                 placeholder="Ex. 7266"
                                                                 onChange={this.handleCounselorTelephoneValue}
                                                                 required/>
                                                </div>)
                                    }
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Facultad</Col>
                                    {
                                        (this.state.counselorFacultyValue.length >= 50) ?
                                            (<div>
                                                <FormControl name="organizationCounselorFaculty"
                                                             placeholder="Ex. Ingenieria"
                                                             onChange={this.handleCounselorFacultyValue} style={errorFormStyle} required/>
                                                <HelpBlock style={errorHelpBlockStyle}>Nombre de la facultad muy
                                                    largo</HelpBlock>
                                            </div>)
                                            :
                                            (<div>
                                                <FormControl name="organizationCounselorFaculty"
                                                             placeholder="Ex. Ingenieria"
                                                             onChange={this.handleCounselorFacultyValue} required/>
                                            </div>)
                                    }
                                </Col>

                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Departamento</Col>
                                    {
                                        (this.state.counselorDepartmentValue.length >= 50) ?
                                            (<div>
                                                <FormControl name="organizationCounselorDepartment"
                                                             placeholder="Ex. Ingenieria de Computadoras"
                                                             onChange={this.handleCounselorDepartmentValue} style={errorFormStyle} required/>
                                                <HelpBlock style={errorHelpBlockStyle}>Nombre del departamento muy
                                                    largo</HelpBlock>

                                            </div>)
                                            :
                                            (<div>
                                                <FormControl name="organizationCounselorDepartment"
                                                             placeholder="Ex. Ingenieria de Computadoras"
                                                             onChange={this.handleCounselorDepartmentValue} required/>
                                            </div>)
                                    }
                                </Col>

                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Número de Oficina</Col>
                                    {
                                        (this.state.counselorOfficeValue.length >= 10) ?
                                            (<div>
                                                <FormControl name="organizationCounselorOfficeNumber"
                                                             placeholder="Ex. S-113"
                                                             onChange={this.handleCounselorOfficeNumberValue} style={errorFormStyle} required/>
                                                <HelpBlock style={errorHelpBlockStyle}>Numero de oficina muy
                                                    largo</HelpBlock>

                                            </div>)
                                            :
                                            (<div>
                                                <FormControl name="organizationCounselorOfficeNumber"
                                                             placeholder="Ex. S-113"
                                                             onChange={this.handleCounselorOfficeNumberValue} required/>
                                            </div>)
                                    }
                                </Col>
                            </FormGroup>

                            <AlertContainer ref={a => this.msg = a}/>

                            <ReactCenter>
                                <ButtonToolbar>
                                    <Col md={6}>
                                        <Button bsStyle="primary" type="submit">
                                            Submit </Button>
                                    </Col>
                                </ButtonToolbar>
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
            </div>
        )
    }
}


CreateOrganization.contextTypes = {
    initialState: React.PropTypes.object,
};

export default CreateOrganization;
