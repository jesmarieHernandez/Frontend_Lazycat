/**
 * Created by jesma on 12/11/2017.
 */
import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router-dom';

import {
    FormGroup, FormControl, ControlLabel, ButtonToolbar, Button,
    Panel, Form, Col, Alert, Radio, Well, MenuItem, DropdownButton, Jumbotron, Nav, NavItem, HelpBlock
} from 'react-bootstrap';
import ReactCenter from "react-center";
import Icon from 'react-icons-kit';
import {statsDots} from 'react-icons-kit/icomoon/statsDots';
import {iosPaw} from 'react-icons-kit/ionicons/iosPaw';
import {home} from 'react-icons-kit/icomoon/home';
import {fileText2} from 'react-icons-kit/icomoon/fileText2';
import {userTie} from 'react-icons-kit/icomoon/userTie';

class NewUser extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            userRoles: [
                {
                    id: 0,
                    name: 'select'
                },
                {
                    id: 1,
                    name: 'Admin'
                },
                {
                    id: 2,
                    name: 'Staff'
                },
                {
                    id: 3,
                    name: 'Student'
                },
                {
                    id: 4,
                    name: 'Counselor'
                },
                {
                    id: 5,
                    name: 'Facilities Manager'
                }
            ],
            adminNameValue: '',
            adminEmailValue: '',
            adminPhoneValue: '',
            staffNameValue: '',
            staffEmailValue: '',
            staffPhoneValue: '',
            studentNameValue: '',
            studentIdentificationNoValue: '',
            studentAddressValue: '',
            studentCityValue: '',
            studentCountryValue: '',
            studentZipCodeValue: '',
            studentPhoneValue: '',
            studentEmailValue: '',
            counselorNameValue: '',
            counselorEmailValue: '',
            counselorPhoneValue: '',
            counselorFacultyValue: '',
            counselorDepartmentValue: '',
            counselorOfficeValue: '',
            managerNameValue: '',
            managerEmailValue: '',
            managerPhoneValue: '',
            selectedUserRole: ''
        }
    }

    onSubmit = (event) => {
        event.preventDefault();

        console.log('Form was submitted');

        //this.showValidation();

        // if (Object.keys(this.state.invalidFields).length !== 0) {
        //     return;
        // }

        console.log('El puto role');
        console.log(document.forms);
        console.log(this.state.selectedUserRole);
        if (this.state.selectedUserRole.name === 'Admin') {
            const form = document.forms.newAdmin;

            let newUser;
            newUser = {
                role: form.userRole.value,
                adminName: form.adminName.value,
                adminEmail: form.adminEmail.value,
                adminTelephone: form.adminTelephone.value
            }

        } else if (this.state.selectedUserRole.name === 'Staff') {

            const form = document.forms.newStaff;
            let newUser;
            newUser = {
                staffName: form.staffName.value,
                staffEmail: form.staffEmail.value,
                staffPhone: form.staffTelephone.value
            }

            fetch('http://localhost:8000/api/staff', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newUser),
            }).then(response => {
                if (response.ok) {
                    console.log('Culiooooooooo');
                    console.log(response);
                    response.json().then(createdUser => {
                        console.log('New user was created successfully!');
                        console.log('User ID: ' + createdUser._id);

                        this.props.history.push(`/admin/users/`);
                    })
                } else {
                    response.json().then(error => {
                        //this.props.showError(`Failed to create request: ${error.message}`);
                    });
                }
            }).catch(err => {
                //this.props.showError(`Error in sending data to server: ${err.message}`);
            });

        } else if (this.state.selectedUserRole.name === 'Student') {
            console.log('puasdas');

            const form = document.forms.newStudent;
            let newUser;
            newUser = {
                studentName: form.requesterName.value,
                studentNo: form.studentIdentificationNumber.value,
                studentAddress: form.studentAddress1.value,
                studentCity: form.studentAddressCity.value,
                studentCountry: form.studentAddressCountry.value,
                studentZipCode: form.studentAddressZipCode.value,
                studentPhone: form.studentTelephone.value,
                studentEmail: form.studentEmail.value
            }

            fetch('http://localhost:8000/api/students', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newUser),
            }).then(response => {
                if (response.ok) {
                    console.log('Culiooooooooo');
                    console.log(response);
                    response.json().then(createdUser => {
                        console.log('New user was created successfully!');
                        console.log('User ID: ' + createdUser._id);

                        this.props.history.push(`/admin/users/`);
                    })
                } else {
                    response.json().then(error => {
                        //this.props.showError(`Failed to create request: ${error.message}`);
                    });
                }
            }).catch(err => {
                //this.props.showError(`Error in sending data to server: ${err.message}`);
            });

        } else if (this.state.selectedUserRole.name === 'Counselor') {
            const form = document.forms.newCounselor;
            let newUser;
            newUser = {
                counselorName: form.counselorName.value,
                counselorEmail: form.counselorEmail.value,
                counselorDepartment: form.counselorDepartment.value,
                counselorFaculty: form.counselorFaculty.value,
                counselorOffice: form.counselorOfficeNumber.value,
                counselorPhone: form.counselorTelephone.value
            }

            fetch('http://localhost:8000/api/counselors', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newUser),
            }).then(response => {
                if (response.ok) {
                    console.log('Culiooooooooo');
                    console.log(response);
                    response.json().then(createdUser => {
                        console.log('New user was created successfully!');
                        console.log('User ID: ' + createdUser._id);

                        this.props.history.push(`/admin/users/`);
                    })
                } else {
                    response.json().then(error => {
                        //this.props.showError(`Failed to create request: ${error.message}`);
                    });
                }
            }).catch(err => {
                //this.props.showError(`Error in sending data to server: ${err.message}`);
            });

        }

        else if (this.state.selectedUserRole.name === 'Facilities Manager') {
            const form = document.forms.newFacilitiesManager;
            let newUser;
            newUser = {
                managerName: form.managerName.value,
                managerEmail: form.managerEmail.value,
                managerPhone: form.managerTelephone.value
            }

            console.log('El gallo claudio');
            console.log(newUser);
            fetch('http://localhost:8000/api/managers', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newUser),
            }).then(response => {
                if (response.ok) {
                    console.log('Culiooooooooo');
                    console.log(response);
                    response.json().then(createdUser => {
                        console.log('New user was created successfully!');
                        console.log('User ID: ' + createdUser._id);

                        this.props.history.push(`/admin/users/`);
                    })
                } else {
                    response.json().then(error => {
                        //this.props.showError(`Failed to create request: ${error.message}`);
                    });
                }
            }).catch(err => {
                //this.props.showError(`Error in sending data to server: ${err.message}`);
            });
        }


    }

    handleAdminNameValue = (e) => {
        this.setState({adminNameValue: e.target.value})
    }

    handleAdminEmailValue = (e) => {
        this.setState({adminEmailValue: e.target.value})
    }

    handleAdminPhoneValue = (e) => {
        this.setState({adminPhoneValue: e.target.value})
    }

    handleStaffNameValue = (e) => {
        this.setState({staffNameValue: e.target.value})
    }

    handleStaffEmailValue = (e) => {
        this.setState({staffEmailValue: e.target.value})
    }

    handleStaffPhoneValue = (e) => {
        this.setState({staffPhoneValue: e.target.value})
    }

    handleStudentNameValue = (e) => {
        this.setState({studentNameValue: e.target.value})
    }

    handleStudentIdentificationNoValue = (e) => {
        this.setState({studentIdentificationNoValue: e.target.value})
    }

    handleStudentAddressValue = (e) => {
        this.setState({studentAddressValue: e.target.value})
    }

    handleStudentCityValue = (e) => {
        this.setState({studentCityValue: e.target.value})
    }

    handleStudentCountryValue = (e) => {
        this.setState({studentCountryValue: e.target.value})
    }

    handleStudentZipCodeValue = (e) => {
        this.setState({studentZipCodeValue: e.target.value})
    }
    handleStudentPhoneValue = (e) => {
        this.setState({studentPhoneValue: e.target.value})
    }

    handleStudentEmailValue = (e) => {
        this.setState({studentEmailValue: e.target.value})
    }

    handleCounselorNameValue = (e) => {
        this.setState({counselorNameValue: e.target.value})
    }

    handleCounselorEmailValue = (e) => {
        this.setState({counselorEmailValue: e.target.value})
    }

    handleCounselorPhoneValue = (e) => {
        this.setState({counselorPhoneValue: e.target.value})
    }

    handleCounselorFacultyValue = (e) => {
        this.setState({counselorFacultyValue: e.target.value})
    }

    handleCounselorDepartmentValue = (e) => {
        this.setState({counselorDepartmentValue: e.target.value})
    }

    handleCounselorOfficeValue = (e) => {
        this.setState({counselorOfficeValue: e.target.value})
    }

    handleManagerNameValue = (e) => {
        this.setState({managerNameValue: e.target.value})
    }

    handleManagerEmailValue = (e) => {
        this.setState({managerEmailValue: e.target.value})
    }

    handleManagerPhoneValue = (e) => {
        this.setState({managerPhoneValue: e.target.value})
    }


    onUserRoleSelected = (event) => {
        event.preventDefault();
        console.log('Change happened');
        console.log(event.target.value);
        const selectedUserRole = this.state.userRoles.filter(function (obj) {
            return obj.id == event.target.value;
        });
        console.log(selectedUserRole[0]);
        this.setState({selectedUserRole: selectedUserRole[0]});
        console.log("Selected user role: " + this.state.selectedUserRole.name);
    };

    render() {


        const roles = this.state.userRoles.map(roles =>
            <option value={roles.id}>{roles.name}</option>
        );

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

        var errorFormStyle = {
            borderColor: '#B74442',
            boxShadow: "0px 0px 8px #B74442"
        };

        var errorHelpBlockStyle = {
            color: '#B74442'
        };

        var successFormStyle = {
            borderColor: '#3C765B',
            boxShadow: "0px 0px 8px #3C765B"
        };


        const adminFields = (
            <Form horizontal onSubmit={this.onSubmit} name="newAdmin">

                <FormGroup>
                    <Col sm={4}>
                        <Col componentClass={ControlLabel}>Nombre</Col>
                        {
                            (this.state.adminNameValue.length > 50) ?
                                (<div>
                                    <FormControl name="adminName" onChange={this.handleAdminNameValue}
                                                 style={errorFormStyle} placeholder="Ex. Maria Cruz" required/>
                                    <HelpBlock style={errorHelpBlockStyle}>Nombre es demasiado largo</HelpBlock>
                                </div>)
                                :
                                (this.state.adminNameValue.length != 0 && /^[a-zA-Z]+\s[a-zA-Z]+\s?[a-zA-Z]*\s*?$/.test(this.state.adminNameValue) === false) ?
                                    (<div>
                                        <FormControl name="adminName" onChange={this.handleAdminNameValue}
                                                     style={errorFormStyle} placeholder="Ex. Maria Cruz" required/>
                                        <HelpBlock style={errorHelpBlockStyle}>Escriba el nombre y apellido</HelpBlock>
                                    </div>)
                                    :
                                    (this.state.adminNameValue.length < 50 && /^[a-zA-Z]+\s[a-zA-Z]+\s?[a-zA-Z]*\s*?$/.test(this.state.adminNameValue) === true) ?
                                        (<div>
                                            <FormControl name="adminName" onChange={this.handleAdminNameValue}
                                                         style={successFormStyle} placeholder="Ex. Maria Cruz"
                                                         required/>
                                        </div>)
                                        :
                                        (<div>
                                            <FormControl name="adminName" placeholder="Ex. Maria Cruz"
                                                         onChange={this.handleAdminNameValue}
                                                         required/>
                                        </div>)
                        }
                    </Col>

                    <Col sm={4}>
                        <Col componentClass={ControlLabel}>Correo Electr&oacute;nico</Col>
                        {
                            (/^[a-zA-Z]+\.?[a-zA-Z]+[0-9]*?@(upr.edu|ece.upr.edu|uprm.edu)+$/.test(this.state.adminEmailValue) === false && this.state.adminEmailValue.length != 0) ?
                                (<div>
                                    <FormControl name="adminEmail" onChange={this.handleAdminEmailValue}
                                                 style={errorFormStyle} placeholder="Ex. maria.cruz@upr.edu" required/>
                                    <HelpBlock style={errorHelpBlockStyle}>Correo debe ser del dominio
                                        @upr.edu</HelpBlock>
                                </div>)
                                :
                                (/^[a-zA-Z]+\.?[a-zA-Z]+[0-9]*?@(upr.edu|ece.upr.edu|uprm.edu)+$/.test(this.state.adminEmailValue) === true) ?
                                    (<div>
                                        <FormControl name="adminEmail" onChange={this.handleAdminEmailValue}
                                                     style={successFormStyle} placeholder="Ex. maria.cruz@upr.edu"
                                                     required/>
                                    </div>)
                                    :
                                    (<div>
                                        <FormControl name="adminEmail" onChange={this.handleAdminEmailValue}
                                                     placeholder="Ex. maria.cruz@upr.edu" required/>
                                    </div>)
                        }
                    </Col>

                    <Col sm={4}>
                        <Col componentClass={ControlLabel}>Tel&eacute;fono</Col>
                        {
                            (/^(((x)?[0-9]{4})|([0-9]{10}))$/.test(this.state.adminPhoneValue) === false && this.state.adminPhoneValue.length != 0) ?
                                (<div>
                                    <FormControl name="adminTelephone" style={errorFormStyle}
                                                 onChange={this.handleAdminPhoneValue} placeholder="Ex. 7656" required/>
                                    <HelpBlock style={errorHelpBlockStyle}>Solo extension (4 digitos) o
                                        numero completo (10 digitos)</HelpBlock>
                                </div>)
                                :
                                (/^(((x)?[0-9]{4})|([0-9]{10}))$/.test(this.state.adminPhoneValue) === true) ?
                                    (<div>
                                        <FormControl name="adminTelephone" style={successFormStyle}
                                                     onChange={this.handleAdminPhoneValue} placeholder="Ex. 7656"
                                                     required/>
                                    </div>)
                                    :
                                    (<div>
                                        <FormControl name="adminTelephone" placeholder="Ex. 7656"
                                                     onChange={this.handleAdminPhoneValue}
                                                     required/>
                                    </div>)
                        }
                    </Col>
                </FormGroup>
            </Form>
        )

        const staffFields = (
            <Form horizontal onSubmit={this.onSubmit} name="newStaff">

                <FormGroup>

                    <Col sm={4}>
                        <Col componentClass={ControlLabel}>Nombre</Col>
                        {
                            (this.state.staffNameValue.length > 50) ?
                                (<div>
                                    <FormControl name="staffName" style={errorFormStyle}
                                                 onChange={this.handleStaffNameValue} placeholder="Ex. Juan Velez"
                                                 required/>
                                    <HelpBlock style={errorHelpBlockStyle}>Nombre es demasiado largo</HelpBlock>
                                </div>)
                                :
                                (this.state.staffNameValue.length != 0 && /^[a-zA-Z]+\s[a-zA-Z]+\s?[a-zA-Z]*\s*?$/.test(this.state.staffNameValue) === false) ?
                                    (<div>
                                        <FormControl name="staffName" style={errorFormStyle}
                                                     onChange={this.handleStaffNameValue} placeholder="Ex. Juan Velez"
                                                     required/>
                                        <HelpBlock style={errorHelpBlockStyle}>Escriba el nombre y apellido</HelpBlock>
                                    </div>)
                                    :
                                    (this.state.staffNameValue.length < 50 && /^[a-zA-Z]+\s[a-zA-Z]+\s?[a-zA-Z]*\s*?$/.test(this.state.staffNameValue) === true) ?
                                        (<div>
                                            <FormControl name="staffName" style={successFormStyle}
                                                         onChange={this.handleStaffNameValue}
                                                         placeholder="Ex. Juan Velez" required/>
                                        </div>)
                                        :
                                        (<div>
                                            <FormControl name="staffName" onChange={this.handleStaffNameValue}
                                                         placeholder="Ex. Juan Velez" required/>
                                        </div>)

                        }
                    </Col>

                    <Col sm={4}>
                        <Col componentClass={ControlLabel}>Correo Electr&oacute;nico</Col>
                        {
                            (/^[a-zA-Z]+\.?[a-zA-Z]+[0-9]*?@(upr.edu|ece.upr.edu|uprm.edu)+$/.test(this.state.staffEmailValue) === false && this.state.staffEmailValue.length != 0) ?
                                (<div>
                                    <FormControl name="staffEmail" style={errorFormStyle}
                                                 onChange={this.handleStaffEmailValue}
                                                 placeholder="Ex. juan.velex@upr.edu" required/>
                                    <HelpBlock style={errorHelpBlockStyle}>Correo debe ser del dominio
                                        @upr.edu</HelpBlock>
                                </div>)
                                :
                                (/^[a-zA-Z]+\.?[a-zA-Z]+[0-9]*?@(upr.edu|ece.upr.edu|uprm.edu)+$/.test(this.state.staffEmailValue) === true) ?
                                    (<div>
                                        <FormControl name="staffEmail" onChange={this.handleStaffEmailValue}
                                                     style={successFormStyle} placeholder="Ex. juan.velex@upr.edu"
                                                     required/>
                                    </div>)
                                    :
                                    (<div>
                                        <FormControl name="staffEmail" onChange={this.handleStaffEmailValue}
                                                     placeholder="Ex. juan.velex@upr.edu" required/>
                                    </div>)
                        }
                    </Col>

                    <Col sm={4}>
                        <Col componentClass={ControlLabel}>Tel&eacute;fono</Col>
                        {
                            (/^(((x)?[0-9]{4})|([0-9]{10}))$/.test(this.state.staffPhoneValue) === false && this.state.staffPhoneValue.length != 0) ?
                                (<div>
                                    <FormControl name="staffTelephone" onChange={this.handleStaffPhoneValue}
                                                 style={errorFormStyle} placeholder="Ex.5678" required/>
                                    <HelpBlock style={errorHelpBlockStyle}>Solo extension (4 digitos) o
                                        numero completo (10 digitos)</HelpBlock>
                                </div>)
                                :
                                (/^(((x)?[0-9]{4})|([0-9]{10}))$/.test(this.state.staffPhoneValue) === true) ?
                                    (<div>
                                        <FormControl name="staffTelephone" onChange={this.handleStaffPhoneValue}
                                                     style={successFormStyle} placeholder="Ex.5678" required/>
                                    </div>)
                                    :
                                    (<div>
                                        <FormControl name="staffTelephone" onChange={this.handleStaffPhoneValue}
                                                     placeholder="Ex.5678" required/>
                                    </div>)
                        }
                    </Col>
                </FormGroup>
            </Form>
        )

        const studentFields = (
            <div>
                <Form horizontal onSubmit={this.onSubmit} name="newStudent">
                    <FormGroup>
                        <Col sm={4}>
                            <Col componentClass={ControlLabel}>Nombre</Col>
                            {
                                (this.state.studentNameValue.length > 50) ?
                                    (<div>
                                        <FormControl name="studentName" style={errorFormStyle}
                                                     onChange={this.handleStudentNameValue}
                                                     placeholder="Ex. Carlos Donato"
                                                     required/>
                                        <HelpBlock style={errorHelpBlockStyle}>Nombre es demasiado largo</HelpBlock>
                                    </div>)
                                    :
                                    (this.state.studentNameValue.length != 0 && /^[a-zA-Z]+\s[a-zA-Z]+\s?[a-zA-Z]*\s*?$/.test(this.state.studentNameValue) === false) ?
                                        (<div>
                                            <FormControl name="studentName" style={errorFormStyle}
                                                         onChange={this.handleStudentNameValue}
                                                         placeholder="Ex. Carlos Donato"
                                                         required/>
                                            <HelpBlock style={errorHelpBlockStyle}>Escriba el nombre y
                                                apellido</HelpBlock>
                                        </div>)
                                        :
                                        (this.state.studentNameValue.length < 50 && /^[a-zA-Z]+\s[a-zA-Z]+\s?[a-zA-Z]*\s*?$/.test(this.state.studentNameValue) === true) ?
                                            (<div>
                                                <FormControl name="studentName" style={successFormStyle}
                                                             onChange={this.handleStudentNameValue}
                                                             placeholder="Ex. Carlos Donato"
                                                             required/>
                                            </div>)
                                            :
                                            (<div>
                                                <FormControl name="studentName" onChange={this.handleStudentNameValue}
                                                             placeholder="Ex. Carlos Donato"
                                                             required/>
                                            </div>)
                            }
                        </Col>

                        <Col sm={4}>
                            <Col componentClass={ControlLabel}>N&uacute;m. de identificaci&oacute;n</Col>
                            {
                                ((this.state.studentIdentificationNoValue.length > 9 || this.state.studentIdentificationNoValue.length < 9) && this.state.studentIdentificationNoValue.length != 0) ?
                                    (<div>
                                        <FormControl name="studentIdentificationNumber"
                                                     onChange={this.handleStudentIdentificationNoValue}
                                                     style={errorFormStyle} placeholder="Ex. 7875557656"
                                                     required/>
                                        <HelpBlock style={errorHelpBlockStyle}>Escriba el n&uacute;mero de
                                            identificaci&oacute;n sin espacios o gui&oacute;n</HelpBlock>
                                    </div>)
                                    :
                                    (/^([0-9]{9})$/.test(this.state.studentIdentificationNoValue) === false && this.state.studentIdentificationNoValue.length != 0) ?
                                        (<div>
                                            <FormControl name="studentIdentificationNumber"
                                                         onChange={this.handleStudentIdentificationNoValue}
                                                         style={errorFormStyle} placeholder="Ex. 7875557656"
                                                         required/>
                                            <HelpBlock style={errorHelpBlockStyle}>Escriba solo n&uacute;
                                                meros</HelpBlock>
                                        </div>)
                                        :
                                        (/^([0-9]{9})$/.test(this.state.studentIdentificationNoValue) === true && this.state.studentIdentificationNoValue.length === 9) ?
                                            (<div>
                                                <FormControl name="studentIdentificationNumber"
                                                             onChange={this.handleStudentIdentificationNoValue}
                                                             style={successFormStyle} placeholder="Ex. 7875557656"
                                                             required/>
                                            </div>)
                                            :
                                            (<div>
                                                <FormControl name="studentIdentificationNumber"
                                                             onChange={this.handleStudentIdentificationNoValue}
                                                             placeholder="Ex. 7875557656"
                                                             required/>
                                            </div>)
                            }
                        </Col>

                    </FormGroup>

                    <FormGroup>
                        <Col sm={10}>
                            <Col componentClass={ControlLabel}>Direcci&oacute;n</Col>
                            {
                                (this.state.studentAddressValue.length < 10 && this.state.studentAddressValue.length != 0) ?
                                    (<div>
                                        <FormControl style={errorFormStyle} name="studentAddress1"
                                                     onChange={this.handleStudentAddressValue}
                                                     placeholder="Ex. HC 61 Box 5467" required/>
                                        <HelpBlock style={errorHelpBlockStyle}>Direcci&oacute;n muy peque&ntilde;
                                            a</HelpBlock>
                                    </div>)
                                    :
                                    (this.state.studentAddressValue.length > 200 && this.state.studentAddressValue.length != 0) ?
                                        (<div>
                                            <FormControl style={errorFormStyle} name="studentAddress1"
                                                         onChange={this.handleStudentAddressValue}
                                                         placeholder="Ex. HC 61 Box 5467" required/>
                                            <HelpBlock style={errorHelpBlockStyle}>Direcci&oacute;n muy
                                                grande</HelpBlock>
                                        </div>)
                                        :
                                        (/^[0-9]+$/.test(this.state.studentAddressValue) === true) ?
                                            (<div>
                                                <FormControl style={errorFormStyle} name="studentAddress1"
                                                             onChange={this.handleStudentAddressValue}
                                                             placeholder="Ex. HC 61 Box 5467" required/>
                                                <HelpBlock style={errorHelpBlockStyle}>Direcci&oacute;n no debe ser solo
                                                    d&iacute;gitos</HelpBlock>
                                            </div>)
                                            :
                                            (/^[`!@#\$%&\*()_+\{}\|:"<>?~,./;'\]a-zA-Z]+$/.test(this.state.studentAddressValue) === true) ?
                                                (<div>
                                                    <FormControl style={errorFormStyle} name="studentAddress1"
                                                                 onChange={this.handleStudentAddressValue}
                                                                 placeholder="Ex. HC 61 Box 5467"
                                                                 required/>
                                                    <HelpBlock style={errorHelpBlockStyle}>Direcci&oacute;n no deben ser
                                                        s&iacute;mbolos</HelpBlock>
                                                </div>)
                                                :
                                                (this.state.studentAddressValue.length >= 10 && this.state.studentAddressValue.length < 200 &&
                                                /^[0-9]+$/.test(this.state.studentAddressValue) === false &&
                                                /^[`!@#\$%\^&\*()_+{}\|:"<>?~,./;'[\]\\]+$/.test(this.state.studentAddressValue) === false) ?
                                                    (<div>
                                                        <FormControl style={successFormStyle} name="studentAddress1"
                                                                     onChange={this.handleStudentAddressValue}
                                                                     placeholder="Ex. HC 61 Box 5467"
                                                                     required/>
                                                    </div>)
                                                    :
                                                    (<div>
                                                        <FormControl name="studentAddress1"
                                                                     onChange={this.handleStudentAddressValue}
                                                                     placeholder="Ex. HC 61 Box 5467"
                                                                     required/>
                                                    </div>)
                            }
                        </Col>

                    </FormGroup>

                    <FormGroup>
                        <Col sm={3}>
                            <Col componentClass={ControlLabel}>Ciudad</Col>
                            {
                                (/^[a-zA-Z\s?]+$/.test(this.state.studentCityValue) === false && this.state.studentCityValue.length != 0) ?
                                    (<div>
                                        <FormControl name="studentAddressCity" onChange={this.handleStudentCityValue}
                                                     style={errorFormStyle} placeholder="Ex. Bayamon" required/>
                                        <HelpBlock style={errorHelpBlockStyle}> Escribir solo texto</HelpBlock>
                                    </div>)
                                    :
                                    (this.state.studentCityValue.length <= 3 && this.state.studentCityValue.length != 0) ?
                                        (<div>
                                            <FormControl name="studentAddressCity" style={errorFormStyle}
                                                         onChange={this.handleStudentCityValue}
                                                         placeholder="Ex. Bayamon" required/>
                                            <HelpBlock style={errorHelpBlockStyle}>Nombre de ciudad muy peque&ntilde;
                                                o</HelpBlock>
                                        </div>)
                                        :
                                        (this.state.studentCityValue.length > 20 && this.state.studentCityValue.length != 0) ?
                                            (<div>
                                                <FormControl name="studentAddressCity" style={errorFormStyle}
                                                             placeholder="Ex. Bayamon" required/>
                                                <HelpBlock style={errorHelpBlockStyle}
                                                           onChange={this.handleStudentCityValue}>Nombre de ciudad muy
                                                    grande</HelpBlock>
                                            </div>)
                                            :
                                            (this.state.studentCityValue.length >= 3 && this.state.studentCityValue.length < 20 && /^[a-zA-Z\s?]+$/.test(this.state.studentCityValue) === true) ?
                                                (<div>
                                                    <FormControl name="studentAddressCity" style={successFormStyle}
                                                                 onChange={this.handleStudentCityValue}
                                                                 placeholder="Ex. Bayamon" required/>
                                                </div>)
                                                :
                                                (<div>
                                                    <FormControl name="studentAddressCity"
                                                                 onChange={this.handleStudentCityValue}
                                                                 placeholder="Ex. Bayamon" required/>
                                                </div>)
                            }
                        </Col>

                        <Col sm={3}>
                            <Col componentClass={ControlLabel}>Pa&iacute;s</Col>
                            {
                                (/^(Puerto Rico)|(PR)$/.test(this.state.studentCountryValue) === false && this.state.studentCountryValue.length != 0) ?
                                    (<div>
                                        <FormControl name="studentAddressCountry" style={errorFormStyle}
                                                     onChange={this.handleStudentCountryValue}
                                                     placeholder="Ex. Puerto Rico" required/>
                                        <HelpBlock style={errorHelpBlockStyle}>Pa&iacute;s debe ser Puerto Rico o
                                            PR</HelpBlock>
                                    </div>)
                                    :
                                    (/^[a-zA-Z\s?]+$/.test(this.state.studentCountryValue) === false && this.state.studentCountryValue.length != 0) ?
                                        (<div>
                                            <FormControl name="studentAddressCountry" style={errorFormStyle}
                                                         onChange={this.handleStudentCountryValue}
                                                         placeholder="Ex. Puerto Rico" required/>
                                            <HelpBlock style={errorHelpBlockStyle}>Solo texto</HelpBlock>
                                        </div>)
                                        :
                                        (/^(Puerto Rico)|(PR)$/.test(this.state.studentCountryValue) === true && /^[a-zA-Z\s?]+$/.test(this.state.studentCountryValue) === true) ?
                                            (<div>
                                                <FormControl name="studentAddressCountry" style={successFormStyle}
                                                             onChange={this.handleStudentCountryValue}
                                                             placeholder="Ex. Puerto Rico" required/>
                                            </div>)
                                            :
                                            (<div>
                                                <FormControl name="studentAddressCountry"
                                                             onChange={this.handleStudentCountryValue}
                                                             placeholder="Ex. Puerto Rico" required/>
                                            </div>)
                            }

                        </Col>

                        <Col sm={3}>
                            <Col componentClass={ControlLabel}>C&oacute;digo Postal</Col>
                            {
                                (/^([0-9]{5})$/.test(this.state.studentCountryValue) === false && this.state.studentZipCodeValue.length != 0) ?
                                    (<div>
                                        <FormControl name="studentAddressZipCode" style={errorFormStyle}
                                                     onChange={this.handleStudentZipCodeValue} placeholder="Ex. 00922"
                                                     required/>
                                        <HelpBlock style={errorHelpBlockStyle}>C&oacute;digo Postal debe ser 5 d&iacute;
                                            gitos</HelpBlock>
                                    </div>)
                                    :
                                    (/^([0-9]{5})$/.test(this.state.studentCountryValue) === true) ?
                                        (<div>
                                            <FormControl name="studentAddressZipCode" style={successFormStyle}
                                                         onChange={this.handleStudentZipCodeValue}
                                                         placeholder="Ex. 00922" required/>
                                        </div>)
                                        :
                                        (<div>
                                            <FormControl name="studentAddressZipCode"
                                                         onChange={this.handleStudentZipCodeValue}
                                                         placeholder="Ex. 00922" required/>
                                        </div>)
                            }

                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col sm={4}>
                            <Col componentClass={ControlLabel}>Tel&eacute;fono</Col>

                            {
                                (/^(([0-9]{10}))$/.test(this.state.studentPhoneValue) === false && this.state.studentPhoneValue.length != 0) ?
                                    (<div>
                                        <FormControl name="studentTelephone" style={errorFormStyle}
                                                     onChange={this.handleStudentPhoneValue} placeholder="Ex. 4567"
                                                     required/>
                                        <HelpBlock style={errorHelpBlockStyle}>N&uacute;mero completo (10 d&iacute;
                                            gitos)</HelpBlock>
                                    </div>)
                                    :
                                    (/^(([0-9]{10}))$/.test(this.state.studentPhoneValue) === true) ?
                                        (<div>
                                            <FormControl name="studentTelephone" style={successFormStyle}
                                                         onChange={this.handleStudentPhoneValue} placeholder="Ex. 4567"
                                                         required/>
                                        </div>)
                                        :
                                        (<div>
                                            <FormControl name="studentTelephone" onChange={this.handleStudentPhoneValue}
                                                         placeholder="Ex. 4567"
                                                         required/>
                                        </div>)
                            }
                        </Col>

                        <Col sm={4}>
                            <Col componentClass={ControlLabel}>Correo Electr&oacute;nico</Col>
                            {
                                (/^[a-zA-Z]+\.?[a-zA-Z]+[0-9]*?@(upr.edu|ece.upr.edu|uprm.edu)+$/.test(this.state.studentEmailValue) === false && this.state.studentEmailValue.length != 0) ?
                                    (<div>
                                        <FormControl name="studentEmail" style={errorFormStyle}
                                                     onChange={this.handleStudentEmailValue}
                                                     placeholder="Ex. carlos.donato@upr.edu" required/>
                                        <HelpBlock style={errorHelpBlockStyle}>Correo debe ser del dominio
                                            @upr.edu</HelpBlock>
                                    </div>)
                                    :
                                    (/^[a-zA-Z]+\.?[a-zA-Z]+[0-9]*?@(upr.edu|ece.upr.edu|uprm.edu)+$/.test(this.state.studentEmailValue) === true) ?
                                        (<div>
                                            <FormControl name="studentEmail" style={successFormStyle}
                                                         onChange={this.handleStudentEmailValue}
                                                         placeholder="Ex. carlos.donato@upr.edu" required/>
                                        </div>)
                                        :
                                        (<div>
                                            <FormControl name="studentEmail" onChange={this.handleStudentEmailValue}
                                                         placeholder="Ex. carlos.donato@upr.edu"
                                                         required/>
                                        </div>)
                            }
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )

        const counselorFields = (
            <Form horizontal onSubmit={this.onSubmit} name="newCounselor">

                <FormGroup>
                    <Col sm={4}>
                        <Col componentClass={ControlLabel}>Nombre</Col>
                        {
                            (/^[a-zA-Z]+\s[a-zA-Z]+\s?[a-zA-Z]*\s*?$/.test(this.state.counselorNameValue) === false && this.state.counselorNameValue.length != 0) ?
                                (<div>
                                    <FormControl name="organizationCounselorName"
                                                 placeholder="Ex. Raymond Lopez"
                                                 onChange={this.handleCounselorNameValue} style={errorFormStyle}
                                                 required/>
                                    <HelpBlock style={errorHelpBlockStyle}>Escriba el nombre con los dos
                                        apellidos</HelpBlock>
                                </div>)
                                :
                                (this.state.counselorNameValue.length < 50 && /^[a-zA-Z]+\s[a-zA-Z]+\s?[a-zA-Z]*\s*?$/.test(this.state.counselorNameValue) === true) ?
                                    (<div>
                                        <FormControl name="organizationCounselorName"
                                                     placeholder="Ex. Raymond Lopez"
                                                     onChange={this.handleCounselorNameValue} style={successFormStyle}
                                                     required/>
                                    </div>)
                                    :
                                    (
                                        (this.state.counselorNameValue.length > 50) ?
                                            (<div>
                                                <FormControl name="organizationCounselorName"
                                                             placeholder="Ex. Raymond Lopez"
                                                             onChange={this.handleCounselorNameValue}
                                                             style={{
                                                                 borderColor: '#B74442',
                                                                 boxShadow: "0px 0px 8px #B74442"
                                                             }}
                                                             required/>
                                                <HelpBlock style={{color: '#B74442'}}>Nombre muy
                                                    largo</HelpBlock>

                                            </div>)
                                            :
                                            (<div>
                                                <FormControl name="organizationCounselorName"
                                                             placeholder="Ex. Raymond Lopez"
                                                             onChange={this.handleCounselorNameValue}
                                                             required/>
                                            </div>)
                                    )
                        }
                    </Col>

                    <Col sm={4}>
                        <Col componentClass={ControlLabel}>Correo Electr&oacute;nico</Col>
                        {
                            (/^[a-zA-Z]+\.?[a-zA-Z]+[0-9]*?@(upr.edu|ece.upr.edu|uprm.edu)+$/.test(this.state.counselorEmailValue) === false && this.state.counselorEmailValue.length != 0) ?
                                (<div>
                                    <FormControl name="organizationCounselorEmail"
                                                 placeholder="Ex. raymond.lopez@upr.edu"
                                                 onChange={this.handleCounselorEmailValue} style={errorFormStyle}
                                                 required/>
                                    <HelpBlock style={errorHelpBlockStyle}>Correo debe ser del dominio
                                        @upr.edu</HelpBlock>
                                </div>)
                                :
                                (/^[a-zA-Z]+\.?[a-zA-Z]+[0-9]*?@(upr.edu|ece.upr.edu|uprm.edu)+$/.test(this.state.counselorEmailValue) === true) ?
                                    (<div>
                                        <FormControl name="organizationCounselorEmail"
                                                     placeholder="Ex. raymond.lopez@upr.edu"
                                                     onChange={this.handleCounselorEmailValue} style={successFormStyle}
                                                     required/>
                                    </div>)
                                    :
                                    (<div>
                                        <FormControl name="organizationCounselorEmail"
                                                     placeholder="Ex. raymond.lopez@upr.edu"
                                                     onChange={this.handleCounselorEmailValue} required/>
                                    </div>)
                        }
                    </Col>

                    <Col sm={4}>
                        <Col componentClass={ControlLabel}>Tel&eacute;fono</Col>
                        {
                            (/^(((x)?[0-9]{4})|([0-9]{10}))$/.test(this.state.counselorPhoneValue) === false && this.state.counselorPhoneValue.length != 0) ?
                                (<div>
                                    <FormControl name="organizationCounselorTelephone" type="text"
                                                 placeholder="Ex. 7266"
                                                 onChange={this.handleCounselorPhoneValue}
                                                 style={errorFormStyle}
                                                 required/>
                                    <HelpBlock style={errorHelpBlockStyle}>Solo extension (4 digitos) o
                                        numero completo (10 digitos)</HelpBlock>
                                </div>)
                                :
                                (/^(((x)?[0-9]{4})|([0-9]{10}))$/.test(this.state.counselorPhoneValue) === true) ?
                                    (<div>
                                        <FormControl name="organizationCounselorTelephone" type="text"
                                                     placeholder="Ex. 7266"
                                                     onChange={this.handleCounselorPhoneValue} style={successFormStyle}
                                                     required/>
                                    </div>)
                                    :
                                    (<div>
                                        <FormControl name="organizationCounselorTelephone" type="text"
                                                     placeholder="Ex. 7266"
                                                     onChange={this.handleCounselorPhoneValue}
                                                     required/>
                                    </div>)
                        }
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col sm={4}>
                        <Col componentClass={ControlLabel}>Facultad</Col>
                        {
                            (this.state.counselorFacultyValue.length >= 50) ?
                                (<div>
                                    <FormControl name="organizationCounselorFaculty"
                                                 placeholder="Ex. Ingenieria"
                                                 onChange={this.handleCounselorFacultyValue} style={errorFormStyle}
                                                 required/>
                                    <HelpBlock style={errorHelpBlockStyle}>Nombre de la facultad muy
                                        largo</HelpBlock>
                                </div>)
                                :
                                (/^([a-zA-Z\s?])+$/.test(this.state.counselorFacultyValue) === false && this.state.counselorFacultyValue.length != 0 ) ?
                                    (<div>
                                        <FormControl name="organizationCounselorFaculty"
                                                     placeholder="Ex. Ingenieria"
                                                     onChange={this.handleCounselorFacultyValue} style={errorFormStyle}
                                                     required/>
                                        <HelpBlock style={errorHelpBlockStyle}>Solo texto</HelpBlock>
                                    </div>)
                                    :
                                    (/^([a-zA-Z\s?])+$/.test(this.state.counselorFacultyValue) === true && this.state.counselorFacultyValue.length <= 50 && this.state.counselorFacultyValue.length != 0 ) ?
                                        (<div>
                                            <FormControl name="organizationCounselorFaculty"
                                                         placeholder="Ex. Ingenieria"
                                                         onChange={this.handleCounselorFacultyValue}
                                                         style={successFormStyle} required/>
                                        </div>)
                                        :
                                        (<div>
                                            <FormControl name="organizationCounselorFaculty"
                                                         placeholder="Ex. Ingenieria"
                                                         onChange={this.handleCounselorFacultyValue} required/>
                                        </div>)

                        }
                    </Col>

                    <Col sm={4}>
                        <Col componentClass={ControlLabel}>Departamento</Col>
                        {
                            (this.state.counselorDepartmentValue.length >= 50) ?
                                (<div>
                                    <FormControl name="organizationCounselorDepartment"
                                                 placeholder="Ex. Ingenieria de Computadoras"
                                                 onChange={this.handleCounselorDepartmentValue} style={errorFormStyle}
                                                 required/>
                                    <HelpBlock style={errorHelpBlockStyle}>Nombre del departamento muy
                                        largo</HelpBlock>

                                </div>)
                                :
                                (/^([a-zA-Z\s?])+$/.test(this.state.counselorDepartmentValue) === false && this.state.counselorDepartmentValue.length != 0 ) ?
                                    (<div>
                                        <FormControl name="organizationCounselorDepartment"
                                                     placeholder="Ex. Ingenieria de Computadoras"
                                                     onChange={this.handleCounselorDepartmentValue}
                                                     style={errorFormStyle} required/>
                                        <HelpBlock style={errorHelpBlockStyle}>Solo texto</HelpBlock>

                                    </div>)
                                    :
                                    (/^([a-zA-Z\s?])+$/.test(this.state.counselorDepartmentValue) === true && this.state.counselorDepartmentValue.length <= 50 && this.state.counselorDepartmentValue.length != 0 ) ?
                                        (<div>
                                            <FormControl name="organizationCounselorDepartment"
                                                         placeholder="Ex. Ingenieria de Computadoras"
                                                         onChange={this.handleCounselorDepartmentValue}
                                                         style={successFormStyle} required/>

                                        </div>)
                                        :
                                        (<div>
                                            <FormControl name="organizationCounselorDepartment"
                                                         placeholder="Ex. Ingenieria de Computadoras"
                                                         onChange={this.handleCounselorDepartmentValue} required/>
                                        </div>)
                        }
                    </Col>

                    <Col sm={4}>
                        <Col componentClass={ControlLabel}>Oficina</Col>
                        {
                            (this.state.counselorOfficeValue.length >= 15 && this.state.counselorOfficeValue.length != 0) ?
                                (<div>
                                    <FormControl name="organizationCounselorOfficeNumber"
                                                 placeholder="Ex. S-113"
                                                 onChange={this.handleCounselorOfficeValue} style={errorFormStyle}
                                                 required/>
                                    <HelpBlock style={errorHelpBlockStyle}>Numero de oficina muy
                                        largo</HelpBlock>

                                </div>)
                                :
                                (this.state.counselorOfficeValue.length === 1) ?
                                    (<div>
                                        <FormControl name="organizationCounselorOfficeNumber"
                                                     placeholder="Ex. S-113"
                                                     onChange={this.handleCounselorOfficeValue} style={errorFormStyle}
                                                     required/>
                                        <HelpBlock style={errorHelpBlockStyle}>Numero de oficina muy pequeno</HelpBlock>

                                    </div>)
                                    :
                                    (/^[`!@#\$%\^&\*()_+{}\|:"<>?~,./;'[\]\\]+$/.test(this.state.counselorOfficeValue) === true) ?
                                        (<div>
                                            <FormControl name="organizationCounselorOfficeNumber"
                                                         placeholder="Ex. S-113"
                                                         onChange={this.handleCounselorOfficeValue}
                                                         style={errorFormStyle} required/>
                                            <HelpBlock style={errorHelpBlockStyle}>Oficina no puede ser solo
                                                simbolos</HelpBlock>
                                        </div>)
                                        :
                                        (/^[`!@#\$%\^&\*()_+{}\|:"<>?~,./;'[\]\\]+$/.test(this.state.counselorOfficeValue) === false && this.state.counselorOfficeValue.length < 15 && this.state.counselorOfficeValue.length != 0 ) ?
                                            (<div>
                                                <FormControl name="organizationCounselorOfficeNumber"
                                                             placeholder="Ex. S-113"
                                                             onChange={this.handleCounselorOfficeValue}
                                                             style={successFormStyle} required/>
                                            </div>)
                                            :
                                            (<div>
                                                <FormControl name="organizationCounselorOfficeNumber"
                                                             placeholder="Ex. S-113"
                                                             onChange={this.handleCounselorOfficeValue} required/>
                                            </div>)
                        }

                    </Col>
                </FormGroup>
            </Form>
        )

        const facilitiesManagerFields = (
            <Form horizontal onSubmit={this.onSubmit} name="newFacilitiesManager">

                <FormGroup>
                    <Col sm={4}>
                        <Col componentClass={ControlLabel} required>Nombre</Col>
                        {
                            (/^[a-zA-Z]+\s[a-zA-Z]+\s?[a-zA-Z]*\s*?$/.test(this.state.managerNameValue) === false && this.state.managerNameValue.length != 0) ?
                                (<div>
                                    <FormControl name="managerName" style={errorFormStyle}
                                                 onChange={this.handleManagerNameValue}
                                                 placeholder="Ex. Heribero Bourdon"/>
                                    <HelpBlock style={errorHelpBlockStyle}>Escriba el nombre con los dos
                                        apellidos</HelpBlock>
                                </div>)
                                :
                                (this.state.managerNameValue.length > 50) ?
                                    (<div>
                                        <FormControl name="managerName" style={errorFormStyle}
                                                     onChange={this.handleManagerNameValue}
                                                     placeholder="Ex. Heribero Bourdon"/>
                                        <HelpBlock style={errorHelpBlockStyle}>Nombre muy largo</HelpBlock>
                                    </div>)
                                    :
                                    (this.state.managerNameValue.length < 50 &&
                                    /^[a-zA-Z]+\s[a-zA-Z]+\s?[a-zA-Z]*\s*?$/.test(this.state.managerNameValue) === true) ?
                                        (<div>
                                            <FormControl name="managerName" style={successFormStyle}
                                                         onChange={this.handleManagerNameValue}
                                                         placeholder="Ex. Heribero Bourdon"/>
                                        </div>)
                                        :
                                        (<div>
                                            <FormControl name="managerName" onChange={this.handleManagerNameValue}
                                                         placeholder="Ex. Heribero Bourdon"/>
                                        </div>)
                        }
                    </Col>

                    <Col sm={4}>
                        <Col componentClass={ControlLabel} required>Correo Electr&oacute;nico</Col>
                        {
                            (/^[a-zA-Z]+\.?[a-zA-Z]+[0-9]*?@(upr.edu|ece.upr.edu|uprm.edu)+$/.test(this.state.managerEmailValue) === false
                            && this.state.managerEmailValue.length != 0) ?
                                (<div>
                                    <FormControl name="managerEmail" style={errorFormStyle}
                                                 onChange={this.handleManagerEmailValue}
                                                 placeholder="Ex. heriberto.bourdon@upr.edu"/>
                                    <HelpBlock style={errorHelpBlockStyle}>Correo debe ser del dominio
                                        @upr.edu</HelpBlock>
                                </div>)
                                :
                                (/^[a-zA-Z]+\.?[a-zA-Z]+[0-9]*?@(upr.edu|ece.upr.edu|uprm.edu)+$/.test(this.state.managerEmailValue) === true) ?
                                    (<div>
                                        <FormControl name="managerEmail" style={successFormStyle}
                                                     onChange={this.handleManagerEmailValue}
                                                     placeholder="Ex. heriberto.bourdon@upr.edu"/>
                                    </div>)
                                    :
                                    (<div>
                                        <FormControl name="managerEmail" onChange={this.handleManagerEmailValue}
                                                     placeholder="Ex. heriberto.bourdon@upr.edu"/>
                                    </div>)
                        }
                    </Col>

                    <Col sm={4}>
                        <Col componentClass={ControlLabel} required>Tel&eacute;fono</Col>
                        {
                            (/^(((x)?[0-9]{4})|([0-9]{10}))$/.test(this.state.managerPhoneValue) === false && this.state.managerPhoneValue.length != 0) ?
                                (<div>
                                    <FormControl name="managerTelephone" style={errorFormStyle}
                                                 onChange={this.handleManagerPhoneValue} placeholder="Ex. 7651"/>
                                    <HelpBlock style={errorHelpBlockStyle}>Solo extension (4 digitos) o
                                        numero completo (10 digitos)</HelpBlock>
                                </div>)
                                :
                                (/^(((x)?[0-9]{4})|([0-9]{10}))$/.test(this.state.managerPhoneValue) === true) ?
                                    (<div>
                                        <FormControl name="managerTelephone" style={successFormStyle}
                                                     onChange={this.handleManagerPhoneValue} placeholder="Ex. 7651"/>
                                    </div>)
                                    :
                                    (<div>
                                        <FormControl name="managerTelephone" onChange={this.handleManagerPhoneValue}
                                                     placeholder="Ex. 7651"/>
                                    </div>)
                        }
                    </Col>
                </FormGroup>
            </Form>
        )

        console.log(this.state.selectedUserRole);
        return (
            <div className="container">
                <Col md={2}>
                    {tabsInstance}
                </Col>

                <Col md={10}>


                    <Col md={9}>
                        <ol className="breadcrumb">
                            <li/>
                            <li><Link to={`/admin`}>Admin Panel</Link></li>
                            <li><Link to={`/admin/users`}>Users</Link></li>
                            <li className="active">Create New User</li>
                        </ol>
                        <Panel header="Create New User">
                            <Form horizontal onSubmit={this.onSubmit} name="newUser">
                                <FormGroup>
                                    <Col sm={4}>
                                        <Col componentClass={ControlLabel}>Role</Col>
                                        <FormControl componentClass="select" placeholder="select" name="userRole"
                                                     onChange={this.onUserRoleSelected}
                                                     required>
                                            {/*<option>select</option>*/}
                                            {roles}
                                        </FormControl>

                                    </Col>
                                </FormGroup>
                                {this.state.selectedUserRole.name === 'select' ? null : null}
                                {this.state.selectedUserRole.name === 'Admin' ? adminFields : null }
                                {this.state.selectedUserRole.name === 'Student' ? studentFields : null }
                                {this.state.selectedUserRole.name === 'Staff' ? staffFields : null }
                                {this.state.selectedUserRole.name === 'Counselor' ? counselorFields : null }
                                {this.state.selectedUserRole.name === 'Facilities Manager' ? facilitiesManagerFields : null }

                                <ButtonToolbar>
                                    <Col md={6}>
                                        <Button bsStyle="primary" type="submit">
                                            Submit </Button>
                                    </Col>
                                </ButtonToolbar>
                            </Form>
                        </Panel>
                    </Col>
                </Col>

                <Col md={2}></Col>
            </div>
        )
    }
}


NewUser.contextTypes = {
    initialState: React.PropTypes.object,
};

export default NewUser;