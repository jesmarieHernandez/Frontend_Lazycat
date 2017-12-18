/**
 * Created by jesma on 12/11/2017.
 */
import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router-dom';
import ReactCenter from "react-center"

import {
    FormGroup, FormControl, ControlLabel, ButtonToolbar, Button,
    Panel, Form, Col, Alert, Radio, Well, MenuItem, DropdownButton, Jumbotron, Row, Nav, NavItem
} from 'react-bootstrap';


const PAGE_SIZE = 10;

class UserDetail extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            user: {
                _id: 0,
                email: '',
                role: ''
            }
        }
    }

    componentDidMount() {
        console.log('this.props.params.id: ' + this.props.match.params.id);
        let id = this.props.match.params.id;
        fetch(`http://localhost:3001/api/admin/users/${id}`).then(response => {
            response.json().then(data => {
                console.log(data);
                this.setState({user: data});
                console.log(this.state.user._id);
            }).catch(err => {
                console.log(err)
                //this.props.showError(`Error in sending data to server: ${err.message}`);
            });
        })
    }

    onSubmit(event) {
        event.preventDefault();
    }


    render() {
        const tabsInstance = (

            <div style={{backgroundColor: '#F8F8F8'}}>
                <Nav fluid>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link
                        to="/"><ReactCenter>Home</ReactCenter></Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link
                        to="/request"><ReactCenter>Request</ReactCenter></Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link
                        to="/activities"><ReactCenter>Activities</ReactCenter></Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}> <Link
                        to="/stats"><ReactCenter>Stats</ReactCenter></Link></NavItem>
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
                        <li><Link to={`/admin/`}>Admin Panel</Link></li>
                        <li><Link to={`/admin/users`}>Users</Link></li>
                        <li className="active">User Details</li>
                    </ol>

                    <Panel  header={this.state.user.email}>
                        {/*<td><Link to={`/activities/${this.state.activity._id}`}>{this.state.activity.requestTitle}</Link></td>*/}
                        <p>Email: {this.state.user.email}</p>
                        <p>Role: {this.state.user.role}</p>


                        <Row>
                            <Col md="1"><Link to={`/admin/users/`}><Button className="btn btn-primary">Back</Button></Link></Col>
                            <Col md="1"><Button className="btn-warning">Edit</Button></Col>
                        </Row>


                    </Panel>
                </Col>
            </div>
        )
    }
}


UserDetail.contextTypes = {
    initialState: React.PropTypes.object,
};

export default UserDetail;