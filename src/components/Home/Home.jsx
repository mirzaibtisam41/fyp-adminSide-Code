import React from 'react';
import { Container } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

const Home = ({ admin }) => {

    return <React.Fragment>
        {admin && <Redirect to="/admin/dashboard" />}
        <section className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <Container className="text-justify text-center">
                <div className="mt-5">
                    <h3 className="font-weight-bold pb-4">Welcome To Admin Pannel</h3>
                    <p>
                        Welcome to admin pannel, here you can customize your web application,
                        if you are an admin then please login to enter your dashboard so you can
                        perform operations according to your requirement,
                        Thank you..!
                    </p>
                    <Link to="/admin/login">
                        <button className="btn btn-success rounded-0 px-5 py-2 mt-3">Login</button></Link>
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

export default connect(mapStateToProps, null)(Home);