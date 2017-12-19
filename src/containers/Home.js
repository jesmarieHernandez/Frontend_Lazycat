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
    Alert
} from "react-bootstrap";
import {invokeApig} from '../libs/awsLib';
import "./Home.css";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            notes: []
        };
    }

    componentDidMount() {
        console.log('Yauco');
        console.log(this.props);
        // if (this.props.authentication.isSignedIn === 'false') {
        //     this.props.history.push("/login");
        // }
        //
        if (this.props.authentication.role === '1') {
            this.props.history.push("/activities");
        }
        //
        if (this.props.authentication.role === '2') {
            this.props.history.push("/staff/activities");
            return;
        }
        //
        if (this.props.authentication.role === '3') {
            this.props.history.push("/student/activities");
        }
        //
        if (this.props.authentication.role === '4') {
            this.props.history.push("/counselor/activities");
            return;
        }
        //
        if (this.props.authentication.role === '5') {
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

            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/request">Request</Link></li>
                    <li><Link to="/activities">Activities</Link></li>
                    <li><Link to="/stats">Stats</Link></li>
                    <li><Link to="/admin">Admin</Link></li>
                    <li><Link to="/counselor/activities">Counselor Activities</Link></li>
                    <li><Link to="/student/activities">Counselor Activities</Link></li>
                    <li><Link to="/student/request">Counselor Activities</Link></li>
                </ul>
            </div>
        );

        console.log('Props Nuevos');
        console.log(this.props);


        return (
            <div className="container">


                {/*{this.props.isAuthenticated ? this.renderNotes() : this.renderLander()}*/}
                {/*<Jumbotron><h3>Activities</h3></Jumbotron>*/}


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
