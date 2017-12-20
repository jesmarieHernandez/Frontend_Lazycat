import React, {Component} from "react";
import {Link} from "react-router-dom";
import {
    PageHeader,
    ListGroup,
    ListGroupItem,
    Button,
    Glyphicon,
    Table,
    Panel,
    Pagination,
    Jumbotron,
    Col,
    Row,
    Checkbox,
    Breadcrumb,
    BreadcrumbItem,
    TabContainer,
    Tab,
    Nav,
    NavItem,
    Navbar,
    Alert
} from "react-bootstrap";
import {invokeApig} from '../libs/awsLib';
import "./Home.css";
import ReactCenter from "react-center";
import Icon from 'react-icons-kit';
import { statsDots } from 'react-icons-kit/icomoon/statsDots';
import { iosPaw } from 'react-icons-kit/ionicons/iosPaw';
import { home } from 'react-icons-kit/icomoon/home';
import { fileText2 } from 'react-icons-kit/icomoon/fileText2';
import { userTie } from 'react-icons-kit/icomoon/userTie';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            notes: []
        };
    }

     componentDidMount() {

         console.log('USER ROLE: ');
         console.log(this.props.getUserRole());
         if (!this.props.isAuthenticated) {
             this.props.history.push("/login");
             return;
         }

         if (this.props.getUserRole() === '1') {
             this.props.history.push("/");
             return;
         }

         if (this.props.getUserRole() === '2') {
             this.props.history.push("/staff/activities");
             return;
         }

         if (this.props.getUserRole() === '3') {
             this.props.history.push("/student/activities");
             return;
         }

         if (this.props.getUserRole() === '4') {
             this.props.history.push("/counselor/activities");
             return;
         }

         if (this.props.getUserRole() === '5') {
             this.props.history.push("/manager/activities");
             return;
         }
        // this.setState({isLoading: false});
    }

    gotoActivities = () => {
        this.props.history.push("/activities");
    }


    render() {
        const tabsInstance = (

            <div style={{backgroundColor: '#F8F8F8'}}>
                <Nav fluid>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/"><ReactCenter><Icon icon={home} style={{paddingRight: "45px"}} />Home</ReactCenter></Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/request"><ReactCenter> <Icon icon={fileText2} style={{paddingRight: "30px"}} />Request</ReactCenter></Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/activities"><ReactCenter><Icon icon={iosPaw} style={{paddingRight: "30px"}}/>Activities</ReactCenter></Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}> <Link to="/stats"><ReactCenter><Icon icon={statsDots} style={{paddingRight: "30px"}}/>Statistics</ReactCenter></Link></NavItem>
                    <NavItem> <Link to="/admin"><ReactCenter><Icon icon={userTie} style={{paddingRight: "45px"}}/>Admin</ReactCenter></Link></NavItem>
                    </Nav>
            </div>
        );

        return (
            <div className="container">
                    <Col md={2}>
                        {tabsInstance}
                    </Col>

                    <Col md={10}>
                        {/*<div>{activities}</div>*/}
                        <Row>
                            <Col md={12}>
                                <ol className="breadcrumb">
                                    <li/>
                                    <li className="active">Activities</li>
                                </ol>
                            </Col>
                        </Row>
                        <Row>

                            <Col md={12}>
                                <Panel header="Request Title">
                                    <td>Request Title</td>
                                    <p>Description: Venta de Hotdogs</p>
                                    <p>Organization: IEEE</p>
                                    <p>Facility: Stefani</p>
                                    <p>Status: Pending</p>
                                </Panel>
                            </Col>

                        </Row>

                    </Col>

                </div>
        );
    }
}
