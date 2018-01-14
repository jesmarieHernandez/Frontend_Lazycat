/**
 * Created by jesma on 12/11/2017.
 */
import React, {Component} from 'react';
import 'isomorphic-fetch';
/*
 import {Link} from 'react-router';
 */
import {Link} from "react-router-dom";
import {Button, Glyphicon, Table, Panel, Pagination, Jumbotron, Col, Nav, NavItem, Row, Label, PageHeader} from 'react-bootstrap';
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import ReactCenter from 'react-center';
import Icon from 'react-icons-kit';
import {statsDots} from 'react-icons-kit/icomoon/statsDots';
import {iosPaw} from 'react-icons-kit/ionicons/iosPaw';
import {home} from 'react-icons-kit/icomoon/home';
import {fileText2} from 'react-icons-kit/icomoon/fileText2';
import {userTie} from 'react-icons-kit/icomoon/userTie';


const PAGE_SIZE = 10;

class Stats extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            activeKey: "1",
            pending: 0,
            denied: 0,
            approved: 0
        }
    }

    componentDidMount() {
        fetch('http://192.168.99.100/api/pending').then(response => {
            if (response.ok) {
                response.json().then(count => {
                    this.setState({pending: count});
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
                    this.setState({approved: count});
                });
            } else {
                // response.json().then(error => {
                //     this.props.showError(`Failed to add issue: ${error.message}`);
                // });
            }
        }).catch(err => {
            this.props.showError(`Error in sending data to server: ${err.message}`);
        });

        fetch(`http://localhost:3001/api/facilities/`).then(response => {
            if (response.ok) {
                response.json().then(results => {
                    //console.log(results);
                    this.setState({facilities: results});
                    console.log(this.state.facilities);
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
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/request"><Icon icon={fileText2}
                                                                                                   style={{paddingRight: "20px"}}/>Request</Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/activities"><Icon icon={iosPaw}
                                                                                                      style={{paddingRight: "20px"}}/>Activities</Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}> <Link to="/stats"><Icon icon={statsDots}
                                                                                                  style={{paddingRight: "20px"}}/>Statistics</Link></NavItem>
                    <NavItem> <Link to="/admin"><Icon icon={userTie}
                                                      style={{paddingRight: "20px"}}/>Admin</Link></NavItem>
                </Nav>
            </div>
        )

        let data = [
            {
                name: 'Activities',
                pending: this.state.pending,
                approved: this.state.approved,
                denied: this.state.denied
            },
        ];

        return (
            <div className="container">
                <Col md={2}>
                    {tabsInstance}
                </Col>

                <Col md={10}>
                    <ol className="breadcrumb">
                        <li/>
                        <li className="active">Stats</li>
                    </ol>

                    <Col md={12}>

                        <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect}>
                            <NavItem eventKey="1" href="/home">Representaci&oacute;n Gr&aacute;fica</NavItem>
                            <NavItem eventKey="2" title="Item">Resumen de Estad&iacute;sticas</NavItem>
                        </Nav>
                        <br/>

                        {this.state.activeKey === "1" ?
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
                            :
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
                                            <th style={{paddingTop: "20px", borderBottom: '0px'}}>Espacio</th>
                                            <th style={{paddingTop: "20px", borderBottom: '0px'}}>Diurno</th>
                                            <th style={{paddingTop: "20px", borderBottom: '0px'}}>Nocturno</th>
                                            <th colSpan="10" style={{
                                                paddingTop: "10px",
                                                paddingLeft: "200px",
                                                paddingBottom: "10px"
                                            }}>Clasificaci&oacute;n
                                            </th>
                                            <th style={{paddingTop: "20px", borderBottom: '0px'}}>TOTAL</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        <tr>
                                            <th></th>
                                            <th></th>
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
                                        <tr>
                                            <td>Centro de Estudiantes</td>
                                            <td>1</td>
                                            <td>2</td>
                                            <td>3</td>
                                            <td>4</td>
                                            <td>5</td>
                                            <td>6</td>
                                            <td>7</td>
                                            <td>8</td>
                                            <td>9</td>
                                            <td>10</td>
                                            <td>11</td>
                                            <td>12</td>
                                            <td>13</td>
                                            <td>14</td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
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