import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from "react-router-dom";
import {
    Button, Glyphicon, Table, Panel, Pagination, Jumbotron, Col, Row, Checkbox, Breadcrumb,
    BreadcrumbItem, Nav, Navbar, NavItem
} from 'react-bootstrap';
import Select from 'react-select';
import ReactCenter from 'react-center';
import Icon from 'react-icons-kit';
import { statsDots } from 'react-icons-kit/icomoon/statsDots';
import { iosPaw } from 'react-icons-kit/ionicons/iosPaw';
import { home } from 'react-icons-kit/icomoon/home';
import { fileText2 } from 'react-icons-kit/icomoon/fileText2';
import { userTie } from 'react-icons-kit/icomoon/userTie';

class Activities extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            activities: []
        }
    }

    componentDidMount() {

        // fetch('http://localhost:8000/api/activities').then(response => {
        fetch('http://192.168.99.100/api/activities').then(response => {
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
            //this.props.showError(`Error in sending data to server: ${err.message}`);
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
        //     //this.props.showError(`Error in sending data to server: ${err.message}`);
        // });
    }

    render() {
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

        const activities = this.state.activities.map(activity =>

            <Col md={12}>

                <Panel header={activity.activityName}>
                    <td><Link to={`/activities/${activity._id}`}>{activity.activityName}</Link></td>
                    <p>Description: {activity.activityDescription}</p>
                    <p>Organization: {activity.organization.organizationName}</p>
                    <p>Facility: {activity.facility.space}</p>
                    <p>Status: {activity.activityStatus_code}</p>
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