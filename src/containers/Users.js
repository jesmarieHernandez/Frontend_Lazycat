/**
 * Created by jesma on 12/11/2017.
 */
import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router-dom';
import {Button, Glyphicon, Table, Panel, Pagination, Col, Jumbotron} from 'react-bootstrap';

const PAGE_SIZE = 10;

class Users extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        fetch('/http://localhost:3001/api/users').then(response => {
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

                <Panel collapsible header={users.firstName + ' ' + users.lastName}>
                    <p>Role: {users.role}</p>
                    <p>Email: {users.email}</p>
                    <p>Creation Date: {users.creationDate}</p>
                    <Link to={`/admin/users/${users._id}`}><Button className="btn btn-primary">Details</Button></Link>
                </Panel>

            </Col>
        );
        return (
            <div className="container">
                <ol className="breadcrumb">
                    <li/>
                    <li><Link to={`/admin/`}>Admin Panel</Link></li>
                    <li className="active">Users</li>
                </ol>
                <Col md={3}>
                    <Panel header='Manage Users'>
                        <ul>
                            <li><Link to={`/admin/users/create`}>Create New User</Link></li>
                            <li>Edit Existing User</li>
                        </ul>
                    </Panel>
                </Col>
                <Col md={6}>
                    <Panel header='Users'>

                    </Panel>
                    {users}

                </Col>

            </div>
        )
    }
}

Users.contextTypes = {
    initialState: React.PropTypes.object,
};

export default Users;