/**
 * Created by jesma on 12/11/2017.
 */
import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router-dom';
import {Button, Glyphicon, Table, Panel, Pagination, Col, Jumbotron, Nav, NavItem} from 'react-bootstrap';
import Icon from 'react-icons-kit';
import { lock } from 'react-icons-kit/fa/lock';
import { home3 } from 'react-icons-kit/icomoon/home3';
import { user } from 'react-icons-kit/fa/user';
import { group } from 'react-icons-kit/fa/group';
import ReactCenter from "react-center";

class Admin extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        let styling = {
            border: 'none',
            borderRadius: '25px',
            backgroundColor: '#F8F8F8'
        };

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

                <Col md={10}>
                    <ol className="breadcrumb">
                        <li/>
                        <li className="active">Admin Panel</li>
                    </ol>

{/*                    <Col md={9}>
                        <Panel collapse header='Admin Panel'>
                            <ul>
                                <li><Link to={`/admin/organizations`}>Manage Organizations</Link></li>
                                <li ><Link to={`/admin/facilities`}>Manage Facilities</Link></li>
                                <li ><Link to={`/admin/users`}>Manage Users</Link></li>
                            </ul>
                        </Panel>
                    </Col>*/}
                    <ReactCenter>
                    <Col md={3}>
                        <Link to={`/admin/organizations`}>
                        <Panel style={styling}>
                            <ReactCenter><div style={{color: '#a8a8a8'}}><Icon size={75} icon={group}/></div></ReactCenter>
                            <ReactCenter><div>Organizations</div></ReactCenter>
                        </Panel>
                        </Link>
                    </Col>

                    <Col md={3}>
                        <Link to={`/admin/facilities`}>
                        <Panel style={styling}>
                           <ReactCenter><div style={{color: '#a8a8a8'}}><Icon size={75} icon={home3}/></div></ReactCenter>
                            <ReactCenter><div>Facilities</div></ReactCenter>
                        </Panel>
                        </Link>
                    </Col>

                    <Col md={3}>
                        <Link to={`/admin/users`}>
                        <Panel style={styling}>
                            <ReactCenter><div style={{color: '#a8a8a8'}}><Icon size={75} icon={user}/></div></ReactCenter>
                            <ReactCenter><div>Users</div></ReactCenter>
                        </Panel>
                        </Link>
                    </Col>
                    </ReactCenter>
                </Col>
            </div>
        )
    }
}

Admin.contextTypes = {
    initialState: React.PropTypes.object,
};

export default Admin;