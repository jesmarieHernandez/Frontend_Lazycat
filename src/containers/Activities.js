import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from "react-router-dom";
import {

    Button, Glyphicon, Table, Panel, Pagination, Jumbotron, Col, Row, Checkbox, Breadcrumb,
    BreadcrumbItem, Nav, Navbar, NavItem, ButtonToolbar, Badge

} from 'react-bootstrap';
import Select from 'react-select';
import ReactCenter from 'react-center';
import Icon from 'react-icons-kit';
import {statsDots} from 'react-icons-kit/icomoon/statsDots';
import {iosPaw} from 'react-icons-kit/ionicons/iosPaw';
import {home} from 'react-icons-kit/icomoon/home';
import {fileText2} from 'react-icons-kit/icomoon/fileText2';
import {userTie} from 'react-icons-kit/icomoon/userTie';

class Activities extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            activeKey: "1",
            activities: [],
            pendingActivities: [],
            approvedActivities: [],
            deniedActivities: []
        }

        this.handleSelect = this.handleSelect.bind(this);

    }

    componentDidMount() {

        // fetch('http://localhost:8000/api/activities').then(response => {
        fetch('http://localhost:8000/api/activities').then(response => {
            if (response.ok) {
                response.json().then(results => {
                    this.setState({activities: results});
                    //this.props.router.push(`/activities/${createdRequest._id}`);

                    // const pending = this.state.activities.filter(function (obj) {
                    //     return obj.status.code == 1;
                    // });

                    const pending = [
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        },
                        {
                            "id": 7,
                            "activityName": "Gran Convencion",
                            "activityDescription": "De Profesores",
                            "attendantsNumber": 4,
                            "activityDate": "2018-01-20",
                            "activityStart": "838:59:59",
                            "activityEnd": "00:00:00",
                            "hasFood": 1,
                            "guestName": "asdas",
                            "activityStatus_code": 1,
                            "counselorStatus_code": 2,
                            "managerStatus_code": 1,
                            "activityType_code": 6,
                            "counselorComment": null,
                            "managerComment": null,
                            "staffComment": "asdsadasd",
                            "student": null,
                            "organization": {
                                "id": 1,
                                "organizationName": "Las Monjasfhfhg",
                                "organizationInitials": "ACM2ssss",
                                "isActive": 0,
                                "counselors": [
                                    {
                                        "id": 6,
                                        "counselorName": "Raymond Lopez",
                                        "counselorEmail": "raymond.lopez@upr.edu",
                                        "counselorPhone": "8909",
                                        "counselorFaculty": "Ingenieria",
                                        "counselorDepartment": "ICOM",
                                        "counselorOffice": "S113",
                                        "user_id": 15,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "facility": {
                                "id": 5,
                                "building": "Stefani",
                                "space": "S-113",
                                "facilityDepartment": "",
                                "managers": [
                                    {
                                        "id": 5,
                                        "managerName": "Bolo Maton",
                                        "managerEmail": "bacalao@upr.edu",
                                        "managerPhone": "9090",
                                        "user_id": 17,
                                        "isActive": 1
                                    }
                                ]
                            },
                            "status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "counselor_status": {
                                "code": 2,
                                "description": "Aprobado"
                            },
                            "manager_status": {
                                "code": 1,
                                "description": "Pendiente"
                            },
                            "type": {
                                "code": 6,
                                "description": "Académica"
                            }
                        }

                    ];

                    console.log('Cuantas actividades hay?');
                    console.log(pending.length);

                    this.setState({pendingActivities: pending});

                    const approved = this.state.activities.filter(function (obj) {
                        return obj.status.code == 2;
                    });

                    this.setState({approvedActivities: approved});

                    const denied = this.state.activities.filter(function (obj) {
                        return obj.status.code == 3;
                    });

                    this.setState({deniedActivities: denied});


                });
            } else {
                // response.json().then(error => {
                //     this.props.showError(`Failed to add issue: ${error.message}`);
                // });
            }
        }).catch(err => {
            //this.props.showError(`Error in sending data to server: ${err.message}`);
        });

        // fetch('http://localhost:3001/api/pending').then(response => {
        //     if (response.ok) {
        //         console.log('/api/pending! :D');
        //         response.json().then(results => {
        //             console.log('Total pending activities: ' + results);
        //
        //             //console.log(this.state.activities);
        //             //this.props.router.push(`/activities/${createdRequest._id}`);
        //         });
        //     } else {
        //         console.log('Unable to fetch pending activities')
        //         // response.json().then(error => {
        //         //     this.props.showError(`Failed to add issue: ${error.message}`);
        //         // });
        //     }
        // }).catch(err => {
        //     //this.props.showError(`Error in sending data to server: ${err.message}`);
        // });
    }

    handleSelect(event) {
        // event.preventDefault();
        console.log(event);
        this.setState({activeKey: event});
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
                                                                                                  style={{paddingRight: "20px"}}/>Estad&iacute;
                        sticas</Link></NavItem>
                    <NavItem> <Link to="/admin"><Icon icon={userTie}
                                                      style={{paddingRight: "20px"}}/>Admin</Link></NavItem>
                </Nav>
            </div>
        );


        //this.setState({pendingActivities: pending});

        let pendingActivities;

        if (this.state.pendingActivities.length === 0) {
            pendingActivities = <p style={{color: 'grey', marginLeft: '20px'}}>No hay actividades pendientes.</p>
        } else {


            pendingActivities = this.state.pendingActivities.map(activity =>

                <Col md={12}>
                    <Panel header={activity.activityName}>
                        {/*<td><Link to={`/activities/${activity.id}`}>{activity.activityName}</Link></td>*/}
                        {/*<br/>*/}
                        <Col md={9}>
                            <Row>

                                <Col md={4}><p>Título:</p></Col><Col md={8}><p> {activity.activityName}</p></Col>
                                <Col md={4}><p>Descripción:</p></Col><Col md={8}><p> {activity.activityDescription}</p>
                            </Col>
                                <Col md={4}><p>Organización:</p></Col><Col md={8}>
                                <p> {activity.organization.organizationName}</p></Col>
                                <Col md={4}><p>Facilidades:</p></Col><Col md={8}><p> {activity.facility.space}</p></Col>
                                <Col md={4}><p>Estado:</p></Col><Col md={8}><p> {activity.status.description}</p></Col>

                            </Row>
                        </Col>
                        <Col md={3}>
                            <Row>
                                <Col md={12}><Link to={`/activities/${activity.id}`}><Button
                                    className="btn-info btn-large pull-right"
                                    style={{width: '100px', marginBottom: '10px'}}
                                >Detalles</Button></Link> </Col>
                            </Row>
                        </Col>

                    </Panel>
                </Col>
            );
        }

        let approvedActivities = this.state.approvedActivities.map(activity =>

            <Col md={12}>

                <Panel header={activity.activityName}>
                    <td><Link to={`/activities/${activity.id}`}>{activity.activityName}</Link></td>
                    <br/>
                    <p><b>Description:</b> {activity.activityDescription}</p>
                    <p><b>Organization:</b> {activity.organization.organizationName}</p>
                    <p><b>Facility:</b> {activity.facility.space}</p>
                    <p><b>Status:</b> {activity.status.description}</p>
                </Panel>

            </Col>
        );


        let deniedActivities = this.state.deniedActivities.map(activity =>

            <Col md={12}>

                <Panel header={activity.activityName}>
                    <td><Link to={`/activities/${activity.id}`}>{activity.activityName}</Link></td>
                    <br/>
                    <p><b>Description:</b> {activity.activityDescription}</p>
                    <p><b>Organization:</b> {activity.organization.organizationName}</p>
                    <p><b>Facility:</b> {activity.facility.space}</p>
                    <p><b>Status:</b> {activity.status.description}</p>
                </Panel>

            </Col>
        );


        const activities = this.state.activities.map(activity =>

            <Col md={12}>
                <Panel header={activity.activityName}>
                    <td><Link to={`/activities/${activity.id}`}>{activity.activityName}</Link></td>
                    <br/>
                    <p><b>Description:</b> {activity.activityDescription}</p>
                    <p><b>Organization:</b> {activity.organization.organizationName}</p>
                    <p><b>Facility:</b> {activity.facility.space}</p>
                    <p><b>Status:</b> {activity.status.description}</p>
                    <Link to={`/activities/edit`}><Button className="btn-info">Edit</Button></Link>
                    <Button className="btn-success" style={{marginLeft: "20px"}}>Approve</Button>
                    <Button className="btn-danger" style={{marginLeft: "20px"}}>Decline</Button>
                </Panel>

            </Col>
        );


        console.log(this.state.activities);
        return (
            <div className="container">
                <Col md={2}>
                    {tabsInstance}
                </Col>

                <Col md={10}>
                    <Col md={9}>
                        <ol className="breadcrumb">
                            <li/>
                            <li className="active">Actividades</li>
                        </ol>
                        <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect}>
                            <NavItem eventKey="1" href="/home">Pendientes
                                {this.state.pendingActivities.length > 0 ?
                                    <Badge style={{background: 'red', marginLeft: '10px'}}>
                                        {this.state.pendingActivities.length}</Badge> :
                                    null}
                            </NavItem>

                            <NavItem eventKey="2" title="Item">Aprobadas </NavItem>
                            <NavItem eventKey="3" title="Item">Denegadas </NavItem>
                        </Nav>
                        <br/>
                        {/*{activities}*/}

                        {this.state.activeKey === '1' ?
                            <div>
                                {pendingActivities}
                            </div>
                            : null}
                        {this.state.activeKey === '2' ? approvedActivities : null}
                        {this.state.activeKey === '3' ? deniedActivities : null}

                    </Col>

                    <Col md={3}>
                        <Panel header='Actividades'>
                            <ReactCenter><Link to="/request"><Button bsSize="medium">Nueva
                                Solicitud</Button></Link></ReactCenter>
                            {/*<Checkbox><p>Request Title</p></Checkbox>*/}
                            {/*<Checkbox><p>Request Description</p></Checkbox>*/}
                        </Panel>


                    </Col>
                </Col>
            </div>
        )
    }
}

Activities.contextTypes = {
    initialState: React.PropTypes.object,
};

export default Activities;