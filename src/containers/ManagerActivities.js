import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from "react-router-dom";
import Icon from 'react-icons-kit';

import {iosPaw} from 'react-icons-kit/ionicons/iosPaw';
import {
    Button, Glyphicon, Table, Panel, Pagination, Jumbotron, Col, Row, Checkbox, Breadcrumb,
    BreadcrumbItem, Nav, NavItem
} from 'react-bootstrap';
import Select from 'react-select';
import ReactCenter from "react-center"


class ManagerActivities extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            activities: []
        }
    }

    componentDidMount() {

        fetch(`http://dev.uprm.edu/dsca/v1/api/activity/${this.props.cookies.get('email')}`).then(response => {
            if (response.ok) {
                response.json().then(results => {
                    this.setState({activities: results});
                    //this.props.router.push(`/activities/${createdRequest._id}`);
                });
            } else {
                // response.json().then(error => {
                //     this.props.showError(`Failed to add issue: ${error.message}`);
                // });
            }
        }).catch(err => {
            this.props.showError(`Error in sending data to server: ${err.message}`);
        });

        // fetch('http://localhost:3001/api/pending').then(response => {
        //     if (response.ok) {
        //         console.log('/api/pending! :D');
        //         response.json().then(results => {
        //             console.log('Total pending activities: ' + results);
        //
        //             //console.log(this.state.activities);
        //             //this.props.router.push(`/activities/${createdRequest._id}`);
        //         });
        //     } else {
        //         console.log('Unable to fetch pending activities')
        //         // response.json().then(error => {
        //         //     this.props.showError(`Failed to add issue: ${error.message}`);
        //         // });
        //     }
        // }).catch(err => {
        //     this.props.showError(`Error in sending data to server: ${err.message}`);
        // });
    }

    render() {

        const tabsInstance = (

            <div style={{backgroundColor: '#F8F8F8'}}>
                <Nav fluid>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/manager/activities"><Icon
                        icon={iosPaw}
                        style={{paddingRight: "20px"}}/>Actividades</Link></NavItem>
                </Nav>
            </div>
        );

        console.log('Las actividades del counselor');
        console.log(this.state.activities);

        const filteredActivities = this.state.activities.filter(function (manager) {

            return manager.counselorStatus_code === 2;
        });

        const activities = filteredActivities.map(activity =>

            <Col md={12}>
                <Panel header={activity.activityName}>
                    {/*<td><Link to={`/manager/activities/${activity.id}`}>{activity.activityName}</Link></td>*/}
                    {/*<br/>*/}
                    <Col md={9}>
                        <Row>

                            <Col md={4}><p>Título:</p></Col><Col md={8}><p> {activity.activityName}</p></Col>
                            <Col md={4}><p>Descripción:</p></Col><Col md={8}><p> {activity.activityDescription}</p>
                        </Col>
                            <Col md={4}><p>Organización:</p></Col><Col md={8}>
                            <p> {activity.organization.organizationName}</p></Col>
                            <Col md={4}><p>Facilidades:</p></Col><Col md={8}><p> {activity.facility.space}</p></Col>
                            <Col md={4}><p>Estado:</p></Col><Col md={8}><p> {activity.manager_status.description}</p></Col>

                        </Row>
                    </Col>
                    <Col md={3}>
                        <Row>
                            <Col md={12}><Link to={`/manager/activities/${activity.id}`}><Button
                                className="btn-info btn-large pull-right"
                                style={{width: '100px', marginBottom: '10px'}}
                            >Detalles</Button></Link> </Col>
                        </Row>
                    </Col>

                </Panel>
            </Col>
        );

        return (
            <div className="container">
                <Col md={2}>
                    {tabsInstance}
                </Col>

                <Col md={10}>

                    <ol className="breadcrumb">
                        <li/>
                        <li>Facilities Manager</li>
                        <li className="active">Actividades</li>
                    </ol>

                    <Col md={7}>
                        <div>{activities}</div>
                    </Col>
                </Col>
            </div>
        )
    }
}

ManagerActivities.contextTypes = {
    initialState: React.PropTypes.object,
};

export default ManagerActivities;