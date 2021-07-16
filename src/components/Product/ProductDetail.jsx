import React, { useState } from 'react';
import { Button, Modal, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { closeProductModel } from "../../Store/Actions/CommonFunc";
import { updateSelectedProduct } from "../../Store/Actions/Actions";
import { ServerPort } from "../../Api/apiActions";

const ProductDetail = ({ product, sendUpdatedProductData, categories }) => {

    const [name, setName] = useState(null);
    const [active, setActive] = useState(null);
    const [offer, setOffer] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [price, setPrice] = useState(null);
    const [description, setDescription] = useState(null);
    const [parent, setParent] = useState(null);
    const [brand, setBrand] = useState(null);

    return <React.Fragment>
        <Modal size="lg" show={product && true} animation={false} onHide={closeProductModel} >
            <Modal.Header closeButton>
                <Modal.Title>Product Detail (Editable) </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <div className="row">
                        <div className="col-md-6">
                            <Form.Group controlId="formBasicText">
                                <Form.Label>Name</Form.Label>
                                <Form.Control defaultValue={product && product.name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Product Name" />
                            </Form.Group>
                        </div>
                        <div className="col-md-6">
                            <Form.Group controlId="formBasicText">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control defaultValue={product && product.quantity} onChange={(e) => setQuantity(e.target.value)} type="number" placeholder="Product Quantity" />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <Form.Group controlId="formBasicText">
                                <Form.Label>Price</Form.Label>
                                <Form.Control defaultValue={product && product.price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="Price" />
                            </Form.Group>
                        </div>
                        <div className="col-md-6">
                            <Form.Group controlId="formBasicText">
                                <Form.Label>Discount Price ( Optional )</Form.Label>
                                <Form.Control defaultValue={product && product.offer} onChange={(e) => setOffer(e.target.value)} type="text" placeholder="Offer Price" />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <Form.Group controlId="formBasicText">
                                <Form.Label>Parent Category</Form.Label>
                                <input defaultValue={product && product.parent} onChange={(e) => setParent(e.target.value)} className="text-muted" list="category" style={{ width: "100%", padding: "4px", border: "1px solid #ced4da" }} placeholder="Select Parent Category" />
                                <datalist id="category">
                                    {
                                        categories && categories.map((item, index) => {
                                            return <option key={index} value={item.name}>{item.slug}</option>
                                        })
                                    }
                                </datalist>
                            </Form.Group>
                        </div>
                        <div className="col-md-6">
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Product Status</Form.Label>
                                <Form.Control defaultValue={product && product.active} as="select" onChange={(e) => setActive(e.target.value)} >
                                    <option disabled selected>Select Status</option>
                                    <option>Active</option>
                                    <option>Not Active</option>
                                </Form.Control>
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <Form.Group controlId="formBasicText">
                                <Form.Label>Brand Name</Form.Label>
                                <Form.Control defaultValue={product && product.brand} onChange={(e) => setBrand(e.target.value)} type="text" placeholder="Offer Price" />
                            </Form.Group>
                        </div>

                        <div className="col-md-6">
                            <Form.Group controlId="formBasicText">
                                <Form.Label>Description</Form.Label>
                                <textarea defaultValue={product && product.description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    type="text" placeholder="Description"
                                    className="form-control" rows="3" />
                            </Form.Group>
                        </div>
                    </div>
                    <hr />
                    <div className="d-flex">
                        {
                            product && product.productPics.map((item, index) => {
                                return <div key={index} style={{ width: "200px", height: "150px" }}>
                                    <img src={`${ServerPort}${item.img}`} alt="product pic" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                                </div>
                            })
                        }
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeProductModel} >
                    Close
                    </Button>
                <Button variant="primary" onClick={(e) => sendUpdatedProductData({ productData: { name, brand, quantity, price, offer, parent, active, description }, _id: product._id })}>
                    Save Changes
                    </Button>
            </Modal.Footer>
        </Modal>
    </React.Fragment>
}

function mapStateToProps(state) {
    return {
        product: state.productDetailReducer.product,
        categories: state.categoriesReducer.categories
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sendUpdatedProductData: (data) => { dispatch(updateSelectedProduct(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);