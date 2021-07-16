import React, { useState, useEffect } from 'react';
import { Button, Modal } from "react-bootstrap";
import { Form, Row, Col } from "react-bootstrap";
import Product from './Product';
import { connect } from "react-redux";
import { addNewProduct, getAllProductsFunc } from "../../Store/Actions/Actions";
import Avatar from "react-avatar";

const AddProductModal = ({ sendNewProductData, categories }) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [productPics, setProductPics] = useState([]);
    const [name, setName] = useState(null);
    const [active, setActive] = useState(null);
    const [offer, setOffer] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [price, setPrice] = useState(null);
    const [description, setDescription] = useState(null);
    const [parent, setParent] = useState(null);
    const [brand, setBrand] = useState(null);

    useEffect(() => {
        getAllProductsFunc();
    }, [])

    const removeAddedPics = (indexRemove) => {
        const filter = productPics.filter((item, index) => {
            return indexRemove !== index;
        });
        setProductPics(filter);
    }


    return <React.Fragment>
        <Modal show={show} size="lg" animation={false} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create a New Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group controlId="formBasicText">
                                <Form.Label>Name</Form.Label>
                                <Form.Control onChange={(e) => setName(e.target.value)} type="text" placeholder="Product Name" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formBasicText">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control onChange={(e) => setQuantity(e.target.value)} type="number" placeholder="Product Quantity" />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="formBasicText">
                                <Form.Label>Price</Form.Label>
                                <Form.Control onChange={(e) => setPrice(e.target.value)} type="number" placeholder="Price" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formBasicText">
                                <Form.Label>Discount Price ( Optional )</Form.Label>
                                <Form.Control onChange={(e) => setOffer(e.target.value)} type="text" placeholder="Offer Price" />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="formBasicText">
                                <Form.Label>Parent Category</Form.Label>
                                <input onChange={(e) => setParent(e.target.value)} className="text-muted" list="category" style={{ width: "100%", padding: "4px" }} placeholder="Select Parent Category" />
                                <datalist id="category">
                                    {
                                        categories && categories.map((item, index) => {
                                            return <option key={index} value={item.name}>{item.slug}</option>
                                        })
                                    }
                                </datalist>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Product Status</Form.Label>
                                <Form.Control defaultValue="Select Status" as="select" onChange={(e) => setActive(e.target.value)} >
                                    <option disabled value="Select Status">Select Status</option>
                                    <option value='Active' >Active</option>
                                    <option value="Not Active">Not Active</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="formBasicText">
                                <Form.Label>Brand Name</Form.Label>
                                <Form.Control onChange={(e) => setBrand(e.target.value)} type="text" placeholder="Brand" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formBasicText">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Description" />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="formBasicText">
                        <Form.Label>Select Product Pics</Form.Label>
                        <div className="d-flex">
                            {
                                productPics.length > 0 && productPics.map((item, index) => {
                                    return <div className="mx-2 my-2">
                                        <i onClick={(e) => removeAddedPics(index)} className="fa fa-window-close fa-lg position-absolute"></i>
                                        <Avatar src={URL.createObjectURL(item)} />
                                    </div>
                                })
                            }
                        </div>
                        <Form.Control onChange={(e) => setProductPics([
                            ...productPics,
                            e.target.files[0]
                        ])} type="file" />
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={(e) => { e.preventDefault(); sendNewProductData({ productData: { name, brand, quantity, price, offer, parent, active, description }, productPics }) }}
                    variant="dark">
                    Create Product
                </Button>
            </Modal.Footer>
        </Modal>

        <Product openModal={handleShow} />
    </React.Fragment>
}

function mapStateToProps(state) {
    return {
        categories: state.categoriesReducer.categories,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sendNewProductData: (data) => { dispatch(addNewProduct(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProductModal);