import React, { useState, useEffect } from 'react';
import { createCategory, getAllCategories, getSubCategories } from "../../Store/Actions/Actions";
import { connect } from "react-redux";
import { Accordion, Card, Button, Modal } from "react-bootstrap";
import { Redirect } from "react-router-dom";

const Category = ({ sendCreateNewCategoryData, admin, categories, sendDataForGettingSubCategories, subCategoriesByParent }) => {
    const [MainCategory, setMainCategory] = useState(null);
    const [subCategory, setSubCategory] = useState(null);

    // modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getAllCategories();
    }, [])

    return <React.Fragment>
        {admin === null && <Redirect to="admin/login" />}
        <div className="py-3 mx-3 px-3 bg-white" style={{ marginTop: "6rem", minHeight: "100vh" }}>
            <h3 className="text-center mt-3 font-weight-bold text-danger">
                <i className="fa text-danger category-head fa-list-alt mr-3 mb-3" aria-hidden="true"></i>
                Product Categories</h3>
            <button onClick={handleShow} className="btn btn-dark rounded-pill mb-3">
                <span className="badge badge-white">
                    <i className="fa fa-plus-circle" aria-hidden="true"></i>
                </span>
                New Category
            </button>
            {/* modal start*/}
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a new category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Main Category</label>
                        <div >
                            <input onChange={(e) => {
                                setMainCategory(e.target.value);
                            }} className="text-muted" list="browsers" style={{ width: "100%", padding: "4px" }} placeholder="Category Name" />
                            <datalist id="browsers">
                                {
                                    categories && categories.map((item, index) => {
                                        return <option key={index} value={item.name}>{item.slug}</option>
                                    })
                                }
                            </datalist>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Sub Category</label>
                        <input onChange={(e) => setSubCategory(e.target.value)} type="text" className="form-control" placeholder="Category Name" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={(e) => {
                        e.preventDefault();
                        sendCreateNewCategoryData({ main: MainCategory, sub: subCategory });
                    }}
                    >
                        Create Category
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* modal end */}

            {
                categories && categories.map((item, index) => {
                    if (item.parent === undefined) {
                        return <Accordion key={index}>
                            <Card>
                                <Card.Header className="bg-white">
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        <span onClick={() => sendDataForGettingSubCategories(item.name)}>{item.name}</span>
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        {
                                            subCategoriesByParent && subCategoriesByParent.map((item, index) => {
                                                return <p>{item.name}</p>
                                            })
                                        }
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    }
                })
            }
        </div>
    </React.Fragment>
}

function mapStateToProps(state) {
    return {
        categories: state.categoriesReducer.categories,
        subCategoriesByParent: state.categoriesReducer.subCategoriesByParent,
        admin: state.adminLoginReducer.admin
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sendCreateNewCategoryData: (data) => { dispatch(createCategory(data)) },
        sendDataForGettingSubCategories: (data) => { dispatch(getSubCategories(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);