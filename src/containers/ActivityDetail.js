/**
 * Created by jesma on 12/12/2017.
 */
import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router-dom';
import Icon from 'react-icons-kit';
import { statsDots } from 'react-icons-kit/icomoon/statsDots';
import { iosPaw } from 'react-icons-kit/ionicons/iosPaw';
import { home } from 'react-icons-kit/icomoon/home';
import { fileText2 } from 'react-icons-kit/icomoon/fileText2';
import { userTie } from 'react-icons-kit/icomoon/userTie';
import DatePicker from 'react-bootstrap-date-picker';
import TimePicker from 'react-bootstrap-time-picker';

import {
    FormGroup, FormControl, ControlLabel, ButtonToolbar, Button,
    Panel, Form, Col, Alert, Radio, Well, MenuItem, DropdownButton, Jumbotron, Row, Nav, NavItem
} from 'react-bootstrap';
import ReactCenter from "react-center";



const PAGE_SIZE = 10;

class ActivityDetail extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            activity: [],
            typeOptions: ['Social', 'Religious', 'Sale', 'Artistic', 'Academic', 'Educational', 'Professional', 'Civic', 'Sports', 'Political'],
            selectedType: {},
            commentary: '',

/*            activity: {
                _id: 0,
                requestTitle: '',
                activityDescription: '',
                activityGuest: '',
                activityAssistant: '',
                selectedDate: '',
                startTime: '',
                endTime: '',
                organization: {},
                organizationInitials: '',
                requesterName: '',
                studentIdentificationNumber: '',
                studentRole: '',
                studentAddress1: '',
                studentAddressCity: '',
                studentAddressState: '',
                studentAddressCountry: '',
                studentAddressZipCode: '',
                studentTelephone: '',
                counselor: {},
                counselorTelephone: '',
                counselorFaculty: '',
                counselorDepartment: '',
                counselorOfficeNumber: '',
                requestDate: '',
                building: '',
                facilities: {},
                status: '',
                facilityManagerDecision: '',
                counselorDecision: '',
                dscaDecision: ''
            }*/
            activity: {
                id:  '',
                activityName: '',
                activityDescription: '',
                attendantsNumber: '',
                activityDate: '',
                activityStart: '',
                activityEnd: '',
                activityStatus_code: '',
                hasFood: '',
                guestName: '',
                counselorStatus_code: '',
                managerStatus_code: '',
                activityType_code: '',
                student: {
                    fullName: ''
                }
            }
        }

        this.onApproval = this.onApproval.bind(this);
        this.onDenied = this.onDenied.bind(this);
        this.onTypeSelected = this.onTypeSelected.bind(this);
    }


    componentDidMount() {
        console.log('this.props.params.id: ' + this.props.match.params.id);
        let id = this.props.match.params.id;
        console.log("The id: " + id);
        // fetch(`http://localhost:3001/api/activities/${id}`).then(response => {
        fetch(`http://localhost:8000/api/activities/${id}`).then(response => {
            response.json().then(data => {
                console.log(data);
                this.setState({activity: data[0]});
                console.log(this.state.activity.id);
            }).catch(err => {
                console.log(err)
                //this.props.showError(`Error in sending data to server: ${err.message}`);
            });
        })
    }

    onApproval(event) {
        event.preventDefault();

        console.log('Selected status: ' + this.state.selectedStatus);

        const activityUpdate = {
            dscaComment: this.state.commentary,
            dscaDecision: 'approved',
            dscaActivityType: this.state.selectedType,
        };

        this.setState({dscaDecision: 'approved'});

        console.log("DSCA Decision: " + this.state.dscaDecision);


        console.log("Activity Update Object: " + activityUpdate);
        fetch(`http://localhost:3001/api/activities/update/${this.state.activity._id}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(activityUpdate),
        }).then(response => {
            if (response.ok) {
                console.log(response);
                response.json().then(updatedRequest => {
                    console.log('Activity request was updated successfully!');
                    console.log('Activity request ID: ' + updatedRequest._id);

                    this.props.router.push(`/activities/${updatedRequest._id}`);
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

    onDenied(event) {
        event.preventDefault();

        console.log('Selected status: ' + this.state.selectedStatus);

        const activityUpdate = {
            dscaComment: this.state.commentary,
            dscaDecision: 'denied',
            dscaActivityType: this.state.selectedType,
        };

        this.setState({dscaDecision: 'denied'});

        console.log(activityUpdate);
        fetch(`http://localhost:3001/api/activities/update/${this.state.activity._id}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(activityUpdate),
        }).then(response => {
            if (response.ok) {
                console.log(response);
                response.json().then(updatedRequest => {
                    console.log('Activity request was updated successfully!');
                    console.log('Activity request ID: ' + updatedRequest._id);

                    this.props.router.push(`/activities/${updatedRequest._id}`);
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

    /*    onApproval() {
     console.log("This thing was clicked");

     fetch(`/api/activities/${ this.state.activity._id}/approve`, {
     method: 'POST'
     }).then(response => {
     if (response.ok) {
     console.log(response);
     response.json().then(approvedActivity => {
     console.log('Activity request status: ' + approvedActivity.status);

     this.props.router.push(`/activities/${approvedActivity._id}`);
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

     onDenied() {
     console.log("This thing was denied");

     fetch(`/api/activities/${ this.state.activity._id}/deny`, {
     method: 'POST'
     }).then(response => {
     if (response.ok) {
     console.log(response);
     response.json().then(deniedActivity => {
     console.log('Activity request status: ' + deniedActivity.status);

     this.props.router.push(`/activities/${deniedActivity._id}`);
     })
     } else {
     response.json().then(error => {
     //this.props.showError(`Failed to create request: ${error.message}`);
     });
     }
     }).catch(err => {
     //this.props.showError(`Error in sending data to server: ${err.message}`);
     });
     }*/

    onTypeSelected(event) {
        console.log("Type here");
        const selectedType = this.state.typeOptions.filter(function (obj) {
            return obj == event.target.value;
        });
        /*
         console.log("Selected Type: " + selectedType)
         */

        this.setState({selectedType: selectedType[0]});

    }

    render() {

        const typeOptions = this.state.typeOptions.map(option =>
            <option value={option}>{option}</option>
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

        /*        return (
            <div className="container">
                <Col md={2}>
                    {tabsInstance}
                </Col>

                <Col md={10}>

                    <ol className="breadcrumb">
                        <li/>
                        <li ><Link to={`/activities/`}>Activities</Link></li>
                        <li className="active">Activity Details</li>
                    </ol>

                    <Panel  header={this.state.activity.requestTitle}>
                        {/!*<td><Link to={`/activities/${this.state.activity._id}`}>{this.state.activity.requestTitle}</Link></td>*!/}
                        <p><b>Organization Name:</b> {this.state.activity.organization.name}</p>
                        <p><b>Organization Initials:</b> {this.state.activity.organizationInitials}</p>
                        <br/>
                        <p><b>Requested Facility:</b> {this.state.activity.facilities.name}</p>
                        <p><b>Building:</b> {this.state.activity.facilities.building}</p>
                        <p><b>Activity Description:</b> {this.state.activity.activityDescription}</p>
                        <p><b>Activity Guest(s):</b> {this.state.activity.activityGuest}</p>
                        <p><b>Activity Assistants:</b> {this.state.activity.activityAssistant}</p>
                        <p><b>Activity Date:</b> {this.state.activity.selectedDate}</p>
                        <p><b>Activity Start Time:</b> {this.state.activity.startTime}</p>
                        <p><b>Activity End Time:</b> {this.state.activity.endTime}</p>
                        <br/>
                        <p><b>Requester Name:</b> {this.state.activity.requesterName}</p>
                        <p><b>Requester Identification Number:</b> {this.state.activity.studentIdentificationNumber}</p>
                        <p><b>Requester Role:</b> {this.state.activity.studentRole}</p>
                        <p><b>Requester Address:</b> {this.state.activity.studentAddress1} {this.state.activity.studentAddressCity} {this.state.activity.studentAddressState} {this.state.activity.studentAddressCountry} {this.state.activity.studentAddressZipCode}</p>
                        <p><b>Requester Telephone:</b> {this.state.activity.studentTelephone}</p>
                        <br/>
                        <p><b>Counselor Name:</b> {this.state.activity.counselorName}</p>
                        <p><b>Counselor Telephone:</b> {this.state.activity.counselorTelephone}</p>
                        <p><b>Counselor Faculty:</b> {this.state.activity.counselorFaculty}</p>
                        <p><b>Counselor Department:</b> {this.state.activity.counselorDepartment}</p>
                        <p><b>Counselor Office Number:</b> {this.state.activity.counselorOfficeNumber}</p>
                        <p><b>Counselor Email:</b> {this.state.activity.counselorEmail}</p>
                        <br/>
                        <div align="center">
                            <p><b>Status:</b> {this.state.activity.status}</p>
                            <p><b>Request Submission Date:</b> {this.state.activity.requestDate}</p>
                            <p><b>Counselor Decision Date:</b> </p>
                            <p><b>Facilities Manager Decision Date:</b></p><br />
                        </div>

                        <Row>
                            <Col sm={3}>
                                <Col componentClass={ControlLabel}>Category: </Col>
                                <FormControl componentClass="select" name="selectType"
                                             onChange={this.onTypeSelected}
                                             placeholder="select">
                                    <option>select</option>
                                    {typeOptions}

                                </FormControl>
                            </Col>
                        </Row>
                        <br />

                        <Row>
                            <Col sm={3}>
                                <Col componentClass={ControlLabel}>Commentary: </Col>
                                <FormControl componentClass="textarea" name="commentary"/>
                            </Col>
                        </Row>
                        <br />

                        <Row>
                            {(this.state.activity.dscaDecision === "pending" )  ?
                                (<div>
                                    <Col md="1"><Link to={`/activities/`}><Button className="btn btn-primary">Back</Button></Link></Col>
                                    <Col md="1"><Button className="btn-success" onClick={this.onApproval}>Approve</Button></Col>
                                    <Col md="1"><Button className="btn-danger"  onClick={this.onDenied}>Decline</Button></Col>
                                </div>) :
                                (<div>
                                    <Col md="1"><Link to={`/activities/`}><Button className="btn btn-primary">Back</Button></Link></Col>
                                    <Col md="1"><Button>This activity has been {this.state.activity.dscaDecision}.</Button></Col>
                                </div>)
                            }
                        </Row>


                    </Panel>
                </Col>
            </div>
        )*/

        return (
            <div className="container">

                <Col md={2}>
                    {tabsInstance}
                </Col>

                <Col md={10}>
                    <ol className="breadcrumb">
                        <li/>
                        <li ><Link to={`/activities/`}>Activities</Link></li>
                        <li className="active">Activity Details</li>
                    </ol>

                    <Row>
                        <Col md={12}>
                            <Panel header="Student Information">
                                <FormGroup>
                                    <Col sm={4}>
                                        <Col componentClass={ControlLabel}>Full Name</Col>
                                        <FormControl name="requesterName" disabled/>
                                    </Col>

                                    <Col sm={4}>
                                        <Col componentClass={ControlLabel}>Identification Number</Col>
                                        <FormControl name="studentIdentificationNumber" disabled/>
                                    </Col>

                                    <Col sm={3}>
                                        <Col componentClass={ControlLabel}>Role</Col>
                                        <FormControl name="studentRole" disabled/>
                                    </Col>
                                </FormGroup>
                                <br/>
                                <br/>

                                <FormGroup>
                                    <Col sm={10}>
                                        <Col componentClass={ControlLabel}>Address</Col>
                                        <FormControl name="studentAddress1" disabled/>
                                    </Col>

                                </FormGroup>

                                <FormGroup>
                                    <Col sm={3}>
                                        <Col componentClass={ControlLabel}>City</Col>
                                        <FormControl name="studentAddressCity" disabled/>
                                    </Col>

                                    <Col sm={3}>
                                        <Col componentClass={ControlLabel}>Country</Col>
                                        <FormControl name="studentAddressCountry" disabled/>
                                    </Col>

                                    <Col sm={3}>
                                        <Col componentClass={ControlLabel}>Zip Code</Col>
                                        <FormControl name="studentAddressZipCode" disabled/>
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col sm={4}>
                                        <Col componentClass={ControlLabel}>Telephone</Col>
                                        <FormControl name="studentTelephone" disabled/>
                                    </Col>
                                </FormGroup>
                            </Panel>
                            <br/>
                            <br/>

                            <Panel header="Activity Information">
                                <FormGroup>
                                    <Col sm={3}>
                                        <Col componentClass={ControlLabel}>Activity Title</Col>
                                            <FormControl name="requestTitle" disabled/>
                                    </Col>

                                    <Col sm={9}>
                                         <Col componentClass={ControlLabel}>Description</Col>
                                            <FormControl name="activityDescription" disabled/>
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col sm={3}>
                                        <Col componentClass={ControlLabel}>Guests</Col>
                                            <FormControl name="activityGuest" disabled/>
                                    </Col>

                                    <Col sm={3}>
                                        <Col componentClass={ControlLabel}>Attendants</Col>
                                            <FormControl name="activityAssistant" disabled/>
                                    </Col>

                                    <Col md={3}>
                                        <Col componentClass={ControlLabel}>Facility Name</Col>
                                            <FormControl name="selectFacilities" disabled/>
                                    </Col>

                                    <Col md={3}>
                                        <Col componentClass={ControlLabel}>Building</Col>
                                            <FormControl name="facilityBuilding" disabled/>
                                        </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col md={4}>
                                        <Col componentClass={ControlLabel}>Date</Col>
                                            <DatePicker id="example-datepicker" name="selectedDate" disabled/>
                                        </Col>

                                    <Col md={4}>
                            <Col componentClass={ControlLabel}>Start Time</Col>
                            <TimePicker name="startTime" disabled/>
                        </Col>

                        <Col md={4}>
                            <Col componentClass={ControlLabel}>End Time</Col>
                            <TimePicker name="endTime" disabled/>
                        </Col>
                    </FormGroup>
                </Panel>
                <br/>
                <br/>

                <Panel header="Organization Information">
                    <FormGroup>
                        <Col md={4}>
                            <Col componentClass={ControlLabel}>Organization</Col>
                            <FormControl name="selectOrganization" disabled/>
                        </Col>

                        <Col sm={2}>
                            <Col componentClass={ControlLabel}>Initials</Col>
                            <FormControl name="organizationInitials" disabled/>
                        </Col>
                    </FormGroup>
                </Panel>
                <br/>
                <br/>

                <Panel header="Counselor Information">
                    <FormGroup>
                        <Col md={4}>
                            <Col componentClass={ControlLabel}>Name</Col>
                            <FormControl name="counselorName" disabled/>
                        </Col>

                        <Col sm={4}>
                            <Col componentClass={ControlLabel}>Telephone</Col>
                            <FormControl name="counselorTelephone" disabled/>
                        </Col>

                        <Col sm={4}>
                            <Col componentClass={ControlLabel}>Email</Col>
                            <FormControl name="counselorEmail" disabled/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col sm={3}>
                            <Col componentClass={ControlLabel}>Faculty</Col>
                            <FormControl name="counselorFaculty" disabled/>
                        </Col>

                        <Col sm={3}>
                            <Col componentClass={ControlLabel}>Department</Col>
                            <FormControl name="counselorDepartment" disabled/>
                        </Col>

                        <Col sm={2}>
                            <Col componentClass={ControlLabel}>Office Number</Col>
                            <FormControl name="counselorOfficeNumber" disabled/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col md={4}>
                            <Col componentClass={ControlLabel}>Status</Col>
                            <FormControl name="selectStatus" disabled/>
                        </Col>
                    </FormGroup>

                </Panel>

                <Row>
                    <Col sm={3}>
                        <Col componentClass={ControlLabel}>Category: </Col>
                        <FormControl componentClass="select" name="selectType"
                                     onChange={this.onTypeSelected}
                                     placeholder="select">
                            <option>select</option>
                            {typeOptions}

                        </FormControl>
                    </Col>
                </Row>
                <br />

                <Row>
                    <Col sm={3}>
                        <Col componentClass={ControlLabel}>Commentary: </Col>
                        <FormControl componentClass="textarea" name="commentary"/>
                    </Col>
                </Row>
                <br />

                <Row>
                    <Col md="1"><Link to={`/activities/`}><Button className="btn btn-primary">Back</Button></Link></Col>
                    <Col md="1"><Button className="btn-success" onClick={this.onApproval}>Approve</Button></Col>
                    <Col md="1"><Button className="btn-danger"  onClick={this.onDenied}>Decline</Button></Col>
                </Row>

            </Col>
    </Row>
    </Col>
    </div>
    )

    }
}


ActivityDetail.contextTypes = {
    initialState: React.PropTypes.object,
};

export default ActivityDetail;