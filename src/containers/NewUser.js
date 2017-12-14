/**
 * Created by jesma on 12/11/2017.
 */
import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router-dom';

import {
    FormGroup, FormControl, ControlLabel, ButtonToolbar, Button,
    Panel, Form, Col, Alert, Radio, Well, MenuItem, DropdownButton, Jumbotron
} from 'react-bootstrap';


class NewUser extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            userRoles : [
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
                    name: 'Facilities'
                }
            ],
            selectedUserRole: ''
        }
    }

    onSubmit(event) {
        event.preventDefault();

        console.log('Form was submitted');

        //this.showValidation();

        // if (Object.keys(this.state.invalidFields).length !== 0) {
        //     return;
        // }
        const form = document.forms.newUser;


        const newUser = {
            // firstName: form.userFirstName.value,
            // lastName: form.userLastName.value,
            email: form.userEmail.value,
            role: form.userRole.value,
            // creationDate: new Date(),

        };


        console.log(newUser);
        fetch('http://localhost:3001/api/users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser),
        }).then(response => {
            if (response.ok) {
                console.log(response);
                response.json().then(createdUser => {
                    console.log('New user was created successfully!');
                    console.log('User ID: ' + createdUser._id);

                    //this.props.router.push(`/activities/${createdRequest._id}`);
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
                {/*<Jumbotron><h3>Request New Activity</h3></Jumbotron>*/}


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

                    <Col md={9}>
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

                                <FormGroup>
                                    <Col sm={4}>
                                        <Col componentClass={ControlLabel}>Email</Col>
                                        <FormControl name="userEmail"/>
                                    </Col>
                                </FormGroup>
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