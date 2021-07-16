import React, { useState } from 'react';
import { Form, Button, Container, Jumbotron } from "react-bootstrap";
import { connect } from "react-redux";
import { adminLogin } from "../../Store/Actions/Actions";
import { Redirect } from 'react-router-dom';

const Login = ({ sendLoginData, admin }) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    return <React.Fragment>

        {admin && <Redirect to="/dashboard" />}
        <section className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Container>
                <div className="bg-white py-5 mt-5">
                    <h3 className="text-center pb-4 font-weight-bold">Login To Admin Pannel</h3>
                    <Form className="w-50 mx-auto">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        <div className="text-center px-5 py-2 mt-3">
                            <Button variant="success" onClick={(e) => sendLoginData({ email, password })}>
                                Submit
                                <i className="fa fa-paper-plane ml-2" aria-hidden="true"></i>
                            </Button>
                        </div>
                    </Form>
                </div>
            </Container>
        </section>
    </React.Fragment>
}

function mapStateToProps(state) {
    return {
        admin: state.adminLoginReducer.admin
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sendLoginData: (data) => { dispatch(adminLogin(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
