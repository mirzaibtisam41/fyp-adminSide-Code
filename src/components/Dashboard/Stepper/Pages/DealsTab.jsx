import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { addProductDeals } from "../../../../Store/Actions/Actions";
import Pagination from "../../../Product/ProductPagination";
import DealsMapProducts from './DealsMapProducts';
import ModalData from './ModalData';

const Deals = () => {
    const [product, setProduct] = useState();
    const Products = useSelector(state => state.productReducer.products);
    const [modalProduct, setModalProduct] = useState();
    const dispatch = useDispatch();
    // modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const DealProducts = Products.filter(item => item.active === "In Deal");

    // pagination data
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage, setProductPerPage] = useState(10);
    const indexOfLastProduct = currentPage * productPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productPerPage;
    const currentProducts = DealProducts !== null && DealProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const pageCount = Math.ceil(DealProducts !== null && DealProducts.length / productPerPage);
    const pageChangeHandler = ({ selected }) => {
        setCurrentPage(selected + 1);
    }

    // pagination end
    const SendDealItem = () => {
        Products.forEach(item => {
            if (item.slug === product) return dispatch(addProductDeals({ item }))
        });
    }

    return <React.Fragment>
        <ModalData modalProduct={modalProduct} show={show} handleClose={handleClose} />
        <div className="mb-4 d-flex justify-content-center button-flex-deal">
            <div className="mx-4">
                <input onChange={(e) => setProduct(e.target.value)} placeholder="Search Product"
                    className="p-1 w-100" list="prod" name="browser" id="browser" />
                <datalist id="prod">
                    {
                        Products && Products.map((item, index) => {
                            return <option key={index} value={item.slug}>{item.name}</option>
                        })
                    }
                </datalist>
            </div>
            <button onClick={SendDealItem} className="btn btn-dark add-btn-deal rounded-pill">
                <span className="badge badge-white">
                    <i className="fa fa-plus-circle" aria-hidden="true"></i>
                </span>
                Add Product
            </button>
        </div>
        <section className="main-table-2">
            <table className="table-2 table table-hover">
                <thead className="text-center">
                    <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Price</th>
                        <th scope="col">Offer Price</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {
                        currentProducts && currentProducts.map((item, index) => {
                            return <DealsMapProducts key={index} item={item} handleShow={handleShow} setModalProduct={setModalProduct} />
                        })
                    }
                </tbody>
            </table>
        </section>
        <section className="pag-sec">
            <Pagination pageCount={pageCount} pageChangeHandler={pageChangeHandler} />
        </section>
    </React.Fragment >
}

export default Deals;