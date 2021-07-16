import React, { useEffect } from 'react';
import { Tab, Row, Col, Nav } from "react-bootstrap";
import "./Adds.css";
import AddsData from './AddsData';
import { getAllAddsFunc } from "../../Store/Actions/Actions";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

const AddsPosting = ({ admin }) => {

    useEffect(() => {
        getAllAddsFunc();
    }, [])

    return <>
        {admin === null && <Redirect to="admin/login" />}
        <div className="bg-white px-3 py-3 mx-3" style={{ marginTop: "6rem", minHeight: "100vh" }}>
            <h3 className="text-center font-weight-bold text-danger">
                <i className="fa text-danger fa-credit-card mr-3 mb-3" aria-hidden="true"></i>
                Post New Adds</h3>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Post Adds</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Slider Images</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <AddsData type={"adds"} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <AddsData type={"slider"} />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    </>
}

function mapStateToProps(state) {
    return {
        admin: state.adminLoginReducer.admin
    }
}

export default connect(mapStateToProps, null)(AddsPosting);