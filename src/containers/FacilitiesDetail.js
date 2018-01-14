/**
 * Created by jesma on 12/11/2017.
 */
import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link, Router, Route} from 'react-router-dom';
import Icon from 'react-icons-kit';
import {statsDots} from 'react-icons-kit/icomoon/statsDots';
import {iosPaw} from 'react-icons-kit/ionicons/iosPaw';
import {home} from 'react-icons-kit/icomoon/home';
import {fileText2} from 'react-icons-kit/icomoon/fileText2';
import {userTie} from 'react-icons-kit/icomoon/userTie';


import {
    FormGroup, FormControl, ControlLabel, ButtonToolbar, Button,
    Panel, Form, Col, Alert, Radio, Well, MenuItem, DropdownButton, Jumbotron, Row, HelpBlock, Nav, NavItem
} from 'react-bootstrap';
import ReactCenter from "react-center"


const PAGE_SIZE = 10;

class FacilitiesDetail extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            facilities: {
                id: 0,
                building: '',
                space: '',
                facilityDepartment: ''
            },
            showModal: false,
            buildingValue: '',
            spaceValue: '',
            editMode: false
        }

        this.onEdit = this.onEdit.bind(this);
    }

    componentDidMount() {
        console.log(this.props);
        let id = this.props.match.params.id;
        console.log("The ID: ");
        console.log(id);

        fetch(`http://localhost:8000/api/facilities/${id}`).then(response => {
            response.json().then(data => {
                console.log(data);
                this.setState({facilities: data});
                console.log(this.state.facilities.id);
            }).catch(err => {
                console.log(err)
                //this.props.showError(`Error in sending data to server: ${err.message}`);
            });
        })
    }


    onEdit() {
        this.setState({editMode: !this.state.notEditMode})
    }

    render() {
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

                <Col md="2">
                    {tabsInstance}
                </Col>

                <Col md={10}>

                    <ol className="breadcrumb">
                        <li/>
                        <li><Link to={`/admin/`}>Admin Panel</Link></li>
                        <li><Link to={`/admin/facilities`}>Facilities</Link></li>
                        <li className="active">Facilities Details</li>
                    </ol>

                    {/*<Panel  header={this.state.facilities.name}>*/}
                    {/*/!*<td><Link to={`/activities/${this.state.activity._id}`}>{this.state.activity.requestTitle}</Link></td>*!/*/}
                    {/*<p>Building Name: {this.state.facilities.building}</p>*/}
                    {/*<p>Space Name: {this.state.facilities.space}</p>*/}

                    {/*<Row>*/}
                    {/*<Col md="1"><Link to={`/activities/`}><Button className="btn btn-primary btn-large" style={{paddingLeft: '20px', paddingRight: '20px'}}>Back</Button></Link></Col>*/}
                    {/*<Col md="1"><Button className="btn-warning" >Edit</Button></Col>*/}
                    {/*</Row>*/}


                    {/*</Panel>*/}

                    {this.state.notEditMode ? (<FormGroup>
                            <Col sm={4}>
                                <Col componentClass={ControlLabel}>Edificio</Col>
                                {
                                    (this.state.buildingValue.length > 20) ?
                                        (<div>
                                            <FormControl name="building" placeholder="Ex. Luis A. Stefani"
                                                         onChange={this.handleBuildingValue}
                                                         style={{borderColor: '#B74442', boxShadow: "0px 0px 8px #B74442"}}
                                                         required/>
                                            <HelpBlock style={{color: '#B74442'}}>Nombre del edifico muy largo</HelpBlock>
                                        </div>)
                                        :
                                        (<div>
                                            <FormControl name="building" placeholder="Ex. Luis A. Stefani"
                                                         onChange={this.handleBuildingValue} required/>
                                        </div>)
                                }
                            </Col>

                            <Col sm={4}>
                                <Col componentClass={ControlLabel}>Sal&oacute;n/Espacio</Col>
                                {
                                    (this.state.spaceValue.length > 20) ?
                                        (<div>
                                            <FormControl name="space" placeholder="Ex. S-113"
                                                         onChange={this.handleSpaceValue}
                                                         style={{borderColor: '#B74442', boxShadow: "0px 0px 8px #B74442"}}
                                                         required/>
                                            <HelpBlock style={{color: '#B74442'}}>Nombre del sal&oacute;n/espacio muy
                                                largo</HelpBlock>

                                        </div>)
                                        :
                                        (<div>
                                            <FormControl name="space" placeholder="Ex. S-113"
                                                         onChange={this.handleSpaceValue} required/>
                                        </div>)
                                }
                            </Col>

                            <Col sm={4}>
                                <Col componentClass={ControlLabel}>Department</Col>
                                <FormControl name="facilitiesDepartmentCode" required/>
                            </Col>
                        </FormGroup>)

                        : <FormGroup>
                            <Row>
                            <Col sm={4}>
                                <Col componentClass={ControlLabel}>Edificio</Col>
                                <div>
                                    <FormControl name="building" value={this.state.facilities.building}
                                                 onChange={this.handleBuildingValue} required disabled={true}/>
                                </div>
                            </Col>
                            <Col sm={4}>
                                <Col componentClass={ControlLabel}>Sal&oacute;n/Espacio</Col>


                                <div>
                                    <FormControl name="space" value={this.state.facilities.space}
                                                 onChange={this.handleSpaceValue} required disabled={true}/>
                                </div>

                            </Col>

                            <Col sm={4}>
                                <Col componentClass={ControlLabel}>Department</Col>
                                <FormControl name="facilitiesDepartmentCode" value={this.state.facilities.facilityDepartment}
                                             required disabled={true}/>
                            </Col>
                            </Row>

                            <Row>
                                <Row>
                                    <Col md="1"><Link to={`/facilities/`}><Button className="btn btn-primary btn-large" style={{
                                        paddingLeft: '20px',
                                        paddingRight: '20px'
                                    }}>Back</Button></Link></Col>
                                    <Col md="1"><Button className="btn-default btn-large" onClick={this.onEdit}>Edit</Button></Col>
                                </Row>
                            </Row>

                        </FormGroup>

                    }

                    <Row>
                        <Row>
                            <Col md="1"><Link to={`/facilities/`}><Button className="btn btn-primary btn-large" style={{
                                paddingLeft: '20px',
                                paddingRight: '20px'
                            }}>Back</Button></Link></Col>
                            <Col md="1"><Button className="btn-default btn-large" onClick={this.onEdit}>Edit</Button></Col>
                        </Row>
                    </Row>
                </Col>
            </div>
        )
    }
}


FacilitiesDetail.contextTypes = {
    initialState: React.PropTypes.object,
};

export default FacilitiesDetail;