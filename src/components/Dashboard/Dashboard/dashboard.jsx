import React from 'react';
import View from "../MainView/View";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./dashboard.css";

const Dashboard = ({ view, admin }) => {

    return <React.Fragment>
        {
            admin !== null ?
                <div className="mt-5 pb-5 dashboard position-relative">
                    <div><View /></div>
                </div>
                :
                <Redirect to="/admin/login" />
        }
    </React.Fragment>
}

function mapStateToProps(state) {
    return {
        admin: state.adminLoginReducer.admin
    }
}

export default connect(mapStateToProps, null)(Dashboard);

