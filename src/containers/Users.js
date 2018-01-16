/**
 * Created by jesma on 12/11/2017.
 */
import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router-dom';
import {Button, Row, Glyphicon, Table, Panel, Pagination, Col, Jumbotron, Nav, NavItem, NavDropdown, MenuItem, Container } from 'react-bootstrap';
import ReactCenter from "react-center"
import Icon from 'react-icons-kit';
import {statsDots} from 'react-icons-kit/icomoon/statsDots';
import {iosPaw} from 'react-icons-kit/ionicons/iosPaw';
import {home} from 'react-icons-kit/icomoon/home';
import {fileText2} from 'react-icons-kit/icomoon/fileText2';
import {userTie} from 'react-icons-kit/icomoon/userTie';


class Users extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            activeKey: "1",
            users: {
                administrators: [

                    {
                        staff: [
                            {
                                staffName: ''
                            }
                        ]
                    }
                ],
                staff: [

                    {
                        staff: [
                            {
                                staffName: ''
                            }
                        ]
                    }
                ],
                counselors: [

                    {
                        counselors: [
                            {
                                counselorName: '',
                                counselorEmail: ''
                            }
                        ]
                    }
                ],
                managers: [

                    {
                        managers: [
                            {
                                managerName: ''
                            }
                        ]
                    }
                ],
                students: [

                    {
                        students: [
                            {
                                studentName: ''
                            }
                        ]
                    }
                ]
            },
            administrators: [],
            staff: [],
            students: [],
            counselors: [],
            managers: []
        }

        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
        // fetch('http://192.168.99.100/api/users').then(response => {
        fetch('http://localhost:8000/api/users').then(response => {
            if (response.ok) {
                response.json().then(results => {
                    //console.log(results);
                    this.setState({users: results});
                    this.setState({counselors: results.counselors});

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

    handleSelect(event) {
        // event.preventDefault();
        console.log(event);
        this.setState({activeKey: event});
    }

    render() {

        let styling = {
            border: 'none',
            borderRadius: '25px',
            backgroundColor: '#F8F8F8'
        };
        // const users = this.state.users.map(users =>
        //
        //     <Col md={12}>
        //
        //         <Panel collapsible header={users.email}>
        //             <p>Role: {users.role}</p>
        //             <p>Email: {users.email}</p>
        //             {/*<p>Creation Date: {users.creationDate}</p>*/}
        //             <Link to={`/admin/users/${users._id}`}><Button className="btn btn-primary">Details</Button></Link>
        //         </Panel>
        //
        //     </Col>
        // );
        //

        // console.log('Los putos administrators: ');
        // console.log(this.state.users.administrators);
        // console.log(this.state.users.administrators[0].staff);
        const administrators = this.state.users.administrators.map(administrator => {

                const userRoute = '/admin/users/'+administrator.staff[0].staffEmail;
                return  (
                <Col md={12}>

                    <Link to={userRoute} style={{border: 'none'}}><Panel header={administrator.staff[0].staffName}>
                        {/*<p>Role: {administrators.role}</p>*/}
                        {/*<p>Email: {administrators.userEmail}</p>*/}
                        {/*<p>Creation Date: {users.creationDate}</p>*/}
                        {/*<Link to={`/admin/users/${administrators.id}`}><Button className="btn btn-primary">Details</Button></Link>*/}
                    </Panel></Link>

                </Col>
                )
            }
        );



        const staff = this.state.users.staff.map(staff => {

            const userRoute = '/admin/users/'+staff.staff[0].staffEmail;
            return  (
            <Col md={12}>

                <Link to={userRoute} style={{border: 'none'}}><Panel  header={staff.staff[0].staffName}>
                    {/*<p>Role: {administrators.role}</p>*/}
                    {/*<p>Email: {administrators.userEmail}</p>*/}
                    {/*<p>Creation Date: {users.creationDate}</p>*/}
                    {/*<Link to={`/admin/users/${administrators.id}`}><Button className="btn btn-primary">Details</Button></Link>*/}
                </Panel></Link>

            </Col>)
        }
        );

        const students = this.state.users.students.map(student => {

            const userRoute = '/admin/users/'+student.students[0].studentEmail;
            return  (
            <Col md={12}>

                <Link to={userRoute}><Panel header={student.students[0].studentName}>
                    {/*<p>Role: Student</p>*/}
                    {/*<p>Email: {student.userEmail}</p>*/}
                    {/*/!*<p>Creation Date: {users.creationDate}</p>*!/*/}
                   {/*<Button className="btn btn-primary">Details</Button>*/}
                </Panel></Link>

            </Col>
            )
            }
        );

        const counselors = this.state.counselors.map(counselor => {

            console.log('counselors');
            console.log(this.state.counselors);
            // const userRoute = '/admin/users/';
            const userRoute = '/admin/users/'+counselor.counselorEmail;

            if (counselor.counselors[0] !== null) {
                return  (
                    <Col md={12}>

                        <Link to={userRoute} style={{border: 'none'}}><Panel  header={counselor.counselors[0].counselorName}>
                            {/*<p>Role: {administrators.role}</p>*/}
                            {/*<p>Email: {administrators.userEmail}</p>*/}
                            {/*<p>Creation Date: {users.creationDate}</p>*/}
                            {/*<Link to={`/admin/users/${administrators.id}`}><Button className="btn btn-primary">Details</Button></Link>*/}
                        </Panel></Link>

                    </Col> )

            } else {
                return null;
            }
            }



        );

        const managers = this.state.users.managers.map(manager => {

                const userRoute = '/admin/users/' + manager.managers[0].managerEmail;
                return (

                    <Col md={12}>

                        <Link to={userRoute} style={{border: 'none'}}><Panel header={manager.managers[0].managerName}>
                            {/*<p>Role: {administrators.role}</p>*/}
                            {/*<p>Email: {administrators.userEmail}</p>*/}
                            {/*<p>Creation Date: {users.creationDate}</p>*/}
                            {/*<Link to={`/admin/users/${administrators.id}`}><Button className="btn btn-primary">Details</Button></Link>*/}
                        </Panel></Link>

                    </Col>
                )
            }
        );

        //console.log(this.state.users);
        const tabsInstance = (

            <div style={{backgroundColor: '#F8F8F8'}}>
                <Nav fluid>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/request"><Icon icon={fileText2}
                                                                                                   style={{paddingRight: "20px"}}/>Request</Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/activities"><Icon icon={iosPaw}
                                                                                                      style={{paddingRight: "20px"}}/>Activities</Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}> <Link to="/stats"><Icon icon={statsDots}
                                                                                                  style={{paddingRight: "20px"}}/>Statistics</Link></NavItem>
                    <NavItem> <Link to="/admin"><Icon icon={userTie}
                                                      style={{paddingRight: "20px"}}/>Admin</Link></NavItem>
                </Nav>
            </div>
        );


        return (
            <div className="container">

                <Col md={2}>
                    {tabsInstance}
                </Col>

                <Col md={7}>
                    {/*<Col md={9}>*/}
                        <Col className="breadcrumb">
                            <li/>
                            <li><Link to={`/admin/`}>Admin Panel</Link></li>
                            <li className="active">Users</li>
                        </Col>
                        <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect}>
                            <NavItem eventKey="1" href="/home">Administradores</NavItem>
                            <NavItem eventKey="2" title="Item">Staff</NavItem>
                            <NavItem eventKey="3" title="Item">Estudiantes</NavItem>
                            <NavItem eventKey="4" title="Item">Consejeros</NavItem>
                            <NavItem eventKey="5" title="Item">Facilidades</NavItem>
                        </Nav>
                        <br/>

                        {this.state.activeKey === '1' ? administrators : null}
                        {this.state.activeKey === '2' ? staff : null}
                        {this.state.activeKey === '3' ? students : null}
                        {this.state.activeKey === '4' ? counselors : null}
                        {this.state.activeKey === '5' ? managers : null}


                        <ReactCenter>

                        </ReactCenter>

                    {/*</Col>*/}



                </Col>
                <Col md={3}>
                    <Panel>
                        <ReactCenter><Link to="/admin/users/create"><Button bsSize="medium">New User</Button></Link></ReactCenter>
                    </Panel>
                </Col>
            </div>
        )
    }
}

Users.contextTypes = {
    initialState: React.PropTypes.object,
};

export default Users;