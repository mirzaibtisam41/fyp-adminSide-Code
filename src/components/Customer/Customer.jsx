import React, { useContext } from 'react';
import { GlobalContext } from "../MainContext/Context";
import moment from 'moment';
import { useState } from 'react';
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.css";

const Customer = () => {
    const [search, setSearch] = useState("");
    const { users } = useContext(GlobalContext);
    const admin = useSelector(state => state.adminLoginReducer.admin);

    let filterProducts = [];
    if (users !== null) {
        filterProducts = users?.filter(item => {
            return item.name.toLowerCase().includes(search.toLowerCase());
        });
    }
    return <React.Fragment>
        {admin === null && <Redirect to="admin/login" />}
        <div className="py-2 main-customer mx-3 bg-white" style={{ minHeight: "100vh", marginTop: "6rem", overflowX: "hidden" }}>
            <h3 className="text-center mt-3 font-weight-bold text-danger">
                <i className="fa text-danger fa-users mr-3 mb-3" aria-hidden="true"></i>
                Customers List
            </h3>
            <div className="search-box">
                <input type="text" className="px-2"
                    placeholder="Search By Name"
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ height: "35px", width: "15rem", marginTop: "5px" }}
                />
            </div>
            <section className="table-main">
                <table className="table-responsive table mt-4">
                    <caption>List of Customers</caption>
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email Address</th>
                            <th scope="col">Register Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filterProducts?.map((item, index) => {
                                return <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </section>
        </div>
    </React.Fragment>
}

export default Customer;
