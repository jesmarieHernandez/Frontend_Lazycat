/**
 * Created by jesma on 12/11/2017.
 */
import React, {Component} from 'react';
import 'isomorphic-fetch';
/*
 import {Link} from 'react-router';
 */
import {Link} from "react-router-dom";
import {
    Button,
    Glyphicon,
    Table,
    Panel,
    Pagination,
    Jumbotron,
    Col,
    Nav,
    NavItem,
    Row,
    Label,
    PageHeader,
    FormGroup,
    ControlLabel
} from 'react-bootstrap';
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import ReactCenter from 'react-center';
import Icon from 'react-icons-kit';
import {statsDots} from 'react-icons-kit/icomoon/statsDots';
import {iosPaw} from 'react-icons-kit/ionicons/iosPaw';
import {home} from 'react-icons-kit/icomoon/home';
import {fileText2} from 'react-icons-kit/icomoon/fileText2';
import {userTie} from 'react-icons-kit/icomoon/userTie';
import DatePicker from 'react-bootstrap-date-picker';

const PAGE_SIZE = 10;

class Stats extends Component {
    constructor(props, context) {
        super(props, context);

        let valueStart = new Date().toISOString();
        let valueEnd = new Date().toISOString();

        this.state = {
            activeKey: "1",
            pending: 0,
            denied: 0,
            approved: 0,
            selectedStartDate: valueStart,
            selectedEndDate: valueEnd,
            statisticsReport: [{
                building: '',
                space: '',
                Diurno: '',
                Nocturno: '',
                Academica: '',
                Arte: '',
                Civica: '',
                Deportiva: '',
                Educativa: '',
                Profesional: '',
                Venta: '',
                Religiosa: '',
                Social: '',
                Politica: '',
                Total: ''
            }],

            statisticsRequest: [{
                building: '',
                space: '',
                Diurno: '',
                Nocturno: '',
                Academica: '',
                Arte: '',
                Civica: '',
                Deportiva: '',
                Educativa: '',
                Profesional: '',
                Venta: '',
                Religiosa: '',
                Social: '',
                Politica: '',
                Total: ''
            }],

            pendingStatus: [{
                pending: ''
            }],

            approvedStatus: [{
                approved: ''
            }],

            deniedStatus: [{
                denied: ''
            }]
        }
    }

    componentDidMount() {
        fetch('http://192.168.99.100/api/pending').then(response => {
            if (response.ok) {
                response.json().then(count => {
                    this.setState({pending: count[0].pending});
                });
            } else {
                // response.json().then(error => {
                //     this.props.showError(`Failed to add issue: ${error.message}`);
                // });
            }
        }).catch(err => {
            this.props.showError(`Error in sending data to server: ${err.message}`);
        });

        fetch('http://192.168.99.100/api/denied').then(response => {
            if (response.ok) {
                response.json().then(count => {
                    console.log(count);
                    this.setState({denied: count[0].Denied});
                });
            } else {
                // response.json().then(error => {
                //     this.props.showError(`Failed to add issue: ${error.message}`);
                // });
            }
        }).catch(err => {
            this.props.showError(`Error in sending data to server: ${err.message}`);
        });

        fetch('http://192.168.99.100/api/approved').then(response => {
            if (response.ok) {
                response.json().then(count => {
                    this.setState({approved: count[0].approved});
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

    onReportSubmit = (event) => {
        event.preventDefault();

        // const form = document.forms.activityRequest;

        console.log(this.state.selectedStartDate);
        console.log(this.state.selectedEndDate);

        const dateRange = {
            startDate: this.state.selectedStartDate,
            endDate: this.state.selectedEndDate
        };

        console.log("dateRange");
        console.log(dateRange);
        fetch('http://192.168.99.100/api/report', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dateRange),
        }).then(response => {
            if (response.ok) {
                console.log(response);
                response.json().then(createdStats => {
                    // console.log('Activity request was created successfully!');
                    // console.log('Activity request ID: ' + createdRequest.id);
                    console.log(':D');
                    // console.log(this);
                    this.setState({statisticsReport: createdStats});
                    console.log(this.state.statisticsReport);
                    console.log(this.state.statisticsReport[0].building);
                    this.props.history.push(`/stats/`);

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

    onRequestSubmit = (event) => {
        event.preventDefault();

        // const form = document.forms.activityRequest;

        console.log(this.state.selectedStartDate);
        console.log(this.state.selectedEndDate);

        const dateRange = {
            startDate: this.state.selectedStartDate,
            endDate: this.state.selectedEndDate
        };

        console.log("dateRange");
        console.log(dateRange);
        fetch('http://192.168.99.100/api/request', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dateRange),
        }).then(response => {
            if (response.ok) {
                console.log(response);
                response.json().then(createdStats => {
                    // console.log('Activity request was created successfully!');
                    // console.log('Activity request ID: ' + createdRequest.id);
                    console.log(':D');
                    // console.log(this);
                    this.setState({statisticsRequest: createdStats});
                    this.props.history.push(`/stats/`);

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

    onStatusSubmit = (event) => {
        event.preventDefault();

        // const form = document.forms.activityRequest;

        console.log(this.state.selectedStartDate);
        console.log(this.state.selectedEndDate);

        const dateRange = {
            startDate: this.state.selectedStartDate,
            endDate: this.state.selectedEndDate
        };

        console.log("dateRange");
        console.log(dateRange);
        fetch('http://192.168.99.100/api/pending', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dateRange),
        }).then(response => {
            if (response.ok) {
                console.log(response);
                response.json().then(pendingStats => {
                    // console.log('Activity request was created successfully!');
                    // console.log('Activity request ID: ' + createdRequest.id);
                    console.log(':D');
                    // console.log(this);
                    this.setState({pendingStatus: pendingStats});
                    this.props.history.push(`/stats/`);

                })
            } else {
                response.json().then(error => {
                    //this.props.showError(`Failed to create request: ${error.message}`);
                });
            }
        }).catch(err => {
            //this.props.showError(`Error in sending data to server: ${err.message}`);
        });

        fetch('http://192.168.99.100/api/approved', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dateRange),
        }).then(response => {
            if (response.ok) {
                console.log(response);
                response.json().then(approvedStats => {
                    // console.log('Activity request was created successfully!');
                    // console.log('Activity request ID: ' + createdRequest.id);
                    console.log(':D');
                    // console.log(this);
                    this.setState({approvedStatus: approvedStats});
                    this.props.history.push(`/stats/`);

                })
            } else {
                response.json().then(error => {
                    //this.props.showError(`Failed to create request: ${error.message}`);
                });
            }
        }).catch(err => {
            //this.props.showError(`Error in sending data to server: ${err.message}`);
        });

        fetch('http://192.168.99.100/api/denied', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dateRange),
        }).then(response => {
            if (response.ok) {
                console.log(response);
                response.json().then(deniedStats => {
                    // console.log('Activity request was created successfully!');
                    // console.log('Activity request ID: ' + createdRequest.id);
                    console.log(':D');
                    // console.log(this);
                    this.setState({deniedStatus: deniedStats});
                    this.props.history.push(`/stats/`);

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

    handleSelect = (event) => {
        // event.preventDefault();
        console.log(event);
        this.setState({activeKey: event});
    }

    onStartDateSelected = (event) => {
        // console.log("DAAAAAATE: " + event);
        // console.log("Type Of: " + typeof(event));
        var editedDate = event.substr(0, 10);
        console.log("editedDate: " + editedDate);
        this.setState({selectedStartDate: editedDate});
    }

    onEndDateSelected = (event) => {
        // console.log("DAAAAAATE: " + event);
        // this.setState({datePicked: '2'});
        console.log("Type Of: " + typeof(event));
        var editedDate = event.substr(0, 10);
        console.log("editedDate: " + editedDate);
        this.setState({selectedEndDate: editedDate});
    }


    render() {
        const tabsInstance = (

            <div style={{backgroundColor: '#F8F8F8'}}>
                <Nav fluid>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/request"><Icon icon={fileText2}
                                                                                                   style={{paddingRight: "20px"}}/>Solicitud</Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/activities"><Icon icon={iosPaw}
                                                                                                      style={{paddingRight: "20px"}}/>Actividades</Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}> <Link to="/stats"><Icon icon={statsDots}
                                                                                                  style={{paddingRight: "20px"}}/>Estad&iacute;sticas</Link></NavItem>
                    <NavItem> <Link to="/admin"><Icon icon={userTie}
                                                      style={{paddingRight: "20px"}}/>Admin</Link></NavItem>
                </Nav>
            </div>
        )

        let data = [
            {
                name: 'Activities',
                pending: this.state.pendingStatus[0].pending,
                approved: this.state.approvedStatus[0].approved,
                denied: this.state.deniedStatus[0].denied
            },
        ];

        const tableUsed = this.state.statisticsReport.map( statsRow =>

            <tr>
                <td>{statsRow.building}</td>
                <td>{statsRow.space}</td>
                <td>{statsRow.Academica}</td>
                <td>{statsRow.Arte}</td>
                <td>{statsRow.Civica}</td>
                <td>{statsRow.Deportiva}</td>
                <td>{statsRow.Educativa}</td>
                <td>{statsRow.Profesional}</td>
                <td>{statsRow.Venta}</td>
                <td>{statsRow.Religiosa}</td>
                <td>{statsRow.Social}</td>
                <td>{statsRow.Politica}</td>
                <td>{statsRow.Total}</td>
            </tr>

        );

        const tableRequested = this.state.statisticsRequest.map(statsRow =>

            <tr>
                <td>{statsRow.building}</td>
                <td>{statsRow.space}</td>
                <td>{statsRow.Academica}</td>
                <td>{statsRow.Arte}</td>
                <td>{statsRow.Civica}</td>
                <td>{statsRow.Deportiva}</td>
                <td>{statsRow.Educativa}</td>
                <td>{statsRow.Profesional}</td>
                <td>{statsRow.Venta}</td>
                <td>{statsRow.Religiosa}</td>
                <td>{statsRow.Social}</td>
                <td>{statsRow.Politica}</td>
                <td>{statsRow.Total}</td>
            </tr>
        );

        const tableTime = this.state.statisticsReport.map(statsRow =>

            <tr>
                <td>{statsRow.building}</td>
                <td>{statsRow.space}</td>
                <td>{statsRow.Diurno}</td>
                <td>{statsRow.Nocturno}</td>
            </tr>
        );

        return (
            <div className="container">
                <Col md={2}>
                    {tabsInstance}
                </Col>

                <Col md={10}>
                    <ol className="breadcrumb">
                        <li/>
                        <li className="active">Estad&iacute;sticas</li>
                    </ol>

                    <Col md={12}>

                        <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect}>
                            <NavItem eventKey="1" href="/home">Facilidades Usadas</NavItem>
                            <NavItem eventKey="2" title="Item">Facilidades Solicitadas</NavItem>
                            <NavItem eventKey="3" title="Item">Actividades por Horario</NavItem>
                            <NavItem eventKey="4" title="Item">Representaci&oacute;n Gr&aacute;fica</NavItem>
                        </Nav>
                        <br/>
                            <FormGroup style={{paddingLeft: "300px"}}>
                                <Row>
                                    <Col md={4}>
                                    <Col componentClass={ControlLabel}>Fecha Inicial: </Col>
                                        <DatePicker id="example-datepicker" name="selectedDate"
                                                    onChange={this.onStartDateSelected}
                                                    value={this.state.selectedStartDate}
                                                    required/>
                                    </Col>

                                    <Col md={4}>
                                    <Col componentClass={ControlLabel}>Fecha Final: </Col>
                                        <DatePicker id="example-datepicker" name="selectedDate"
                                                    onChange={this.onEndDateSelected}
                                                    value={this.state.selectedEndDate}
                                                    required/>
                                    </Col>
                                </Row>
                            </FormGroup>


                        {this.state.activeKey === "1" ?
                        (<div>
                            <Row>
                                <FormGroup style={{paddingLeft: "475px"}}>
                                    <Col md={4}>
                                        <Col></Col>
                                        <Button onClick={this.onReportSubmit} bsStyle="primary"
                                                type="button">Buscar</Button>
                                    </Col>
                                </FormGroup>
                            </Row>
                            <br/>

                            <Row>
                                <Col md={12}>
                                    <Table bordered condensed striped>
                                        <thead>
                                        <tr>
                                            <ReactCenter>
                                                <th rowSpan="2" style={{paddingTop: "20px", borderBottom: '0px'}}>
                                                    Edificio
                                                </th>
                                            </ReactCenter>
                                            <th
                                                style={{
                                                    paddingTop: "20px",
                                                    borderBottom: '0px'
                                                }}>Espacio
                                            </th>
                                            <th
                                                colSpan="10"
                                                style={{
                                                    paddingTop: "10px",
                                                    paddingLeft: "200px",
                                                    paddingBottom: "10px"
                                                }}>Clasificaci&oacute;n
                                            </th>
                                            <th
                                                style={{
                                                    paddingTop: "20px",
                                                    borderBottom: '0px'
                                                }}>Total
                                            </th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        <tr>
                                            <th></th>
                                            <th></th>
                                            <th>Acad.</th>
                                            <th>Arte</th>
                                            <th>Civica</th>
                                            <th>Deport.</th>
                                            <th>Educ.</th>
                                            <th>Prof.</th>
                                            <th>Reca.</th>
                                            <th>Reli.</th>
                                            <th>Social</th>
                                            <th>Poli.</th>
                                            <th></th>
                                        </tr>
                                        {tableUsed}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </div>)
                            :
                            this.state.activeKey === "2" ?
                                (<div>
                                    <Row>
                                        <FormGroup style={{paddingLeft: "475px"}}>
                                            <Col md={4}>
                                                <Col></Col>
                                                <Button onClick={this.onRequestSubmit} bsStyle="primary"
                                                        type="button">Buscar</Button>
                                            </Col>
                                        </FormGroup>
                                    </Row>
                                    <br/>
                                <Row>
                                    <Col md={12}>
                                        <Table bordered condensed striped>
                                            <thead>
                                            <tr>
                                                <ReactCenter>
                                                    <th rowSpan="2" style={{paddingTop: "20px", borderBottom: '0px'}}>
                                                        Edificio
                                                    </th>
                                                </ReactCenter>
                                                <th
                                                    style={{
                                                        paddingTop: "20px",
                                                        borderBottom: '0px'
                                                    }}>Espacio
                                                </th>
                                                <th
                                                    colSpan="10"
                                                    style={{
                                                        paddingTop: "10px",
                                                        paddingLeft: "200px",
                                                        paddingBottom: "10px"
                                                    }}>Clasificaci&oacute;n
                                                </th>
                                                <th
                                                    style={{
                                                        paddingTop: "20px",
                                                        borderBottom: '0px'
                                                    }}>Total
                                                </th>
                                            </tr>
                                            </thead>

                                            <tbody>
                                            <tr>
                                                <th></th>
                                                <th></th>
                                                <th>Acad.</th>
                                                <th>Arte</th>
                                                <th>Civica</th>
                                                <th>Deport.</th>
                                                <th>Educ.</th>
                                                <th>Prof.</th>
                                                <th>Reca.</th>
                                                <th>Reli.</th>
                                                <th>Social</th>
                                                <th>Poli.</th>
                                                <th></th>
                                            </tr>
                                            {tableRequested}
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                                </div>)
                                :
                                this.state.activeKey === "3" ?
                                    (<div>
                                        <Row>
                                            <FormGroup style={{paddingLeft: "475px"}}>
                                                <Col md={4}>
                                                    <Col></Col>
                                                    <Button onClick={this.onReportSubmit} bsStyle="primary"
                                                            type="button">Buscar</Button>
                                                </Col>
                                            </FormGroup>
                                        </Row>
                                        <br/>
                                    <Row>
                                        <Col md={12}>
                                            <Table bordered condensed striped>
                                                <thead>
                                                <tr>
                                                    <th style={{
                                                        paddingTop: "20px",
                                                        borderBottom: '0px'
                                                    }}>Edificio
                                                    </th>
                                                    <th
                                                        style={{
                                                            paddingTop: "20px",
                                                            borderBottom: '0px'
                                                        }}>Espacio
                                                    </th>
                                                    <th
                                                        style={{
                                                            paddingTop: "20px",
                                                            borderBottom: '0px'
                                                        }}>Diurno
                                                    </th>
                                                    <th
                                                        style={{
                                                            paddingTop: "20px",
                                                            borderBottom: '0px'
                                                        }}>Nocturno
                                                    </th>
                                                </tr>
                                                </thead>

                                                <tbody>
                                                    {tableTime}
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                    </div>)
                                    :
                                    (<div>
                                        <Row>
                                            <FormGroup style={{paddingLeft: "475px"}}>
                                                <Col md={4}>
                                                    <Col></Col>
                                                    <Button onClick={this.onStatusSubmit} bsStyle="primary"
                                                            type="button">Buscar</Button>
                                                </Col>
                                            </FormGroup>
                                        </Row>
                                        <br/>
                                    <ReactCenter>
                                        <BarChart width={600} height={300} data={data}>
                                            <XAxis dataKey="name"/>
                                            <YAxis />
                                            <CartesianGrid strokeDasharray="3 3"/>
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="pending" fill="#8884d8"/>
                                            <Bar dataKey="approved" fill="#82ca9d"/>
                                            <Bar dataKey="denied" fill="#823333"/>
                                        </BarChart>
                                    </ReactCenter>
                                    </div>)
                        }
                    </Col>

                </Col>
            </div>
        )
    }
}

Stats.contextTypes = {
    initialState: React.PropTypes.object,
};

export default Stats;