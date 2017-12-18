import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router-dom';
import AlertContainer from 'react-alert';

import {
    FormGroup, FormControl, ControlLabel, ButtonToolbar, Button,
    Panel, Form, Col, Alert, Radio, Well, MenuItem, DropdownButton, Jumbotron, Nav, NavItem
} from 'react-bootstrap';
import ReactCenter from "react-center"


const PAGE_SIZE = 10;

class CreateFacilities extends Component {

    constructor(props, context) {
        super(props, context);

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

        console.log('Form was submitted');

        const form = document.forms.newFacilities;


        const newFacilities = {
            building: form.building.value,
            space: form.space.value
        };

        console.log(newFacilities);
        fetch('http://localhost:3001/api/admin/facilities', {
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


    showSuccessAlert = () => {
        console.log("Success Alert");
        this.msg.success('Success! New facility created.', {time: 5000, type: 'success'});
        console.log("Success Alert 2");
    }

    render() {
        const tabsInstance = (

            <div style={{backgroundColor: '#F8F8F8'}}>
                <Nav fluid>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link
                        to="/"><ReactCenter>Home</ReactCenter></Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link
                        to="/request"><ReactCenter>Request</ReactCenter></Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link
                        to="/activities"><ReactCenter>Activities</ReactCenter></Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}> <Link
                        to="/stats"><ReactCenter>Stats</ReactCenter></Link></NavItem>
                    <NavItem> <Link to="/admin"><ReactCenter>Admin</ReactCenter></Link></NavItem>
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

                    <Panel header="Create New Facilities">
                        <Form horizontal onSubmit={this.onSubmit} name="newFacilities">
                            <FormGroup>
                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Building</Col>
                                    <FormControl name="building"/>
                                </Col>

                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Space</Col>
                                    <FormControl name="space"/>
                                </Col>
                            </FormGroup>


                            <ReactCenter>
                                <ButtonToolbar>
                                    <Col md={6}>
                                        <AlertContainer ref={a => this.msg = a}/>

                                        <Button bsStyle="primary" type="submit" onClick={this.showSuccessAlert}>
                                            Submit </Button>
                                    </Col>
                                </ButtonToolbar>
                            </ReactCenter>

                            {/*<FormGroup>*/}
                            {/*<Col sm={4}>*/}
                            {/*<Col componentClass={ControlLabel}>Manager Name</Col>*/}
                            {/*<FormControl name="facilitiesManagerName"/>*/}
                            {/*</Col>*/}

                            {/*<Col sm={4}>*/}
                            {/*<Col componentClass={ControlLabel}>Manager Email</Col>*/}
                            {/*<FormControl name="facilitiesManagerEmail"/>*/}
                            {/*</Col>*/}

                            {/*<Col sm={4}>*/}
                            {/*<Col componentClass={ControlLabel}>Space</Col>*/}
                            {/*<FormControl name="space"/>*/}
                            {/*</Col>*/}
                            {/*</FormGroup>*/}

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