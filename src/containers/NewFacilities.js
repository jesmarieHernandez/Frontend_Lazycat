import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router-dom';
import AlertContainer from 'react-alert';


import {
    FormGroup, FormControl, ControlLabel, ButtonToolbar, Button,
    Panel, Form, Col, Alert, Radio, Well, MenuItem, DropdownButton, Jumbotron, Nav, NavItem, HelpBlock
} from 'react-bootstrap';
import ReactCenter from "react-center";
import {Modal} from 'react-bootstrap';
import Icon from 'react-icons-kit';
import {statsDots} from 'react-icons-kit/icomoon/statsDots';
import {iosPaw} from 'react-icons-kit/ionicons/iosPaw';
import {home} from 'react-icons-kit/icomoon/home';
import {fileText2} from 'react-icons-kit/icomoon/fileText2';
import {userTie} from 'react-icons-kit/icomoon/userTie';


const PAGE_SIZE = 10;

class CreateFacilities extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            showModal: false,
            buildingValue: '',
            spaceValue: '',
            departmentValue: ''
        }

        // this.state = {
        //     eventDate: value,
        //     theValue: {},
        //     organizationName: '',
        //     selectedOrganizationInfo:
        //         {
        //             organizationName: '',
        //             organizationAcronym: '',
        //             counselorFirstName: '',
        //             counselorLastName: '',
        //             counselorAddress: '',
        //             counselorPhone: ''
        //         },
        //     requestedFacilitiesInfo: {},
        //     invalidFields: {}, showingValidation: false,
        // };
    }

    onSubmit = (event) => {
        event.preventDefault();

        this.showSuccessAlert();

        console.log('Form was submitted');

        const form = document.forms.newFacilities;
        console.log(form);
        const newFacilities = {
            building: form.building.value,
            space: form.space.value,
            facilityDepartment: form.facilityDepartment.value,
            isActive: 1
        };
        console.log('Los nuevos facilities');

        console.log(newFacilities);

        // fetch('http://localhost:3001/api/admin/facilities', {
        fetch('http://localhost:8000/api/facilities', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newFacilities),
        }).then(response => {
            if (response.ok) {
                console.log(response);
                response.json().then(createdFacilities => {
                    console.log('New facilities were created successfully!');
                    console.log(createdFacilities);

                    /*
                     this.props.router.push(`/admin/facilities/${createdFacilities._id}/`);
                     */
                    this.props.history.push(`/admin/facilities/`);

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

        if ((this.state.buildingValue.length <= 254) &&
            (this.state.buildingValue.length >= 5) &&
            /^[0-9]+$/.test(this.state.buildingValue) === false &&
            /^[`!@#\$%\^&\*()_+{}\|:"<>?~,./;'[\]\\]+$/.test(this.state.buildingValue) === false &&
            (this.state.spaceValue.length <= 50) &&
            (this.state.spaceValue.length >= 1) &&
            /^[`!@#\$%\^&\*()_+{}\|:"<>?~,./;'[\]\\]+$/.test(this.state.spaceValue) === false &&
            (this.state.departmentValue.length <= 254) &&
            (this.state.departmentValue.length >= 4) &&
            /^[0-9]+$/.test(this.state.departmentValue) === false &&
            /^[`!@#\$%\^&\*()_+{}\|:"<>?~,./;'[\]\\]+$/.test(this.state.departmentValue) === false) {
            this.setState({showModal: true});
        }

        else {
            this.showErrorAlert("Campos en el formulario llenados incorrectamente.")
        }
    }

    handleBuildingValue = (e) => {
        this.setState({buildingValue: e.target.value})
    }

    handleSpaceValue = (e) => {
        this.setState({spaceValue: e.target.value})
    }

    handleDepartmentValue = (e) => {
        this.setState({departmentValue: e.target.value})
    }

    close = () => {
        this.setState({showModal: false});
    }

    showSuccessAlert = () => {
        console.log("Success Alert");
        this.msg.success('Nueva facilidad creada.', {time: 10000000, type: 'success'});
        console.log("Success Alert 2");
    }

    showErrorAlert = (message) => {
        this.msg.error(message, {time: 2000, type: 'error'});
        return;
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
                                                                                                  style={{paddingRight: "20px"}}/>Estad&iacute;
                        sticas</Link></NavItem>
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
                        <li ><Link to={`/admin`}>Panel de Administraci&oacute;n</Link></li>
                        <li ><Link to={`/admin/facilities`}>Facilidades</Link></li>
                        <li className="active">Crear una Nueva Facilidad</li>
                    </ol>

                    <Panel header="Crear una Nueva Facilidad">
                        <Form horizontal onSubmit={this.open} name="newFacilities">
                            <FormGroup>
                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Edificio</Col>
                                    {
                                        (/^[0-9]+$/.test(this.state.buildingValue) === true) ?
                                            (<div>
                                                <FormControl name="building" placeholder="Ex. Luis A. Stefani"
                                                             onChange={this.handleBuildingValue}
                                                             style={errorFormStyle} required/>
                                                <HelpBlock style={errorHelpBlockStyle}>Nombre del edificio no
                                                    puede ser solo n&uacute;meros</HelpBlock>
                                            </div>)
                                            :
                                            (/^[`!@#\$%\^&\*()_+{}\|:"<>?~,./;'[\]\\]+$/.test(this.state.buildingValue) === true) ?
                                                (<div>
                                                    <FormControl name="building"
                                                                 placeholder="Ex. Luis A. Stefani"
                                                                 onChange={this.handleBuildingValue}
                                                                 style={errorFormStyle} required/>
                                                    <HelpBlock style={errorHelpBlockStyle}>Nombre del edificio
                                                        no puede ser solo s&iacute;mbolos</HelpBlock>
                                                </div>)
                                                :
                                                (this.state.buildingValue.length > 254) ?
                                                    (<div>
                                                        <FormControl name="building" placeholder="Ex. Luis A. Stefani"
                                                                     onChange={this.handleBuildingValue}
                                                                     style={errorFormStyle} required/>
                                                        <HelpBlock style={errorHelpBlockStyle}>Nombre del edificio muy
                                                            largo</HelpBlock>
                                                    </div>)
                                                    :
                                                    (this.state.buildingValue.length < 5 && this.state.buildingValue.length != 0) ?
                                                        (<div>
                                                            <FormControl name="building"
                                                                         placeholder="Ex. Luis A. Stefani"
                                                                         onChange={this.handleBuildingValue}
                                                                         style={errorFormStyle} required/>
                                                            <HelpBlock style={errorHelpBlockStyle}>Nombre del edificio
                                                                muy
                                                                corto</HelpBlock>
                                                        </div>)
                                                        :
                                                        (this.state.buildingValue.length >= 5 && this.state.buildingValue.length <= 254) ?
                                                            (<div>
                                                                <FormControl name="building"
                                                                             placeholder="Ex. Luis A. Stefani"
                                                                             onChange={this.handleBuildingValue}
                                                                             style={successFormStyle} required/>
                                                            </div>)
                                                            :
                                                            (<div>
                                                                <FormControl name="building"
                                                                             placeholder="Ex. Luis A. Stefani"
                                                                             onChange={this.handleBuildingValue}
                                                                             required/>
                                                            </div>)
                                    }
                                </Col>

                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Sal&oacute;n/Espacio</Col>
                                    {
                                        (/^[`!@#\$%\^&\*()_+{}\|:"<>?~,./;'[\]\\]+$/.test(this.state.spaceValue) === true) ?
                                            (<div>
                                                <FormControl name="space"
                                                             placeholder="Ex. S-113"
                                                             onChange={this.handleSpaceValue}
                                                             style={errorFormStyle}
                                                             required/>
                                                <HelpBlock style={errorHelpBlockStyle}>Nombre del sal&oacute;
                                                    n/espacio
                                                    no puede ser solo s&iacute;mbolos</HelpBlock>
                                            </div>)
                                            :
                                            (this.state.spaceValue.length > 50) ?
                                                (<div>
                                                    <FormControl name="space"
                                                                 placeholder="Ex. S-113"
                                                                 onChange={this.handleSpaceValue}
                                                                 style={errorFormStyle}
                                                                 required/>
                                                    <HelpBlock style={errorHelpBlockStyle}>Nombre del sal&oacute;
                                                        n/espacio
                                                        muy largo</HelpBlock>
                                                </div>)
                                                :
                                                (this.state.spaceValue.length <= 50 && this.state.spaceValue.length != 0) ?
                                                    (<div>
                                                        <FormControl name="space"
                                                                     placeholder="Ex. S-113"
                                                                     onChange={this.handleSpaceValue}
                                                                     style={successFormStyle}
                                                                     required/>
                                                    </div>)
                                                    :
                                                    (<div>
                                                        <FormControl name="space" placeholder="Ex. S-113"
                                                                     onChange={this.handleSpaceValue} required/>
                                                    </div>)
                                    }
                                </Col>

                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Departmento</Col>
                                    {
                                        (/^[0-9]+$/.test(this.state.departmentValue) === true) ?
                                            (<div>
                                                <FormControl name="facilityDepartment"
                                                             placeholder="Ex. Ingenier&iacute;a Civil"
                                                             onChange={this.handleDepartmentValue}
                                                             style={errorFormStyle}
                                                             required/>
                                                <HelpBlock style={errorHelpBlockStyle}>Nombre del departamento
                                                    no
                                                    puede ser solo n&uacute;meros</HelpBlock>
                                            </div>)
                                            :
                                            (/^[`!@#\$%\^&\*()_+{}\|:"<>?~,./;'[\]\\]+$/.test(this.state.departmentValue) === true) ?
                                                (<div>
                                                    <FormControl name="facilityDepartment"
                                                                 placeholder="Ex. Ingenier&iacute;a Civil"
                                                                 onChange={this.handleDepartmentValue}
                                                                 style={errorFormStyle}
                                                                 required/>
                                                    <HelpBlock style={errorHelpBlockStyle}>Nombre del
                                                        departamento
                                                        no puede ser solo s&iacute;mbolos</HelpBlock>
                                                </div>)
                                                :
                                                (this.state.departmentValue.length > 254) ?
                                                    (<div>
                                                        <FormControl name="facilityDepartment"
                                                                     placeholder="Ex. Ingenier&iacute;a Civil"
                                                                     onChange={this.handleDepartmentValue}
                                                                     style={errorFormStyle}
                                                                     required/>
                                                        <HelpBlock style={errorHelpBlockStyle}>Nombre del departamento
                                                            muy
                                                            largo</HelpBlock>
                                                    </div>)
                                                    :
                                                    (this.state.departmentValue.length < 4 && this.state.departmentValue.length != 0) ?
                                                        (<div>
                                                            <FormControl name="facilityDepartment"
                                                                         placeholder="Ex. Ingenier&iacute;a Civil"
                                                                         onChange={this.handleDepartmentValue}
                                                                         style={errorFormStyle}
                                                                         required/>
                                                            <HelpBlock style={errorHelpBlockStyle}>Nombre del
                                                                departamento muy
                                                                corto</HelpBlock>
                                                        </div>)
                                                        :
                                                        (this.state.departmentValue.length >= 4 && this.state.departmentValue.length <= 254) ?
                                                            (<div>
                                                                <FormControl name="facilityDepartment"
                                                                             placeholder="Ex. Ingenier&iacute;a Civil"
                                                                             onChange={this.handleDepartmentValue}
                                                                             style={successFormStyle}
                                                                             required/>
                                                            </div>)
                                                            :
                                                            (<div>
                                                                <FormControl name="facilityDepartment"
                                                                             placeholder="Ex. Ingenier&iacute;a Civil"
                                                                             onChange={this.handleDepartmentValue}
                                                                             required/>
                                                            </div>)
                                    }
                                </Col>
                            </FormGroup>

                            <ReactCenter>
                                <ButtonToolbar>
                                    <Col md={6}>
                                        <AlertContainer ref={a => this.msg = a}/>

                                        {/*                                        <Button bsStyle="primary" type="submit" onClick={this.showSuccessAlert}>
                                         Submit </Button>*/}

                                        <Button bsStyle="primary" type="submit">
                                            Someter </Button>
                                    </Col>
                                </ButtonToolbar>
                            </ReactCenter>

                            <Modal show={this.state.showModal} onHide={this.close}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Submit facility?</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <h4>Are you sure you want to submit the facility?</h4>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={this.onSubmit} bsStyle="primary"
                                            type="button">Ok</Button>
                                    <Button onClick={this.close}>Cancel</Button>
                                </Modal.Footer>
                            </Modal>


                            {/*<ButtonToolbar>*/}
                            {/*<Col md={6}>*/}
                            {/*<AlertContainer ref={a => this.msg = a} />*/}

                            {/*<Button bsStyle="primary" type="submit" onClick={this.showSuccessAlert}>*/}
                            {/*Submit </Button>*/}
                            {/*</Col>*/}
                            {/*</ButtonToolbar>*/}
                        </Form>
                    </Panel>
                </Col>
            </div>
        )
    }
}

CreateFacilities.contextTypes = {
    initialState: React.PropTypes.object,
};

export default CreateFacilities;