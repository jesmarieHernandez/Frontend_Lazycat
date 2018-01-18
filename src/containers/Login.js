import React, {Component} from "react";
import {Col, Row, Well} from "react-bootstrap";
import "./Login.css";
import GoogleLogin from 'react-google-login';
import sampLogo from "./SAMP.png"
import ReactCenter from "react-center"


export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            email: "",
            password: ""
        };
    }

    componentDidMount() {
        console.log(this.props.cookies);
        let userType_code = this.props.cookies.get('role');
        console.log(userType_code);
        if(userType_code === '1') {
            console.log('ADMIN');
            this.props.history.push("/activities");
            return;
        }
        else if (userType_code === '2') {
            console.log('STAFF');
            this.props.history.push("/staff/activities");
            return;
        }
        else if (userType_code === '3') {
            console.log('STUDENT');
            this.props.history.push("/student/activities");
            return;
        }
        else if (userType_code === '4') {
            console.log('COUNSELOR');
            this.props.history.push("/counselor/activities");
            return;
        }
        else if (userType_code === '5') {
            console.log('MANAGER');
            this.props.history.push("/manager/activities");
            return;
        }
    }

    responseGoogle = (response) => {

        fetch(`http://192.168.99.100/api/users/${response.w3.U3}`).then(response => {
        // fetch(`http://192.168.99.100/api/users/${response.w3.U3}`).then(response => {

            if (response.ok) {
                response.json().then(results => {


                    this.props.cookies.set('role', results.userType_code, { path: '/' });
                    this.props.cookies.set('email', results.userEmail, { path: '/' });
                    this.props.cookies.set('signedIn', 'true', { path: '/' });

                    if(results.userType_code === 1) {
                        console.log('ADMIN');
                        console.log(this.props.cookies.get('role'));
                        this.props.history.push("/activities");
                        return;
                    }
                    else if (results.userType_code === 2) {
                        console.log('STAFF');
                        this.props.history.push("/staff/activities");
                        return;
                    }
                    else if (results.userType_code === 3) {
                        console.log('STUDENT');
                        this.props.history.push("/student/activities");
                        return;
                    }
                    else if (results.userType_code === 4) {
                        console.log('COUNSELOR');
                        this.props.history.push("/counselor/activities");
                        return;
                    }
                    else if (results.userType_code === 5) {
                        console.log('MANAGER');
                        this.props.history.push("/manager/activities");
                        return;
                    }
                });
            } else {
                // response.json().then(error => {
                //     this.props.showError(`Failed to add issue: ${error.message}`);
                // });
                console.log('HMMMMM');
                //
                // if(results.userType_code === 1) {
                //     console.log('ADMIN');
                //     this.props.history.push("/activities");
                // }
                // else if (results.userType_code === 2) {
                //     console.log('STAFF');
                //     this.props.history.push("/activities");
                // }
                // else if (results.userType_code === 3) {
                //     console.log('STUDENT');
                //     this.props.history.push("/student/activities");
                // }
                // else if (results.userType_code === 4) {
                //     console.log('COUNSELOR');
                //     this.props.history.push("/activities");
                // }
                // else if (results.userType_code === 5) {
                //     console.log('MANAGER');
                //     this.props.history.push("/activities");
                // }
            }
        }).catch(err => {
            //this.props.showError(`Error in sending data to server: ${err.message}`);
        });
    }

    render() {
        return (
            <div className="container">

                <div className="Login" style={{position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'}}>

                    <Col md="12">
                        <Row>
                            <ReactCenter>
                                <img src={sampLogo} style={{height: 200}}/>
                            </ReactCenter>
                        </Row>
                        <Row>
                            <ReactCenter><h3 style={{fontFamily: 'Helvetica'}}>Plataforma de Actividades</h3></ReactCenter>
                            <ReactCenter><h3 style={{fontFamily: 'Helvetica'}}>Departamento de Actividades Sociales y Culturales</h3></ReactCenter>
                        </Row>
                        <Row>
                            <ReactCenter>
                                <GoogleLogin
                                    clientId="69967073186-499q68bjvucrhn2ke7kufru0ltb0k307.apps.googleusercontent.com"
                                    buttonText="Acceder"
                                    onSuccess={this.responseGoogle}
                                    hostedDomain='upr.edu'
                                    onFailure={this.responseGoogle}
                                    style={{fontFamily: 'Helvetica',height:50, width: 125, marginTop: '50px'}}
                                />
                            </ReactCenter>
                        </Row>

                    </Col>

                </div>
            </div>
        );
    }
}
