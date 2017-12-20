/**
 * Created by jesma on 12/11/2017.
 */
import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router-dom';
import {Button, Row, Glyphicon, Table, Panel, Pagination, Col, Jumbotron, Nav, NavItem} from 'react-bootstrap';
import ReactCenter from "react-center"
import Icon from 'react-icons-kit';
import { statsDots } from 'react-icons-kit/icomoon/statsDots';
import { iosPaw } from 'react-icons-kit/ionicons/iosPaw';
import { home } from 'react-icons-kit/icomoon/home';
import { fileText2 } from 'react-icons-kit/icomoon/fileText2';
import { userTie } from 'react-icons-kit/icomoon/userTie';

const PAGE_SIZE = 10;

class Users extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:3001/api/admin/users').then(response => {
            if (response.ok) {
                response.json().then(results => {
                    //console.log(results);
                    this.setState({users: results});
                    console.log(this.state.users);
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
        const users = this.state.users.map(users =>

            <Col md={12}>

                <Panel collapsible header={users.email}>
                    <p>Role: {users.role}</p>
                    <p>Email: {users.email}</p>
                    {/*<p>Creation Date: {users.creationDate}</p>*/}
                    <Link to={`/admin/users/${users._id}`}><Button className="btn btn-primary">Details</Button></Link>
                </Panel>

            </Col>
        );

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
                    <Col md={9}>
                        <Col className="breadcrumb">
                            <li/>
                            <li><Link to={`/admin/`}>Admin Panel</Link></li>
                            <li className="active">Users</li>
                        </Col>

                        {users}
                    </Col>

                    <Col md={3}>
                        <Panel>
                            <ReactCenter><Link to="/admin/users/create"><Button bsSize="medium">New User</Button></Link></ReactCenter>
                        </Panel>
                    </Col>

                </Col>
            </div>
        )
    }
}

Users.contextTypes = {
    initialState: React.PropTypes.object,
};

export default Users;