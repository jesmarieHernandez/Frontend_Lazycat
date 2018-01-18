import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from "react-router-dom";
import Icon from 'react-icons-kit';
import {iosPaw} from 'react-icons-kit/ionicons/iosPaw';
import {
    Button, Glyphicon, Table, Panel, Pagination, Jumbotron, Col, Row, Checkbox, Breadcrumb,
    BreadcrumbItem, Nav, NavItem, Badge
} from 'react-bootstrap';
import Select from 'react-select';
import ReactCenter from "react-center"


class CounselorActivities extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            activeKey: "1",
            activities: [],
            pendingActivities: [],
            approvedActivities: [],
            deniedActivities: []
        }
    }

    componentDidMount() {

        fetch(`http://192.168.99.100/api/activity/${this.props.authentication.email}`).then(response => {
            if (response.ok) {
                response.json().then(results => {
                    this.setState({activities: results});
                    const pending = this.state.activities.filter(function (obj) {
                        return obj.status.code == 1;
                    });

                    this.setState({pendingActivities: pending});

                    const approved = this.state.activities.filter(function (obj) {
                        return obj.status.code == 2;
                    });

                    this.setState({approvedActivities: approved});

                    const denied = this.state.activities.filter(function (obj) {
                        return obj.status.code == 3;
                    });

                    this.setState({deniedActivities: denied});
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
    }

    handleSelect = (event) => {
        // event.preventDefault();
        console.log(event);
        this.setState({activeKey: event});
    }

    render() {
        const tabsInstance = (

            <div style={{backgroundColor: '#F8F8F8'}}>
                <Nav fluid>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/counselor/activities"><Icon
                        icon={iosPaw}
                        style={{paddingRight: "20px"}}/>Actividades</Link></NavItem>
                </Nav>
            </div>
        );

        let pendingActivities;

        if (this.state.pendingActivities.length === 0) {
            pendingActivities = <p style={{color: 'grey', marginLeft: '20px'}}>No hay actividades pendientes.</p>
        } else {


            pendingActivities = this.state.pendingActivities.map(activity =>
                <Col md={12}>
                    <Link to={`/counselor/activities/${activity.id}`}><Panel header={activity.activityName}>
                        <Col md={6}>
                            <Row>

                                <Col md={6}><p>Título:</p></Col><Col md={6}><p> {activity.activityName}</p></Col>
                                <Col md={6}><p>Descripción:</p></Col><Col md={6}><p> {activity.activityDescription}</p>
                            </Col>
                                <Col md={6}><p>Organización:</p></Col><Col md={6}>
                                <p> {activity.organization.organizationName}</p></Col>
                                <Col md={6}><p>Facilidades:</p></Col><Col md={6}><p> {activity.facility.space}</p></Col>
                                <Col md={6}><p>Estado:</p></Col><Col md={6}><p> {activity.status.description}</p></Col>

                            </Row>
                        </Col>
                        <Col md={6}>
                            <Row>
                                <Col md={12}><Link to={`/counselor/activities/${activity.id}`}><Button
                                    className="btn-info btn-large pull-right"
                                    style={{width: '100px', marginBottom: '10px'}}
                                >Detalles</Button></Link> </Col>
                            </Row>
                        </Col>
                    </Panel>
                    </Link>
                </Col>
            );
        }

        let approvedActivities = this.state.approvedActivities.map(activity =>
            <Col md={12}>
                <Link to={`/counselor/activities/${activity.id}`}><Panel header={activity.activityName}>
                    <Col md={6}>
                        <Row>

                            <Col md={6}><p>Título:</p></Col><Col md={6}><p> {activity.activityName}</p></Col>
                            <Col md={6}><p>Descripción:</p></Col><Col md={6}><p> {activity.activityDescription}</p>
                        </Col>
                            <Col md={6}><p>Organización:</p></Col><Col md={6}>
                            <p> {activity.organization.organizationName}</p></Col>
                            <Col md={6}><p>Facilidades:</p></Col><Col md={6}><p> {activity.facility.space}</p></Col>
                            <Col md={6}><p>Estado:</p></Col><Col md={6}><p> {activity.status.description}</p></Col>

                        </Row>
                    </Col>
                    <Col md={6}>
                        <Row>
                            <Col md={12}><Link to={`/counselor/activities/${activity.id}`}><Button
                                className="btn-info btn-large pull-right"
                                style={{width: '100px', marginBottom: '10px'}}
                            >Detalles</Button></Link> </Col>
                        </Row>
                    </Col>
                </Panel>
                </Link>
            </Col>
        );

        let deniedActivities = this.state.deniedActivities.map(activity =>
            <Col md={12}>
                <Link to={`/counselor/activities/${activity.id}`}><Panel header={activity.activityName}>
                    <Col md={6}>
                        <Row>

                            <Col md={6}><p>Título:</p></Col><Col md={6}><p> {activity.activityName}</p></Col>
                            <Col md={6}><p>Descripción:</p></Col><Col md={6}><p> {activity.activityDescription}</p>
                        </Col>
                            <Col md={6}><p>Organización:</p></Col><Col md={6}>
                            <p> {activity.organization.organizationName}</p></Col>
                            <Col md={6}><p>Facilidades:</p></Col><Col md={6}><p> {activity.facility.space}</p></Col>
                            <Col md={6}><p>Estado:</p></Col><Col md={6}><p> {activity.status.description}</p></Col>

                        </Row>
                    </Col>
                    <Col md={6}>
                        <Row>
                            <Col md={12}><Link to={`/counselor/activities/${activity.id}`}><Button
                                className="btn-info btn-large pull-right"
                                style={{width: '100px', marginBottom: '10px'}}
                            >Detalles</Button></Link> </Col>
                        </Row>
                    </Col>
                </Panel>
                </Link>
            </Col>
        );

        return (
            <div className="container">
                <Col md={2}>
                    {tabsInstance}
                </Col>

                <Col md={10}>
                    <Col md={12}>
                        <ol className="breadcrumb">
                            <li/>
                            <li className="active">Actividades</li>
                        </ol>

                        <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect}>
                            <NavItem eventKey="1" href="/home">Pendientes
                                {this.state.pendingActivities.length > 0 ?
                                    <Badge style={{background: 'red', marginLeft: '10px'}}>
                                        {this.state.pendingActivities.length}</Badge> :
                                    null}
                            </NavItem>

                            <NavItem eventKey="2" title="Item">Aprobadas </NavItem>
                            <NavItem eventKey="3" title="Item">Denegadas </NavItem>
                        </Nav>
                        <br/>
                        {/*{activities}*/}

                        {this.state.activeKey === '1' ? pendingActivities : null}
                        {this.state.activeKey === '2' ? approvedActivities : null}
                        {this.state.activeKey === '3' ? deniedActivities : null}

                        {/*<div>{activities}</div>*/}
                    </Col>

                </Col>
            </div>
        )
    }
}

CounselorActivities.contextTypes = {
    initialState: React.PropTypes.object,
};

export default CounselorActivities;