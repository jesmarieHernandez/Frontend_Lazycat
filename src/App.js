import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {Nav, NavItem, Navbar, Col} from "react-bootstrap";
import Routes from "./Routes";
import {authUser, signOutUser} from "./libs/awsLib";
import RouteNavItem from "./components/RouteNavItem";
import "./App.css";
import {GoogleLogout} from 'react-google-login';
import sampLogo from "./containers/samp_logo.png"
import {withCookies, Cookies} from 'react-cookie';
import {instanceOf} from 'prop-types';


class App extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

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
        const { cookies } = this.props;
        // cookies.set('role', '1', { path: '/' });
        // cookies.set('email', 'jesse.villafane@upr.edu', { path: '/' });
        // cookies.set('signedIn', 'true', { path: '/' });

        console.log('cookie role: ' + cookies.get('role'));

        this.setState({authentication: {
            role: cookies.get('role'),
            email: cookies.get('email'),
            signedIn: cookies.get('signedIn')
        }});

        this.setState({
            cookies: cookies
        });

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
        console.log(this.props);
        const childProps = {
            setUserEmail: this.setUserEmail,
            setUserRole: this.setUserRole,
            userEmail: this.userEmail,
            getUserEmail: this.getUserEmail,
            isAuthenticated: this.state.isAuthenticated,
            userHasAuthenticated: this.userHasAuthenticated,
            getUserRole: this.getUserRole,
            authentication: this.state.authentication,
            cookies: this.state.cookies
        };
        console.log('The email: ');
        console.log(this.state.userEmail);
        return (
            !this.state.isAuthenticating &&
            <div >
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

                                {this.state.authentication.signedIn
                                    ?
                                    <NavItem>
                                        <GoogleLogout
                                            buttonText="Logout"
                                            onLogoutSuccess={this.logout}
                                            style={{fontFamily: 'Helvetica',height:25, width: 100}}
                                        >
                                        </GoogleLogout>
                                    </NavItem>
                                    : null}
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Col>

                <Routes childProps={childProps}/>
            </div>
        );
    }
}

export default withRouter(withCookies(App));
