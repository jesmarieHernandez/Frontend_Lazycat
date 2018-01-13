import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";
import "./Login.css";
import GoogleLogin from 'react-google-login';
import sampLogo from "./samp_logo.png"
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


    responseGoogle = (response) => {
        console.log(response.w3.U3);
        console.log(response);
        fetch(`http://localhost:8000/api/users/${response.w3.U3}`).then(response => {
        // fetch(`http://192.168.99.100/api/users/${response.w3.U3}`).then(response => {

            console.log("Luis, it is your fault...");
            if (response.ok) {
                response.json().then(results => {
                    // console.log('pepe :D');
                    // console.log(results);
                    // console.log(this.props);
                    // this.props.setUserRole(results.role);
                    console.log('Shit happened');
                    console.log(results);
                    console.log(this.props);
                    this.props.cookies.set('role', results.userType_code, { path: '/' });
                    this.props.cookies.set('email', results.userEmail, { path: '/' });
                    this.props.cookies.set('signedIn', 'true', { path: '/' });
                    this.props.history.push("/");
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
        return (
            <div className="container">

                <div className="Login">

                    <Col md="12">
                        <Row>
                            <ReactCenter>
                                <img src={sampLogo} style={{height: 175}}/>
                            </ReactCenter>
                        </Row>
                        <Row>
                            <ReactCenter><h3 style={{fontFamily: 'Helvetica'}}>Socio-Cultural Activities Management Platform</h3></ReactCenter>
                        </Row>
                        <Row>
                            <ReactCenter>

                                <Row></Row>
                                <GoogleLogin
                                    clientId="69967073186-499q68bjvucrhn2ke7kufru0ltb0k307.apps.googleusercontent.com"
                                    buttonText="Login"
                                    onSuccess={this.responseGoogle}
                                    hostedDomain='upr.edu'
                                    onFailure={this.responseGoogle}
                                    style={{fontFamily: 'Helvetica',height:50, width: 125}}
                                />
                            </ReactCenter>
                        </Row>
                    </Col>

                </div>
            </div>
        );
    }
}
