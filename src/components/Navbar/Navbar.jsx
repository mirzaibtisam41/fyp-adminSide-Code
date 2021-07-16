import React, { useContext } from 'react';
import { Navbar } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import "./Navbar.css";
import { GlobalContext } from "../MainContext/Context";
import { ServerPort } from "../../Api/apiActions";

const NavbarComp = ({ admin }) => {
    const { toggleDrawer } = useContext(GlobalContext);

    return <React.Fragment>
        <Navbar className="py-3 px-5" fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <section className="w-100 d-flex justify-content-between align-items-center">
                <Navbar.Brand href="#home">
                    <Link to="/" className="text-decoration-none text-white">
                        <i className="fa fa-user mr-3 fa-lg" aria-hidden="true"></i>
                        Admin Pannel
                    </Link>
                </Navbar.Brand>
                {admin && <img src={admin.profilePic ? `${ServerPort}${admin.profilePic}` : "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"} style={{ width: "40px", height: "40px", borderRadius: "50%",objectFit:"contain" }} onClick={toggleDrawer('left', true)} />}
            </section>
        </Navbar>
    </React.Fragment>
}

function mapStateToProps(state) {
    return {
        admin: state.adminLoginReducer.admin
    }
}

export default connect(mapStateToProps)(NavbarComp);