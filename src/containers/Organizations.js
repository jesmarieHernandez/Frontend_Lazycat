/**
 * Created by jesma on 12/11/2017.
 */
import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router-dom';
import {Button, Glyphicon, Table, Panel, Pagination, Col, Jumbotron, Nav, NavItem} from 'react-bootstrap';
import ReactCenter from "react-center"
import Icon from 'react-icons-kit';
import { statsDots } from 'react-icons-kit/icomoon/statsDots';
import { iosPaw } from 'react-icons-kit/ionicons/iosPaw';
import { home } from 'react-icons-kit/icomoon/home';
import { fileText2 } from 'react-icons-kit/icomoon/fileText2';
import { userTie } from 'react-icons-kit/icomoon/userTie';

const PAGE_SIZE = 10;

class Organizations extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            organizations: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:3001/api/admin/organizations').then(response => {
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

            <div style={{backgroundColor: '#F8F8F8'}}>
                <Nav fluid>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/request"><Icon icon={fileText2} style={{paddingRight: "20px"}} />Request</Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/activities"><Icon icon={iosPaw} style={{paddingRight: "20px"}}/>Activities</Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}> <Link to="/stats"><Icon icon={statsDots} style={{paddingRight: "20px"}}/>Statistics</Link></NavItem>
                    <NavItem> <Link to="/admin"><Icon icon={userTie} style={{paddingRight: "20px"}}/>Admin</Link></NavItem>
                </Nav>
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