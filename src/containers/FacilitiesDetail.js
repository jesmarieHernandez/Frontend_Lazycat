/**
 * Created by jesma on 12/11/2017.
 */
import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link, Router, Route} from 'react-router-dom';

import {
    FormGroup, FormControl, ControlLabel, ButtonToolbar, Button,
    Panel, Form, Col, Alert, Radio, Well, MenuItem, DropdownButton, Jumbotron, Row
} from 'react-bootstrap';


const PAGE_SIZE = 10;

class FacilitiesDetail extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            facilities: {
                _id: 0,
                name: '',
                creationDate: '',
                managerName: '',
                managerEmail: '',
                building: ''
            }
        }
    }

    componentDidMount() {
        console.log(this.props);
        let id = this.props.match.params.id;
        console.log("The ID: ");
        console.log(id);

        fetch(`http://localhost:3001/api/facilities/${id}`).then(response => {
            response.json().then(data => {
                console.log(data);
                this.setState({facilities: data});
                console.log(this.state.facilities._id);
            }).catch(err => {
                console.log(err)
                //this.props.showError(`Error in sending data to server: ${err.message}`);
            });
        })
    }


    render() {

        return (
            <div className="container">

                <ol className="breadcrumb">
                    <li/>
                    <li><Link to={`/admin/`}>Admin Panel</Link></li>
                    <li><Link to={`/admin/facilities`}>Facilities</Link></li>
                    <li className="active">Facilities Details</li>
                </ol>

                <Col md={12}>

                    <Panel  header={this.state.facilities.name}>
                        {/*<td><Link to={`/activities/${this.state.activity._id}`}>{this.state.activity.requestTitle}</Link></td>*/}
                        <p>Facilities Name: {this.state.facilities.name}</p>
                        <p>Building Name: {this.state.facilities.building}</p>
                        <p>Creation Date: {this.state.facilities.creationDate}</p>
                        <p>Manager Name: {this.state.facilities.managerName}</p>
                        <p>Manager Email: {this.state.facilities.managerEmail}</p>

                        <Row>
                            <Col md="1"><Link to={`/activities/`}><Button className="btn btn-primary">Back</Button></Link></Col>
                            <Col md="1"><Button className="btn-success">Contact</Button></Col>
                            <Col md="1"><Button className="btn-warning">Edit</Button></Col>
                        </Row>


                    </Panel>
                </Col>
            </div>
        )
    }
}


FacilitiesDetail.contextTypes = {
    initialState: React.PropTypes.object,
};

export default FacilitiesDetail;