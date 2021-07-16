import React, { useState } from 'react';
import Paginate from "./ProductPagination";
import { deleteProductFunc, addProductDetailFunc } from "../../Store/Actions/Actions";
import { connect } from "react-redux";
import { ServerPort } from "../../Api/apiActions";
import ProductDetail from "./ProductDetail";
import NumberFormat from 'react-number-format';
import Avatar from "react-avatar";
import { Badge } from "react-bootstrap";

const ProductItem = ({ filterProducts, sendDeleteItemID, sendProductDetailData }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage, setProductPerPage] = useState(10);

    const indexOfLastProduct = currentPage * productPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productPerPage;
    const currentProducts = (filterProducts.length < 10 && currentPage > 1) ? setCurrentPage(1) : filterProducts.slice(indexOfFirstProduct, indexOfLastProduct)

    const pageCount = Math.ceil(filterProducts.length / productPerPage);

    const pageChangeHandler = ({ selected }) => {
        setCurrentPage(selected + 1);
    }

    return <React.Fragment>
        {
            filterProducts.length === 0 &&
            <h5 className="text-center text-danger mb-3">Product List Empty...!</h5>
        }
        <table className="table mt-3 table-hover" style={{ overflowX: "hidden", width: "100%" }}>
            <caption>List of Products</caption>
            <thead>
                <tr className="text-center">
                    <th scope="col">Product</th>
                    <th scope="col">Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">Price</th>
                    <th scope="col">Category</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody className="text-center">
                {
                    currentProducts && currentProducts.map((item, index) => {
                        return <tr key={index}>
                            <td>
                                <Avatar className="avatar" src={`${ServerPort}${item.productPics[0].img}`} />
                            </td>
                            <td >{item.name}</td>
                            <td>
                                <Badge pill variant={item.active === "Active" ? "success" : "danger"}>{item.active}</Badge>
                            </td>
                            <td>
                                <NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'Rs '} />
                            </td>
                            <td>{item.parent}</td>
                            <td >{item.quantity}</td>
                            <td>
                                <a onClick={(e) => sendProductDetailData(item)} href="#" className="text-info mr-2">
                                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                </a>
                                <a onClick={(e) => sendDeleteItemID({ productID: item._id })} href="#" className="text-danger">
                                    <i className="fa fa-trash-o"></i>
                                </a>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
        <Paginate pageCount={pageCount} pageChangeHandler={pageChangeHandler} />
        <ProductDetail />
    </React.Fragment>
}

function mapDispatchToProps(dispatch) {
    return {
        sendDeleteItemID: (data) => { dispatch(deleteProductFunc(data)) },
        sendProductDetailData: (data) => { dispatch(addProductDetailFunc(data)) }
    }
}

export default connect(null, mapDispatchToProps)(ProductItem);