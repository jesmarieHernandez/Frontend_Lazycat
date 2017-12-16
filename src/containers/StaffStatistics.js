/**
 * Created by jesma on 12/16/2017.
 */
/**
 * Created by jesma on 12/11/2017.
 */
import React, { Component } from 'react';
import 'isomorphic-fetch';
/*
 import {Link} from 'react-router';
 */
import {Link} from "react-router-dom";
import {Button, Glyphicon, Table, Panel, Pagination, Jumbotron, Col} from 'react-bootstrap';
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";

const PAGE_SIZE = 10;

class StaffStatistics extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            pending: 0,
            cancelled: 0,
            celebrated: 0
        }
    }

    componentDidMount() {
        fetch('/api/pending').then(response => {
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

        fetch('/api/cancelled').then(response => {
            if (response.ok) {
                response.json().then(count => {
                    this.setState({cancelled: count});
                });
            } else {
                // response.json().then(error => {
                //     this.props.showError(`Failed to add issue: ${error.message}`);
                // });
            }
        }).catch(err => {
            this.props.showError(`Error in sending data to server: ${err.message}`);
        });

        fetch('/api/celebrated').then(response => {
            if (response.ok) {
                response.json().then(count => {
                    this.setState({celebrated: count});
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



    render() {
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

        let data = [
            {name: 'Activities', pending: this.state.pending, celebrated: this.state.celebrated, cancelled: this.state.cancelled},
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

                    <Col md={7}>
                        <Panel  header="Monthly Activities">
                            <BarChart width={400} height={200} data={data}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="pending" fill="#8884d8" />
                                <Bar dataKey="approved" fill="#82ca9d" />
                                <Bar dataKey="denied"  fill="#823333" />
                            </BarChart>
                        </Panel>
                    </Col>

                    <Col md={5}>
                        <Panel collapse header='Filter'>
                            <p>Activity stats for the last month</p>
                        </Panel>
                    </Col>
                </Col>
            </div>
        )
    }
}

StaffStatistics.contextTypes = {
    initialState: React.PropTypes.object,
};

export default StaffStatistics;