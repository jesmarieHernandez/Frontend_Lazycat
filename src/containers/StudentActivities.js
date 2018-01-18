import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from "react-router-dom";
import {
    Button, Glyphicon, Table, Panel, Pagination, Jumbotron, Col, Row, Checkbox, Breadcrumb,
    BreadcrumbItem, Nav, NavItem
} from 'react-bootstrap';
import Select from 'react-select';
import ReactCenter from "react-center";


class StudentActivities extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            activities: []
        }
    }

    componentDidMount() {

        fetch(`http://192.168.99.100/api/activity/${this.props.authentication.email}`).then(response => {
            if (response.ok) {
                console.log('Colon');
                response.json().then(results => {
                    console.log(':)');
                    console.log(results);
                    this.setState({activities: results});
                    console.log(this.state.activities);
                    //this.props.router.push(`/activities/${createdRequest.id}`);
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
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link
                        to="/student/activities"><ReactCenter>Actividades</ReactCenter></Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link
                        to="/student/request"><ReactCenter>Solicitud</ReactCenter></Link></NavItem>
                </Nav>
            </div>
        );
        const activities = this.state.activities.map(activity =>

            <Col md={12}>
                <Panel header={activity.activityName}>
                    {/*<td><Link to={`/activities/${activity.id}`}>{activity.activityName}</Link></td>*/}
                    {/*<br/>*/}
                    <Col md={9}>
                        <Row>

                            <Col md={4}><p>Título:</p></Col><Col md={8}><p> {activity.activityName}</p></Col>
                            <Col md={4}><p>Descripción:</p></Col><Col md={8}><p> {activity.activityDescription}</p>
                        </Col>
                            <Col md={4}><p>Organización:</p></Col><Col md={8}>
                            <p> {activity.organization.organizationName}</p></Col>
                            <Col md={4}><p>Facilidades:</p></Col><Col md={8}><p> {activity.facility.space}</p></Col>
                            <Col md={4}><p>Estado:</p></Col><Col md={8}><p> {activity.status.description}</p></Col>

                        </Row>
                    </Col>
                    <Col md={3}>
                        <Row>
                            <Col md={12}><Link to={`/activities/${activity.id}`}><Button
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


                    <Col md={9}>
                        <ol className="breadcrumb">
                            <li/>
                            <li className="active">Actividades</li>
                        </ol>
                        {activities}
                    </Col>

                    <Col md={3}>
                        <Panel header='Actividades'>
                            <ReactCenter><Link to="/student/request"><Button bsSize="medium">Nueva Solicitud</Button></Link></ReactCenter>
                        </Panel>


                    </Col>
                </Col>
            </div>
        )
    }
}

StudentActivities.contextTypes = {
    initialState: React.PropTypes.object,
};

export default StudentActivities;