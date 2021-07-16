import React from 'react';
import { Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";

const Footer = () => {
    const admin = useSelector(state => state.adminLoginReducer.admin);
    return <React.Fragment>
        {
            admin &&
            <Navbar className="d-flex justify-content-center align-items-center py-2" expand="lg" variant="dark" bg="dark">
                <Navbar.Brand style={{ fontSize: "medium" }}>
                    All rights reserved ©GCUF-FYP-BSCS-BATCH 2017-21
                </Navbar.Brand>
            </Navbar>
        }
    </React.Fragment>
}

export default Footer;
