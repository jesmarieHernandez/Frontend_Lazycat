/**
 * Created by jesma on 12/11/2017.
 */
import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router-dom';
import {Button, Glyphicon, Table, Panel, Pagination, Col, Jumbotron} from 'react-bootstrap';
import ReactCenter from "react-center"

const PAGE_SIZE = 10;

class Organizations extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            organizations: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:3001/api/organizations').then(response => {
            if (response.ok) {
                response.json().then(results => {
                    this.setState({organizations: results});
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
        const organizations = this.state.organizations.map(organization =>

            <Col md={12}>
                <Panel collapsible header={organization.name}>
                    <p><Link to={`/admin/organizations/${organization._id}`}>{organization.name}</Link></p>
                    <p>Type: {organization.type}</p>
                    <p>Creation Date: {organization.creationDate}</p>
                    <p>Counselor Name: {organization.counselorName}</p>
                    <p>Counselor Email: {organization.counselorEmail}</p>
                    <Link to={`/admin/organizations/${organization._id}`}><Button className="btn btn-primary">Details</Button></Link>
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

                <Col md={7}>
                    <ol className="breadcrumb">
                    <li/>
                    <li><Link to={`/admin/`}>Admin Panel</Link></li>
                    <li className="active">Organizations</li>
                    </ol>

                    <Col md={12}>
                    {organizations}
                    </Col>
                </Col>

                <Col md={3}>
                    <Panel>
                        <ReactCenter><Link to="/admin/organizations/create"><Button bsSize="medium">New Organization</Button></Link></ReactCenter>
                    </Panel>
                </Col>
            </div>
        )
    }
}

Organizations.contextTypes = {
    initialState: React.PropTypes.object,
};

export default Organizations;