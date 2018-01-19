import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from "react-router-dom";
import {

    Button, Panel, Pager, PageItem, Col, Row, Nav, NavItem, Badge

} from 'react-bootstrap';
import ReactCenter from 'react-center';
import Icon from 'react-icons-kit';
import {statsDots} from 'react-icons-kit/icomoon/statsDots';
import {iosPaw} from 'react-icons-kit/ionicons/iosPaw';
import {fileText2} from 'react-icons-kit/icomoon/fileText2';
import {userTie} from 'react-icons-kit/icomoon/userTie';

class Activities extends Component {


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

    }

    componentDidMount() {

        // fetch('http://192.168.99.100/api/activities').then(response => {
        fetch('http://192.168.99.100/api/activities').then(response => {
            if (response.ok) {
                response.json().then(results => {
                    this.setState({activities: results});
                    //this.props.router.push(`/activities/${createdRequest._id}`);

                    const pending = this.state.activities.filter(function (obj) {
                        return obj.status.code == 1;
                    });


                    console.log('Pending length: ');
                    console.log(pending.length / 5);

                    const max = pending.length % 2 === 0 ? pending.length / 5 : Math.floor(pending.length / 5 + 1);

                    this.setState({pendingActivitiesMaxPageNumber: max});

                    console.log('Cuantas actividades hay?');
                    console.log(pending.length);

                    this.setState({pendingActivities: pending});

                    const approved = this.state.activities.filter(function (obj) {
                        return obj.status.code == 2;
                    });

                    this.setState({approvedActivities: approved});

                    const denied = this.state.activities.filter(function (obj) {
                        return obj.status.code == 3;
                    });

                    this.setState({deniedActivities: denied});

                    console.log(this.state.activities);

                });
            } else {
                // response.json().then(error => {
                //     this.props.showError(`Failed to add issue: ${error.message}`);
                // });
            }
        }).catch(err => {
            //this.props.showError(`Error in sending data to server: ${err.message}`);
        });
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
                            <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/request"><Icon
                                icon={fileText2}
                                style={{paddingRight: "20px"}}/>Solicitud</Link></NavItem>
                            <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/activities"><Icon
                                icon={iosPaw}
                                style={{paddingRight: "20px"}}/>Actividades</Link></NavItem>
                            <NavItem style={{borderBottom: '1px solid #ECECEC'}}> <Link to="/stats"><Icon
                                icon={statsDots}
                                style={{paddingRight: "20px"}}/>Estad&iacute;sticas</Link></NavItem>
                            <NavItem> <Link to="/admin"><Icon icon={userTie}
                                                              style={{paddingRight: "20px"}}/>Admin</Link></NavItem>
                        </Nav>
                    </div>
                    );


        let pendingActivities;

        if (this.state.pendingActivities.length === 0) {
            pendingActivities = <p style={{color: 'grey', marginLeft: '20px'}}>No hay actividades pendientes.</p>
        } else {

            const pageNumber = this.state.pendingActivitiesPageNumber;
            console.log('Page Number');
            console.log(pageNumber);


            const pageSize = 5;

            let paginatedPendingActivities = this.state.pendingActivities.slice((pageNumber - 1) * pageSize, ((pageNumber - 1) * pageSize) + pageSize);

            console.log('First Arg');
            console.log((pageNumber - 1) * pageSize);


            console.log('Second Arg');
            console.log(((pageNumber - 1) * pageSize) + pageSize);

            console.log('Paginated pending activities');
            console.log(paginatedPendingActivities);

            pendingActivities = paginatedPendingActivities.map(activity =>

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
                                {/*<Col md={4}><p>Estado:</p></Col><Col md={8}><p> {activity.status.description}</p></Col>*/}

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
        }

        let approvedActivities;

        if (this.state.approvedActivities.length === 0) {
            approvedActivities = <p style={{color: 'grey', marginLeft: '20px'}}>No hay actividades aprovadas.</p>
        } else {

            approvedActivities = this.state.approvedActivities.map(activity =>

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
                                {/*<Col md={4}><p>Estado:</p></Col><Col md={8}><p> {activity.status.description}</p></Col>*/}

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

        }


        let deniedActivities;

        if (this.state.deniedActivities.length === 0) {
            deniedActivities = <p style={{color: 'grey', marginLeft: '20px'}}>No hay actividades denegadas.</p>
        } else {

            deniedActivities = this.state.deniedActivities.map(activity =>

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
                                {/*<Col md={4}><p>Estado:</p></Col><Col md={8}><p> {activity.status.description}</p></Col>*/}

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
        }

        console.log(this.state.activities);

        console.log('this.state.pendingActivitiesMaxPageNumber');
        console.log(this.state.pendingActivitiesMaxPageNumber);

        console.log('this.state.pendingActivitiesPageNumber');
        console.log(this.state.pendingActivitiesPageNumber);


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
                                    <Badge style={{background: 'red', marginLeft: '10px'}}>
                                        {this.state.pendingActivities.length}</Badge> :
                                    null}
                            </NavItem>

                            <NavItem eventKey="2" title="Item">Aprobadas </NavItem>
                            <NavItem eventKey="3" title="Item">Denegadas </NavItem>
                        </Nav>
                        <br/>
                        {/*{activities}*/}

                        {this.state.activeKey === '1' ?
                            <div>
                                <Row>
                                    {pendingActivities}
                                </Row>

                                {this.state.pendingActivities.length > 0 ?
                                <Row>
                                    <Pager>

                                        <Row><ReactCenter>{this.state.pendingActivitiesPageNumber} &nbsp;
                                            de {this.state.pendingActivitiesMaxPageNumber}</ReactCenter></Row>
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
                                    : null }

                            </div>
                            : null
                        }

                        {this.state.activeKey === '2' ?
                            <div>
                                <Row>
                                    {approvedActivities}
                                </Row>

                                {this.state.approvedActivities.length > 0 ?

                                <Row>
                                    <Pager>

                                        <Row><ReactCenter>{this.state.approvedActivitiesPageNumber} &nbsp;
                                            de {this.state.approvedActivitiesMaxPageNumber}</ReactCenter></Row>
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
                                    : null }

                            </div>
                            : null
                        }

                        {this.state.activeKey === '3' ?
                            <div>
                                <Row>
                                    {deniedActivities}
                                </Row>

                                {this.state.deniedActivities.length > 0 ?
                                <Row>
                                    <Pager>

                                        <Row><ReactCenter>{this.state.deniedActivitiesPageNumber} &nbsp;
                                            de {this.state.deniedActivitiesMaxPageNumber}</ReactCenter></Row>
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
                            {/*<Checkbox><p>Request Title</p></Checkbox>*/}
                            {/*<Checkbox><p>Request Description</p></Checkbox>*/}
                        </Panel>


                    </Col>
                </Col>
            </div>
        )
    }
}

Activities.contextTypes = {
    initialState: React.PropTypes.object,
};

export default Activities;