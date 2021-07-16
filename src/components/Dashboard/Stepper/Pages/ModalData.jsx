import React, { useState } from 'react';
import { Modal, Button } from "react-bootstrap";
import NumberFormat from "react-number-format";
import { useDispatch } from "react-redux";
import { updateDealsOfferPrice } from "../../../../Store/Actions/Actions";

const ModalData = ({ modalProduct, show, handleClose }) => {

    const [offer, setOffer] = useState();
    const dispatch = useDispatch();

    return <React.Fragment>
        <Modal show={show} onHide={handleClose} animation={false} >
            <Modal.Header closeButton>
                <Modal.Title>{modalProduct && modalProduct.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span>Original Price : </span>
                <NumberFormat className="text-danger" value={modalProduct && modalProduct.price} displayType={'text'} thousandSeparator={true} prefix={'Rs '} />
                <br /><span>Discount Price : </span>
                <NumberFormat className="text-danger" value={modalProduct && modalProduct.offer} displayType={'text'} thousandSeparator={true} prefix={'Rs '} />
                <br /><span>Discount Percentage : </span>
                <NumberFormat className="text-danger" value={modalProduct && ((modalProduct.offer / modalProduct.price) * 100).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'% '} />
                <div className="form-group">
                    <input type="number" min={0} max={modalProduct && modalProduct.price}
                        onChange={(e) => setOffer(e.target.value)}
                        className="my-3 form-control" id="exampleInputPassword1"
                        placeholder="Enter New Price" />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={() => dispatch(updateDealsOfferPrice({ offer, id: modalProduct.id }))}>
                    Save Changes
             </Button>
            </Modal.Footer>
        </Modal>
    </React.Fragment>
}

export default ModalData;
