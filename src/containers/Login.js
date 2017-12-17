import React, {Component} from "react";
import {
    CognitoUserPool,
    AuthenticationDetails,
    CognitoUser
} from "amazon-cognito-identity-js";
import {FormGroup, FormControl, ControlLabel, Col, Row, Jumbotron} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
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

    login(email, password) {
        const userPool = new CognitoUserPool({
            UserPoolId: config.cognito.USER_POOL_ID,
            ClientId: config.cognito.APP_CLIENT_ID
        });
        const user = new CognitoUser({Username: email, Pool: userPool});
        const authenticationData = {Username: email, Password: password};
        const authenticationDetails = new AuthenticationDetails(authenticationData);

        return new Promise((resolve, reject) =>
            user.authenticateUser(authenticationDetails, {
                onSuccess: result => resolve(),
                onFailure: err => reject(err)
            })
        );
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({isLoading: true});
        this.props.userHasAuthenticated(true);

        try {
            await this.login(this.state.email, this.state.password);
            this.props.userHasAuthenticated(true);
        } catch (e) {
            //alert(e);
            this.setState({isLoading: false});
        }
    }

    responseGoogle = (response) => {
        console.log(response.w3.U3);
        console.log(response);
        this.props.userHasAuthenticated(true);
        this.props.setUserEmail(response.w3.U3);

        fetch(`http://localhost:3001/api/users/${response.w3.U3}`).then(response => {
            if (response.ok) {
                response.json().then(results => {
                    console.log('pepe :D');
                    console.log(results);
                    this.props.setUserRole(results.role);
                    // this.setState({activities: results});
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

    render() {
        return (
            <div className="container">

            <div className="Login">

                <Col md="12">
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
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

                                <br/>
                                <br/>
                    <GoogleLogin
                        clientId="760181217472-pgvc9b39vgvurcksmbi781jflfb0sts6.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.responseGoogle}
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
