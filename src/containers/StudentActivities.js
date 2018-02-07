import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from "react-router-dom";
import {
    Button, Panel, Pager, PageItem, Col, Row, Nav, NavItem, Badge, Image,
} from 'react-bootstrap';
import ReactCenter from 'react-center';
import Icon from 'react-icons-kit';
import {iosPaw} from 'react-icons-kit/ionicons/iosPaw';
import {fileText2} from 'react-icons-kit/icomoon/fileText2';
import activitiesList from './activity_list';
import 'rc-steps/assets/index.css';
import 'rc-steps/assets/iconfont.css';
import Steps, {Step} from 'rc-steps';


class StudentActivities extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            activeKey: "1",
            activities: [],
            pendingActivities: [],
            approvedActivities: [],
            deniedActivities: [],
            pendingActivitiesPageNumber: 1,
            pendingActivitiesMaxPageNumber: 1000,
            approvedActivitiesPageNumber: 1,
            approvedActivitiesMaxPageNumber: 1000,
            deniedActivitiesPageNumber: 1,
            deniedActivitiesMaxPageNumber: 1000
        }
        this.handleSelect = this.handleSelect.bind(this);
        this.calculateMaxPageNumber = this.calculateMaxPageNumber.bind(this);
    }

    componentDidMount() {

        fetch(`http://dev.uprm.edu/dsca/v1/api/activity/${this.props.cookies.get('email')}`).then(response => {
            if (response.ok) {
                response.json().then(results => {

                    //TODO put it back
                    //this.setState({activities: results});
                    this.setState({activities: activitiesList});
                    //this.props.history.push(`/activities/${createdRequest._id}`);

                    // Pending Activities
                    const pending = this.state.activities.filter(function (obj) {
                        return ((obj.activityStatus_code == 1));
                    });

                    this.setState({pendingActivities: pending});
                    this.setState({pendingActivitiesMaxPageNumber: this.calculateMaxPageNumber(pending, 5)});


                    // Approved Activities
                    const approved = this.state.activities.filter(function (obj) {
                        return ((obj.activityStatus_code == 2));
                    });
                    this.setState({approvedActivities: approved});
                    this.setState({approvedActivitiesMaxPageNumber: this.calculateMaxPageNumber(approved, 5)});


                    // Denied Activities
                    const denied = this.state.activities.filter(function (obj) {
                        return obj.activityStatus_code == 3;
                    });
                    this.setState({deniedActivities: denied});
                    this.setState({deniedActivitiesMaxPageNumber: this.calculateMaxPageNumber(denied, 5)});
                    //this.props.history.push(`/activities/${createdRequest.id}`);
                });
            } else {
                // response.json().then(error => {
                //     this.props.showError(`Failed to add issue: ${error.message}`);
                // });
            }
        }).catch(err => {
            //this.props.showError(`Error in sending data to server: ${err.message}`);
            //TODO put it back
            //this.setState({activities: results});
            this.setState({activities: activitiesList});
            //this.props.history.push(`/activities/${createdRequest._id}`);

            // Pending Activities
            const pending = this.state.activities.filter(function (obj) {
                return ((obj.activityStatus_code == 1));
            });

            this.setState({pendingActivities: pending});
            this.setState({pendingActivitiesMaxPageNumber: this.calculateMaxPageNumber(pending, 5)});


            // Approved Activities
            const approved = this.state.activities.filter(function (obj) {
                return ((obj.activityStatus_code == 2));
            });
            this.setState({approvedActivities: approved});
            this.setState({approvedActivitiesMaxPageNumber: this.calculateMaxPageNumber(approved, 5)});


            // Denied Activities
            const denied = this.state.activities.filter(function (obj) {
                return obj.activityStatus_code == 3;
            });
            this.setState({deniedActivities: denied});
            this.setState({deniedActivitiesMaxPageNumber: this.calculateMaxPageNumber(denied, 5)});
        });

    }

    calculateMaxPageNumber(activitiesArray, pageSize) {
        let max = activitiesArray.length % pageSize === 0 ? activitiesArray.length / pageSize : Math.floor(activitiesArray.length / pageSize + 1);
        if (activitiesArray.length < pageSize) {
            max = 0;
        }
        return max;
    }

    handleSelect(event) {
        // event.preventDefault();
        console.log(event);
        this.setState({activeKey: event});
    }

    onNextClicked = () => {

        if (this.state.activeKey === '1') {
            console.log('this.state.pendingActivitiesMaxPageNumber');
            console.log(this.state.pendingActivitiesMaxPageNumber);
            this.setState({pendingActivitiesPageNumber: this.state.pendingActivitiesPageNumber + 1});
        }

        else if (this.state.activeKey === '2') {
            console.log('this.state.approvedActivitiesMaxPageNumber');
            console.log(this.state.approvedActivitiesMaxPageNumber);
            this.setState({approvedActivitiesPageNumber: this.state.approvedActivitiesPageNumber + 1});
        }
        else if (this.state.activeKey === '3') {
            console.log('this.state.deniedActivitiesMaxPageNumber');
            console.log(this.state.deniedActivitiesMaxPageNumber);
            this.setState({deniedActivitiesMaxPageNumber: this.state.deniedActivitiesMaxPageNumber + 1});
        }

    }

    onPreviousClicked = () => {

        if (this.state.activeKey === '1') {
            console.log('this.state.pendingActivitiesMaxPageNumber');
            console.log(this.state.pendingActivitiesMaxPageNumber);
            this.setState({pendingActivitiesPageNumber: this.state.pendingActivitiesPageNumber - 1});
        }

        else if (this.state.activeKey === '2') {
            console.log('this.state.approvedActivitiesMaxPageNumber');
            console.log(this.state.approvedActivitiesMaxPageNumber);
            this.setState({approvedActivitiesPageNumber: this.state.approvedActivitiesPageNumber - 1});
        }
        else if (this.state.activeKey === '3') {
            console.log('this.state.deniedActivitiesMaxPageNumber');
            console.log(this.state.deniedActivitiesMaxPageNumber);
            this.setState({deniedActivitiesMaxPageNumber: this.state.deniedActivitiesMaxPageNumber - 1});
        }
    }

    render() {
        const tabsInstance = (

            <div style={{backgroundColor: '#F8F8F8'}}>
                <Nav fluid>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/student/request"><Icon
                        icon={fileText2}
                        style={{paddingRight: "20px"}}/>Solicitud</Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/student/activities"><Icon
                        icon={iosPaw}
                        style={{paddingRight: "20px"}}/>Actividades</Link></NavItem>
                </Nav>
            </div>
        );


        let pendingActivities;

        if (this.state.pendingActivities.length === 0) {
            pendingActivities = <p style={{color: 'grey', marginLeft: '20px'}}>No hay actividades pendientes.</p>
        } else {

            const pendingPageNumber = this.state.pendingActivitiesPageNumber;

            const pageSize = 5;

            let paginatedPendingActivities = this.state.pendingActivities.slice((pendingPageNumber - 1) * pageSize, ((pendingPageNumber - 1) * pageSize) + pageSize);


            pendingActivities = paginatedPendingActivities.map(activity => {

                    // Activity Date Stuff
                    let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
                    let activityDate = new Date(activity.activityDate).toLocaleDateString('es-PR', options);

                    // Activity status workflow stuff
                    let activityStep;

                    if (activity.activityStatus_code === 1) {
                        activityStep = 3;
                    }

                    if (activity.managerStatus_code === 1) {
                        activityStep = 2;
                    }

                    if (activity.counselorStatus_code === 1) {
                        activityStep = 1;
                    }

                    return (
                        <Col md={12}>
                            <Panel>
                                <Col md={12}>
                                    <Row>
                                        <Col md={2}>
                                            <p><Image style={{height: '50px'}}
                                                      src="https://cdn0.iconfinder.com/data/icons/human-resources-and-strategy/80/Human_resource_strategy-07-512.png"
                                                      circle/></p>
                                            <p style={{marginLeft: '10px'}}>{activity.organization.organizationInitials}</p>
                                        </Col>


                                        <Col md={8}>
                                            <p><Link to={`/activities/${activity.id}`}>{activity.activityName} </Link> en
                                                <Link
                                                    to={`/admin/facilities/${activity.facility.id}`}>{activity.facility.space}</Link>
                                            </p>
                                            <p><Link
                                                to={`/admin/organizations/${activity.organization.id}`}>{activity.organization.organizationName}</Link>
                                            </p>
                                            <p> {activityDate}</p>
                                        </Col>

                                        <Col md={2}>
                                            <Link to={`/activities/${activity.id}`}><Button
                                                className="btn-info btn-large pull-right"
                                                style={{width: '100px', marginBottom: '10px'}}
                                            >Ver detalles</Button></Link>
                                        </Col>
                                    </Row>

                                    <hr/>

                                    <Steps current={activityStep}>
                                        <Step title="Solicitud"/>
                                        <Step title="Consejero" description={activity.counselorComment}/>
                                        <Step title="Facilidades" description={activity.managerComment}/>
                                        <Step title="Administrador" description={activity.staffComment}/>
                                        {/*<Step title="待运行" description={description} />*/}
                                    </Steps>

                                    {/*<Row>*/}
                                    {/*<Col md={4}><p>Estado consejero:</p></Col><Col md={8}>*/}
                                    {/*<p> {activity.counselor_status.description}</p></Col>*/}
                                    {/*</Row>*/}
                                    {/*<Row>*/}
                                    {/*<Col md={4}><p>Comentario consejero:</p></Col><Col md={8}>*/}
                                    {/*<p> {activity.counselorComment}</p></Col>*/}
                                    {/*</Row>*/}
                                    {/*<hr/>*/}

                                    {/*<Row>*/}
                                    {/*<Col md={4}><p>Estado facilidades:</p></Col><Col md={8}>*/}
                                    {/*<p> {activity.manager_status.description}</p></Col>*/}
                                    {/*</Row>*/}
                                    {/*<Row>*/}
                                    {/*<Col md={4}><p>Comentario consejero:</p></Col><Col md={8}>*/}
                                    {/*<p> {activity.managerComment}</p></Col>*/}
                                    {/*</Row>*/}
                                    {/*<hr/>*/}

                                    {/*<Row>*/}
                                    {/*<Col md={4}><p>Estado administrador:</p></Col><Col md={8}>*/}
                                    {/*<p> {activity.status.description}</p></Col>*/}
                                    {/*</Row>*/}
                                    {/*<Row>*/}
                                    {/*<Col md={4}><p>Comentario consejero:</p></Col><Col md={8}>*/}
                                    {/*<p> {activity.staffComment}</p></Col>*/}
                                    {/*</Row>*/}
                                </Col>

                            </Panel>
                        </Col>
                    )
                }
            );


        }

        let approvedActivities;

        if (this.state.approvedActivities.length === 0) {
            approvedActivities = <p style={{color: 'grey', marginLeft: '20px'}}>No hay actividades aprobadas.</p>
        } else {

            const pageSize = 5;
            const approvedPageNumber = this.state.approvedActivitiesPageNumber;
            let paginatedApprovedActivities = this.state.approvedActivities.slice((approvedPageNumber - 1) * pageSize, ((approvedPageNumber - 1) * pageSize) + pageSize);


            approvedActivities = paginatedApprovedActivities.map(activity => {

                    let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
                    let activityDate = new Date(activity.activityDate).toLocaleDateString('es-PR', options);

                    return (
                        <Col md={12}>
                            <Panel>
                                <Col md={12}>
                                    <Row>
                                        <Col md={2}>
                                            <p><Image style={{height: '50px'}}
                                                      src="https://cdn0.iconfinder.com/data/icons/human-resources-and-strategy/80/Human_resource_strategy-07-512.png"
                                                      circle/></p>
                                            <p style={{marginLeft: '10px'}}>{activity.organization.organizationInitials}</p>
                                        </Col>


                                        <Col md={8}>
                                            <p><Link to={`/activities/${activity.id}`}>{activity.activityName} </Link> en
                                                <Link
                                                    to={`/admin/facilities/${activity.facility.id}`}>{activity.facility.space}</Link>
                                            </p>
                                            <p><Link
                                                to={`/admin/organizations/${activity.organization.id}`}>{activity.organization.organizationName}</Link>
                                            </p>
                                            <p> {activityDate}</p>
                                        </Col>

                                        <Col md={2}>
                                            <Link to={`/activities/${activity.id}`}><Button
                                                className="btn-info btn-large pull-right"
                                                style={{width: '100px', marginBottom: '10px'}}
                                            >Ver detalles</Button></Link>
                                        </Col>
                                    </Row>

                                    <hr/>

                                    <Steps current={4}>
                                        <Step title="Solicitud"/>
                                        <Step title="Consejero" description={activity.counselorComment}/>
                                        <Step title="Facilidades" description={activity.managerComment}/>
                                        <Step title="Administrador" description={activity.staffComment}/>
                                        {/*<Step title="待运行" description={description} />*/}
                                    </Steps>

                                    {/*<Row>*/}
                                    {/*<Col md={4}><p>Estado consejero:</p></Col><Col md={8}>*/}
                                    {/*<p> {activity.counselor_status.description}</p></Col>*/}
                                    {/*</Row>*/}
                                    {/*<Row>*/}
                                    {/*<Col md={4}><p>Comentario consejero:</p></Col><Col md={8}>*/}
                                    {/*<p> {activity.counselorComment}</p></Col>*/}
                                    {/*</Row>*/}
                                    {/*<hr/>*/}

                                    {/*<Row>*/}
                                    {/*<Col md={4}><p>Estado facilidades:</p></Col><Col md={8}>*/}
                                    {/*<p> {activity.manager_status.description}</p></Col>*/}
                                    {/*</Row>*/}
                                    {/*<Row>*/}
                                    {/*<Col md={4}><p>Comentario consejero:</p></Col><Col md={8}>*/}
                                    {/*<p> {activity.managerComment}</p></Col>*/}
                                    {/*</Row>*/}
                                    {/*<hr/>*/}

                                    {/*<Row>*/}
                                    {/*<Col md={4}><p>Estado administrador:</p></Col><Col md={8}>*/}
                                    {/*<p> {activity.status.description}</p></Col>*/}
                                    {/*</Row>*/}
                                    {/*<Row>*/}
                                    {/*<Col md={4}><p>Comentario consejero:</p></Col><Col md={8}>*/}
                                    {/*<p> {activity.staffComment}</p></Col>*/}
                                    {/*</Row>*/}
                                </Col>

                            </Panel>
                        </Col>
                    )
                }
            );

        }

        let deniedActivities;

        if (this.state.deniedActivities.length === 0) {
            deniedActivities = <p style={{color: 'grey', marginLeft: '20px'}}>No hay actividades denegadas.</p>
        } else {

            const pageSize = 5;
            const deniedPageNumber = this.state.deniedActivitiesPageNumber;
            let paginatedDeniedActivities = this.state.deniedActivities.slice((deniedPageNumber - 1) * pageSize, ((deniedPageNumber - 1) * pageSize) + pageSize);


            deniedActivities = paginatedDeniedActivities.map(activity => {

                    let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
                    let activityDate = new Date(activity.activityDate).toLocaleDateString('es-PR', options);

                    let activityStep;

                    if (activity.activityStatus_code === 3) {
                        activityStep = 3;
                    }

                    if (activity.managerStatus_code === 3) {
                        activityStep = 2;
                    }

                    if (activity.counselorStatus_code === 3) {
                        activityStep = 1;
                    }

                    return (
                        <Col md={12}>
                            <Panel>
                                <Col md={12}>
                                    <Row>
                                        <Col md={2}>
                                            <p><Image style={{height: '50px'}}
                                                      src="https://cdn0.iconfinder.com/data/icons/human-resources-and-strategy/80/Human_resource_strategy-07-512.png"
                                                      circle/></p>
                                            <p style={{marginLeft: '10px'}}>{activity.organization.organizationInitials}</p>
                                        </Col>


                                        <Col md={8}>
                                            <p><Link to={`/activities/${activity.id}`}>{activity.activityName} </Link> en
                                                <Link
                                                    to={`/admin/facilities/${activity.facility.id}`}>{activity.facility.space}</Link>
                                            </p>
                                            <p><Link
                                                to={`/admin/organizations/${activity.organization.id}`}>{activity.organization.organizationName}</Link>
                                            </p>
                                            <p> {activityDate}</p>
                                        </Col>

                                        <Col md={2}>
                                            <Link to={`/activities/${activity.id}`}><Button
                                                className="btn-info btn-large pull-right"
                                                style={{width: '100px', marginBottom: '10px'}}
                                            >Ver detalles</Button></Link>
                                        </Col>
                                    </Row>

                                    <hr/>

                                    <Steps current={activityStep} status="error">
                                        <Step title="Solicitud"/>
                                        <Step title="Consejero" description={activity.counselorComment}/>
                                        <Step title="Facilidades" description={activity.managerComment}/>
                                        <Step title="Administrador" description={activity.staffComment}/>
                                        {/*<Step title="待运行" description={description} />*/}
                                    </Steps>

                                    {/*<Row>*/}
                                    {/*<Col md={4}><p>Estado consejero:</p></Col><Col md={8}>*/}
                                    {/*<p> {activity.counselor_status.description}</p></Col>*/}
                                    {/*</Row>*/}
                                    {/*<Row>*/}
                                    {/*<Col md={4}><p>Comentario consejero:</p></Col><Col md={8}>*/}
                                    {/*<p> {activity.counselorComment}</p></Col>*/}
                                    {/*</Row>*/}
                                    {/*<hr/>*/}

                                    {/*<Row>*/}
                                    {/*<Col md={4}><p>Estado facilidades:</p></Col><Col md={8}>*/}
                                    {/*<p> {activity.manager_status.description}</p></Col>*/}
                                    {/*</Row>*/}
                                    {/*<Row>*/}
                                    {/*<Col md={4}><p>Comentario consejero:</p></Col><Col md={8}>*/}
                                    {/*<p> {activity.managerComment}</p></Col>*/}
                                    {/*</Row>*/}
                                    {/*<hr/>*/}

                                    {/*<Row>*/}
                                    {/*<Col md={4}><p>Estado administrador:</p></Col><Col md={8}>*/}
                                    {/*<p> {activity.status.description}</p></Col>*/}
                                    {/*</Row>*/}
                                    {/*<Row>*/}
                                    {/*<Col md={4}><p>Comentario consejero:</p></Col><Col md={8}>*/}
                                    {/*<p> {activity.staffComment}</p></Col>*/}
                                    {/*</Row>*/}
                                </Col>

                            </Panel>
                        </Col>
                    )
                }
            );
        }


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
                        <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect}>

                            <NavItem eventKey="1" href="/home">Pendientes
                                {this.state.pendingActivities.length > 0 ?
                                    <Badge style={{background: 'orange', marginLeft: '10px'}}>
                                        {this.state.pendingActivities.length}</Badge> :
                                    null}
                            </NavItem>

                            <NavItem eventKey="2" title="Item">Aprobadas {this.state.approvedActivities.length > 0 ?
                                <Badge style={{background: 'green', marginLeft: '10px'}}>
                                    {this.state.approvedActivities.length}</Badge> :
                                null}</NavItem>

                            <NavItem eventKey="3" title="Item">Denegadas {this.state.deniedActivities.length > 0 ?
                                <Badge style={{background: 'green', marginLeft: '10px'}}>
                                    {this.state.deniedActivities.length}</Badge> :
                                null}</NavItem>

                        </Nav>
                        <br/>

                        {this.state.activeKey === '1' ?
                            <div>
                                <Row>
                                    {pendingActivities}
                                </Row>

                                {this.state.pendingActivities.length > 5 ?
                                    <Row>
                                        <Pager>
                                            <Row><ReactCenter>{this.state.pendingActivitiesPageNumber} &nbsp;
                                                de &nbsp;{this.state.pendingActivitiesMaxPageNumber}</ReactCenter></Row>
                                            <Row>{this.state.pendingActivitiesPageNumber > 1 ?
                                                <PageItem className="pull-left"
                                                          onClick={() => this.onPreviousClicked()}>&larr;
                                                    Anterior</PageItem>
                                                : null}
                                                {this.state.pendingActivitiesPageNumber < this.state.pendingActivitiesMaxPageNumber ?
                                                    <PageItem className="pull-right"
                                                              onClick={() => this.onNextClicked()}>Siguiente &rarr;</PageItem>
                                                    : null}</Row>
                                        </Pager>
                                    </Row>
                                    : null}

                            </div>
                            : null
                        }


                        {this.state.activeKey === '2' ?
                            <div>
                                <Row>
                                    {approvedActivities}
                                </Row>

                                {this.state.approvedActivities.length > 5 ?

                                    <Row>
                                        <Pager>

                                            <Row><ReactCenter>{this.state.approvedActivitiesPageNumber} &nbsp;
                                                de &nbsp;{this.state.approvedActivitiesMaxPageNumber}</ReactCenter></Row>
                                            <Row>{this.state.approvedActivitiesPageNumber > 1 ?
                                                <PageItem className="pull-left"
                                                          onClick={() => this.onPreviousClicked()}>&larr;
                                                    Anterior</PageItem>
                                                : null}
                                                {this.state.approvedActivitiesPageNumber < this.state.approvedActivitiesMaxPageNumber ?
                                                    <PageItem className="pull-right"
                                                              onClick={() => this.onNextClicked()}>Siguiente &rarr;</PageItem>
                                                    : null}</Row>
                                        </Pager>
                                    </Row>
                                    : null}

                            </div>
                            : null
                        }

                        {this.state.activeKey === '3' ?
                            <div>
                                <Row>
                                    {deniedActivities}
                                </Row>

                                {this.state.deniedActivities.length > 5 ?
                                    <Row>
                                        <Pager>

                                            <Row><ReactCenter>{this.state.deniedActivitiesPageNumber} &nbsp;
                                                de &nbsp;{this.state.deniedActivitiesMaxPageNumber}</ReactCenter></Row>
                                            <Row>{this.state.deniedActivitiesPageNumber > 1 ?
                                                <PageItem className="pull-left"
                                                          onClick={() => this.onPreviousClicked()}>&larr;
                                                    Anterior</PageItem>
                                                : null}
                                                {this.state.deniedActivitiesPageNumber < this.state.deniedActivitiesMaxPageNumber ?
                                                    <PageItem className="pull-right"
                                                              onClick={() => this.onNextClicked()}>Siguiente &rarr;</PageItem>
                                                    : null}</Row>
                                        </Pager>
                                    </Row>
                                    : null
                                }

                            </div>
                            : null
                        }

                    </Col>

                    <Col md={3}>
                        <Panel>
                            <ReactCenter><Link to="/request"><Button bsSize="medium">Nueva
                                Solicitud</Button></Link></ReactCenter>
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