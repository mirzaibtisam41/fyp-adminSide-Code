import React, { useState } from 'react';
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import Avatar from 'react-avatar';
import { updateAdminProfile } from "../../Store/Actions/Actions";
import { ServerPort } from "../../Api/apiActions";
import "./profile.css";
import { Redirect } from "react-router-dom";

const Profile = ({ admin, sendProfileData }) => {
    const [profilePic, setProfilePic] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    return <React.Fragment>
        {admin === null && <Redirect to="admin/login" />}
        <div className="pt-2 bg-white mx-3" style={{ marginTop: "6rem" }}>
            <h3 className="text-center mt-3 font-weight-bold text-danger">
                <i className="fa fa-user mr-3 mb-3" aria-hidden="true"></i>
                Edit Profile</h3>
            <Container>
                <div className="p-3 pb-5 bg-white">
                    <div className="d-flex justify-content-center pb-3" >
                        <div className="profile-div-main">
                            {
                                admin ? <img style={{ objectFit: "contain" }} className="profile-div-main-img" src={`${ServerPort}${admin.profilePic}`} />
                                    :
                                    <Avatar name={admin && admin.firstName} round={true} />
                            }
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <input onChange={(e) => setProfilePic(e.target.files[0])} type="file" size="60" />
                    </div>
                    <form className="w-75 mx-auto">
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label htmlFor="exampleInputEmail1">First Name</label>
                                <input type="text" className="form-control" defaultValue={admin && admin.firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="First Name" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="exampleInputEmail1">Last Name</label>
                                <input type="text" className="form-control" defaultValue={admin && admin.lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Last Name" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" defaultValue={admin && admin.email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">New Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Re-Type Password</label>
                            <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="form-control" placeholder="Confirm Password" />
                        </div>

                        <button onClick={(e) => {
                            e.preventDefault();
                            sendProfileData({ firstName, lastName, email, password, confirmPassword, file: profilePic, _id: admin._id });
                        }}
                            className="btn btn-dark">Update Profile</button>
                    </form>

                </div>
            </Container>
        </div>
    </React.Fragment>
}

function mapStateToProps(state) {
    return {
        admin: state.adminLoginReducer.admin
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sendProfileData: (data) => { dispatch(updateAdminProfile(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
