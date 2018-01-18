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

class CreateOrganization extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {

            showModal: false,
            orgNameValue: '',
            orgTypeValue: false,
            orgTypePicked: '',
            orgInitialsValue: '',
            organizationTypes: [],
            selectedOrganizationType: {}
        }

        this.onOrganizationTypeSelected = this.onOrganizationTypeSelected.bind(this);

    }

    componentDidMount() {
        // fetch('http://192.168.99.100/api/organization_types/').then(response => {
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

        this.showSuccessAlert();

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
        };
        console.log('Esto es lo que necesita que se cree');
        console.log(newOrganization);

        // fetch('http://192.168.99.100/api/organizations', {
        fetch('http://192.168.99.100/api/organizations', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newOrganization),
        }).then(response => {
            if (response.ok) {
                console.log('Se creo!');
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

        if ((this.state.orgNameValue.length <= 100) &&
            (this.state.orgNameValue.length >= 5) &&
            /^[0-9]+$/.test(this.state.orgNameValue) === false &&
            /^[`!@#\$%\^&\*()_+{}\|:"<>?~,./;'[\]\\]+$/.test(this.state.orgNameValue) === false &&
            (this.state.orgTypePicked === '2') &&
            (this.state.orgInitialsValue.length <= 20) &&
            (this.state.orgInitialsValue.length >= 2) &&
            /^[0-9]+$/.test(this.state.orgInitialsValue) === false &&
            /^[`!@#\$%\^&\*()_+{}\|:"<>?~,./;'[\]\\]+$/.test(this.state.orgInitialsValue) === false) {
            this.setState({showModal: true});
        }

        else {
            if (this.state.orgTypePicked === '') {
                this.setState({orgTypePicked: '1'});
            }
            this.showErrorAlert("Campos en el formulario llenados incorrectamente.")
        }
    }

    handleOrgNameValue = (e) => {
        this.setState({orgNameValue: e.target.value})
    }

    handleOrgInitialsValue = (e) => {
        this.setState({orgInitialsValue: e.target.value})
    }

    close = () => {
        this.setState({showModal: false});
    }

    showSuccessAlert = () => {
        console.log("Success Alert");
        this.msg.success('Nueva organizaci&oacute;n creada', {
            time: 10000000,
            type: 'success',
            position: 'bottom center'
        });
        console.log("Success Alert 2");
    }

    showErrorAlert = (message) => {
        this.msg.error(message, {timeout: 2000, type: 'error'});
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
                        <li ><Link to={`/admin`}>Panel de Administraci&oacute;n</Link></li>
                        <li ><Link to={`/admin/organizations`}>Organizaciones</Link></li>
                        <li className="active">Crear una Nueva Organizaci&oacute;n</li>
                    </ol>

                    <Panel header="Crear una Nueva Organizaci&oacute;n">
                        <Form horizontal name="newOrganization" onSubmit={this.open}>

                            <FormGroup>
                                <Col sm={4}>

                                    <Col componentClass={ControlLabel}>Nombre de la organización</Col>
                                    {
                                        (this.state.orgNameValue.length > 100) ?
                                            (<div>
                                                <FormControl name="organizationName" onChange={this.handleOrgNameValue}
                                                             placeholder="Ex. Association for Computing Machinery"
                                                             style={errorFormStyle}
                                                             required/>
                                                <HelpBlock style={errorHelpBlockStyle}>El nombre es demasiado
                                                    largo</HelpBlock>
                                            </div>)
                                            :
                                            (this.state.orgNameValue.length < 5 && this.state.orgNameValue.length != 0 ) ?
                                                (<div>
                                                    <FormControl name="organizationName"
                                                                 onChange={this.handleOrgNameValue}
                                                                 placeholder="Ex. Association for Computing Machinery"
                                                                 style={errorFormStyle}
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
                                                                     required/>
                                                        <HelpBlock style={errorHelpBlockStyle}>El nombre de la
                                                            organizacion
                                                            no puede ser un n&uacute;mero</HelpBlock>

                                                    </div>)
                                                    :
                                                    (/^[`!@#\$%\^&\*()_+{}\|:"<>?~,./;'[\]\\]+$/.test(this.state.orgNameValue) === true) ?
                                                        (<div>
                                                            <FormControl name="organizationName"
                                                                         onChange={this.handleOrgNameValue}
                                                                         placeholder="Ex. Association for Computing Machinery"
                                                                         style={errorFormStyle}
                                                                         required/>
                                                            <HelpBlock style={errorHelpBlockStyle}>El nombre de la
                                                                organizacion
                                                                no puede ser solo s&iacute;mbolos</HelpBlock>

                                                        </div>)
                                                        :
                                                        (this.state.orgNameValue.length <= 100 && this.state.orgNameValue.length >= 5) ?
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
                                        (this.state.orgTypePicked === '1') ?
                                                (<div>
                                                    <FormControl componentClass="select" name="organizationType"
                                                                 onChange={this.onOrganizationTypeSelected}
                                                                 placeholder="select"
                                                                 style={errorFormStyle}
                                                                 required>
                                                        <option hidden>select</option>
                                                        {organizationTypes}
                                                    </FormControl>
                                                    <HelpBlock style={errorHelpBlockStyle}>Escoja el tipo de la
                                                        organización</HelpBlock>
                                                </div>)
                                                    :
                                            (this.state.orgTypePicked === '2') ?
                                                (<div>
                                                    <FormControl componentClass="select" name="organizationType"
                                                                 onChange={this.onOrganizationTypeSelected}
                                                                 placeholder="select"
                                                                 style={successFormStyle}
                                                                 required>
                                                        <option hidden>select</option>
                                                        {organizationTypes}
                                                    </FormControl>
                                                </div>)
                                                :
                                                (<div>
                                                    <FormControl componentClass="select" name="organizationType"
                                                                 onChange={this.onOrganizationTypeSelected}
                                                                 placeholder="select"
                                                                 required>
                                                        <option hidden>select</option>
                                                        {organizationTypes}
                                                    </FormControl>
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
                                                <HelpBlock style={errorHelpBlockStyle}>El n&uacute;mero de siglas es muy
                                                    grande</HelpBlock>
                                            </div>)
                                            :
                                            (this.state.orgInitialsValue.length === 1) ?
                                                (<div>
                                                    <FormControl name="organizationInitials" placeholder="Ex. ACM"
                                                                 onChange={this.handleOrgInitialsValue}
                                                                 style={errorFormStyle}
                                                                 required/>
                                                    <HelpBlock style={errorHelpBlockStyle}>El n&uacute;mero de siglas es muy
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
                                                            no pueden ser un n&uacute;mero</HelpBlock>
                                                    </div>)
                                                    :
                                                    (/^[`!@#\$%\^&\*()_+{}\|:"<>?~,./;'[\]\\]+$/.test(this.state.orgInitialsValue) === true) ?
                                                            (<div>
                                                                <FormControl name="organizationInitials" placeholder="Ex. ACM"
                                                                             onChange={this.handleOrgInitialsValue}
                                                                             style={errorFormStyle}
                                                                             required/>
                                                                <HelpBlock style={errorHelpBlockStyle}>Las siglas
                                                                    no pueden ser solo s&iacute;mbolos</HelpBlock>
                                                            </div>)
                                                            :
                                                    (this.state.orgInitialsValue.length > 1 && this.state.orgInitialsValue.length <= 20) ?
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


                            <AlertContainer ref={a => this.msg = a}/>

                            <ReactCenter>
                                <ButtonToolbar>
                                    <Col md={6}><Link to={`/admin/organizations/`}><Button
                                        className="btn btn-primary">Atr&aacute;s</Button></Link></Col>
                                    <Col md={6}>
                                        <Button bsStyle="btn btn-success" type="submit">
                                            Someter</Button>
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
