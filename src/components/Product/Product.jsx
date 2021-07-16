import React, { useState } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import ProductItems from "./ProductItem";

const Product = ({ openModal, allProducts, admin }) => {

    const [search, setSearch] = useState("");

    // search functionality
    let filterProducts = [];
    if (allProducts !== null) {
        filterProducts = allProducts.filter(item => {
            return item.name.toLowerCase().includes(search.toLowerCase());
        });
    }

    return <React.Fragment>
        {admin === null && <Redirect to="admin/login" />}
        <div className="pt-2 mx-3 px-3 bg-white" style={{ cursor: "pointer", marginTop: "6rem", minHeight: "100vh" }}>
            <h3 className="text-center mt-3 text-danger category-head">
                <i className="fa fa-product-hunt mr-3 mb-3" aria-hidden="true"></i>
                Available Products</h3>
            <div>
                <div className="search-col">
                    <input type="text" className="px-2"
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search Product"
                        style={{ height: "35px", width: "15rem", marginTop: "5px" }} />

                    <div className="text-right">
                        <button onClick={openModal} className="btn btn-dark rounded-pill mb-3">
                            <span className="badge badge-white">
                                <i className="fa fa-plus-circle" aria-hidden="true"></i>
                            </span>
                            New Product</button>
                    </div>
                </div>
                <div className="bg-white py-2 px-2 table-main">
                    <ProductItems filterProducts={filterProducts} />
                </div>
            </div>
        </div>
    </React.Fragment>
}

function mapStateToProps(state) {
    return {
        categories: state.categoriesReducer.categories,
        allProducts: state.productReducer.products,
        admin: state.adminLoginReducer.admin
    }
}

export default connect(mapStateToProps, null)(Product);