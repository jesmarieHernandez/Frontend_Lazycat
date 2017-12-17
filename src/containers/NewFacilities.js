import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router-dom';
import AlertContainer from 'react-alert';

import {
    FormGroup, FormControl, ControlLabel, ButtonToolbar, Button,
    Panel, Form, Col, Alert, Radio, Well, MenuItem, DropdownButton, Jumbotron
} from 'react-bootstrap';


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

    onSubmit(event) {
        event.preventDefault();

        console.log('Form was submitted');

        //this.showValidation();

        // if (Object.keys(this.state.invalidFields).length !== 0) {
        //     return;
        // }
        const form = document.forms.newFacilities;


        const newFacilities = {
            building: 'Chardon',
            space: 'La placita',
            facilityDepartment_code: 1,
        };

        // const newFacilities = {
        //     name: form.facilitiesName.value,
        //     building: form.buildingName.value,
        //     creationDate: new Date(),
        //     managerName: form.facilitiesManagerName.value,
        //     managerEmail: form.facilitiesManagerEmail.value,
        // };



        console.log(newFacilities);
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
                    this.props.router.push(`/facilities/${createdFacilities.id}/`);

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
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/request">Request</Link></li>
                    <li><Link to="/activities">Activities</Link></li>
                    <li><Link to="/stats">Stats</Link></li>
                    <li><Link to="/admin">Admin</Link></li>
                </ul>
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