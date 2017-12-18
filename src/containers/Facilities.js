/**
 * Created by jesma on 12/11/2017.
 */
import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router-dom';
import {Button, Glyphicon, Table, Panel, Pagination, Col, Jumbotron, Nav, NavItem} from 'react-bootstrap';
import ReactCenter from "react-center";


const PAGE_SIZE = 10;

class Facilities extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            facilities: []
        }
    }

    componentDidMount() {
/*
        console.log('this.props.params.id: ' + this.props.params.id);
*/
/*
        let id = this.props.params.id;
*/
        fetch(`http://localhost:3001/api/admin/facilities/`).then(response => {
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
        console.log(this.state.facilities);
        const facilities = this.state.facilities.map(facilities =>

            <Col md={12}>

                <Panel collapsible header={facilities.space}>
                    <p><Link to={`/admin/facilities/${facilities._id}`}>{facilities.space}</Link></p>
                    <p>Building Name: {facilities.building}</p>
                    <p>Space Name: {facilities.space}</p>
                    <Link to={`/admin/facilities/${facilities._id}`}><Button className="btn btn-primary">Details</Button></Link>
                </Panel>

            </Col>
        );

        const tabsInstance = (

            <div style={{backgroundColor: '#F8F8F8'}}>
                <Nav fluid>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/"><ReactCenter>Home</ReactCenter></Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/request"><ReactCenter>Request</ReactCenter></Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/activities"><ReactCenter>Activities</ReactCenter></Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}> <Link to="/stats"><ReactCenter>Stats</ReactCenter></Link></NavItem>
                    <NavItem> <Link to="/admin"><ReactCenter>Admin</ReactCenter></Link></NavItem>
                </Nav>
            </div>
        );

        return (
            <div className="container">
                <Col md={2}>
                    {tabsInstance}
                </Col>

                <Col md={7}>
                    <ol className="breadcrumb">
                        <li/>
                        <li><Link to={`/admin/`}>Admin Panel</Link></li>
                        <li className="active">Facilities</li>
                    </ol>

                    <Col md={12}>
                        {facilities}
                    </Col>
                </Col>

               {/* <Col md={3}>
                    <Panel collapse header='Manage Facilities'>
                        <ul>
                            <li><Link to={`/admin/facilities/create/`}>Create New Facilities</Link></li>
                            <li>Edit Existing Facilities</li>
                        </ul>
                    </Panel>
                </Col>*/}

                <Col md={3}>
                    <Panel>
                        <ReactCenter><Link to="/admin/facilities/create"><Button bsSize="medium">New Facility</Button></Link></ReactCenter>
                    </Panel>
                </Col>

            </div>
        )
    }
}

Facilities.contextTypes = {
    initialState: React.PropTypes.object,
};

export default Facilities;