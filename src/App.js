import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {Nav, NavItem, Navbar, Col} from "react-bootstrap";
import Routes from "./Routes";
import {authUser, signOutUser} from "./libs/awsLib";
import RouteNavItem from "./components/RouteNavItem";
import "./App.css";
import {GoogleLogout} from 'react-google-login';
import sampLogo from "./containers/samp_logo.png"


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userEmail: "",
            userRole: "",
            isAuthenticated: false,
            isAuthenticating: true
        };
    }

    async componentDidMount() {
        // try {
        //   if (await authUser()) {
        //     this.userHasAuthenticated(true);
        //   }
        // }
        // catch(e) {
        //   alert(e);
        // }
        this.userHasAuthenticated(false);


        this.setState({isAuthenticating: false});
    }

    userHasAuthenticated = authenticated => {
        this.setState({isAuthenticated: authenticated});
    }

    handleLogout = event => {
        // signOutUser();

        this.userHasAuthenticated(false);
        this.props.history.push("/login");
    }


    logout = () => {
        console.log('Hello');
        this.userHasAuthenticated(false);
        this.props.history.push("/login");
    }

    setUserEmail = userEmail => {
        this.setState({userEmail: userEmail})
    }

    getUserEmail = () => {
        return this.state.userEmail
    }

    getUserRole = () => {
        return this.state.userRole
    }

    setUserRole = userRole => {
        this.setState({userRole: userRole})
    }

    render() {
        const childProps = {
            setUserEmail: this.setUserEmail,
            setUserRole: this.setUserRole,
            userEmail: this.userEmail,
            getUserEmail: this.getUserEmail,
            isAuthenticated: this.state.isAuthenticated,
            userHasAuthenticated: this.userHasAuthenticated,
            getUserRole: this.getUserRole,
        };
        console.log('The email: ');
        console.log(this.state.userEmail);
        return (
            !this.state.isAuthenticating &&
            <div className="App container">
                <div className="container">
                    <Col md={12}>
                        <Navbar fluid collapseOnSelect>
                            <Navbar.Header>
                                <Navbar.Brand>
                                    <Link to="/"><img src={sampLogo} style={{height: 30}} /></Link>
                                </Navbar.Brand>
                                <Navbar.Toggle/>
                            </Navbar.Header>
                            <Navbar.Collapse>
                                <Nav pullRight>

                                    {this.state.isAuthenticated
                                        ?

                                            <NavItem>
                                                <GoogleLogout
                                                    buttonText="Logout"
                                                    onLogoutSuccess={this.logout}
                                                    style={{width: 100}}

                                                >
                                                </GoogleLogout>

                                            </NavItem>
                                        : <div><NavItem>                                <Navbar.Brand>
                                            Login</Navbar.Brand></NavItem></div>}
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </Col>
                </div>

                <Routes childProps={childProps}/>
            </div>
        );
    }
}

export default withRouter(App);
