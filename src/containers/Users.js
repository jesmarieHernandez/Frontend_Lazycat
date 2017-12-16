/**
 * Created by jesma on 12/11/2017.
 */
import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router-dom';
import {Button, Row, Glyphicon, Table, Panel, Pagination, Col, Jumbotron} from 'react-bootstrap';
import ReactCenter from "react-center"
const PAGE_SIZE = 10;

class Users extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:3001/api/users').then(response => {
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



                <Col md={9}>
                    <Col className="breadcrumb">
                        <li/>
                        <li><Link to={`/admin/`}>Admin Panel</Link></li>
                        <li className="active">Users</li>
                    </Col>
                    {/*<Panel header='Users'>*/}

                    {/*</Panel>*/}
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