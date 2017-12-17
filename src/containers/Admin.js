/**
 * Created by jesma on 12/11/2017.
 */
import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router-dom';
import {Button, Glyphicon, Table, Panel, Pagination, Col, Jumbotron} from 'react-bootstrap';
import Icon from 'react-icons-kit';
import { lock } from 'react-icons-kit/fa/lock';

class Admin extends Component {

    constructor(props, context) {
        super(props, context);
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

        return (
            <div className="container">
                <Col md={2}>
                    {tabsInstance}
                </Col>

                <Col md={10}>
                    <ol className="breadcrumb">
                        <li/>
                        <li className="active">Admin Panel</li>
                    </ol>

                    <Col md={9}>
                        <Panel collapse header='Admin Panel'>
                            <ul>
                                <li ><Link to={`/admin/organizations`}>Manage Organizations</Link></li>
                                <li ><Link to={`/admin/facilities`}>Manage Facilities</Link></li>
                                <li ><Link to={`/admin/users`}>Manage Users</Link></li>
                            </ul>
                        </Panel>
                    </Col>
                    <Col>
                        <div><Icon size={64} icon={lock}/></div>
                    </Col>
                </Col>
            </div>
        )
    }
}

Admin.contextTypes = {
    initialState: React.PropTypes.object,
};

export default Admin;