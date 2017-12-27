/**
 * Created by jesma on 12/11/2017.
 */
import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router-dom';

import {
    FormGroup, FormControl, ControlLabel, ButtonToolbar, Button,
    Panel, Form, Col, Alert, Radio, Well, MenuItem, DropdownButton, Jumbotron, Nav, NavItem
} from 'react-bootstrap';
import ReactCenter from "react-center";
import Icon from 'react-icons-kit';
import {statsDots} from 'react-icons-kit/icomoon/statsDots';
import {iosPaw} from 'react-icons-kit/ionicons/iosPaw';
import {home} from 'react-icons-kit/icomoon/home';
import {fileText2} from 'react-icons-kit/icomoon/fileText2';
import {userTie} from 'react-icons-kit/icomoon/userTie';

class NewUser extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            userRoles: [
                {
                    id: 1,
                    name: 'Admin'
                },
                {
                    id: 2,
                    name: 'Staff'
                },
                {
                    id: 3,
                    name: 'Student'
                },
                {
                    id: 4,
                    name: 'Counselor'
                },
                {
                    id: 5,
                    name: 'Facilities Manager'
                }
            ],
            selectedUserRole: ''
        }
    }

    onSubmit = (event) => {
        event.preventDefault();

        console.log('Form was submitted');

        //this.showValidation();

        // if (Object.keys(this.state.invalidFields).length !== 0) {
        //     return;
        // }
        const form = document.forms.newUser;

        let newUser;
        if (this.state.selectedUserRole === 'Admin') {
            newUser = {
                role: form.userRole.value,
                adminName: form.adminName.value,
                adminEmail: form.adminEmail.value,
                adminTelephone: form.adminTelephone.value
            }

        } else if (this.state.selectedUserRole === 'Staff') {
            newUser = {
                role: form.userRole.value,
                staffName: form.staffName.value,
                staffEmail: form.staffEmail.value,
                staffTelephone: form.staffTelephone.value
            }

        } else if (this.state.selectedUserRole === 'Student') {
            newUser = {
                role: form.userRole.value,
                requesterName: form.requesterName.value,
                studentIdentificationNumber: form.studentIdentificationNumber.value,
                studentRole: form.studentRole.value,
                studentAddress1: form.studentAddress1.value,
                studentAddressCity: form.studentAddressCity.value,
                studentAddressState: form.studentAddressState.value,
                studentAddressCountry: form.studentAddressCountry.value,
                studentAddressZipCode: form.studentAddressZipCode.value,
                studentTelephone: form.studentTelephone.value,
                studentEmail: form.studentEmail.value
            }

        } else if (this.state.selectedUserRole === 'Counselor') {
            newUser = {
                role: form.userRole.value,
                counselorName: form.counselorName.value,
                counselorEmail: form.counselorEmail.value,
                counselorDepartment: form.counselorDepartment.value,
                counselorFaculty: form.counselorFaculty.value,
                counselorOfficeNumber: form.counselorOfficeNumber.value,
                counselorTelephone: form.counselorTelephone.value
            }

        } else if (this.state.selectedUserRole === 'Facilities Manager') {

            newUser = {
                role: form.userRole.value,
                managerName: form.managerName.value,
                managerEmail: form.managerEmail.value,
                managerTelephone: form.managerTelephone.value
            }
        }

        console.log(newUser);
        fetch('http://localhost:3001/api/admin/users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser),
        }).then(response => {
            if (response.ok) {
                console.log(response);
                response.json().then(createdUser => {
                    console.log('New user was created successfully!');
                    console.log('User ID: ' + createdUser._id);

                    this.props.history.push(`/admin/users/`);
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

    onUserRoleSelected = (event) => {
        event.preventDefault();
        console.log('Change happened');
        console.log(event.target.value);
        const selectedUserRole = this.state.userRoles.filter(function (obj) {
            return obj.id == event.target.value;
        });
        console.log(selectedUserRole[0]);
        this.setState({selectedUserRole: selectedUserRole[0]});
        console.log("Selected user role: " + this.state.selectedUserRole.name);
    };

    render() {


        const roles = this.state.userRoles.map(roles =>
            <option value={roles.id}>{roles.name}</option>
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


        const adminFields = (
            <Form horizontal onSubmit={this.onSubmit} name="newUser">

                <FormGroup>
                    <Col sm={4}>
                        <Col componentClass={ControlLabel}>Full name</Col>
                        <FormControl name="adminName" required/>
                    </Col>

                    <Col sm={4}>
                        <Col componentClass={ControlLabel}>Email</Col>
                        <FormControl name="adminEmail" required/>
                    </Col>

                    <Col sm={4}>
                        <Col componentClass={ControlLabel}>Telephone</Col>
                        <FormControl name="adminTelephone" required/>
                    </Col>
                </FormGroup>
            </Form>
        )

        const staffFields = (
            <Form horizontal onSubmit={this.onSubmit} name="newUser">

                <FormGroup>

                    <Col sm={4}>
                        <Col componentClass={ControlLabel}>Full name</Col>
                        <FormControl name="staffName" required/>
                    </Col>

                    <Col sm={4}>
                        <Col componentClass={ControlLabel}>Email</Col>
                        <FormControl name="staffEmail" required/>
                    </Col>

                    <Col sm={4}>
                        <Col componentClass={ControlLabel}>Telephone</Col>
                        <FormControl name="staffTelephone" required/>
                    </Col>
                </FormGroup>
            </Form>
        )

        const studentFields = (
            <div>
                <Form horizontal onSubmit={this.onSubmit} name="newUser">
                    <FormGroup>
                        <Col sm={4}>
                            <Col componentClass={ControlLabel}>Full Name</Col>
                            <FormControl name="requesterName" required/>
                        </Col>

                        <Col sm={4}>
                            <Col componentClass={ControlLabel}>Identification Number</Col>
                            <FormControl name="studentIdentificationNumber" required/>
                        </Col>

                        <Col sm={3}>
                            <Col componentClass={ControlLabel}>Role</Col>
                            <FormControl name="studentRole" required/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col sm={10}>
                            <Col componentClass={ControlLabel}>Address</Col>
                            <FormControl name="studentAddress1" required/>
                        </Col>

                    </FormGroup>

                    <FormGroup>
                        <Col sm={3}>
                            <Col componentClass={ControlLabel}>City</Col>
                            <FormControl name="studentAddressCity" required/>
                        </Col>

                        <Col sm={3}>
                            <Col componentClass={ControlLabel}>State</Col>
                            <FormControl name="studentAddressState" required/>
                        </Col>

                        <Col sm={3}>
                            <Col componentClass={ControlLabel}>Country</Col>
                            <FormControl name="studentAddressCountry" required/>
                        </Col>

                        <Col sm={3}>
                            <Col componentClass={ControlLabel}>Zip Code</Col>
                            <FormControl name="studentAddressZipCode" required/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col sm={4}>
                            <Col componentClass={ControlLabel}>Telephone</Col>
                            <FormControl name="studentTelephone" required/>
                        </Col>

                        <Col sm={4}>
                            <Col componentClass={ControlLabel}>Email</Col>
                            <FormControl name="studentEmail" required/>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )

        const counselorFields = (
            <Form horizontal onSubmit={this.onSubmit} name="newUser">

                <FormGroup>
                    <Col sm={4}>
                        <Col componentClass={ControlLabel}>Full Name</Col>
                        <FormControl name="counselorName" required/>
                    </Col>

                    <Col sm={4}>
                        <Col componentClass={ControlLabel}>Email</Col>
                        <FormControl name="counselorEmail" required/>
                    </Col>

                    <Col sm={4}>
                        <Col componentClass={ControlLabel}>Telephone</Col>
                        <FormControl name="counselorTelephone" type="number" required/>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col sm={4}>
                        <Col componentClass={ControlLabel}>Faculty</Col>
                        <FormControl name="counselorFaculty" required/>
                    </Col>

                    <Col sm={4}>
                        <Col componentClass={ControlLabel}>Department</Col>
                        <FormControl name="counselorDepartment" required/>
                    </Col>

                    <Col sm={4}>
                        <Col componentClass={ControlLabel}>Office Number</Col>
                        <FormControl name="counselorOfficeNumber" required/>
                    </Col>
                </FormGroup>
            </Form>
        )

        const facilitiesManagerFields = (
            <Form horizontal onSubmit={this.onSubmit} name="newUser">

                <FormGroup>
                    <Col sm={4}>
                        <Col componentClass={ControlLabel} required>Full Name</Col>
                        <FormControl name="managerName"/>
                    </Col>

                    <Col sm={4}>
                        <Col componentClass={ControlLabel} required>Email</Col>
                        <FormControl name="managerEmail"/>
                    </Col>
                <Col sm={4}>
                        <Col componentClass={ControlLabel} required>Telephone</Col>
                        <FormControl name="managerTelephone"/>
                    </Col>
                </FormGroup>
            </Form>
        )

        console.log(this.state.selectedUserRole);
        return (
            <div className="container">
                <Col md={2}>
                    {tabsInstance}
                </Col>

                <Col md={10}>
                    <ol className="breadcrumb">
                        <li/>
                        <li><Link to={`/admin`}>Admin Panel</Link></li>
                        <li><Link to={`/admin/users`}>Users</Link></li>
                        <li className="active">Create New User</li>
                    </ol>

                    <Col md={12}>
                        <Panel header="Create New User">
                            <Form horizontal onSubmit={this.onSubmit} name="newUser">
                                <FormGroup>
                                    <Col sm={4}>
                                        <Col componentClass={ControlLabel}>Role</Col>
                                        <FormControl componentClass="select" name="userRole"
                                                     onChange={this.onUserRoleSelected}

                                                     placeholder="select" required>
                                            <option>select</option>
                                            {roles}
                                        </FormControl>

                                    </Col>
                                </FormGroup>
                                {this.state.selectedUserRole.name === 'Admin' ? adminFields : null }
                                {this.state.selectedUserRole.name === 'Student' ? studentFields : null }
                                {this.state.selectedUserRole.name === 'Staff' ? staffFields : null }
                                {this.state.selectedUserRole.name === 'Counselor' ? counselorFields : null }
                                {this.state.selectedUserRole.name === 'Facilities Manager' ? facilitiesManagerFields : null }

                                <ButtonToolbar>
                                    <Col md={6}>
                                        <Button bsStyle="primary" type="submit">
                                            Submit </Button>
                                    </Col>
                                </ButtonToolbar>
                            </Form>
                        </Panel>
                    </Col>
                </Col>

                <Col md={2}></Col>
            </div>
        )
    }
}


NewUser.contextTypes = {
    initialState: React.PropTypes.object,
};

export default NewUser;