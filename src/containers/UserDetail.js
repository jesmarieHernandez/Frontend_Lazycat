/**
 * Created by jesma on 12/11/2017.
 */
import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router-dom';

import {
    FormGroup, FormControl, ControlLabel, ButtonToolbar, Button,
    Panel, Form, Col, Alert, Radio, Well, MenuItem, DropdownButton, Jumbotron, Row
} from 'react-bootstrap';


const PAGE_SIZE = 10;

class UserDetail extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            user: {
                _id: 0,
                firstName: '',
                lastName: '',
                email: '',
                role: ''
            }
        }
    }

    componentDidMount() {
        console.log('this.props.params.id: ' + this.props.match.params.id);
        let id = this.props.match.params.id;
        fetch(`/http://localhost:3001/api/users/${id}`).then(response => {
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

        return (
            <div className="container">
                <ol className="breadcrumb">
                    <li/>
                    <li><Link to={`/admin/`}>Admin Panel</Link></li>
                    <li><Link to={`/admin/users`}>Users</Link></li>
                    <li className="active">User Details</li>
                </ol>
                <Col md={2}>
                </Col>
                <Col md={12}>

                    <Panel  header={this.state.user.firstName + ' ' +  this.state.user.lastName}>
                        {/*<td><Link to={`/activities/${this.state.activity._id}`}>{this.state.activity.requestTitle}</Link></td>*/}
                        <p>Role: {this.state.user.role}</p>
                        <p>Creation Date: {this.state.user.creationDate}</p>
                        <p>Email: {this.state.user.email}</p>


                        <Row>
                            <Col md="1"><Link to={`/admin/users/`}><Button className="btn btn-primary">Back</Button></Link></Col>
                            <Col md="1"><Button className="btn-success">Contact</Button></Col>
                            <Col md="1"><Button className="btn-warning">Edit</Button></Col>
                        </Row>


                    </Panel>
                </Col>

                <Col md={2}></Col>
            </div>
        )
    }
}


UserDetail.contextTypes = {
    initialState: React.PropTypes.object,
};

export default UserDetail;