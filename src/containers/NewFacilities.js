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
            spaceValue: ''
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
            facilityDepartment: 'mcBicho',
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

        if (isNaN(this.state.building)) {
            console.log("In herreeeeeee")
            this.setState({showModal: true});
        }

        else {
            this.showErrorAlert("Form filled incorrectly.")
        }
    }

    getInitialState = () => {
        return {showModal: false};
    }

    handleBuildingValue = (e) => {
        this.setState({buildingValue: e.target.value})
    }

    handleSpaceValue = (e) => {
        this.setState({spaceValue: e.target.value})
    }

    close = () => {
        this.setState({showModal: false});
    }


    showSuccessAlert = () => {
        console.log("Success Alert");
        this.msg.success('Success! New facility created.', {time: 10000000, type: 'success'});
        console.log("Success Alert 2");
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
                                                                                                  style={{paddingRight: "20px"}}/>Estadi</Link></NavItem>
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
                        <li ><Link to={`/admin`}>Admin Panel</Link></li>
                        <li ><Link to={`/admin/facilities`}>Facilities</Link></li>
                        <li className="active">Create New Facilities</li>
                    </ol>

                    <Panel header="Crear una Nueva Facilidad">
                        <Form horizontal onSubmit={this.open} name="newFacilities">
                            <FormGroup>
                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Edificio</Col>
                                    {
                                        (this.state.buildingValue.length > 20) ?
                                            (<div>
                                                <FormControl name="building" placeholder="Ex. Luis A. Stefani"
                                                             onChange={this.handleBuildingValue} style={{borderColor: '#B74442', boxShadow: "0px 0px 8px #B74442"}} required/>
                                                <HelpBlock style={{color: '#B74442'}}>Nombre del edifico muy largo</HelpBlock>
                                            </div>)
                                            :
                                            (<div>
                                                <FormControl name="building" placeholder="Ex. Luis A. Stefani"
                                                             onChange={this.handleBuildingValue} required/>
                                            </div>)
                                    }
                                </Col>

                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Sal&oacute;n/Espacio</Col>
                                    {
                                        (this.state.spaceValue.length > 20) ?
                                            (<div>
                                                <FormControl name="space" placeholder="Ex. S-113"
                                                             onChange={this.handleSpaceValue} style={{borderColor: '#B74442', boxShadow: "0px 0px 8px #B74442"}} required/>
                                                <HelpBlock style={{color: '#B74442'}}>Nombre del sal&oacute;n/espacio muy largo</HelpBlock>

                                            </div>)
                                            :
                                            (<div>
                                                <FormControl name="space" placeholder="Ex. S-113"
                                                             onChange={this.handleSpaceValue} required/>
                                            </div>)
                                    }
                                </Col>

                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Department</Col>
                                    <FormControl name="facilitiesDepartmentCode" required/>
                                </Col>
                            </FormGroup>

                            {/*<FormGroup>*/}
                                {/*<Col sm={4}>*/}
                                    {/*<Col componentClass={ControlLabel}>Manager Email</Col>*/}
                                    {/*<FormControl name="facilitiesManagerEmail"/>*/}
                                {/*</Col>*/}

                                {/*<Col sm={4}>*/}
                                    {/*<Col componentClass={ControlLabel}>Manager Name</Col>*/}
                                    {/*<FormControl name="facilitiesManagerName"/>*/}
                                {/*</Col>*/}

                                {/*<Col sm={4}>*/}
                                    {/*<Col componentClass={ControlLabel}>Space</Col>*/}
                                    {/*<FormControl name="space"/>*/}
                                {/*</Col>*/}
                            {/*</FormGroup>*/}


                            <ReactCenter>
                                <ButtonToolbar>
                                    <Col md={6}>
                                        <AlertContainer ref={a => this.msg = a}/>

                                        {/*                                        <Button bsStyle="primary" type="submit" onClick={this.showSuccessAlert}>
                                         Submit </Button>*/}

                                        <Button bsStyle="primary" type="submit">
                                            Submit </Button>
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