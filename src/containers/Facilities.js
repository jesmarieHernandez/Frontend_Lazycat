/**
 * Created by jesma on 12/11/2017.
 */
import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router-dom';
import {Button, Glyphicon, Table, Panel, Pagination, Col, Jumbotron} from 'react-bootstrap';

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
        fetch(`http://localhost:3001/api/facilities/`).then(response => {
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

                <Panel collapsible header={facilities.name}>
                    <p><Link to={`/admin/facilities/${facilities._id}`}>{facilities.name}</Link></p>
                    <p>Building Name: {facilities.building}</p>
                    <p>Creation Date: {facilities.creationDate}</p>
                    <p>Manager Name: {facilities.managerName}</p>
                    <p>Manager Email: {facilities.managerEmail}</p>
                    <Link to={`/admin/facilities/${facilities._id}`}><Button className="btn btn-primary">Details</Button></Link>
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
                    <ol className="breadcrumb">
                        <li/>
                        <li><Link to={`/admin/`}>Admin Panel</Link></li>
                        <li className="active">Facilities</li>
                    </ol>

                    <Col md={3}>
                        <Panel collapse header='Manage Facilities'>
                            <ul>
                                <li><Link to={`/admin/facilities/create/`}>Create New Facilities</Link></li>
                                <li>Edit Existing Facilities</li>
                            </ul>
                        </Panel>
                    </Col>

                    <Col md={6}>
                        <Panel collapse header='Facilities'>

                        </Panel>
                        {facilities}
                    </Col>
                </Col>
            </div>
        )
    }
}

Facilities.contextTypes = {
    initialState: React.PropTypes.object,
};

export default Facilities;