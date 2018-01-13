/**
 * Created by jesma on 12/11/2017.
 */
import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router-dom';
import ReactCenter from "react-center"
import Icon from 'react-icons-kit';
import { statsDots } from 'react-icons-kit/icomoon/statsDots';
import { iosPaw } from 'react-icons-kit/ionicons/iosPaw';
import { home } from 'react-icons-kit/icomoon/home';
import { fileText2 } from 'react-icons-kit/icomoon/fileText2';
import { userTie } from 'react-icons-kit/icomoon/userTie';

import {
    FormGroup, FormControl, ControlLabel, ButtonToolbar, Button,
    Panel, Form, Col, Alert, Radio, Well, MenuItem, DropdownButton, Jumbotron, Row, Nav, NavItem
} from 'react-bootstrap';


const PAGE_SIZE = 10;

class UserDetail extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            user: {
                _id: 0,
                email: '',
                role: ''
            }
        }
    }

    componentDidMount() {
        console.log('this.props.params.id: ' + this.props.match.params.id);
        let id = this.props.match.params.id;
        // fetch(`http://192.168.99.100/api/admin/users/${id}`).then(response => {
        fetch(`http://localhost:8000/api/admin/users/${id}`).then(response => {
            response.json().then(data => {
                console.log(data);
                this.setState({user: data});
                console.log(this.state.user._id);
            }).catch(err => {
                console.log(err)
                //this.props.showError(`Error in sending data to server: ${err.message}`);
            });
        })
    }

    onSubmit(event) {
        event.preventDefault();
    }


    render() {
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
            <Form horizontal onSubmit={this.onSubmit} name="newAdmin">

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
            <Form horizontal onSubmit={this.onSubmit} name="newStaff">

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
                <Form horizontal onSubmit={this.onSubmit} name="newStudent">
                    <FormGroup>
                        <Col sm={4}>
                            <Col componentClass={ControlLabel}>Full Name</Col>
                            <FormControl name="requesterName" required/>
                        </Col>

                        <Col sm={4}>
                            <Col componentClass={ControlLabel}>Identification Number</Col>
                            <FormControl name="studentIdentificationNumber" required/>
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
            <Form horizontal onSubmit={this.onSubmit} name="newCounselor">

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
            <Form horizontal onSubmit={this.onSubmit} name="newFacilitiesManager">

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

        return (
            <div className="container">
                <Col md={2}>
                    {tabsInstance}
                </Col>

                <Col md={10}>
                    <ol className="breadcrumb">
                        <li/>
                        <li><Link to={`/admin/`}>Admin Panel</Link></li>
                        <li><Link to={`/admin/users`}>Users</Link></li>
                        <li className="active">User Details</li>
                    </ol>

                    <Panel  header={this.state.user.email}>
                        {/*<td><Link to={`/activities/${this.state.activity._id}`}>{this.state.activity.requestTitle}</Link></td>*/}
                        <p>Email: {this.state.user.email}</p>
                        <p>Role: {this.state.user.role}</p>


                        <Row>
                            <Col md="1"><Link to={`/admin/users/`}><Button className="btn btn-primary">Back</Button></Link></Col>
                            <Col md="1"><Button className="btn-warning">Edit</Button></Col>
                        </Row>


                    </Panel>
                </Col>
            </div>
        )
    }
}


UserDetail.contextTypes = {
    initialState: React.PropTypes.object,
};

export default UserDetail;