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


class Organizations extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            organizations: []
        }
    }

    componentDidMount() {
        // fetch('http://dev.uprm.edu/dsca/v1/api/organizations').then(response => {

        console.log('componentDidMount');
        fetch('http://dev.uprm.edu/dsca/v1/api/organizations').then(response => {
            if (response.ok) {
                response.json().then(results => {
                    console.log('http://dev.uprm.edu/dsca/v1/api/organizations');
                    console.log(results);
                    this.setState({organizations: results});
                });
            } else {
                // response.json().then(error => {
                //     this.props.showError(`Failed to add issue: ${error.message}`);
                // });
            }
        }).catch(err => {
            //this.props.showError(`Error in sending data to server: ${err.message}`);
        });
    }

    render() {
        const organizations = this.state.organizations.map(organization =>

            <Col md={12}>
                <Link to={`/admin/organizations/${organization.id}`}><Panel  header={organization.organizationName} style={{fontFamily: 'Helvetica'}}>
                    {/*<p><Link to={`/admin/organizations/${organization.id}`}>{organization.organizationName}</Link></p>*/}
                    {/*<p>Type: {organization.description}</p>*/}
                    {/*<p>Creation Date: {organization.created_at}</p>*/}
                    {/*<p>Counselor Name: {organization.counselorName}</p>*/}
                    {/*<p>Counselor Email: {organization.counselorEmail}</p>*/}
                    {/*<Link to={`/admin/organizations/${organization._id}`}><Button className="btn btn-primary">Details</Button></Link>*/}
                </Panel>
                </Link>
            </Col>
        );


        const tabsInstance = (

            <div style={{backgroundColor: '#F8F8F8'}}>
                <Nav fluid>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/request"><Icon icon={fileText2} style={{paddingRight: "20px"}} />Solicitud</Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/activities"><Icon icon={iosPaw} style={{paddingRight: "20px"}}/>Actividades</Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}> <Link to="/stats"><Icon icon={statsDots} style={{paddingRight: "20px"}}/>Estadísticas</Link></NavItem>
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
                    <li><Link to={`/admin/`}>Panel de administración</Link></li>
                    <li className="active">Organizaciones</li>
                    </ol>

                    <Col md={12}>
                    {organizations}
                    </Col>
                </Col>

                <Col md={3}>
                    <Panel>
                        <ReactCenter><Link to="/admin/organizations/create"><Button bsSize="medium">Nueva organización</Button></Link></ReactCenter>
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