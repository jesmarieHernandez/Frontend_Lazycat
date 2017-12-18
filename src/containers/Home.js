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
import ReactCenter from "react-center"


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
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/"><ReactCenter>Home</ReactCenter></Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/request"><ReactCenter>Request</ReactCenter></Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/activities"><ReactCenter>Activities</ReactCenter></Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}> <Link to="/stats"><ReactCenter>Stats</ReactCenter></Link></NavItem>
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
