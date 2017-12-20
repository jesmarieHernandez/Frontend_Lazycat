/**
 * Created by jesma on 12/11/2017.
 */
import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router-dom';
import {Button, Glyphicon, Table, Panel, Pagination, Col, Jumbotron, Nav, NavItem} from 'react-bootstrap';
import { lock } from 'react-icons-kit/fa/lock';
import { home3 } from 'react-icons-kit/icomoon/home3';
import { user } from 'react-icons-kit/fa/user';
import { group } from 'react-icons-kit/fa/group';
import ReactCenter from "react-center";
import Icon from 'react-icons-kit';
import { statsDots } from 'react-icons-kit/icomoon/statsDots';
import { iosPaw } from 'react-icons-kit/ionicons/iosPaw';
import { home } from 'react-icons-kit/icomoon/home';
import { fileText2 } from 'react-icons-kit/icomoon/fileText2';
import { userTie } from 'react-icons-kit/icomoon/userTie';

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
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/"><ReactCenter><Icon icon={home} style={{paddingRight: "45px"}} />Home</ReactCenter></Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/request"><ReactCenter> <Icon icon={fileText2} style={{paddingRight: "30px"}} />Request</ReactCenter></Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/activities"><ReactCenter><Icon icon={iosPaw} style={{paddingRight: "30px"}}/>Activities</ReactCenter></Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}> <Link to="/stats"><ReactCenter><Icon icon={statsDots} style={{paddingRight: "30px"}}/>Statistics</ReactCenter></Link></NavItem>
                    <NavItem> <Link to="/admin"><ReactCenter><Icon icon={userTie} style={{paddingRight: "45px"}}/>Admin</ReactCenter></Link></NavItem>
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