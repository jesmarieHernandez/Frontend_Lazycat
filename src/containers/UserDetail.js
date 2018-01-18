/**
 * Created by jesma on 12/11/2017.
 */
import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router-dom';
import Icon from 'react-icons-kit';
import {statsDots} from 'react-icons-kit/icomoon/statsDots';
import {iosPaw} from 'react-icons-kit/ionicons/iosPaw';
import {fileText2} from 'react-icons-kit/icomoon/fileText2';
import {userTie} from 'react-icons-kit/icomoon/userTie';

import {
    FormGroup, FormControl, ControlLabel, Button,
    Panel, Form, Col, Row, Nav, NavItem, HelpBlock
} from 'react-bootstrap';


class UserDetail extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            userType_code: 0,

            notEditMode: true,

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
            adminId: null,

            adminNameValue: '',
            adminEmailValue: '',
            adminPhoneValue: '',

            staffId: null,

            staffNameValue: '',
            staffEmailValue: '',
            staffPhoneValue: '',

            studentId: null,

            studentNameValue: '',
            studentIdentificationNoValue: '',
            studentAddressValue: '',
            studentCityValue: '',
            studentCountryValue: '',
            studentZipCodeValue: '',
            studentPhoneValue: '',
            studentEmailValue: '',

            counselorId: null,

            counselorNameValue: '',
            counselorEmailValue: '',
            counselorPhoneValue: '',
            counselorFacultyValue: '',
            counselorDepartmentValue: '',
            counselorOfficeValue: '',

            managerId: null,

            managerNameValue: '',
            managerEmailValue: '',
            managerPhoneValue: '',
            selectedUserRole: ''

        }

        this.toggleEditMode = this.toggleEditMode.bind(this);

    }

    componentDidMount() {
        console.log('this.props.params.id: ' + this.props.match.params.id);
        let id = this.props.match.params.id;
        // fetch(`http://192.168.99.100/api/admin/users/${id}`).then(response => {
        fetch(`http://192.168.99.100/api/users/${this.props.match.params.id}`).then(response => {
            response.json().then(data => {
                console.log(data);
                this.setState({user: data});
                console.log('La puta data');
                console.log(this.state.user);
                this.setState({userType_code: data.userType_code});
                console.log(this.state.userType_code);

                if (this.state.userType_code === 1) {


                    this.setState({adminId: data.staff[0].id});
                    this.setState({adminNameValue: data.staff[0].staffName});
                    this.setState({adminEmailValue: data.staff[0].staffEmail});
                    this.setState({adminPhoneValue: data.staff[0].staffPhone});

                } else if (this.state.userType_code === 2) {

                    this.setState({staffId: data.staff[0].id});

                    this.setState({staffNameValue: data.staff[0].staffName});
                    this.setState({staffEmailValue: data.staff[0].staffEmail});
                    this.setState({staffPhoneValue: data.staff[0].staffPhone});

                } else if (this.state.userType_code === 3) {

                    this.setState({studentId: data.students[0].id});
                    this.setState({studentNameValue: data.students[0].studentName});
                    this.setState({studentIdentificationNoValue: data.students[0].studentNo});
                    this.setState({studentAddressValue: data.students[0].studentAddress});
                    this.setState({studentCityValue: data.students[0].studentCity});
                    this.setState({studentCountryValue: data.students[0].studentCountry});
                    this.setState({studentZipCodeValue: data.students[0].studentZipCode});
                    this.setState({studentPhoneValue: data.students[0].studentPhone});
                    this.setState({studentEmailValue: data.students[0].studentEmail});


                } else if (this.state.userType_code === 4) {

                    this.setState({counselorId: data.counselors[0].id});
                    this.setState({counselorNameValue: data.counselors[0].counselorName});
                    this.setState({counselorEmailValue: data.counselors[0].counselorEmail});
                    this.setState({counselorPhoneValue: data.counselors[0].counselorPhone});
                    this.setState({counselorFacultyValue: data.counselors[0].counselorFaculty});
                    this.setState({counselorDepartmentValue: data.counselors[0].counselorDepartment});
                    this.setState({counselorOfficeValue: data.counselors[0].counselorOffice});

                } else if (this.state.userType_code === 5) {

                    this.setState({managerId: data.managers[0].id});
                    this.setState({managerNameValue: data.managers[0].managerName});
                    this.setState({managerEmailValue: data.managers[0].managerEmail});
                    this.setState({managerPhoneValue: data.managers[0].managerPhone});


                }
            }).catch(err => {
                console.log(err)
                //this.props.showError(`Error in sending data to server: ${err.message}`);
            });
        })
    }
    onSubmit = (event) => {
        event.preventDefault();

        console.log('Form was submitted');

        //TODO Waiting for edit admin route to be done
        if (this.state.userType_code === 1) {
            const form = document.forms.newAdmin;

            let newUser;
            newUser = {
                role: form.userRole.value,
                adminName: form.adminName.value,
                adminEmail: form.adminEmail.value,
                adminTelephone: form.adminTelephone.value
            }

        } else if (this.state.userType_code === 2) {

            const form = document.forms.newStaff;

            let newUser = {
                staffName: form.staffName.value,
                staffEmail: form.staffEmail.value,
                staffPhone: form.staffTelephone.value
            }

            fetch(`http://192.168.99.100/api/staff/${this.state.staffId}`, {
                method: 'PUT',
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

        } else if (this.state.userType_code === 3) {

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

            fetch(`http://192.168.99.100/api/students/${this.state.studentId}`, {
                method: 'PUT',
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

        } else if (this.state.userType_code === 4) {
            const form = document.forms.newCounselor;
            let newUser;
            newUser = {
                counselorName: form.organizationCounselorName.value,
                counselorEmail: form.organizationCounselorEmail.value,
                counselorDepartment: form.organizationCounselorDepartment.value,
                counselorFaculty: form.organizationCounselorFaculty.value,
                counselorOffice: form.organizationCounselorOfficeNumber.value,
                counselorPhone: form.organizationCounselorTelephone.value
            }

            fetch(`http://192.168.99.100/api/counselors/${this.state.counselorId}`, {
                method: 'PUT',
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

        else if (this.state.userType_code === 5) {
            // const form = document.forms.newFacilitiesManager;
            let newUser = {
                managerName: this.state.managerNameValue,
                managerEmail: this.state.managerEmailValue,
                managerPhone: this.state.managerPhoneValue
            }

            fetch(`http://192.168.99.100/api/managers/${this.state.managerId}`, {
                method: 'PUT',
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

                        this.setState({notEditMode: false});
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

    toggleEditMode() {
        this.setState({notEditMode: !this.state.notEditMode});
        console.log(this.state.notEditMode);
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



    render() {
        const tabsInstance = (

            <div style={{backgroundColor: '#F8F8F8'}}>
                <Nav fluid>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/request"><Icon icon={fileText2}
                                                                                                   style={{paddingRight: "20px"}}/>Solicitud</Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}><Link to="/activities"><Icon icon={iosPaw}
                                                                                                      style={{paddingRight: "20px"}}/>Actividades</Link></NavItem>
                    <NavItem style={{borderBottom: '1px solid #ECECEC'}}> <Link to="/stats"><Icon icon={statsDots}
                                                                                                  style={{paddingRight: "20px"}}/>Estad&iacute;sticas</Link></NavItem>
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
                                    <FormControl name="adminName"
                                                 onChange={this.handleAdminNameValue}
                                                 style={errorFormStyle}
                                                 placeholder="Ex. Maria Cruz"
                                                 required
                                                 disabled={this.state.notEditMode}
                                                 value={this.state.adminNameValue}/>
                                    <HelpBlock style={errorHelpBlockStyle}>Nombre es demasiado largo</HelpBlock>
                                </div>)
                                :
                                (this.state.adminNameValue.length != 0 && /^([a-zA-Z]{2,})\s(([a-zA-Z]*?.?)?\s?)*?([a-zA-Z]{2,})\s?[a-zA-Z]*\s*?$/.test(this.state.adminNameValue) === false) ?
                                    (<div>
                                        <FormControl name="adminName" onChange={this.handleAdminNameValue}
                                                     value={this.state.adminNameValue}
                                                     style={errorFormStyle}
                                                     placeholder="Ex. Maria Cruz"
                                                     disabled={this.state.notEditMode}
                                                     required/>
                                        <HelpBlock style={errorHelpBlockStyle}>Escriba el nombre y apellido</HelpBlock>
                                    </div>)
                                    :
                                    (this.state.adminNameValue.length < 50 && /^([a-zA-Z]{2,})\s(([a-zA-Z]*?.?)?\s?)*?([a-zA-Z]{2,})\s?[a-zA-Z]*\s*?$/.test(this.state.adminNameValue) === true) ?
                                        (<div>
                                            <FormControl name="adminName" onChange={this.handleAdminNameValue}
                                                         value={this.state.adminNameValue}
                                                         style={successFormStyle} placeholder="Ex. Maria Cruz"
                                                         disabled={this.state.notEditMode}
                                                         required/>
                                        </div>)
                                        :
                                        (<div>
                                            <FormControl name="adminName" placeholder="Ex. Maria Cruz"
                                                         value={this.state.adminNameValue}
                                                         onChange={this.handleAdminNameValue}
                                                         disabled={this.state.notEditMode}
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
                                                 style={errorFormStyle} placeholder="Ex. maria.cruz@upr.edu"
                                                 value={this.state.adminEmailValue}
                                                 disabled={this.state.notEditMode}
                                                 required/>
                                    <HelpBlock style={errorHelpBlockStyle}>Correo debe ser del dominio
                                        @upr.edu</HelpBlock>
                                </div>)
                                :
                                (/^[a-zA-Z]+\.?[a-zA-Z]+[0-9]*?@(upr.edu|ece.upr.edu|uprm.edu)+$/.test(this.state.adminEmailValue) === true) ?
                                    (<div>
                                        <FormControl name="adminEmail"
                                                     onChange={this.handleAdminEmailValue}
                                                     style={successFormStyle}
                                                     placeholder="Ex. maria.cruz@upr.edu"
                                                     value={this.state.adminEmailValue}
                                                     disabled={this.state.notEditMode}
                                                     required/>
                                    </div>)
                                    :
                                    (<div>
                                        <FormControl name="adminEmail"
                                                     onChange={this.handleAdminEmailValue}
                                                     placeholder="Ex. maria.cruz@upr.edu"
                                                     value={this.state.adminEmailValue}
                                                     disabled={this.state.notEditMode}
                                                     required/>
                                    </div>)
                        }
                    </Col>

                    <Col sm={4}>
                        <Col componentClass={ControlLabel}>Tel&eacute;fono</Col>
                        {
                            (/^(((x)?[0-9]{4})|([0-9]{10}))$/.test(this.state.adminPhoneValue) === false && this.state.adminPhoneValue.length != 0) ?
                                (<div>
                                    <FormControl name="adminTelephone"
                                                 style={errorFormStyle}
                                                 onChange={this.handleAdminPhoneValue}
                                                 placeholder="Ex. 7656"
                                                 value={this.state.adminPhoneValue}
                                                 disabled={this.state.notEditMode}
                                                 required/>
                                    <HelpBlock style={errorHelpBlockStyle}>Solo extension (4 digitos) o
                                        numero completo (10 digitos)</HelpBlock>
                                </div>)
                                :
                                (/^(((x)?[0-9]{4})|([0-9]{10}))$/.test(this.state.adminPhoneValue) === true) ?
                                    (<div>
                                        <FormControl name="adminTelephone"
                                                     style={successFormStyle}
                                                     onChange={this.handleAdminPhoneValue}
                                                     placeholder="Ex. 7656"
                                                     value={this.state.adminPhoneValue}
                                                     disabled={this.state.notEditMode}
                                                     required/>
                                    </div>)
                                    :
                                    (<div>
                                        <FormControl name="adminTelephone"
                                                     placeholder="Ex. 7656"
                                                     onChange={this.handleAdminPhoneValue}
                                                     value={this.state.adminPhoneValue}
                                                     disabled={this.state.notEditMode}
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
                                    <FormControl name="staffName"
                                                 style={errorFormStyle}
                                                 onChange={this.handleStaffNameValue}
                                                 placeholder="Ex. Juan Velez"
                                                 value={this.state.staffNameValue}
                                                 disabled={this.state.notEditMode}
                                                 required/>
                                    <HelpBlock style={errorHelpBlockStyle}>Nombre es demasiado largo</HelpBlock>
                                </div>)
                                :
                                (this.state.staffNameValue.length != 0 && /^([a-zA-Z]{2,})\s(([a-zA-Z]*?.?)?\s?)*?([a-zA-Z]{2,})\s?[a-zA-Z]*\s*?$/.test(this.state.staffNameValue) === false) ?
                                    (<div>
                                        <FormControl name="staffName"
                                                     style={errorFormStyle}
                                                     onChange={this.handleStaffNameValue}
                                                     placeholder="Ex. Juan Velez"
                                                     value={this.state.staffNameValue}
                                                     disabled={this.state.notEditMode}
                                                     required/>
                                        <HelpBlock style={errorHelpBlockStyle}>Escriba el nombre y apellido</HelpBlock>
                                    </div>)
                                    :
                                    (this.state.staffNameValue.length < 50 && /^([a-zA-Z]{2,})\s(([a-zA-Z]*?.?)?\s?)*?([a-zA-Z]{2,})\s?[a-zA-Z]*\s*?$/.test(this.state.staffNameValue) === true) ?
                                        (<div>
                                            <FormControl name="staffName"
                                                         style={successFormStyle}
                                                         onChange={this.handleStaffNameValue}
                                                         placeholder="Ex. Juan Velez"
                                                         value={this.state.staffNameValue}
                                                         disabled={this.state.notEditMode}
                                                         required/>
                                        </div>)
                                        :
                                        (<div>
                                            <FormControl name="staffName"
                                                         onChange={this.handleStaffNameValue}
                                                         placeholder="Ex. Juan Velez"
                                                         value={this.state.staffNameValue}
                                                         disabled={this.state.notEditMode}
                                                         required/>
                                        </div>)

                        }
                    </Col>

                    <Col sm={4}>
                        <Col componentClass={ControlLabel}>Correo Electr&oacute;nico</Col>
                        {
                            (/^[a-zA-Z]+\.?[a-zA-Z]+[0-9]*?@(upr.edu|ece.upr.edu|uprm.edu)+$/.test(this.state.staffEmailValue) === false && this.state.staffEmailValue.length != 0) ?
                                (<div>
                                    <FormControl name="staffEmail"
                                                 style={errorFormStyle}
                                                 onChange={this.handleStaffEmailValue}
                                                 placeholder="Ex. juan.velex@upr.edu"
                                                 value={this.state.staffEmailValue}
                                                 disabled={this.state.notEditMode}
                                                 required/>
                                    <HelpBlock style={errorHelpBlockStyle}>Correo debe ser del dominio
                                        @upr.edu</HelpBlock>
                                </div>)
                                :
                                (/^[a-zA-Z]+\.?[a-zA-Z]+[0-9]*?@(upr.edu|ece.upr.edu|uprm.edu)+$/.test(this.state.staffEmailValue) === true) ?
                                    (<div>
                                        <FormControl name="staffEmail"
                                                     onChange={this.handleStaffEmailValue}
                                                     style={successFormStyle}
                                                     placeholder="Ex. juan.velex@upr.edu"
                                                     value={this.state.staffEmailValue}
                                                     disabled={this.state.notEditMode}
                                                     required/>
                                    </div>)
                                    :
                                    (<div>
                                        <FormControl name="staffEmail"
                                                     onChange={this.handleStaffEmailValue}
                                                     placeholder="Ex. juan.velex@upr.edu"
                                                     value={this.state.staffEmailValue}
                                                     disabled={this.state.notEditMode}
                                                     required/>
                                    </div>)
                        }
                    </Col>

                    <Col sm={4}>
                        <Col componentClass={ControlLabel}>Tel&eacute;fono</Col>
                        {
                            (/^(((x)?[0-9]{4})|([0-9]{10}))$/.test(this.state.staffPhoneValue) === false && this.state.staffPhoneValue.length != 0) ?
                                (<div>
                                    <FormControl name="staffTelephone"
                                                 onChange={this.handleStaffPhoneValue}
                                                 style={errorFormStyle}
                                                 placeholder="Ex.5678"
                                                 value={this.state.staffPhoneValue}
                                                 disabled={this.state.notEditMode}
                                                 required/>
                                    <HelpBlock style={errorHelpBlockStyle}>Solo extension (4 digitos) o
                                        numero completo (10 digitos)</HelpBlock>
                                </div>)
                                :
                                (/^(((x)?[0-9]{4})|([0-9]{10}))$/.test(this.state.staffPhoneValue) === true) ?
                                    (<div>
                                        <FormControl name="staffTelephone"
                                                     onChange={this.handleStaffPhoneValue}
                                                     style={successFormStyle}
                                                     placeholder="Ex.5678"
                                                     value={this.state.staffPhoneValue}
                                                     disabled={this.state.notEditMode}
                                                     required/>
                                    </div>)
                                    :
                                    (<div>
                                        <FormControl name="staffTelephone"
                                                     onChange={this.handleStaffPhoneValue}
                                                     placeholder="Ex.5678"
                                                     value={this.state.staffPhoneValue}
                                                     disabled={this.state.notEditMode}
                                                     required/>
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
                                        <FormControl name="studentName"
                                                     style={errorFormStyle}
                                                     onChange={this.handleStudentNameValue}
                                                     placeholder="Ex. Carlos Donato"
                                                     value={this.state.studentNameValue}
                                                     disabled={this.state.notEditMode}
                                                     required/>
                                        <HelpBlock style={errorHelpBlockStyle}>Nombre es demasiado largo</HelpBlock>
                                    </div>)
                                    :
                                    (this.state.studentNameValue.length != 0 && /^([a-zA-Z]{2,})\s(([a-zA-Z]*?.?)?\s?)*?([a-zA-Z]{2,})\s?[a-zA-Z]*\s*?$/.test(this.state.studentNameValue) === false) ?
                                        (<div>
                                            <FormControl name="studentName"
                                                         style={errorFormStyle}
                                                         onChange={this.handleStudentNameValue}
                                                         placeholder="Ex. Carlos Donato"
                                                         value={this.state.studentNameValue}
                                                         disabled={this.state.notEditMode}
                                                         required/>
                                            <HelpBlock style={errorHelpBlockStyle}>Escriba el nombre y
                                                apellido</HelpBlock>
                                        </div>)
                                        :
                                        (this.state.studentNameValue.length < 50 && /^([a-zA-Z]{2,})\s(([a-zA-Z]*?.?)?\s?)*?([a-zA-Z]{2,})\s?[a-zA-Z]*\s*?$/.test(this.state.studentNameValue) === true) ?
                                            (<div>
                                                <FormControl name="studentName"
                                                             style={successFormStyle}
                                                             onChange={this.handleStudentNameValue}
                                                             placeholder="Ex. Carlos Donato"
                                                             value={this.state.studentNameValue}
                                                             disabled={this.state.notEditMode}
                                                             required/>
                                            </div>)
                                            :
                                            (<div>
                                                <FormControl name="studentName"
                                                             onChange={this.handleStudentNameValue}
                                                             placeholder="Ex. Carlos Donato"
                                                             value={this.state.studentNameValue}
                                                             disabled={this.state.notEditMode}
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
                                                     style={errorFormStyle}
                                                     placeholder="Ex. 7875557656"
                                                     value={this.state.studentIdentificationNoValue}
                                                     disabled={this.state.notEditMode}
                                                     required/>
                                        <HelpBlock style={errorHelpBlockStyle}>Escriba el n&uacute;mero de
                                            identificaci&oacute;n sin espacios o gui&oacute;n</HelpBlock>
                                    </div>)
                                    :
                                    (/^([0-9]{9})$/.test(this.state.studentIdentificationNoValue) === false && this.state.studentIdentificationNoValue.length != 0) ?
                                        (<div>
                                            <FormControl name="studentIdentificationNumber"
                                                         onChange={this.handleStudentIdentificationNoValue}
                                                         style={errorFormStyle}
                                                         placeholder="Ex. 7875557656"
                                                         value={this.state.studentIdentificationNoValue}
                                                         disabled={this.state.notEditMode}
                                                         required/>

                                            <HelpBlock style={errorHelpBlockStyle}>Escriba solo n&uacute;
                                                meros</HelpBlock>
                                        </div>)
                                        :
                                        (/^([0-9]{9})$/.test(this.state.studentIdentificationNoValue) === true && this.state.studentIdentificationNoValue.length === 9) ?
                                            (<div>
                                                <FormControl name="studentIdentificationNumber"
                                                             onChange={this.handleStudentIdentificationNoValue}
                                                             style={successFormStyle}
                                                             placeholder="Ex. 7875557656"
                                                             value={this.state.studentIdentificationNoValue}
                                                             disabled={this.state.notEditMode}
                                                             required/>
                                            </div>)
                                            :
                                            (<div>
                                                <FormControl name="studentIdentificationNumber"
                                                             onChange={this.handleStudentIdentificationNoValue}
                                                             placeholder="Ex. 7875557656"
                                                             value={this.state.studentIdentificationNoValue}
                                                             disabled={this.state.notEditMode}
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
                                        <FormControl style={errorFormStyle}
                                                     name="studentAddress1"
                                                     onChange={this.handleStudentAddressValue}
                                                     placeholder="Ex. HC 61 Box 5467"
                                                     value={this.state.studentAddressValue}
                                                     disabled={this.state.notEditMode}
                                                     required/>
                                        <HelpBlock style={errorHelpBlockStyle}>Direcci&oacute;n muy peque&ntilde;
                                            a</HelpBlock>
                                    </div>)
                                    :
                                    (this.state.studentAddressValue.length > 200 && this.state.studentAddressValue.length != 0) ?
                                        (<div>
                                            <FormControl style={errorFormStyle}
                                                         name="studentAddress1"
                                                         onChange={this.handleStudentAddressValue}
                                                         placeholder="Ex. HC 61 Box 5467"
                                                         value={this.state.studentAddressValue}
                                                         disabled={this.state.notEditMode}
                                                         required/>
                                            <HelpBlock style={errorHelpBlockStyle}>Direcci&oacute;n muy
                                                grande</HelpBlock>
                                        </div>)
                                        :
                                        (/^[0-9]+$/.test(this.state.studentAddressValue) === true) ?
                                            (<div>
                                                <FormControl style={errorFormStyle}
                                                             name="studentAddress1"
                                                             onChange={this.handleStudentAddressValue}
                                                             placeholder="Ex. HC 61 Box 5467"
                                                             value={this.state.studentAddressValue}
                                                             disabled={this.state.notEditMode}
                                                             required/>
                                                <HelpBlock style={errorHelpBlockStyle}>Direcci&oacute;n no debe ser solo
                                                    d&iacute;gitos</HelpBlock>
                                            </div>)
                                            :
                                            (/^[`!@#\$%&\*()_+\{}\|:"<>?~,./;'\]a-zA-Z]+$/.test(this.state.studentAddressValue) === true) ?
                                                (<div>
                                                    <FormControl style={errorFormStyle}
                                                                 name="studentAddress1"
                                                                 onChange={this.handleStudentAddressValue}
                                                                 placeholder="Ex. HC 61 Box 5467"
                                                                 value={this.state.studentAddressValue}
                                                                 disabled={this.state.notEditMode}
                                                                 required/>
                                                    <HelpBlock style={errorHelpBlockStyle}>Direcci&oacute;n no deben ser
                                                        s&iacute;mbolos</HelpBlock>
                                                </div>)
                                                :
                                                (this.state.studentAddressValue.length >= 10 && this.state.studentAddressValue.length < 200 &&
                                                    /^[0-9]+$/.test(this.state.studentAddressValue) === false &&
                                                    /^[`!@#\$%&\*()_+\{}\|:"<>?~,./;'\]a-zA-Z]+$/.test(this.state.studentAddressValue) === false) ?
                                                    (<div>
                                                        <FormControl style={successFormStyle}
                                                                     name="studentAddress1"
                                                                     onChange={this.handleStudentAddressValue}
                                                                     placeholder="Ex. HC 61 Box 5467"
                                                                     value={this.state.studentAddressValue}
                                                                     disabled={this.state.notEditMode}
                                                                     required/>
                                                    </div>)
                                                    :
                                                    (<div>
                                                        <FormControl name="studentAddress1"
                                                                     onChange={this.handleStudentAddressValue}
                                                                     placeholder="Ex. HC 61 Box 5467"
                                                                     value={this.state.studentAddressValue}
                                                                     disabled={this.state.notEditMode}
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
                                        <FormControl name="studentAddressCity"
                                                     onChange={this.handleStudentCityValue}
                                                     style={errorFormStyle}
                                                     placeholder="Ex. Bayamon"
                                                     value={this.state.studentCityValue}
                                                     disabled={this.state.notEditMode}
                                                     required/>
                                        <HelpBlock style={errorHelpBlockStyle}> Escriba solo texto</HelpBlock>
                                    </div>)
                                    :
                                    (this.state.studentCityValue.length <= 3 && this.state.studentCityValue.length != 0) ?
                                        (<div>
                                            <FormControl name="studentAddressCity"
                                                         style={errorFormStyle}
                                                         onChange={this.handleStudentCityValue}
                                                         placeholder="Ex. Bayamon"
                                                         value={this.state.studentCityValue}
                                                         disabled={this.state.notEditMode}
                                                         required/>
                                            <HelpBlock style={errorHelpBlockStyle}>Nombre de ciudad muy peque&ntilde;
                                                o</HelpBlock>
                                        </div>)
                                        :
                                        (this.state.studentCityValue.length > 20 && this.state.studentCityValue.length != 0) ?
                                            (<div>
                                                <FormControl name="studentAddressCity"
                                                             style={errorFormStyle}
                                                             placeholder="Ex. Bayamon"
                                                             value={this.state.studentCityValue}
                                                             disabled={this.state.notEditMode}
                                                             required/>
                                                <HelpBlock style={errorHelpBlockStyle}
                                                           onChange={this.handleStudentCityValue}>Nombre de ciudad muy
                                                    grande</HelpBlock>
                                            </div>)
                                            :
                                            (this.state.studentCityValue.length >= 3 && this.state.studentCityValue.length < 20 && /^[a-zA-Z\s?]+$/.test(this.state.studentCityValue) === true) ?
                                                (<div>
                                                    <FormControl name="studentAddressCity"
                                                                 style={successFormStyle}
                                                                 onChange={this.handleStudentCityValue}
                                                                 placeholder="Ex. Bayamon"
                                                                 value={this.state.studentCityValue}
                                                                 disabled={this.state.notEditMode}
                                                                 required/>
                                                </div>)
                                                :
                                                (<div>
                                                    <FormControl name="studentAddressCity"
                                                                 onChange={this.handleStudentCityValue}
                                                                 placeholder="Ex. Bayamon"
                                                                 value={this.state.studentCityValue}
                                                                 disabled={this.state.notEditMode}
                                                                 required/>
                                                </div>)
                            }
                        </Col>

                        <Col sm={3}>
                            <Col componentClass={ControlLabel}>Pa&iacute;s</Col>
                            {/*                            {
                                (/^[a-zA-Z\s?]+$/.test(this.state.studentCountryValue) === false && this.state.studentCountryValue.length != 0) ?
                                    (<div>
                                        <FormControl name="studentAddressCountry" style={errorFormStyle}
                                                     onChange={this.handleStudentCountryValue}
                                                     placeholder="Ex. Puerto Rico" required/>
                                        <HelpBlock style={errorHelpBlockStyle}>Escriba solo texto</HelpBlock>
                                    </div>)
                                    :
                                    (/^(Puerto Rico)|(PR)|(pr)|(Pr)|(pR)$/.test(this.state.studentCountryValue) === false && this.state.studentCountryValue.length != 0) ?
                                        (<div>
                                            <FormControl name="studentAddressCountry" style={errorFormStyle}
                                                         onChange={this.handleStudentCountryValue}
                                                         placeholder="Ex. Puerto Rico" required/>
                                            <HelpBlock style={errorHelpBlockStyle}>Pa&iacute;s debe ser Puerto Rico o
                                                PR</HelpBlock>
                                        </div>)
                                        :
                                        (/^(Puerto Rico)|(PR)|(pr)|(Pr)|(pR)$/.test(this.state.studentCountryValue) === true && /^[a-zA-Z\s?]+$/.test(this.state.studentCountryValue) === true) ?
                                            (<div>
                                                <FormControl name="studentAddressCountry" style={successFormStyle}
                                                             onChange={this.handleStudentCountryValue}
                                                             placeholder="Ex. Puerto Rico" required/>
                                            </div>)
                                            :
                                            (<div>
                                                <FormControl name="studentAddressCountry"
                                                             onChange={this.handleStudentCountryValue}
                                                             placeholder="Ex. Puerto Rico" value="Puerto Rico" disabled/>
                                            </div>)
                            }*/}
                            <FormControl name="studentAddressCountry" value="Puerto Rico" disabled/>
                        </Col>

                        <Col sm={3}>
                            <Col componentClass={ControlLabel}>C&oacute;digo Postal</Col>
                            {
                                (/^([0-9]{5})$/.test(this.state.studentZipCodeValue) === false && this.state.studentZipCodeValue.length != 0) ?
                                    (<div>
                                        <FormControl name="studentAddressZipCode"
                                                     style={errorFormStyle}
                                                     onChange={this.handleStudentZipCodeValue}
                                                     placeholder="Ex. 00922"
                                                     value={this.state.studentZipCodeValue}
                                                     disabled={this.state.notEditMode}
                                                     required/>
                                        <HelpBlock style={errorHelpBlockStyle}>C&oacute;digo Postal debe ser 5 d&iacute;
                                            gitos num&eacute;ricos</HelpBlock>
                                    </div>)
                                    :
                                    (/^([0-9]{5})$/.test(this.state.studentZipCodeValue) === true) ?
                                        (<div>
                                            <FormControl name="studentAddressZipCode"
                                                         style={successFormStyle}
                                                         onChange={this.handleStudentZipCodeValue}
                                                         placeholder="Ex. 00922"
                                                         value={this.state.studentZipCodeValue}
                                                         disabled={this.state.notEditMode}
                                                         required/>
                                        </div>)
                                        :
                                        (<div>
                                            <FormControl name="studentAddressZipCode"
                                                         onChange={this.handleStudentZipCodeValue}
                                                         placeholder="Ex. 00922"
                                                         value={this.state.studentZipCodeValue}
                                                         disabled={this.state.notEditMode}
                                                         required/>
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
                                        <FormControl name="studentTelephone"
                                                     style={errorFormStyle}
                                                     onChange={this.handleStudentPhoneValue}
                                                     placeholder="Ex. 4567"
                                                     value={this.state.studentPhoneValue}
                                                     disabled={this.state.notEditMode}
                                                     required/>
                                        <HelpBlock style={errorHelpBlockStyle}>Tel&acute;fono debe ser 10 d&iacute;
                                            gitos</HelpBlock>
                                    </div>)
                                    :
                                    (/^(([0-9]{10}))$/.test(this.state.studentPhoneValue) === true) ?
                                        (<div>
                                            <FormControl name="studentTelephone"
                                                         style={successFormStyle}
                                                         onChange={this.handleStudentPhoneValue}
                                                         placeholder="Ex. 4567"
                                                         value={this.state.studentPhoneValue}
                                                         disabled={this.state.notEditMode}
                                                         required/>
                                        </div>)
                                        :
                                        (<div>
                                            <FormControl name="studentTelephone"
                                                         onChange={this.handleStudentPhoneValue}
                                                         placeholder="Ex. 4567"
                                                         value={this.state.studentPhoneValue}
                                                         disabled={this.state.notEditMode}
                                                         required/>
                                        </div>)
                            }
                        </Col>

                        <Col sm={4}>
                            <Col componentClass={ControlLabel}>Correo Electr&oacute;nico</Col>
                            {
                                (/^[a-zA-Z]+\.?[a-zA-Z]+[0-9]*?@(upr.edu|ece.upr.edu|uprm.edu)+$/.test(this.state.studentEmailValue) === false && this.state.studentEmailValue.length != 0) ?
                                    (<div>
                                        <FormControl name="studentEmail"
                                                     style={errorFormStyle}
                                                     onChange={this.handleStudentEmailValue}
                                                     placeholder="Ex. carlos.donato@upr.edu"
                                                     value={this.state.studentEmailValue}
                                                     disabled={this.state.notEditMode}
                                                     required/>
                                        <HelpBlock style={errorHelpBlockStyle}>Correo debe ser del dominio
                                            @upr.edu</HelpBlock>
                                    </div>)
                                    :
                                    (/^[a-zA-Z]+\.?[a-zA-Z]+[0-9]*?@(upr.edu|ece.upr.edu|uprm.edu)+$/.test(this.state.studentEmailValue) === true) ?
                                        (<div>
                                            <FormControl name="studentEmail"
                                                         style={successFormStyle}
                                                         onChange={this.handleStudentEmailValue}
                                                         placeholder="Ex. carlos.donato@upr.edu"
                                                         value={this.state.studentEmailValue}
                                                         disabled={this.state.notEditMode}
                                                         required/>
                                        </div>)
                                        :
                                        (<div>
                                            <FormControl name="studentEmail"
                                                         onChange={this.handleStudentEmailValue}
                                                         placeholder="Ex. carlos.donato@upr.edu"
                                                         value={this.state.studentEmailValue}
                                                         disabled={this.state.notEditMode}
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
                            (/^([a-zA-Z]{2,})\s(([a-zA-Z]*?.?)?\s?)*?([a-zA-Z]{2,})\s?[a-zA-Z]*\s*?$/.test(this.state.counselorNameValue) === false && this.state.counselorNameValue.length != 0) ?
                                (<div>
                                    <FormControl name="organizationCounselorName"
                                                 placeholder="Ex. Raymond Lopez"
                                                 onChange={this.handleCounselorNameValue}
                                                 style={errorFormStyle}
                                                 value={this.state.counselorNameValue}
                                                 disabled={this.state.notEditMode}
                                                 required/>
                                    <HelpBlock style={errorHelpBlockStyle}>Escriba el nombre con los dos
                                        apellidos</HelpBlock>
                                </div>)
                                :
                                (this.state.counselorNameValue.length < 50 && /^([a-zA-Z]{2,})\s(([a-zA-Z]*?.?)?\s?)*?([a-zA-Z]{2,})\s?[a-zA-Z]*\s*?$/.test(this.state.counselorNameValue) === true) ?
                                    (<div>
                                        <FormControl name="organizationCounselorName"
                                                     placeholder="Ex. Raymond Lopez"
                                                     onChange={this.handleCounselorNameValue}
                                                     style={successFormStyle}
                                                     value={this.state.counselorNameValue}
                                                     disabled={this.state.notEditMode}
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
                                                             value={this.state.counselorNameValue}
                                                             disabled={this.state.notEditMode}
                                                             required/>
                                                <HelpBlock style={{color: '#B74442'}}>Nombre muy
                                                    largo</HelpBlock>

                                            </div>)
                                            :
                                            (<div>
                                                <FormControl name="organizationCounselorName"
                                                             placeholder="Ex. Raymond Lopez"
                                                             onChange={this.handleCounselorNameValue}
                                                             value={this.state.counselorNameValue}
                                                             disabled={this.state.notEditMode}
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
                                                 onChange={this.handleCounselorEmailValue}
                                                 style={errorFormStyle}
                                                 value={this.state.counselorEmailValue}
                                                 disabled={this.state.notEditMode}
                                                 required/>
                                    <HelpBlock style={errorHelpBlockStyle}>Correo debe ser del dominio
                                        @upr.edu</HelpBlock>
                                </div>)
                                :
                                (/^[a-zA-Z]+\.?[a-zA-Z]+[0-9]*?@(upr.edu|ece.upr.edu|uprm.edu)+$/.test(this.state.counselorEmailValue) === true) ?
                                    (<div>
                                        <FormControl name="organizationCounselorEmail"
                                                     placeholder="Ex. raymond.lopez@upr.edu"
                                                     onChange={this.handleCounselorEmailValue}
                                                     style={successFormStyle}
                                                     value={this.state.counselorEmailValue}
                                                     disabled={this.state.notEditMode}
                                                     required/>
                                    </div>)
                                    :
                                    (<div>
                                        <FormControl name="organizationCounselorEmail"
                                                     placeholder="Ex. raymond.lopez@upr.edu"
                                                     onChange={this.handleCounselorEmailValue}
                                                     value={this.state.counselorEmailValue}
                                                     disabled={this.state.notEditMode}
                                                     required/>
                                    </div>)
                        }
                    </Col>

                    <Col sm={4}>
                        <Col componentClass={ControlLabel}>Tel&eacute;fono</Col>
                        {
                            (/^(((x)?[0-9]{4})|([0-9]{10}))$/.test(this.state.counselorPhoneValue) === false && this.state.counselorPhoneValue.length != 0) ?
                                (<div>
                                    <FormControl name="organizationCounselorTelephone"
                                                 type="text"
                                                 placeholder="Ex. 7266"
                                                 onChange={this.handleCounselorPhoneValue}
                                                 style={errorFormStyle}
                                                 value={this.state.counselorPhoneValue}
                                                 disabled={this.state.notEditMode}
                                                 required/>
                                    <HelpBlock style={errorHelpBlockStyle}>Solo extension (4 digitos) o
                                        numero completo (10 digitos)</HelpBlock>
                                </div>)
                                :
                                (/^(((x)?[0-9]{4})|([0-9]{10}))$/.test(this.state.counselorPhoneValue) === true) ?
                                    (<div>
                                        <FormControl name="organizationCounselorTelephone"
                                                     type="text"
                                                     placeholder="Ex. 7266"
                                                     onChange={this.handleCounselorPhoneValue}
                                                     style={successFormStyle}
                                                     value={this.state.counselorPhoneValue}
                                                     disabled={this.state.notEditMode}
                                                     required/>
                                    </div>)
                                    :
                                    (<div>
                                        <FormControl name="organizationCounselorTelephone"
                                                     type="text"
                                                     placeholder="Ex. 7266"
                                                     onChange={this.handleCounselorPhoneValue}
                                                     value={this.state.counselorPhoneValue}
                                                     disabled={this.state.notEditMode}
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
                                                 onChange={this.handleCounselorFacultyValue}
                                                 style={errorFormStyle}
                                                 value={this.state.counselorFacultyValue}
                                                 disabled={this.state.notEditMode}
                                                 required/>
                                    <HelpBlock style={errorHelpBlockStyle}>Nombre de la facultad muy
                                        largo</HelpBlock>
                                </div>)
                                :
                                (/^([a-zA-Z\s?])+$/.test(this.state.counselorFacultyValue) === false && this.state.counselorFacultyValue.length != 0 ) ?
                                    (<div>
                                        <FormControl name="organizationCounselorFaculty"
                                                     placeholder="Ex. Ingenieria"
                                                     onChange={this.handleCounselorFacultyValue}
                                                     style={errorFormStyle}
                                                     value={this.state.counselorFacultyValue}
                                                     disabled={this.state.notEditMode}
                                                     required/>
                                        <HelpBlock style={errorHelpBlockStyle}>Solo texto</HelpBlock>
                                    </div>)
                                    :
                                    (/^([a-zA-Z\s?])+$/.test(this.state.counselorFacultyValue) === true && this.state.counselorFacultyValue.length <= 50 && this.state.counselorFacultyValue.length != 0 ) ?
                                        (<div>
                                            <FormControl name="organizationCounselorFaculty"
                                                         placeholder="Ex. Ingenieria"
                                                         onChange={this.handleCounselorFacultyValue}
                                                         style={successFormStyle}
                                                         value={this.state.counselorFacultyValue}
                                                         disabled={this.state.notEditMode}
                                                         required/>
                                        </div>)
                                        :
                                        (<div>
                                            <FormControl name="organizationCounselorFaculty"
                                                         placeholder="Ex. Ingenieria"
                                                         onChange={this.handleCounselorFacultyValue}
                                                         value={this.state.counselorFacultyValue}
                                                         disabled={this.state.notEditMode}
                                                         required/>
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
                                                 onChange={this.handleCounselorDepartmentValue}
                                                 style={errorFormStyle}
                                                 value={this.state.counselorDepartmentValue}
                                                 disabled={this.state.notEditMode}
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
                                                     style={errorFormStyle}
                                                     value={this.state.counselorDepartmentValue}
                                                     disabled={this.state.notEditMode}
                                                     required/>
                                        <HelpBlock style={errorHelpBlockStyle}>Solo texto</HelpBlock>

                                    </div>)
                                    :
                                    (/^([a-zA-Z\s?])+$/.test(this.state.counselorDepartmentValue) === true && this.state.counselorDepartmentValue.length <= 50 && this.state.counselorDepartmentValue.length != 0 ) ?
                                        (<div>
                                            <FormControl name="organizationCounselorDepartment"
                                                         placeholder="Ex. Ingenieria de Computadoras"
                                                         onChange={this.handleCounselorDepartmentValue}
                                                         style={successFormStyle}
                                                         value={this.state.counselorDepartmentValue}
                                                         disabled={this.state.notEditMode}
                                                         required/>

                                        </div>)
                                        :
                                        (<div>
                                            <FormControl name="organizationCounselorDepartment"
                                                         placeholder="Ex. Ingenieria de Computadoras"
                                                         onChange={this.handleCounselorDepartmentValue}
                                                         value={this.state.counselorDepartmentValue}
                                                         disabled={this.state.notEditMode}
                                                         required/>
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
                                                 onChange={this.handleCounselorOfficeValue}
                                                 style={errorFormStyle}
                                                 value={this.state.counselorOfficeValue}
                                                 disabled={this.state.notEditMode}
                                                 required/>
                                    <HelpBlock style={errorHelpBlockStyle}>Numero de oficina muy
                                        largo</HelpBlock>

                                </div>)
                                :
                                (this.state.counselorOfficeValue.length === 1) ?
                                    (<div>
                                        <FormControl name="organizationCounselorOfficeNumber"
                                                     placeholder="Ex. S-113"
                                                     onChange={this.handleCounselorOfficeValue}
                                                     style={errorFormStyle}
                                                     value={this.state.counselorOfficeValue}
                                                     disabled={this.state.notEditMode}
                                                     required/>
                                        <HelpBlock style={errorHelpBlockStyle}>Numero de oficina muy pequeno</HelpBlock>

                                    </div>)
                                    :
                                    (/^[`!@#\$%\^&\*()_+{}\|:"<>?~,./;'[\]\\]+$/.test(this.state.counselorOfficeValue) === true) ?
                                        (<div>
                                            <FormControl name="organizationCounselorOfficeNumber"
                                                         placeholder="Ex. S-113"
                                                         onChange={this.handleCounselorOfficeValue}
                                                         style={errorFormStyle}
                                                         value={this.state.counselorOfficeValue}
                                                         disabled={this.state.notEditMode}
                                                         required/>
                                            <HelpBlock style={errorHelpBlockStyle}>Oficina no puede ser solo
                                                simbolos</HelpBlock>
                                        </div>)
                                        :
                                        (/^[`!@#\$%\^&\*()_+{}\|:"<>?~,./;'[\]\\]+$/.test(this.state.counselorOfficeValue) === false && this.state.counselorOfficeValue.length < 15 && this.state.counselorOfficeValue.length != 0 ) ?
                                            (<div>
                                                <FormControl name="organizationCounselorOfficeNumber"
                                                             placeholder="Ex. S-113"
                                                             onChange={this.handleCounselorOfficeValue}
                                                             style={successFormStyle}
                                                             value={this.state.counselorOfficeValue}
                                                             disabled={this.state.notEditMode}
                                                             required/>
                                            </div>)
                                            :
                                            (<div>
                                                <FormControl name="organizationCounselorOfficeNumber"
                                                             placeholder="Ex. S-113"
                                                             onChange={this.handleCounselorOfficeValue}
                                                             value={this.state.counselorOfficeValue}
                                                             disabled={this.state.notEditMode}
                                                             required/>
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
                            (/^([a-zA-Z]{2,})\s(([a-zA-Z]*?.?)?\s?)*?([a-zA-Z]{2,})\s?[a-zA-Z]*\s*?$/.test(this.state.managerNameValue) === false && this.state.managerNameValue.length != 0) ?
                                (<div>
                                    <FormControl name="managerName" style={errorFormStyle}
                                                 onChange={this.handleManagerNameValue}
                                                 placeholder="Ex. Heribero Bourdon"
                                                 value={this.state.managerNameValue}
                                                 disabled={this.state.notEditMode}
                                                 required
                                    />
                                    <HelpBlock style={errorHelpBlockStyle}>Escriba el nombre con los dos
                                        apellidos</HelpBlock>
                                </div>)
                                :
                                (this.state.managerNameValue.length > 50) ?
                                    (<div>
                                        <FormControl name="managerName" style={errorFormStyle}
                                                     onChange={this.handleManagerNameValue}
                                                     placeholder="Ex. Heribero Bourdon"
                                                     value={this.state.managerNameValue}
                                                     disabled={this.state.notEditMode}
                                                     required
                                        />
                                        <HelpBlock style={errorHelpBlockStyle}>Nombre muy largo</HelpBlock>
                                    </div>)
                                    :
                                    (this.state.managerNameValue.length < 50 &&
                                        /^([a-zA-Z]{2,})\s(([a-zA-Z]*?.?)?\s?)*?([a-zA-Z]{2,})\s?[a-zA-Z]*\s*?$/.test(this.state.managerNameValue) === true) ?
                                        (<div>
                                            <FormControl name="managerName" style={successFormStyle}
                                                         onChange={this.handleManagerNameValue}
                                                         placeholder="Ex. Heribero Bourdon"
                                                         value={this.state.managerNameValue}
                                                         disabled={this.state.notEditMode}
                                                         required
                                            />
                                        </div>)
                                        :
                                        (<div>
                                            <FormControl name="managerName" onChange={this.handleManagerNameValue}
                                                         placeholder="Ex. Heribero Bourdon"
                                                         disabled={this.state.notEditMode}
                                                         required
                                            />
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
                                                 placeholder="Ex. heriberto.bourdon@upr.edu"
                                                 value={this.state.managerEmailValue}
                                                 disabled={this.state.notEditMode}
                                                 required
                                    />
                                    <HelpBlock style={errorHelpBlockStyle}>Correo debe ser del dominio
                                        @upr.edu</HelpBlock>
                                </div>)
                                :
                                (/^[a-zA-Z]+\.?[a-zA-Z]+[0-9]*?@(upr.edu|ece.upr.edu|uprm.edu)+$/.test(this.state.managerEmailValue) === true) ?
                                    (<div>
                                        <FormControl name="managerEmail" style={successFormStyle}
                                                     onChange={this.handleManagerEmailValue}
                                                     placeholder="Ex. heriberto.bourdon@upr.edu"
                                                     value={this.state.managerEmailValue}
                                                     disabled={this.state.notEditMode}
                                                     required
                                        />
                                    </div>)
                                    :
                                    (<div>
                                        <FormControl name="managerEmail" onChange={this.handleManagerEmailValue}
                                                     placeholder="Ex. heriberto.bourdon@upr.edu"
                                                     value={this.state.managerEmailValue}
                                                     disabled={this.state.notEditMode}
                                                     required
                                        />
                                    </div>)
                        }
                    </Col>

                    <Col sm={4}>
                        <Col componentClass={ControlLabel} required>Tel&eacute;fono</Col>
                        {
                            (/^(((x)?[0-9]{4})|([0-9]{10}))$/.test(this.state.managerPhoneValue) === false && this.state.managerPhoneValue.length != 0) ?
                                (<div>
                                    <FormControl name="managerTelephone"
                                                 style={errorFormStyle}
                                                 onChange={this.handleManagerPhoneValue}
                                                 placeholder="Ex. 7651"
                                                 value={this.state.managerPhoneValue}
                                                 disabled={this.state.notEditMode}
                                                 required
                                    />
                                    <HelpBlock style={errorHelpBlockStyle}>Solo extension (4 digitos) o
                                        numero completo (10 digitos)</HelpBlock>
                                </div>)
                                :
                                (/^(((x)?[0-9]{4})|([0-9]{10}))$/.test(this.state.managerPhoneValue) === true) ?
                                    (<div>
                                        <FormControl name="managerTelephone"
                                                     style={successFormStyle}
                                                     onChange={this.handleManagerPhoneValue}
                                                     placeholder="Ex. 7651"
                                                     value={this.state.managerPhoneValue}
                                                     disabled={this.state.notEditMode}
                                                     required
                                        />
                                    </div>)
                                    :
                                    (<div>
                                        <FormControl name="managerTelephone"
                                                     onChange={this.handleManagerPhoneValue}
                                                     placeholder="Ex. 7651"
                                                     value={this.state.managerPhoneValue}
                                                     disabled={this.state.notEditMode}
                                                     required
                                        />
                                    </div>)
                        }
                    </Col>
                </FormGroup>
            </Form>
        )

        // const adminFields = (
        //     <Form horizontal onSubmit={this.onSubmit} name="newAdmin">
        //
        //         <FormGroup>
        //             <Col sm={4}>
        //                 <Col componentClass={ControlLabel}>Nombre</Col>
        //                 {
        //                     (this.state.adminNameValue.length > 50) ?
        //                         (<div>
        //                             <FormControl name="adminName" onChange={this.handleAdminNameValue}
        //                                          style={errorFormStyle} placeholder="Ex. Maria Cruz" required/>
        //                             <HelpBlock style={errorHelpBlockStyle}>Nombre es demasiado largo</HelpBlock>
        //                         </div>)
        //                         :
        //                         (this.state.adminNameValue.length != 0 && /^([a-zA-Z]{2,})\s(([a-zA-Z]*?.?)?\s?)*?([a-zA-Z]{2,})\s?[a-zA-Z]*\s*?$/.test(this.state.adminNameValue) === false) ?
        //                             (<div>
        //                                 <FormControl name="adminName" onChange={this.handleAdminNameValue}
        //                                              style={errorFormStyle} placeholder="Ex. Maria Cruz" required/>
        //                                 <HelpBlock style={errorHelpBlockStyle}>Escriba el nombre y apellido</HelpBlock>
        //                             </div>)
        //                             :
        //                             (this.state.adminNameValue.length < 50 && /^([a-zA-Z]{2,})\s(([a-zA-Z]*?.?)?\s?)*?([a-zA-Z]{2,})\s?[a-zA-Z]*\s*?$/.test(this.state.adminNameValue) === true) ?
        //                                 (<div>
        //                                     <FormControl name="adminName" onChange={this.handleAdminNameValue}
        //                                                  style={successFormStyle} placeholder="Ex. Maria Cruz"
        //                                                  required/>
        //                                 </div>)
        //                                 :
        //                                 (<div>
        //                                     <FormControl name="adminName" placeholder="Ex. Maria Cruz"
        //                                                  onChange={this.handleAdminNameValue}
        //                                                  required/>
        //                                 </div>)
        //                 }
        //             </Col>
        //
        //             <Col sm={4}>
        //                 <Col componentClass={ControlLabel}>Correo Electr&oacute;nico</Col>
        //                 {
        //                     (/^[a-zA-Z]+\.?[a-zA-Z]+[0-9]*?@(upr.edu|ece.upr.edu|uprm.edu)+$/.test(this.state.adminEmailValue) === false && this.state.adminEmailValue.length != 0) ?
        //                         (<div>
        //                             <FormControl name="adminEmail" onChange={this.handleAdminEmailValue}
        //                                          style={errorFormStyle} placeholder="Ex. maria.cruz@upr.edu" required/>
        //                             <HelpBlock style={errorHelpBlockStyle}>Correo debe ser del dominio
        //                                 @upr.edu</HelpBlock>
        //                         </div>)
        //                         :
        //                         (/^[a-zA-Z]+\.?[a-zA-Z]+[0-9]*?@(upr.edu|ece.upr.edu|uprm.edu)+$/.test(this.state.adminEmailValue) === true) ?
        //                             (<div>
        //                                 <FormControl name="adminEmail" onChange={this.handleAdminEmailValue}
        //                                              style={successFormStyle} placeholder="Ex. maria.cruz@upr.edu"
        //                                              required/>
        //                             </div>)
        //                             :
        //                             (<div>
        //                                 <FormControl name="adminEmail" onChange={this.handleAdminEmailValue}
        //                                              placeholder="Ex. maria.cruz@upr.edu" required/>
        //                             </div>)
        //                 }
        //             </Col>
        //
        //             <Col sm={4}>
        //                 <Col componentClass={ControlLabel}>Tel&eacute;fono</Col>
        //                 {
        //                     (/^(((x)?[0-9]{4})|([0-9]{10}))$/.test(this.state.adminPhoneValue) === false && this.state.adminPhoneValue.length != 0) ?
        //                         (<div>
        //                             <FormControl name="adminTelephone" style={errorFormStyle}
        //                                          onChange={this.handleAdminPhoneValue} placeholder="Ex. 7656" required/>
        //                             <HelpBlock style={errorHelpBlockStyle}>Solo extension (4 digitos) o
        //                                 numero completo (10 digitos)</HelpBlock>
        //                         </div>)
        //                         :
        //                         (/^(((x)?[0-9]{4})|([0-9]{10}))$/.test(this.state.adminPhoneValue) === true) ?
        //                             (<div>
        //                                 <FormControl name="adminTelephone" style={successFormStyle}
        //                                              onChange={this.handleAdminPhoneValue} placeholder="Ex. 7656"
        //                                              required/>
        //                             </div>)
        //                             :
        //                             (<div>
        //                                 <FormControl name="adminTelephone" placeholder="Ex. 7656"
        //                                              onChange={this.handleAdminPhoneValue}
        //                                              required/>
        //                             </div>)
        //                 }
        //             </Col>
        //         </FormGroup>
        //     </Form>
        // )
        //
        // const staffFields = (
        //     <Form horizontal onSubmit={this.onSubmit} name="newStaff">
        //
        //         <FormGroup>
        //
        //             <Col sm={4}>
        //                 <Col componentClass={ControlLabel}>Nombre</Col>
        //                 {
        //                     (this.state.staffNameValue.length > 50) ?
        //                         (<div>
        //                             <FormControl name="staffName" style={errorFormStyle}
        //                                          onChange={this.handleStaffNameValue} placeholder="Ex. Juan Velez"
        //                                          required/>
        //                             <HelpBlock style={errorHelpBlockStyle}>Nombre es demasiado largo</HelpBlock>
        //                         </div>)
        //                         :
        //                         (this.state.staffNameValue.length != 0 && /^([a-zA-Z]{2,})\s(([a-zA-Z]*?.?)?\s?)*?([a-zA-Z]{2,})\s?[a-zA-Z]*\s*?$/.test(this.state.staffNameValue) === false) ?
        //                             (<div>
        //                                 <FormControl name="staffName" style={errorFormStyle}
        //                                              onChange={this.handleStaffNameValue} placeholder="Ex. Juan Velez"
        //                                              required/>
        //                                 <HelpBlock style={errorHelpBlockStyle}>Escriba el nombre y apellido</HelpBlock>
        //                             </div>)
        //                             :
        //                             (this.state.staffNameValue.length < 50 && /^([a-zA-Z]{2,})\s(([a-zA-Z]*?.?)?\s?)*?([a-zA-Z]{2,})\s?[a-zA-Z]*\s*?$/.test(this.state.staffNameValue) === true) ?
        //                                 (<div>
        //                                     <FormControl name="staffName" style={successFormStyle}
        //                                                  onChange={this.handleStaffNameValue}
        //                                                  placeholder="Ex. Juan Velez" required/>
        //                                 </div>)
        //                                 :
        //                                 (<div>
        //                                     <FormControl name="staffName" onChange={this.handleStaffNameValue}
        //                                                  placeholder="Ex. Juan Velez" required/>
        //                                 </div>)
        //
        //                 }
        //             </Col>
        //
        //             <Col sm={4}>
        //                 <Col componentClass={ControlLabel}>Correo Electr&oacute;nico</Col>
        //                 {
        //                     (/^[a-zA-Z]+\.?[a-zA-Z]+[0-9]*?@(upr.edu|ece.upr.edu|uprm.edu)+$/.test(this.state.staffEmailValue) === false && this.state.staffEmailValue.length != 0) ?
        //                         (<div>
        //                             <FormControl name="staffEmail" style={errorFormStyle}
        //                                          onChange={this.handleStaffEmailValue}
        //                                          placeholder="Ex. juan.velex@upr.edu" required/>
        //                             <HelpBlock style={errorHelpBlockStyle}>Correo debe ser del dominio
        //                                 @upr.edu</HelpBlock>
        //                         </div>)
        //                         :
        //                         (/^[a-zA-Z]+\.?[a-zA-Z]+[0-9]*?@(upr.edu|ece.upr.edu|uprm.edu)+$/.test(this.state.staffEmailValue) === true) ?
        //                             (<div>
        //                                 <FormControl name="staffEmail" onChange={this.handleStaffEmailValue}
        //                                              style={successFormStyle} placeholder="Ex. juan.velex@upr.edu"
        //                                              required/>
        //                             </div>)
        //                             :
        //                             (<div>
        //                                 <FormControl name="staffEmail" onChange={this.handleStaffEmailValue}
        //                                              placeholder="Ex. juan.velex@upr.edu" required/>
        //                             </div>)
        //                 }
        //             </Col>
        //
        //             <Col sm={4}>
        //                 <Col componentClass={ControlLabel}>Tel&eacute;fono</Col>
        //                 {
        //                     (/^(((x)?[0-9]{4})|([0-9]{10}))$/.test(this.state.staffPhoneValue) === false && this.state.staffPhoneValue.length != 0) ?
        //                         (<div>
        //                             <FormControl name="staffTelephone" onChange={this.handleStaffPhoneValue}
        //                                          style={errorFormStyle} placeholder="Ex.5678" required/>
        //                             <HelpBlock style={errorHelpBlockStyle}>Solo extension (4 digitos) o
        //                                 numero completo (10 digitos)</HelpBlock>
        //                         </div>)
        //                         :
        //                         (/^(((x)?[0-9]{4})|([0-9]{10}))$/.test(this.state.staffPhoneValue) === true) ?
        //                             (<div>
        //                                 <FormControl name="staffTelephone" onChange={this.handleStaffPhoneValue}
        //                                              style={successFormStyle} placeholder="Ex.5678" required/>
        //                             </div>)
        //                             :
        //                             (<div>
        //                                 <FormControl name="staffTelephone" onChange={this.handleStaffPhoneValue}
        //                                              placeholder="Ex.5678" required/>
        //                             </div>)
        //                 }
        //             </Col>
        //         </FormGroup>
        //     </Form>
        // )
        //
        // const studentFields = (
        //     <div>
        //         <Form horizontal onSubmit={this.onSubmit} name="newStudent">
        //             <FormGroup>
        //                 <Col sm={4}>
        //                     <Col componentClass={ControlLabel}>Nombre</Col>
        //                     {
        //                         (this.state.studentNameValue.length > 50) ?
        //                             (<div>
        //                                 <FormControl name="studentName" style={errorFormStyle}
        //                                              onChange={this.handleStudentNameValue}
        //                                              placeholder="Ex. Carlos Donato"
        //                                              required/>
        //                                 <HelpBlock style={errorHelpBlockStyle}>Nombre es demasiado largo</HelpBlock>
        //                             </div>)
        //                             :
        //                             (this.state.studentNameValue.length != 0 && /^([a-zA-Z]{2,})\s(([a-zA-Z]*?.?)?\s?)*?([a-zA-Z]{2,})\s?[a-zA-Z]*\s*?$/.test(this.state.studentNameValue) === false) ?
        //                                 (<div>
        //                                     <FormControl name="studentName" style={errorFormStyle}
        //                                                  onChange={this.handleStudentNameValue}
        //                                                  placeholder="Ex. Carlos Donato"
        //                                                  required/>
        //                                     <HelpBlock style={errorHelpBlockStyle}>Escriba el nombre y
        //                                         apellido</HelpBlock>
        //                                 </div>)
        //                                 :
        //                                 (this.state.studentNameValue.length < 50 && /^([a-zA-Z]{2,})\s(([a-zA-Z]*?.?)?\s?)*?([a-zA-Z]{2,})\s?[a-zA-Z]*\s*?$/.test(this.state.studentNameValue) === true) ?
        //                                     (<div>
        //                                         <FormControl name="studentName" style={successFormStyle}
        //                                                      onChange={this.handleStudentNameValue}
        //                                                      placeholder="Ex. Carlos Donato"
        //                                                      required/>
        //                                     </div>)
        //                                     :
        //                                     (<div>
        //                                         <FormControl name="studentName" onChange={this.handleStudentNameValue}
        //                                                      placeholder="Ex. Carlos Donato"
        //                                                      required/>
        //                                     </div>)
        //                     }
        //                 </Col>
        //
        //                 <Col sm={4}>
        //                     <Col componentClass={ControlLabel}>N&uacute;m. de identificaci&oacute;n</Col>
        //                     {
        //                         ((this.state.studentIdentificationNoValue.length > 9 || this.state.studentIdentificationNoValue.length < 9) && this.state.studentIdentificationNoValue.length != 0) ?
        //                             (<div>
        //                                 <FormControl name="studentIdentificationNumber"
        //                                              onChange={this.handleStudentIdentificationNoValue}
        //                                              style={errorFormStyle} placeholder="Ex. 7875557656"
        //                                              required/>
        //                                 <HelpBlock style={errorHelpBlockStyle}>Escriba el n&uacute;mero de
        //                                     identificaci&oacute;n sin espacios o gui&oacute;n</HelpBlock>
        //                             </div>)
        //                             :
        //                             (/^([0-9]{9})$/.test(this.state.studentIdentificationNoValue) === false && this.state.studentIdentificationNoValue.length != 0) ?
        //                                 (<div>
        //                                     <FormControl name="studentIdentificationNumber"
        //                                                  onChange={this.handleStudentIdentificationNoValue}
        //                                                  style={errorFormStyle} placeholder="Ex. 7875557656"
        //                                                  required/>
        //                                     <HelpBlock style={errorHelpBlockStyle}>Escriba solo n&uacute;
        //                                         meros</HelpBlock>
        //                                 </div>)
        //                                 :
        //                                 (/^([0-9]{9})$/.test(this.state.studentIdentificationNoValue) === true && this.state.studentIdentificationNoValue.length === 9) ?
        //                                     (<div>
        //                                         <FormControl name="studentIdentificationNumber"
        //                                                      onChange={this.handleStudentIdentificationNoValue}
        //                                                      style={successFormStyle} placeholder="Ex. 7875557656"
        //                                                      required/>
        //                                     </div>)
        //                                     :
        //                                     (<div>
        //                                         <FormControl name="studentIdentificationNumber"
        //                                                      onChange={this.handleStudentIdentificationNoValue}
        //                                                      placeholder="Ex. 7875557656"
        //                                                      required/>
        //                                     </div>)
        //                     }
        //                 </Col>
        //
        //             </FormGroup>
        //
        //             <FormGroup>
        //                 <Col sm={10}>
        //                     <Col componentClass={ControlLabel}>Direcci&oacute;n</Col>
        //                     {
        //                         (this.state.studentAddressValue.length < 10 && this.state.studentAddressValue.length != 0) ?
        //                             (<div>
        //                                 <FormControl style={errorFormStyle} name="studentAddress1"
        //                                              onChange={this.handleStudentAddressValue}
        //                                              placeholder="Ex. HC 61 Box 5467" required/>
        //                                 <HelpBlock style={errorHelpBlockStyle}>Direcci&oacute;n muy peque&ntilde;
        //                                     a</HelpBlock>
        //                             </div>)
        //                             :
        //                             (this.state.studentAddressValue.length > 200 && this.state.studentAddressValue.length != 0) ?
        //                                 (<div>
        //                                     <FormControl style={errorFormStyle} name="studentAddress1"
        //                                                  onChange={this.handleStudentAddressValue}
        //                                                  placeholder="Ex. HC 61 Box 5467" required/>
        //                                     <HelpBlock style={errorHelpBlockStyle}>Direcci&oacute;n muy
        //                                         grande</HelpBlock>
        //                                 </div>)
        //                                 :
        //                                 (/^[0-9]+$/.test(this.state.studentAddressValue) === true) ?
        //                                     (<div>
        //                                         <FormControl style={errorFormStyle} name="studentAddress1"
        //                                                      onChange={this.handleStudentAddressValue}
        //                                                      placeholder="Ex. HC 61 Box 5467" required/>
        //                                         <HelpBlock style={errorHelpBlockStyle}>Direcci&oacute;n no debe ser solo
        //                                             d&iacute;gitos</HelpBlock>
        //                                     </div>)
        //                                     :
        //                                     (/^[`!@#\$%&\*()_+\{}\|:"<>?~,./;'\]a-zA-Z]+$/.test(this.state.studentAddressValue) === true) ?
        //                                         (<div>
        //                                             <FormControl style={errorFormStyle} name="studentAddress1"
        //                                                          onChange={this.handleStudentAddressValue}
        //                                                          placeholder="Ex. HC 61 Box 5467"
        //                                                          required/>
        //                                             <HelpBlock style={errorHelpBlockStyle}>Direcci&oacute;n no deben ser
        //                                                 s&iacute;mbolos</HelpBlock>
        //                                         </div>)
        //                                         :
        //                                         (this.state.studentAddressValue.length >= 10 && this.state.studentAddressValue.length < 200 &&
        //                                             /^[0-9]+$/.test(this.state.studentAddressValue) === false &&
        //                                             /^[`!@#\$%&\*()_+\{}\|:"<>?~,./;'\]a-zA-Z]+$/.test(this.state.studentAddressValue) === false) ?
        //                                             (<div>
        //                                                 <FormControl style={successFormStyle} name="studentAddress1"
        //                                                              onChange={this.handleStudentAddressValue}
        //                                                              placeholder="Ex. HC 61 Box 5467"
        //                                                              required/>
        //                                             </div>)
        //                                             :
        //                                             (<div>
        //                                                 <FormControl name="studentAddress1"
        //                                                              onChange={this.handleStudentAddressValue}
        //                                                              placeholder="Ex. HC 61 Box 5467"
        //                                                              required/>
        //                                             </div>)
        //                     }
        //                 </Col>
        //
        //             </FormGroup>
        //
        //             <FormGroup>
        //                 <Col sm={3}>
        //                     <Col componentClass={ControlLabel}>Ciudad</Col>
        //                     {
        //                         (/^[a-zA-Z\s?]+$/.test(this.state.studentCityValue) === false && this.state.studentCityValue.length != 0) ?
        //                             (<div>
        //                                 <FormControl name="studentAddressCity" onChange={this.handleStudentCityValue}
        //                                              style={errorFormStyle} placeholder="Ex. Bayamon" required/>
        //                                 <HelpBlock style={errorHelpBlockStyle}> Escriba solo texto</HelpBlock>
        //                             </div>)
        //                             :
        //                             (this.state.studentCityValue.length <= 3 && this.state.studentCityValue.length != 0) ?
        //                                 (<div>
        //                                     <FormControl name="studentAddressCity" style={errorFormStyle}
        //                                                  onChange={this.handleStudentCityValue}
        //                                                  placeholder="Ex. Bayamon" required/>
        //                                     <HelpBlock style={errorHelpBlockStyle}>Nombre de ciudad muy peque&ntilde;
        //                                         o</HelpBlock>
        //                                 </div>)
        //                                 :
        //                                 (this.state.studentCityValue.length > 20 && this.state.studentCityValue.length != 0) ?
        //                                     (<div>
        //                                         <FormControl name="studentAddressCity" style={errorFormStyle}
        //                                                      placeholder="Ex. Bayamon" required/>
        //                                         <HelpBlock style={errorHelpBlockStyle}
        //                                                    onChange={this.handleStudentCityValue}>Nombre de ciudad muy
        //                                             grande</HelpBlock>
        //                                     </div>)
        //                                     :
        //                                     (this.state.studentCityValue.length >= 3 && this.state.studentCityValue.length < 20 && /^[a-zA-Z\s?]+$/.test(this.state.studentCityValue) === true) ?
        //                                         (<div>
        //                                             <FormControl name="studentAddressCity" style={successFormStyle}
        //                                                          onChange={this.handleStudentCityValue}
        //                                                          placeholder="Ex. Bayamon" required/>
        //                                         </div>)
        //                                         :
        //                                         (<div>
        //                                             <FormControl name="studentAddressCity"
        //                                                          onChange={this.handleStudentCityValue}
        //                                                          placeholder="Ex. Bayamon" required/>
        //                                         </div>)
        //                     }
        //                 </Col>
        //
        //                 <Col sm={3}>
        //                     <Col componentClass={ControlLabel}>Pa&iacute;s</Col>
        //                     {/*                            {
        //                         (/^[a-zA-Z\s?]+$/.test(this.state.studentCountryValue) === false && this.state.studentCountryValue.length != 0) ?
        //                             (<div>
        //                                 <FormControl name="studentAddressCountry" style={errorFormStyle}
        //                                              onChange={this.handleStudentCountryValue}
        //                                              placeholder="Ex. Puerto Rico" required/>
        //                                 <HelpBlock style={errorHelpBlockStyle}>Escriba solo texto</HelpBlock>
        //                             </div>)
        //                             :
        //                             (/^(Puerto Rico)|(PR)|(pr)|(Pr)|(pR)$/.test(this.state.studentCountryValue) === false && this.state.studentCountryValue.length != 0) ?
        //                                 (<div>
        //                                     <FormControl name="studentAddressCountry" style={errorFormStyle}
        //                                                  onChange={this.handleStudentCountryValue}
        //                                                  placeholder="Ex. Puerto Rico" required/>
        //                                     <HelpBlock style={errorHelpBlockStyle}>Pa&iacute;s debe ser Puerto Rico o
        //                                         PR</HelpBlock>
        //                                 </div>)
        //                                 :
        //                                 (/^(Puerto Rico)|(PR)|(pr)|(Pr)|(pR)$/.test(this.state.studentCountryValue) === true && /^[a-zA-Z\s?]+$/.test(this.state.studentCountryValue) === true) ?
        //                                     (<div>
        //                                         <FormControl name="studentAddressCountry" style={successFormStyle}
        //                                                      onChange={this.handleStudentCountryValue}
        //                                                      placeholder="Ex. Puerto Rico" required/>
        //                                     </div>)
        //                                     :
        //                                     (<div>
        //                                         <FormControl name="studentAddressCountry"
        //                                                      onChange={this.handleStudentCountryValue}
        //                                                      placeholder="Ex. Puerto Rico" value="Puerto Rico" disabled/>
        //                                     </div>)
        //                     }*/}
        //                     <FormControl name="studentAddressCountry" value="Puerto Rico" disabled/>
        //                 </Col>
        //
        //                 <Col sm={3}>
        //                     <Col componentClass={ControlLabel}>C&oacute;digo Postal</Col>
        //                     {
        //                         (/^([0-9]{5})$/.test(this.state.studentZipCodeValue) === false && this.state.studentZipCodeValue.length != 0) ?
        //                             (<div>
        //                                 <FormControl name="studentAddressZipCode" style={errorFormStyle}
        //                                              onChange={this.handleStudentZipCodeValue} placeholder="Ex. 00922"
        //                                              required/>
        //                                 <HelpBlock style={errorHelpBlockStyle}>C&oacute;digo Postal debe ser 5 d&iacute;
        //                                     gitos num&eacute;ricos</HelpBlock>
        //                             </div>)
        //                             :
        //                             (/^([0-9]{5})$/.test(this.state.studentZipCodeValue) === true) ?
        //                                 (<div>
        //                                     <FormControl name="studentAddressZipCode" style={successFormStyle}
        //                                                  onChange={this.handleStudentZipCodeValue}
        //                                                  placeholder="Ex. 00922" required/>
        //                                 </div>)
        //                                 :
        //                                 (<div>
        //                                     <FormControl name="studentAddressZipCode"
        //                                                  onChange={this.handleStudentZipCodeValue}
        //                                                  placeholder="Ex. 00922" required/>
        //                                 </div>)
        //                     }
        //
        //                 </Col>
        //             </FormGroup>
        //
        //             <FormGroup>
        //                 <Col sm={4}>
        //                     <Col componentClass={ControlLabel}>Tel&eacute;fono</Col>
        //
        //                     {
        //                         (/^(([0-9]{10}))$/.test(this.state.studentPhoneValue) === false && this.state.studentPhoneValue.length != 0) ?
        //                             (<div>
        //                                 <FormControl name="studentTelephone" style={errorFormStyle}
        //                                              onChange={this.handleStudentPhoneValue} placeholder="Ex. 4567"
        //                                              required/>
        //                                 <HelpBlock style={errorHelpBlockStyle}>Tel&acute;fono debe ser 10 d&iacute;gitos</HelpBlock>
        //                             </div>)
        //                             :
        //                             (/^(([0-9]{10}))$/.test(this.state.studentPhoneValue) === true) ?
        //                                 (<div>
        //                                     <FormControl name="studentTelephone" style={successFormStyle}
        //                                                  onChange={this.handleStudentPhoneValue} placeholder="Ex. 4567"
        //                                                  required/>
        //                                 </div>)
        //                                 :
        //                                 (<div>
        //                                     <FormControl name="studentTelephone" onChange={this.handleStudentPhoneValue}
        //                                                  placeholder="Ex. 4567"
        //                                                  required/>
        //                                 </div>)
        //                     }
        //                 </Col>
        //
        //                 <Col sm={4}>
        //                     <Col componentClass={ControlLabel}>Correo Electr&oacute;nico</Col>
        //                     {
        //                         (/^[a-zA-Z]+\.?[a-zA-Z]+[0-9]*?@(upr.edu|ece.upr.edu|uprm.edu)+$/.test(this.state.studentEmailValue) === false && this.state.studentEmailValue.length != 0) ?
        //                             (<div>
        //                                 <FormControl name="studentEmail" style={errorFormStyle}
        //                                              onChange={this.handleStudentEmailValue}
        //                                              placeholder="Ex. carlos.donato@upr.edu" required/>
        //                                 <HelpBlock style={errorHelpBlockStyle}>Correo debe ser del dominio
        //                                     @upr.edu</HelpBlock>
        //                             </div>)
        //                             :
        //                             (/^[a-zA-Z]+\.?[a-zA-Z]+[0-9]*?@(upr.edu|ece.upr.edu|uprm.edu)+$/.test(this.state.studentEmailValue) === true) ?
        //                                 (<div>
        //                                     <FormControl name="studentEmail" style={successFormStyle}
        //                                                  onChange={this.handleStudentEmailValue}
        //                                                  placeholder="Ex. carlos.donato@upr.edu" required/>
        //                                 </div>)
        //                                 :
        //                                 (<div>
        //                                     <FormControl name="studentEmail" onChange={this.handleStudentEmailValue}
        //                                                  placeholder="Ex. carlos.donato@upr.edu"
        //                                                  required/>
        //                                 </div>)
        //                     }
        //                 </Col>
        //             </FormGroup>
        //         </Form>
        //     </div>
        // )
        //
        // const counselorFields = (
        //     <Form horizontal onSubmit={this.onSubmit} name="newCounselor">
        //
        //         <FormGroup>
        //             <Col sm={4}>
        //                 <Col componentClass={ControlLabel}>Nombre</Col>
        //                 {
        //                     (/^([a-zA-Z]{2,})\s(([a-zA-Z]*?.?)?\s?)*?([a-zA-Z]{2,})\s?[a-zA-Z]*\s*?$/.test(this.state.counselorNameValue) === false && this.state.counselorNameValue.length != 0) ?
        //                         (<div>
        //                             <FormControl name="organizationCounselorName"
        //                                          placeholder="Ex. Raymond Lopez"
        //                                          onChange={this.handleCounselorNameValue} style={errorFormStyle}
        //                                          required/>
        //                             <HelpBlock style={errorHelpBlockStyle}>Escriba el nombre con los dos
        //                                 apellidos</HelpBlock>
        //                         </div>)
        //                         :
        //                         (this.state.counselorNameValue.length < 50 && /^([a-zA-Z]{2,})\s(([a-zA-Z]*?.?)?\s?)*?([a-zA-Z]{2,})\s?[a-zA-Z]*\s*?$/.test(this.state.counselorNameValue) === true) ?
        //                             (<div>
        //                                 <FormControl name="organizationCounselorName"
        //                                              placeholder="Ex. Raymond Lopez"
        //                                              onChange={this.handleCounselorNameValue} style={successFormStyle}
        //                                              required/>
        //                             </div>)
        //                             :
        //                             (
        //                                 (this.state.counselorNameValue.length > 50) ?
        //                                     (<div>
        //                                         <FormControl name="organizationCounselorName"
        //                                                      placeholder="Ex. Raymond Lopez"
        //                                                      onChange={this.handleCounselorNameValue}
        //                                                      style={{
        //                                                          borderColor: '#B74442',
        //                                                          boxShadow: "0px 0px 8px #B74442"
        //                                                      }}
        //                                                      required/>
        //                                         <HelpBlock style={{color: '#B74442'}}>Nombre muy
        //                                             largo</HelpBlock>
        //
        //                                     </div>)
        //                                     :
        //                                     (<div>
        //                                         <FormControl name="organizationCounselorName"
        //                                                      placeholder="Ex. Raymond Lopez"
        //                                                      onChange={this.handleCounselorNameValue}
        //                                                      required/>
        //                                     </div>)
        //                             )
        //                 }
        //             </Col>
        //
        //             <Col sm={4}>
        //                 <Col componentClass={ControlLabel}>Correo Electr&oacute;nico</Col>
        //                 {
        //                     (/^[a-zA-Z]+\.?[a-zA-Z]+[0-9]*?@(upr.edu|ece.upr.edu|uprm.edu)+$/.test(this.state.counselorEmailValue) === false && this.state.counselorEmailValue.length != 0) ?
        //                         (<div>
        //                             <FormControl name="organizationCounselorEmail"
        //                                          placeholder="Ex. raymond.lopez@upr.edu"
        //                                          onChange={this.handleCounselorEmailValue} style={errorFormStyle}
        //                                          required/>
        //                             <HelpBlock style={errorHelpBlockStyle}>Correo debe ser del dominio
        //                                 @upr.edu</HelpBlock>
        //                         </div>)
        //                         :
        //                         (/^[a-zA-Z]+\.?[a-zA-Z]+[0-9]*?@(upr.edu|ece.upr.edu|uprm.edu)+$/.test(this.state.counselorEmailValue) === true) ?
        //                             (<div>
        //                                 <FormControl name="organizationCounselorEmail"
        //                                              placeholder="Ex. raymond.lopez@upr.edu"
        //                                              onChange={this.handleCounselorEmailValue} style={successFormStyle}
        //                                              required/>
        //                             </div>)
        //                             :
        //                             (<div>
        //                                 <FormControl name="organizationCounselorEmail"
        //                                              placeholder="Ex. raymond.lopez@upr.edu"
        //                                              onChange={this.handleCounselorEmailValue} required/>
        //                             </div>)
        //                 }
        //             </Col>
        //
        //             <Col sm={4}>
        //                 <Col componentClass={ControlLabel}>Tel&eacute;fono</Col>
        //                 {
        //                     (/^(((x)?[0-9]{4})|([0-9]{10}))$/.test(this.state.counselorPhoneValue) === false && this.state.counselorPhoneValue.length != 0) ?
        //                         (<div>
        //                             <FormControl name="organizationCounselorTelephone" type="text"
        //                                          placeholder="Ex. 7266"
        //                                          onChange={this.handleCounselorPhoneValue}
        //                                          style={errorFormStyle}
        //                                          required/>
        //                             <HelpBlock style={errorHelpBlockStyle}>Solo extension (4 digitos) o
        //                                 numero completo (10 digitos)</HelpBlock>
        //                         </div>)
        //                         :
        //                         (/^(((x)?[0-9]{4})|([0-9]{10}))$/.test(this.state.counselorPhoneValue) === true) ?
        //                             (<div>
        //                                 <FormControl name="organizationCounselorTelephone" type="text"
        //                                              placeholder="Ex. 7266"
        //                                              onChange={this.handleCounselorPhoneValue} style={successFormStyle}
        //                                              required/>
        //                             </div>)
        //                             :
        //                             (<div>
        //                                 <FormControl name="organizationCounselorTelephone" type="text"
        //                                              placeholder="Ex. 7266"
        //                                              onChange={this.handleCounselorPhoneValue}
        //                                              required/>
        //                             </div>)
        //                 }
        //             </Col>
        //         </FormGroup>
        //
        //         <FormGroup>
        //             <Col sm={4}>
        //                 <Col componentClass={ControlLabel}>Facultad</Col>
        //                 {
        //                     (this.state.counselorFacultyValue.length >= 50) ?
        //                         (<div>
        //                             <FormControl name="organizationCounselorFaculty"
        //                                          placeholder="Ex. Ingenieria"
        //                                          onChange={this.handleCounselorFacultyValue} style={errorFormStyle}
        //                                          required/>
        //                             <HelpBlock style={errorHelpBlockStyle}>Nombre de la facultad muy
        //                                 largo</HelpBlock>
        //                         </div>)
        //                         :
        //                         (/^([a-zA-Z\s?])+$/.test(this.state.counselorFacultyValue) === false && this.state.counselorFacultyValue.length != 0 ) ?
        //                             (<div>
        //                                 <FormControl name="organizationCounselorFaculty"
        //                                              placeholder="Ex. Ingenieria"
        //                                              onChange={this.handleCounselorFacultyValue} style={errorFormStyle}
        //                                              required/>
        //                                 <HelpBlock style={errorHelpBlockStyle}>Solo texto</HelpBlock>
        //                             </div>)
        //                             :
        //                             (/^([a-zA-Z\s?])+$/.test(this.state.counselorFacultyValue) === true && this.state.counselorFacultyValue.length <= 50 && this.state.counselorFacultyValue.length != 0 ) ?
        //                                 (<div>
        //                                     <FormControl name="organizationCounselorFaculty"
        //                                                  placeholder="Ex. Ingenieria"
        //                                                  onChange={this.handleCounselorFacultyValue}
        //                                                  style={successFormStyle} required/>
        //                                 </div>)
        //                                 :
        //                                 (<div>
        //                                     <FormControl name="organizationCounselorFaculty"
        //                                                  placeholder="Ex. Ingenieria"
        //                                                  onChange={this.handleCounselorFacultyValue} required/>
        //                                 </div>)
        //
        //                 }
        //             </Col>
        //
        //             <Col sm={4}>
        //                 <Col componentClass={ControlLabel}>Departamento</Col>
        //                 {
        //                     (this.state.counselorDepartmentValue.length >= 50) ?
        //                         (<div>
        //                             <FormControl name="organizationCounselorDepartment"
        //                                          placeholder="Ex. Ingenieria de Computadoras"
        //                                          onChange={this.handleCounselorDepartmentValue} style={errorFormStyle}
        //                                          required/>
        //                             <HelpBlock style={errorHelpBlockStyle}>Nombre del departamento muy
        //                                 largo</HelpBlock>
        //
        //                         </div>)
        //                         :
        //                         (/^([a-zA-Z\s?])+$/.test(this.state.counselorDepartmentValue) === false && this.state.counselorDepartmentValue.length != 0 ) ?
        //                             (<div>
        //                                 <FormControl name="organizationCounselorDepartment"
        //                                              placeholder="Ex. Ingenieria de Computadoras"
        //                                              onChange={this.handleCounselorDepartmentValue}
        //                                              style={errorFormStyle} required/>
        //                                 <HelpBlock style={errorHelpBlockStyle}>Solo texto</HelpBlock>
        //
        //                             </div>)
        //                             :
        //                             (/^([a-zA-Z\s?])+$/.test(this.state.counselorDepartmentValue) === true && this.state.counselorDepartmentValue.length <= 50 && this.state.counselorDepartmentValue.length != 0 ) ?
        //                                 (<div>
        //                                     <FormControl name="organizationCounselorDepartment"
        //                                                  placeholder="Ex. Ingenieria de Computadoras"
        //                                                  onChange={this.handleCounselorDepartmentValue}
        //                                                  style={successFormStyle} required/>
        //
        //                                 </div>)
        //                                 :
        //                                 (<div>
        //                                     <FormControl name="organizationCounselorDepartment"
        //                                                  placeholder="Ex. Ingenieria de Computadoras"
        //                                                  onChange={this.handleCounselorDepartmentValue} required/>
        //                                 </div>)
        //                 }
        //             </Col>
        //
        //             <Col sm={4}>
        //                 <Col componentClass={ControlLabel}>Oficina</Col>
        //                 {
        //                     (this.state.counselorOfficeValue.length >= 15 && this.state.counselorOfficeValue.length != 0) ?
        //                         (<div>
        //                             <FormControl name="organizationCounselorOfficeNumber"
        //                                          placeholder="Ex. S-113"
        //                                          onChange={this.handleCounselorOfficeValue} style={errorFormStyle}
        //                                          required/>
        //                             <HelpBlock style={errorHelpBlockStyle}>Numero de oficina muy
        //                                 largo</HelpBlock>
        //
        //                         </div>)
        //                         :
        //                         (this.state.counselorOfficeValue.length === 1) ?
        //                             (<div>
        //                                 <FormControl name="organizationCounselorOfficeNumber"
        //                                              placeholder="Ex. S-113"
        //                                              onChange={this.handleCounselorOfficeValue} style={errorFormStyle}
        //                                              required/>
        //                                 <HelpBlock style={errorHelpBlockStyle}>Numero de oficina muy pequeno</HelpBlock>
        //
        //                             </div>)
        //                             :
        //                             (/^[`!@#\$%\^&\*()_+{}\|:"<>?~,./;'[\]\\]+$/.test(this.state.counselorOfficeValue) === true) ?
        //                                 (<div>
        //                                     <FormControl name="organizationCounselorOfficeNumber"
        //                                                  placeholder="Ex. S-113"
        //                                                  onChange={this.handleCounselorOfficeValue}
        //                                                  style={errorFormStyle} required/>
        //                                     <HelpBlock style={errorHelpBlockStyle}>Oficina no puede ser solo
        //                                         simbolos</HelpBlock>
        //                                 </div>)
        //                                 :
        //                                 (/^[`!@#\$%\^&\*()_+{}\|:"<>?~,./;'[\]\\]+$/.test(this.state.counselorOfficeValue) === false && this.state.counselorOfficeValue.length < 15 && this.state.counselorOfficeValue.length != 0 ) ?
        //                                     (<div>
        //                                         <FormControl name="organizationCounselorOfficeNumber"
        //                                                      placeholder="Ex. S-113"
        //                                                      onChange={this.handleCounselorOfficeValue}
        //                                                      style={successFormStyle} required/>
        //                                     </div>)
        //                                     :
        //                                     (<div>
        //                                         <FormControl name="organizationCounselorOfficeNumber"
        //                                                      placeholder="Ex. S-113"
        //                                                      onChange={this.handleCounselorOfficeValue} required/>
        //                                     </div>)
        //                 }
        //
        //             </Col>
        //         </FormGroup>
        //     </Form>
        // )
        //
        // const facilitiesManagerFields = (
        //     <Form horizontal onSubmit={this.onSubmit} name="newFacilitiesManager">
        //
        //         <FormGroup>
        //             <Col sm={4}>
        //                 <Col componentClass={ControlLabel} required>Nombre</Col>
        //                 {
        //                     (/^([a-zA-Z]{2,})\s(([a-zA-Z]*?.?)?\s?)*?([a-zA-Z]{2,})\s?[a-zA-Z]*\s*?$/.test(this.state.managerNameValue) === false && this.state.managerNameValue.length != 0) ?
        //                         (<div>
        //                             <FormControl name="managerName" style={errorFormStyle}
        //                                          onChange={this.handleManagerNameValue}
        //                                          placeholder="Ex. Heribero Bourdon"/>
        //                             <HelpBlock style={errorHelpBlockStyle}>Escriba el nombre con los dos
        //                                 apellidos</HelpBlock>
        //                         </div>)
        //                         :
        //                         (this.state.managerNameValue.length > 50) ?
        //                             (<div>
        //                                 <FormControl name="managerName" style={errorFormStyle}
        //                                              onChange={this.handleManagerNameValue}
        //                                              placeholder="Ex. Heribero Bourdon"/>
        //                                 <HelpBlock style={errorHelpBlockStyle}>Nombre muy largo</HelpBlock>
        //                             </div>)
        //                             :
        //                             (this.state.managerNameValue.length < 50 &&
        //                                 /^([a-zA-Z]{2,})\s(([a-zA-Z]*?.?)?\s?)*?([a-zA-Z]{2,})\s?[a-zA-Z]*\s*?$/.test(this.state.managerNameValue) === true) ?
        //                                 (<div>
        //                                     <FormControl name="managerName" style={successFormStyle}
        //                                                  onChange={this.handleManagerNameValue}
        //                                                  placeholder="Ex. Heribero Bourdon"/>
        //                                 </div>)
        //                                 :
        //                                 (<div>
        //                                     <FormControl name="managerName" onChange={this.handleManagerNameValue}
        //                                                  placeholder="Ex. Heribero Bourdon"/>
        //                                 </div>)
        //                 }
        //             </Col>
        //
        //             <Col sm={4}>
        //                 <Col componentClass={ControlLabel} required>Correo Electr&oacute;nico</Col>
        //                 {
        //                     (/^[a-zA-Z]+\.?[a-zA-Z]+[0-9]*?@(upr.edu|ece.upr.edu|uprm.edu)+$/.test(this.state.managerEmailValue) === false
        //                         && this.state.managerEmailValue.length != 0) ?
        //                         (<div>
        //                             <FormControl name="managerEmail" style={errorFormStyle}
        //                                          onChange={this.handleManagerEmailValue}
        //                                          placeholder="Ex. heriberto.bourdon@upr.edu"/>
        //                             <HelpBlock style={errorHelpBlockStyle}>Correo debe ser del dominio
        //                                 @upr.edu</HelpBlock>
        //                         </div>)
        //                         :
        //                         (/^[a-zA-Z]+\.?[a-zA-Z]+[0-9]*?@(upr.edu|ece.upr.edu|uprm.edu)+$/.test(this.state.managerEmailValue) === true) ?
        //                             (<div>
        //                                 <FormControl name="managerEmail" style={successFormStyle}
        //                                              onChange={this.handleManagerEmailValue}
        //                                              placeholder="Ex. heriberto.bourdon@upr.edu"/>
        //                             </div>)
        //                             :
        //                             (<div>
        //                                 <FormControl name="managerEmail" onChange={this.handleManagerEmailValue}
        //                                              placeholder="Ex. heriberto.bourdon@upr.edu"/>
        //                             </div>)
        //                 }
        //             </Col>
        //
        //             <Col sm={4}>
        //                 <Col componentClass={ControlLabel} required>Tel&eacute;fono</Col>
        //                 {
        //                     (/^(((x)?[0-9]{4})|([0-9]{10}))$/.test(this.state.managerPhoneValue) === false && this.state.managerPhoneValue.length != 0) ?
        //                         (<div>
        //                             <FormControl name="managerTelephone" style={errorFormStyle}
        //                                          onChange={this.handleManagerPhoneValue} placeholder="Ex. 7651"/>
        //                             <HelpBlock style={errorHelpBlockStyle}>Solo extension (4 digitos) o
        //                                 numero completo (10 digitos)</HelpBlock>
        //                         </div>)
        //                         :
        //                         (/^(((x)?[0-9]{4})|([0-9]{10}))$/.test(this.state.managerPhoneValue) === true) ?
        //                             (<div>
        //                                 <FormControl name="managerTelephone" style={successFormStyle}
        //                                              onChange={this.handleManagerPhoneValue} placeholder="Ex. 7651"/>
        //                             </div>)
        //                             :
        //                             (<div>
        //                                 <FormControl name="managerTelephone" onChange={this.handleManagerPhoneValue}
        //                                              placeholder="Ex. 7651"/>
        //                             </div>)
        //                 }
        //             </Col>
        //         </FormGroup>
        //     </Form>
        // )

        return (
            <div className="container">
                <Col md={2}>
                    {tabsInstance}
                </Col>

                <Col md={10}>
                    <ol className="breadcrumb">
                        <li/>
                        <li><Link to={`/admin/`}>Panel de Administraci&oacute;n</Link></li>
                        <li><Link to={`/admin/users`}>Usuarios</Link></li>
                        <li className="active">Detalles del Usuario</li>
                    </ol>

                    {/*<Panel header={this.state.user.email}>*/}
                    <Panel>

                        {this.state.userType_code === 1 ? adminFields : null}
                        {this.state.userType_code === 2 ? staffFields : null}
                        {this.state.userType_code === 3 ? studentFields : null}
                        {this.state.userType_code === 4 ? counselorFields : null}
                        {this.state.userType_code === 5 ? facilitiesManagerFields : null}

                        <Row>
                            <Col md="1"><Link to={`/admin/users/`}><Button
                                className="btn btn-primary">Back</Button></Link></Col>
                            {
                                this.state.notEditMode? <Col md="1"><Button className="btn-warning" onClick={this.toggleEditMode}>Editar</Button></Col>
                                    :
                                    <Col md="1"><Button className="btn-success" onClick={this.onSubmit}>Guardar</Button></Col>
                            }

                        </Row>


                    </Panel>
                </Col>
            </div>
        )
    }
}


UserDetail.contextTypes = {
    initialState: React.PropTypes.object,
};

export default UserDetail;
