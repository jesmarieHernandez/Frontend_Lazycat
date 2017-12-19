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
        const { cookies } = this.props;
        this.state = {
            authentication: {
                role: cookies.get('role'),
                email: cookies.get('email'),
                signedIn: cookies.get('signedIn')
            },
            cookies: cookies
        };

        console.log(this.props);
        console.log(this.state);

        console.log('cookie role: ' + cookies.get('role'));

    }


    logout()  {
        console.log('putoooo');
        this.props.cookies.remove('role', { path: '/' });
        this.props.cookies.remove('email', { path: '/' });
        this.props.cookies.remove('signedIn', { path: '/' });

        this.props.history.push("/login");
    };

    render() {
        const childProps = {
            authentication: this.state.authentication,
            cookies: this.state.cookies,
            signedIn: this.state.authentication.signedIn
        };

        return (
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



                                {this.state.cookies.get('signedIn') === 'true'
                                    ?
                                    <NavItem>
                                        {/*<GoogleLogout*/}
                                        {/*buttonText="Logout"*/}
                                        {/*onLogoutSuccess={this.logout}*/}
                                        {/*style={{fontFamily: 'Helvetica',height:25, width: 100}}*/}
                                        {/*>*/}
                                        {/*</GoogleLogout>*/}
                                        <Navbar.Brand>
                                            {this.state.authentication.email}
                                        </Navbar.Brand>
                                    </NavItem>
                                    : null}
                                {this.state.cookies.get('signedIn') === 'true'
                                    ?
                                    <NavItem onClick={this.logout.bind(this)}>
                                        {/*<GoogleLogout*/}
                                        {/*buttonText="Logout"*/}
                                        {/*onLogoutSuccess={this.logout}*/}
                                        {/*style={{fontFamily: 'Helvetica',height:25, width: 100}}*/}
                                        {/*>*/}
                                        {/*</GoogleLogout>*/}
                                        <Navbar.Brand>
                                            Logout
                                        </Navbar.Brand>
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
