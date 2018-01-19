/**
 * Created by jesma on 12/11/2017.
 */
import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router-dom';
import {Button, Glyphicon, Table, Panel, Pagination, Col, Jumbotron, Nav, NavItem} from 'react-bootstrap';
import ReactCenter from "react-center";
import Icon from 'react-icons-kit';
import { statsDots } from 'react-icons-kit/icomoon/statsDots';
import { iosPaw } from 'react-icons-kit/ionicons/iosPaw';
import { home } from 'react-icons-kit/icomoon/home';
import { fileText2 } from 'react-icons-kit/icomoon/fileText2';
import { userTie } from 'react-icons-kit/icomoon/userTie';


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
        // fetch(`http://localhost:3001/api/facilities/`).then(response => {
        fetch(`http://dev.uprm.edu/dsca/v1/api/facilities/`).then(response => {
            if (response.ok) {
                response.json().then(results => {
                    //console.log(results);
                    this.setState({facilities: results});
                    console.log(this.state.facilities);
                    //this.props.history.push(`/activities/${createdRequest._id}`);
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

                <Link to={`/admin/facilities/${facilities.id}`}><Panel  header={facilities.space} style={{fontFamily: 'Helvetica'}}></Panel></Link>
                {/*<Panel  header={facilities.space}>*/}
                    {/*<p><Link to={`/admin/facilities/${facilities.id}`}>{facilities.space}</Link></p>*/}
                    {/*<p>Building Name: {facilities.building}</p>*/}
                    {/*<p>Space Name: {facilities.space}</p>*/}
                    {/*<Link to={`/admin/facilities/${facilities.id}`}><Button className="btn btn-primary">Details</Button></Link>*/}
                {/*</Panel>*/}

            </Col>
        );

        const tabsInstance = (

            <div style={{backgroundColor: '#F8F8F8'}}>
                <Nav fluid>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/request"><Icon icon={fileText2} style={{paddingRight: "20px"}} />Solicitud</Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/activities"><Icon icon={iosPaw} style={{paddingRight: "20px"}}/>Actividades</Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}> <Link to="/stats"><Icon icon={statsDots} style={{paddingRight: "20px"}}/>Estad&iacute;sticas</Link></NavItem>
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
                        <li><Link to={`/admin/`}>Panel de Administraci&oacute;n</Link></li>
                        <li className="active">Facilidades</li>
                    </ol>

                    <Col md={12}>
                        {facilities}
                    </Col>
                </Col>

               {/* <Col md={3}>
                    <Panel collapse header='Manage Facilities'>
                        <ul>
                            <li><Link to={`/admin/facilities/create/`}>Create New Facilities</Link></li>
                            <li>Edit Existing Facilities</li>
                        </ul>
                    </Panel>
                </Col>*/}

                <Col md={3}>
                    <Panel>
                        <ReactCenter><Link to="/admin/facilities/create"><Button bsSize="medium">Nueva Facilidad</Button></Link></ReactCenter>
                    </Panel>
                </Col>

            </div>
        )
    }
}

Facilities.contextTypes = {
    initialState: React.PropTypes.object,
};

export default Facilities;