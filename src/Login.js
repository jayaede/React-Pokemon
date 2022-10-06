import React, { useState } from 'react';
import { Button, Row, Col, Form, Card } from 'react-bootstrap'

function Login() {
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        startDate: '',
        endDate: '',
        description: ''
    })
    const [formErrors, setFormErrors] = useState({})

    const handleFormData = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const formValidate = (formdata) => {
        let errors = {};
        const regex = /^[0-9a-zA-Z(\-)]+$/;
        if (!formdata.userName) {
            errors.userName = "Please Enter username"
        } else if (!regex.test(formdata.userName)) {
            errors.userName = "This feild not allows special characters"
        }
        if (!formdata.password) {
            errors.password = 'Please enter password';
        }
        if (!formdata.startDate) {
            errors.startDate = 'Please select startdate';
        }
        if (!formdata.endDate) {
            errors.endDate = 'Please select enddate';
        }
        if (formdata.endDate <= formdata.startDate) {
            errors.dateError = "End date should be greater than startdate"
        }
        if (!formdata.description) {
            errors.description = 'Please enter description';
        }

        return { errors };
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let { errors } = formValidate(formData)
        setFormErrors(errors);
        console.log("formdata", formData);

    }

    return (
        <div>
            <Card style={{ margin: 20, width: '50%' }}>
                <Card.Title style={{ marginLeft: 50, marginTop: 20 }}>Login Form</Card.Title>
                <Card.Body style={{ marginLeft: 10 }}>
                    <Form>
                        <div style={{ marginLeft: 10 }}>
                            <Row>
                                <Col md={4} style={{ marginBottom: 10, marginLeft: 10 }}>
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control type='text' maxLength={32} name='userName' value={formData.userName} placeholder="Username or email" onChange={handleFormData} />
                                    <span style={{ color: 'red' }}>{formErrors.userName}</span>
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control type='text' maxLength={8} name='password' value={formData.password} placeholder="Enter password" onChange={handleFormData} />
                                    <span style={{ color: 'red' }}>{formErrors.password}</span>
                                </Col>
                                <Col md={4} style={{ marginBottom: 10, marginLeft: 10 }}>
                                    <Form.Label>Start Date:</Form.Label>
                                    <Form.Control type='date' name='startDate' value={formData.startDate} onChange={handleFormData} />
                                    <span style={{ color: 'red' }}>{formErrors.startDate}</span>
                                    <Form.Label>EndDate:</Form.Label>
                                    <Form.Control type='date' name='endDate' value={formData.endDate} onChange={handleFormData} />
                                    <span style={{ color: 'red' }}>{formErrors.endDate}</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={8} style={{ marginBottom: 10, marginLeft: 10 }}>
                                    <Form.Label>Description:</Form.Label>
                                    <Form.Control as="textarea" maxLength={100} rows="3" name='description' value={formData.description} placeholder="Enter description" onChange={handleFormData} />
                                    <span style={{ color: 'red' }}>{formErrors.description}</span>
                                </Col>
                            </Row>
                            <Row>
                                <span style={{ color: 'red' }}>{formErrors.dateError}</span>
                                <Col style={{ marginBottom: 10, marginLeft: 10 }}>
                                    <Button type='reset' value='Reset' variant='danger'>Reset</Button>&nbsp;&nbsp;
                                    <Button type='submit' vslue='Submit' variant='success' onClick={(e) => handleSubmit(e)}>Submit</Button>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Login;