import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from "react-router-dom";
import {
    Button, Glyphicon, Table, Panel, Pagination, Jumbotron, Col, Row, Checkbox, Breadcrumb,
    BreadcrumbItem
} from 'react-bootstrap';
import Select from 'react-select';
import ReactCenter from 'react-center';

class Activities extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            activities: []
        }
    }

    componentDidMount() {

        fetch('http://localhost:3001/api/activities').then(response => {
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

        fetch('http://localhost:3001/api/pending').then(response => {
            if (response.ok) {
                console.log('/api/pending! :D');
                response.json().then(results => {
                    console.log('Total pending activities: ' + results);

                    //console.log(this.state.activities);
                    //this.props.router.push(`/activities/${createdRequest._id}`);
                });
            } else {
                console.log('Unable to fetch pending activities')
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

        const activities = this.state.activities.map(activity =>

            <Col md={12}>

                <Panel header={activity.requestTitle}>
                    <td><Link to={`/activities/${activity._id}`}>{activity.requestTitle}</Link></td>
                    <p>Description: {activity.activityDescription}</p>
                    <p>Organization: {activity.organization.name}</p>
                    <p>Facility: {activity.facilities.name}</p>
                    <p>Status: {activity.status}</p>
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
                            <li className="active">Activities</li>
                        </ol>
                        {activities}
                    </Col>

                    <Col md={3}>
                        <Panel header='Activities'>
                            <ReactCenter><Link to="/request"><Button bsSize="medium">New
                                Request</Button></Link></ReactCenter>
                            <Checkbox><p>Request Title</p></Checkbox>
                            <Checkbox><p>Request Description</p></Checkbox>
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