import React, { useContext, useState } from 'react';
import { Table, Modal, Button, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { GlobalContext } from "../MainContext/Context";
import { ServerPort } from "../../Api/apiActions";
import moment from "moment";
import Avatar from "react-avatar";


const Orders = ({ admin }) => {
    const { orders, changeOrderStatus } = useContext(GlobalContext);
    const [show, setShow] = useState(false);
    const [detail, setDetail] = useState();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const seeDetail = (item) => {
        setDetail(item);
        return handleShow();
    }

    return <React.Fragment>
        {admin === null && <Redirect to="admin/login" />}
        <div className="pt-2 px-3 bg-white mx-4 mb-4" style={{ minHeight: "100vh", marginTop: "6rem" }}>
            <h3 className="text-center mt-3 font-weight-bold text-danger">
                <i className="fa fa-truck mr-3 mb-3" aria-hidden="true"></i>
                All Orders</h3>
            <section className="table-main1">
                <Table bordered hover className="text-center table-1">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Status</th>
                            <th>Time</th>
                            <th>Price (Rs)</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map((value, index) => {
                                {
                                    return <tr key={index}>
                                        <td>{value._id}</td>
                                        <td>{value.user}</td>
                                        <td className="text-success">
                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                <Form.Control defaultValue={value.status} onChange={(e) => changeOrderStatus(value._id, e.target.value)} as="select">
                                                    <option disabled >Status</option>
                                                    <option>Send</option>
                                                    <option value="Processing">Processing</option>
                                                    <option value="Complete">Complete</option>
                                                    <option value="Delivered">Delivered</option>
                                                    <option value="Received">Received</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </td>
                                        <td>{moment(value.createdAt).startOf('hour').fromNow()}</td>
                                        <td>{value.total}</td>
                                        <td className="text-center">
                                            <i onClick={() => seeDetail(value)} class="fa mx-2 fa-eye text-primary " aria-hidden="true"></i>
                                        </td>
                                    </tr>
                                }
                            })
                        }
                    </tbody>
                </Table>
            </section>
            {/* modal */}
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Order's Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        detail?.products.map((item, index) => {
                            return <div key={index} className="d-flex align-items-center justify-content-around mb-3">
                                <Avatar src={`${ServerPort}${item?.img[0].img}`} />
                                <p className="text-muted">Qty : {item.quantity}</p>
                                <p className="text-yellow-600">Price: ({item.quantity} x {item.price - item.offer}) = Rs {item.quantity * (item.price - item.offer)}</p>
                            </div>
                        })
                    }
                    <hr />
                    <h5 className="text-success text-center">Shipping Details</h5>
                    <section className="d-flex flex-column" style={{ fontSize: "smaller" }}>
                        <span>Receipt Name: <span className="text-danger">{detail?.charge?.source?.name}</span> </span>
                        <span>Receipt Email: <span className="text-danger">{detail?.charge?.receipt_email}</span> </span>
                        <span>City: <span className="text-danger">{detail?.charge?.source?.address_city}</span> </span>
                        <span>Country: <span className="text-danger">{detail?.charge?.source?.address_country}</span> </span>
                        <span>Address: <span className="text-danger">{detail?.charge?.source?.address_line1}</span> </span>
                        <span>Postal Code: <span className="text-danger">{detail?.charge?.source?.address_zip}</span> </span>
                        <a href={detail?.charge?.receipt_url} target="_blank" >Click Here To See Reciept</a>
                    </section>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    </React.Fragment >
}


function mapStateToProps(state) {
    return {
        admin: state.adminLoginReducer.admin
    }
}

export default connect(mapStateToProps, null)(Orders);
